module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/standard"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    'semi': ['off', 'never'],  // 关闭规则检测
    "quotes": ['off', 'alawys'],
    "space-before-function-paren": ['off', 'alawys']
  }
};
