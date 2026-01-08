import baseConfig from '../../eslint.config.mjs';

const config = [
  ...baseConfig,
  {
    rules: {
      "@typescript-eslint/no-inferrable-types": "off"
    }
  }
];

console.log(config);

export default config
