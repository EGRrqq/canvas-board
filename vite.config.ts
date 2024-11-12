import { defineConfig } from "vite";

// plugins
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	root: "src",
	build: {
		outDir: "../dist",
		assetsDir: "",
	},
	base: "/canvas-board/",
	plugins: [tsconfigPaths()],
});
