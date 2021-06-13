module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/prettier"],

  parserOptions: {
    parser: '@typescript-eslint/parser',
  },

  rules: {
    "linebreak-style": [0, "windows"], //使用Windows换行风格
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },

  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        mocha: true,
      },
    },
  ],

  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/prettier',
    '@vue/typescript'
  ]
};
