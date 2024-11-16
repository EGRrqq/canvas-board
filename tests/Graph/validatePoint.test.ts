import { validatePoint } from "@/aStarAlgorithm/Graph/validatePoint";
import type { Point, TGraphNode } from "@/models";
import { describe, expect, it } from "vitest";

describe("validatePoint", () => {
	it("должен вернуть узел, если точка существует в графе", () => {
		const graph: Map<string, TGraphNode> = new Map();
		const point: Point = { x: 1, y: 1 };
		const node: TGraphNode = {
			x: 1,
			y: 1,
			traversable: true,
			gCost: 0,
			hCost: 0,
			fCost: 0,
		};

		graph.set("1,1", node);

		const validatedNode = validatePoint(graph, point, "Точка");

		expect(validatedNode).toBe(node);
	});

	it("должен выбросить ошибку, если точка не существует в графе", () => {
		const graph: Map<string, TGraphNode> = new Map();
		const point: Point = { x: 1, y: 1 };

		expect(() => validatePoint(graph, point, "Точка")).toThrow(
			"Точка (1, 1) нет в графе",
		);
	});
});
