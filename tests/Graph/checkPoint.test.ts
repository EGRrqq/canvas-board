import type { TGraph } from "@/aStarAlgorithm";
import { checkPoint } from "@/aStarAlgorithm/Graph/checkPoint";
import { describe, expect, it } from "vitest";

const graph: TGraph = [
	[{ x: 0, y: 0, traversable: true, gCost: 0, hCost: 0, fCost: 0 }],
];

describe("checkPoint", () => {
	it("должен проверить, что точка находится в графе", () => {
		const point = { x: 0, y: 0 };

		expect(() => checkPoint(graph, point, "Точка")).not.toThrow();
	});

	it("должен выбросить ошибку, если точка не находится в графе", () => {
		const point = { x: 1, y: 1 };
		const pointName = "Точки";

		expect(() => checkPoint(graph, point, pointName)).toThrow(
			`${pointName} (1, 1) нет в графе`,
		);
	});
});