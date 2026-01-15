import nextPlugin from "eslint-config-next";

const config = [
  {
    ignores: [".next/**", "node_modules/**"],
  },
  ...nextPlugin,
  {
    rules: {
      "@next/next/no-page-custom-font": "off",
    },
  },
];

export default config;
