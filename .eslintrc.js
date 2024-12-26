// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: "expo",
  ignorePatterns: ["/dist/*"],
  plugins: ["lodash"],
  rules: {
    "lodash/import-scope": [2, "method"],
  },
};
