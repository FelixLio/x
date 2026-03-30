import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { globSync } from "tinyglobby";
import dts from "unplugin-dts/vite";
import { tsxResolveTypes } from "vite-plugin-tsx-resolve-types";
import vueResolveTypes from "vite-plugin-vue-resolve-types";
import { defineConfig } from "vite-plus";

import { LIB_EXTERNALS, TEST_FILE_PATTERNS } from "./build.constants";

const files = globSync([
  "./components/**/*.ts",
  "./components/**/*.tsx",
  "./components/**/*.vue",
  ...TEST_FILE_PATTERNS,
])
  .sort()
  .map(file => `./${file}`);

const entries = Object.fromEntries(
  files.map(file => [
    file.replace("./components/", "").replace(/\.(?:ts|tsx|vue)$/, ""),
    file,
  ]),
);

export default defineConfig({
  base: "./",
  plugins: [
    vueResolveTypes(),
    vue(),
    tsxResolveTypes({
      defaultPropsToUndefined: ["Boolean"],
    }),
    vueJsx(),
    dts({
      tsconfigPath: "./tsconfig.app.json",
      entryRoot: "components",
      processor: "vue",
      exclude: ["**/__tests__/**", "**/*.test.*"],
    }),
  ],
  build: {
    minify: false,
    sourcemap: false,
    rolldownOptions: {
      external: LIB_EXTERNALS,

      output: {
        preserveModules: true,
        preserveModulesRoot: "components",
        format: "esm",
        entryFileNames: "[name].js",
        dir: "dist",
      },
    },
    lib: {
      entry: entries,
      formats: ["es"],
    },
  },
});
