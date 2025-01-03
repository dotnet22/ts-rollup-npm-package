// rollup.config.js
import terser from "@rollup/plugin-terser";
import baseConfig from "./rollup.base.config.js";
import dts from "rollup-plugin-dts";
const packageJson = require("./package.json");
import { getFiles } from "./scripts/buildUtils";

const globals = {
  ...packageJson.dependencies,
  ...packageJson.devDependencies,
};

const extensions = [".js", ".ts", ".jsx", ".tsx"];

export default [
  {
    input: [
      "./src/index.ts",
      ...getFiles("./src/components", extensions),
      ...getFiles("./src/utils", extensions),
    ],
    output: {
      dir: "dist",
      format: "esm",
      preserveModules: true,
      preserveModulesRoot: "src",
      sourcemap: true,
    },
    external: ["react", "react-dom", ...Object.keys(globals)],
    plugins: [...baseConfig.plugins, terser()],
  },
  //   {
  //     input: "src/index.ts",
  //     output: {
  //       file: "dist/index.d.ts",
  //       format: "esm",
  //     },
  //     plugins: [dts.default()],
  //   },
];
