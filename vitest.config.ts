import { defineConfig } from "vitest/config";

// plugins
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	test: {
		coverage: {
			provider: "v8",
			include: ["src/aStarAlgorithm", "src/dataConverter"],
		},
		typecheck: {
			include: ["tests/**/*.ts"],
			ignoreSourceErrors: true,
		},
	},
	plugins: [tsconfigPaths()],
});
