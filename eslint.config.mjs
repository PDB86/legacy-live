import { createRequire } from "node:module"
const require = createRequire(import.meta.url)
const { FlatCompat } = require("@eslint/eslintrc")
const compat = new FlatCompat({ baseDirectory: import.meta.dirname })

const config = [
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts", "tests/**"] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Existing UI scaffolding uses these patterns; keep them visible without blocking releases.
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "react/no-unescaped-entities": "off",
      "@next/next/no-img-element": "warn",
    },
  },
]
export default config
