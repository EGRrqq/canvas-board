import type { TGraph } from "@/aStarAlgorithm";
import { validatePoint } from "@/aStarAlgorithm/Graph/validatePoint";
import { describe, expect, it } from "vitest";

const graph: TGraph = [
	[{ x: 0, y: 0, traversable: true, gCost: 0, hCost: 0, fCost: 0 }],
];

describe("validatePoint", () => {
	it("должен проверить, что точка находится в графе", () => {
		const point = { x: 0, y: 0 };

		expect(() => validatePoint(graph, point, "Точка")).not.toThrow();
	});

	it("должен выбросить ошибку, если точка не находится в графе", () => {
		const point = { x: 1, y: 1 };
		const pointName = "Точкa";

		expect(() => validatePoint(graph, point, pointName)).toThrow(
			`${pointName} (1, 1) вне границ графа`,
		);
	});
});
