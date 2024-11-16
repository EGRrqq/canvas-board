import type { IGraphData } from "@/aStarAlgorithm";
import { createGraph } from "@/aStarAlgorithm/Graph/createGraph";
import { describe, expect, it } from "vitest";

describe("createGraph", () => {
	it("должен создать граф с правильным количеством узлов", () => {
		const data: IGraphData = {
			start: { x: 0, y: 0 },
			end: { x: 2, y: 2 },
			obstacles: [],
			width: 3,
			height: 3,
		};
		const graph = createGraph(data);

		expect(graph.size).toBe(9);
	});

	it("должен создать граф с правильными координатами узлов", () => {
		const data: IGraphData = {
			start: { x: 0, y: 0 },
			end: { x: 1, y: 1 },
			obstacles: [],
			width: 2,
			height: 2,
		};
		const graph = createGraph(data);

		expect(graph.get("0,0")).toEqual({
			x: 0,
			y: 0,
			traversable: true,
			gCost: 0,
			hCost: 0,
			fCost: 0,
		});
		expect(graph.get("1,0")).toEqual({
			x: 1,
			y: 0,
			traversable: true,
			gCost: 0,
			hCost: 0,
			fCost: 0,
		});
		expect(graph.get("0,1")).toEqual({
			x: 0,
			y: 1,
			traversable: true,
			gCost: 0,
			hCost: 0,
			fCost: 0,
		});
		expect(graph.get("1,1")).toEqual({
			x: 1,
			y: 1,
			traversable: true,
			gCost: 0,
			hCost: 0,
			fCost: 0,
		});
	});
});
