# NZBN Checker

A command-line tool to validate and process New Zealand Business Numbers (NZBN).

## Installation

```bash
git clone https://github.com/your-username/nzbn-checker.git
cd nzbn-checker
npm install
```

## Usage

```bash
node index.js validate 9429046342349
```

Or use it programmatically:

```javascript
const { validateNZBN } = require("./lib/validator");
const result = validateNZBN("9429046342349");
console.log(result); // true or false
```

## Features

- Validate NZBN numbers using the check digit algorithm
- Fetch business details from the NZBN API (coming soon)
- Batch processing of multiple NZBNs (coming soon)

## Technologies Used

- Node.js
- JavaScript/TypeScript

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

```

## NZBN Format

A valid NZBN:
- Is 13 digits long
- Starts with "94" for New Zealand entities
- Contains a check digit as the last digit
```
