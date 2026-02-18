import nextVitals from "eslint-config-next/core-web-vitals"
import jsxA11y from "eslint-plugin-jsx-a11y"

const config = [
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "coverage/**",
      "playwright-report/**",
      "test-results/**",
    ],
  },
  ...nextVitals,
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    rules: {
      ...jsxA11y.configs.recommended.rules,
      "react-hooks/preserve-manual-memoization": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
]

export default config
