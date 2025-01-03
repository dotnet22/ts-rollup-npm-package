// rollup.config.js
import terser from "@rollup/plugin-terser";
import baseConfig from "./rollup.base.config.js";
import dts from "rollup-plugin-dts";
const packageJson = require("./package.json");

export default [
  {
    input: ["src/**/*.ts"], // Entry point for the library
    output: [
      {
        file: packageJson.main, // Output for CommonJS (e.g., main.js)
        sourcemap: true,
        exports: "named",
      },
      {
        file: packageJson.module, // Output for ES6 modules
        format: "esm",
        sourcemap: true,
      },
    ],
    external: ["react", "react-dom"],
    preserveModules: true,
    plugins: [...baseConfig.plugins, terser()],
  },
  {
    input: "src/index.ts", // Type Definitions
    output: {
      file: "dist/index.d.ts",
      format: "esm",
    },
    plugins: [dts.default()],
  },
];
