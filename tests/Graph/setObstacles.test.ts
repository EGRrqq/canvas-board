import { setObstacles } from "@/aStarAlgorithm/Graph/setObstacles";
import type { TGraph } from "@/aStarAlgorithm/models";
import { describe, expect, it } from "vitest";

describe("setObstacles", () => {
	it("должен установить препятствия, игнорируя стартовую и конечную точки", () => {
		const graph: TGraph = [
			[
				{ x: 0, y: 0, traversable: true, gCost: 0, hCost: 0, fCost: 0 },
				{ x: 1, y: 0, traversable: true, gCost: 0, hCost: 0, fCost: 0 },
				{ x: 2, y: 0, traversable: true, gCost: 0, hCost: 0, fCost: 0 },
			],
			[
				{ x: 0, y: 1, traversable: true, gCost: 0, hCost: 0, fCost: 0 },
				{ x: 1, y: 1, traversable: true, gCost: 0, hCost: 0, fCost: 0 },
				{ x: 2, y: 1, traversable: true, gCost: 0, hCost: 0, fCost: 0 },
			],
			[
				{ x: 0, y: 2, traversable: true, gCost: 0, hCost: 0, fCost: 0 },
				{ x: 1, y: 2, traversable: true, gCost: 0, hCost: 0, fCost: 0 },
				{ x: 2, y: 2, traversable: true, gCost: 0, hCost: 0, fCost: 0 },
			],
		];

		const obstacles = [
			{ x: 0, y: 0 },
			{ x: 1, y: 1 },
			{ x: 2, y: 2 },
		];

		const startNode = { x: 0, y: 0 };
		const endNode = { x: 2, y: 2 };

		setObstacles(graph, obstacles, startNode, endNode);

		// Проверяем, что препятствия установлены, кроме стартовой и конечной точек
		expect(graph[0][0].traversable).toBe(true); // Стартовая точка
		expect(graph[1][1].traversable).toBe(false); // Препятствие
		expect(graph[2][2].traversable).toBe(true); // Конечная точка
	});

	it("должен выбросить ошибку, если препятствие вне границ графа", () => {
		const graph: TGraph = [
			[
				{ x: 0, y: 0, traversable: true, gCost: 0, hCost: 0, fCost: 0 },
				{ x: 1, y: 0, traversable: true, gCost: 0, hCost: 0, fCost: 0 },
			],
		];

		const obstacles = [
			{ x: 2, y: 2 }, // Вне границ графа
		];

		const startNode = { x: 0, y: 0 };
		const endNode = { x: 1, y: 0 };

		expect(() => setObstacles(graph, obstacles, startNode, endNode)).toThrow(
			"Препятствие (2, 2) вне границ графа",
		);
	});
});
