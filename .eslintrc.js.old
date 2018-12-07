const path = require('path');

module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "import",
        "jsx-a11y",
        "babel"
    ],
    "parser": "babel-eslint",
    "parserOptions": {
      "ecmaVersion": 7,
      "ecmaFeatures": {
        "jsx": true
      }
    },
    "env": {
      "node": true,
      "browser": true,
      "mocha": true,
      "es6": true
    },
    "globals": {
      "_": true,
      "expect": true,
      "request": true,
    },
    "rules": {
      "object-curly-spacing": "off",
      "import/no-named-as-default": "off",
      "import/prefer-default-export": "off",
      "jsx-quotes": "off",
      "brace-style": ["error", "stroustrup"],
      "arrow-parens": "off",
      "arrow-body-style": "off",
      "spaced-comment": "off",
      "max-len": "off",
      "react/jsx-filename-extension": "off",
      "react/jsx-closing-bracket-location": "off",
      "jsx-a11y/no-static-element-interactions": "off",
      "jsx-a11y/label-has-for": "off",
      "camelcase": "off",
      "space-before-function-paren": "off",
      "no-underscore-dangle": "off",
      "no-plusplus": "off",
      "react/require-default-props": "off",
      "react/sort-comp": "off",
      "padded-blocks": ["error", {"blocks": "never"}],
      "no-trailing-spaces": ["error", { "skipBlankLines": true }],

      "semi": "off",
      "no-warning-comments": "off",
      "no-console": "off",
      "jsx-a11y/img-uses-alt": "off",
      "jsx-a11y/label-uses-for": "off",
      "jsx-a11y/mouse-events-map-to-key-events": "off",
      "jsx-a11y/redundant-alt": "off",
      "jsx-a11y/valid-aria-role": "off",
      "jsx-a11y/href-no-hash": "off",
      "jsx-a11y/anchor-is-valid": ["warn", { "aspects": ["invalidHref"] }],
      "import/no-extraneous-dependencies": "off",
      "import/no-unresolved": [
         "error",
         {
           "ignore": [ 'js/', 'img/' ]
         }
       ],
     "import/extensions": "off",
     "react/prefer-stateless-function": "off",
     "react/forbid-prop-types": "off",
     "quotes": [
       "error",
       "single",
       {
         "allowTemplateLiterals": true,
       }
     ],
     "comma-dangle": ["error", {
        "arrays": "always-multiline",
        "objects": "always-multiline",
        "imports": "always-multiline",
        "exports": "always-multiline",
        "functions": "ignore"
      }],
    },
    "settings": {
      "import/resolver": {
        "webpack": {
          "config": path.join(__dirname, "/config/webpack/main.js"),
        }
      },
    }
  };
