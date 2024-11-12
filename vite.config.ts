import { defineConfig } from "vite";

// plugins
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	root: "src",
	build: {
		outDir: "../build",
		assetsDir: "",
	},
	base: "/canvas-board/",
	plugins: [tsconfigPaths()],
});
