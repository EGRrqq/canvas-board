import { setObstacles } from "@/aStarAlgorithm/Graph/setObstacles";
import { describe, expect, it } from "vitest";

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

describe("setObstacles", () => {
	it("должен установить препятствия в граф", () => {
		const obstacles = [{ x: 0, y: 0 }];
		const startNode = { x: 1, y: 0 };
		const endNode = { x: 1, y: 1 };

		setObstacles(graph, obstacles, startNode, endNode);

		expect(graph[0][0].traversable).toBe(false);
	});

	it("должен выбросить ошибку, если стартовая точка находится на препятствии", () => {
		const obstacles = [{ x: 0, y: 0 }];
		const startNode = { x: 0, y: 0 };
		const endNode = { x: 1, y: 1 };

		expect(() => setObstacles(graph, obstacles, startNode, endNode)).toThrow(
			"Стартовая точка (0, 0) находится на препятствии",
		);
	});

	it("должен выбросить ошибку, если конечная точка находится на препятствии", () => {
		const obstacles = [{ x: 1, y: 1 }];
		const startNode = { x: 0, y: 0 };
		const endNode = { x: 1, y: 1 };

		expect(() => setObstacles(graph, obstacles, startNode, endNode)).toThrow(
			"Конечная точка (1, 1) находится на препятствии",
		);
	});
});
