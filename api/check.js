const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

module.exports = async (req, res) => {
  const { nzbn } = req.query;

  if (!nzbn) {
    return res.status(400).json({ error: "NZBN is required" });
  }

  const url = "https://forms.immigration.govt.nz/AccreditedEmployer/Search";
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });

    // 输入 NZBN
    await page.type("#nzbn", nzbn);

    // 点击搜索按钮并等待导航
    await Promise.all([
      page.click('button[type="submit"]'),
      page.waitForNavigation({ waitUntil: "domcontentloaded" }),
    ]);

    // 提取结果
    const result = await page.evaluate(() => {
      const warning = document.querySelector(".alert-warning");
      if (warning)
        return {
          status: "Not Accredited",
          message: warning.textContent.trim(),
        };

      const table = document.querySelector(".table-container");
      if (!table) return { status: "Not Found" };

      const rows = Array.from(table.querySelectorAll("tbody tr")).map((row) =>
        Array.from(row.querySelectorAll("td")).map((td) =>
          td.textContent.trim()
        )
      );

      if (rows.length === 0) return { status: "Not Accredited" };

      const [companyName, address, status, accreditationType, expiryDate] =
        rows[0];
      return { companyName, address, status, accreditationType, expiryDate };
    });

    await browser.close();
    return res.status(200).json(result);
  } catch (error) {
    await browser.close();
    return res.status(500).json({ error: error.message });
  }
};
