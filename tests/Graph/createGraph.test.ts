import type { IGraphData } from "@/aStarAlgorithm";
import { createGraph } from "@/aStarAlgorithm/Graph/createGraph";
import { describe, expect, it } from "vitest";

const data: IGraphData = {
	start: { x: 0, y: 0 },
	end: { x: 1, y: 1 },
	obstacles: [],
	width: 2,
	height: 2,
};

describe("createGraph", () => {
	it("должен создать граф с заданными размерами", () => {
		const graph = createGraph(data);

		expect(graph.length).toBe(2);
		expect(graph[0].length).toBe(2);
		expect(graph[1].length).toBe(2);

		expect(graph[0][0]).toEqual({
			x: 0,
			y: 0,
			traversable: true,
			gCost: 0,
			hCost: 0,
			fCost: 0,
		});
		expect(graph[1][1]).toEqual({
			x: 1,
			y: 1,
			traversable: true,
			gCost: 0,
			hCost: 0,
			fCost: 0,
		});
	});
});
