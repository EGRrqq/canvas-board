import { getNeighbors } from "@/aStarAlgorithm/iteration/getNeighbors";
import type { TGraphNode } from "@/models";
import { describe, expect, it } from "vitest";

describe("getNeighbors", () => {
	it("должен вернуть соседей для узла в центре графа", () => {
		const graph: Map<string, TGraphNode> = new Map();
		graph.set("0,0", {
			x: 0,
			y: 0,
			traversable: true,
			gCost: 0,
			hCost: 0,
			fCost: 0,
		});
		graph.set("1,0", {
			x: 1,
			y: 0,
			traversable: true,
			gCost: 0,
			hCost: 0,
			fCost: 0,
		});
		graph.set("0,1", {
			x: 0,
			y: 1,
			traversable: true,
			gCost: 0,
			hCost: 0,
			fCost: 0,
		});
		graph.set("1,1", {
			x: 1,
			y: 1,
			traversable: true,
			gCost: 0,
			hCost: 0,
			fCost: 0,
		});

		const node: TGraphNode = {
			x: 0,
			y: 0,
			traversable: true,
			gCost: 0,
			hCost: 0,
			fCost: 0,
		};
		const neighbors = getNeighbors(graph, node);

		expect(neighbors).toEqual([
			{ x: 1, y: 0, traversable: true, gCost: 0, hCost: 0, fCost: 0 },
			{ x: 0, y: 1, traversable: true, gCost: 0, hCost: 0, fCost: 0 },
		]);
	});

	it("должен вернуть соседей для узла на краю графа", () => {
		const graph: Map<string, TGraphNode> = new Map();
		graph.set("0,0", {
			x: 0,
			y: 0,
			traversable: true,
			gCost: 0,
			hCost: 0,
			fCost: 0,
		});
		graph.set("1,0", {
			x: 1,
			y: 0,
			traversable: true,
			gCost: 0,
			hCost: 0,
			fCost: 0,
		});

		const node: TGraphNode = {
			x: 0,
			y: 0,
			traversable: true,
			gCost: 0,
			hCost: 0,
			fCost: 0,
		};
		const neighbors = getNeighbors(graph, node);

		expect(neighbors).toEqual([
			{ x: 1, y: 0, traversable: true, gCost: 0, hCost: 0, fCost: 0 },
		]);
	});

	it("должен вернуть пустой массив, если у узла нет соседей", () => {
		const graph: Map<string, TGraphNode> = new Map();
		graph.set("0,0", {
			x: 0,
			y: 0,
			traversable: true,
			gCost: 0,
			hCost: 0,
			fCost: 0,
		});

		const node: TGraphNode = {
			x: 0,
			y: 0,
			traversable: true,
			gCost: 0,
			hCost: 0,
			fCost: 0,
		};
		const neighbors = getNeighbors(graph, node);

		expect(neighbors).toEqual([]);
	});
});
