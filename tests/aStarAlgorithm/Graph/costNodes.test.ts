import { costNodes } from "@/aStarAlgorithm/Graph/costNodes";
import type { TGraph, TGraphNode } from "@/models";
import { describe, expect, it } from "vitest";

const startNode: TGraphNode = {
	x: 0,
	y: 0,
	traversable: true,
	gCost: 0,
	hCost: 0,
	fCost: 0,
};
const endNode: TGraphNode = {
	x: 2,
	y: 2,
	traversable: true,
	gCost: 0,
	hCost: 0,
	fCost: 0,
};
describe("costNodes", () => {
	it("должен корректно рассчитать стоимости для всех узлов", async () => {
		const graph: TGraph = new Map();

		graph.set("0,0", startNode);
		graph.set("1,0", {
			x: 1,
			y: 0,
			traversable: true,
			gCost: 0,
			hCost: 0,
			fCost: 0,
		});
		graph.set("2,2", endNode);

		await costNodes(graph, startNode, endNode);

		expect(graph.get("0,0")?.gCost).toBe(0);
		expect(graph.get("0,0")?.hCost).toBe(4);
		expect(graph.get("0,0")?.fCost).toBe(4);

		expect(graph.get("1,0")?.gCost).toBe(1);
		expect(graph.get("1,0")?.hCost).toBe(3);
		expect(graph.get("1,0")?.fCost).toBe(4);

		expect(graph.get("2,2")?.gCost).toBe(4);
		expect(graph.get("2,2")?.hCost).toBe(0);
		expect(graph.get("2,2")?.fCost).toBe(4);
	});

	it("не должен рассчитывать стоимости для непроходимых узлов", async () => {
		const graph: TGraph = new Map();

		graph.set("0,0", startNode);
		graph.set("1,0", {
			x: 1,
			y: 0,
			traversable: false,
			gCost: 0,
			hCost: 0,
			fCost: 0,
		});
		graph.set("2,2", endNode);

		await costNodes(graph, startNode, endNode);

		expect(graph.get("1,0")?.gCost).toBe(0);
		expect(graph.get("1,0")?.hCost).toBe(0);
		expect(graph.get("1,0")?.fCost).toBe(0);
	});
});
