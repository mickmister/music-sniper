module.exports = {
  parser: 'typescript-eslint-parser',
  plugins: [
    "react-hooks",
    "header",
    "typescript"
  ],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    // "header/header": [
    //   2,
    //   "line",
    //   " Copyright (c) 2018-present Kochell Software. All Rights Reserved.\n See LICENSE.txt for license information."
    // ],
  },
}
