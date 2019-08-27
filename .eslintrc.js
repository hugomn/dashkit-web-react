module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint",
    "prettier/react"
  ],
  plugins: ["react-hooks", "prettier"],
  rules: {
    "no-use-before-define": 0,
    "no-plusplus": 0,
    "consistent-return": 0,
    "import/order": [
      "error",
      { groups: ["builtin", "external", "parent", "internal", "sibling", "index"] }
    ],
    "import/prefer-default-export": 0,
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: ["**/test.ts", "**/test.tsx", "**/*.test.ts", "**/*.test.tsx"],
        optionalDependencies: false
      }
    ],
    "no-underscore-dangle": 0,
    "no-param-reassign": ["error", { props: true, ignorePropertyModificationsFor: ["draft"] }],
    "prettier/prettier": ["error"],
    "react/prop-types": 0,
    "react/sort-comp": 0,
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/jsx-filename-extension": [1, { extensions: [".tsx"] }],
    "react/destructuring-assignment": 0,
    "react/jsx-props-no-spreading": 0,
    "@typescript-eslint/array-type": 1,
    "@typescript-eslint/no-use-before-define": 0,
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-non-null-assertion": 1,
    "@typescript-eslint/interface-name-prefix": 0,
    "react/no-array-index-key": 1,
    "sort-imports": 0,
    "jsx-a11y/anchor-is-valid": 1,
    "jsx-a11y/click-events-have-key-events": 1,
    "jsx-a11y/no-noninteractive-element-interactions": 1
  },
  settings: {
    react: {
      version: "detect"
    },
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  env: {
    jest: true,
    browser: true
  }
};
