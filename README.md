// https://prettier.io/docs/en/options.html#print-width

"eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest",
      "prettier" // prettier中的规则会覆盖eslint中的规则
    ]
  },



如果你只是添加了几个空格， 那么lint-staged prevented an empty git commit.
lint-staged会阻止你的提交。