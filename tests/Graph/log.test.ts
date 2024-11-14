import { log } from "@/aStarAlgorithm/Graph/log";
import { describe, expect, it, vi } from "vitest";

describe("log", () => {
	it("должен логировать граф с указанными узлами", async () => {
		const graph = [
			[
				{ x: 0, y: 0, traversable: true, gCost: 0, hCost: 0, fCost: 0 },
				{ x: 1, y: 0, traversable: true, gCost: 0, hCost: 0, fCost: 0 },
			],
			[
				{ x: 0, y: 1, traversable: true, gCost: 0, hCost: 0, fCost: 0 },
				{ x: 1, y: 1, traversable: true, gCost: 0, hCost: 0, fCost: 0 },
			],
		];
		const startNode = graph[0][0];
		const endNode = graph[1][1];
		const curNode = graph[0][1];

		const consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});

		await log(graph, startNode, endNode, curNode);

		expect(consoleLogSpy).toHaveBeenCalledWith([
			["  🏁", "  🏃"],
			["   0", "  🏆"],
		]);

		consoleLogSpy.mockRestore();
	});
});
