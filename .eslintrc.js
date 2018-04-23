// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 缩进数量
    'indent': [2, 4, {"SwitchCase": 1}],
    // 混用tab和空格
    'no-mixed-spaces-and-tabs': [2, true],
    // 强制分号后使用换行
    'semi-spacing': ["error", {"before": false, "after": true}],
    // swicth  case标签不能重复
    'no-duplicate-case': 2,
    // 控制逗号前后的空格
    'comma-spacing': [2, {'before': false, 'after': true}],
    // 语句块换行
    'eol-last': [2, 'always'],
    // 禁用不必要分号
    'no-extra-semi': 0,
    // 行尾是否使用分号 
    "semi": [0, "always"],
    // 不能有未定义变量
    "no-undef": 0,
    "no-tab": "off",
    "eol-last": 0
  }
}
