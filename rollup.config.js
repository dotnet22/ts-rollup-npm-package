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
      "src/**/*.ts",
      //   "./src/index.ts",
      //   "./src/utils/index.ts",
      //   "./src/components/index.ts",
      //   "./src/hooks/index.ts",
      //   ...getFiles("./src/components", extensions),
      //   ...getFiles("./src/utils", extensions),
      //   ...getFiles("./src/hooks", extensions),
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
];
