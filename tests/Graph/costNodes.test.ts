import { costNodes } from "@/aStarAlgorithm/Graph/costNodes";
import type { TGraph } from "@/models";
import { describe, expect, it } from "vitest";

const graph: TGraph = [
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

describe("costNodes", () => {
	it("должен рассчитать стоимости узлов", async () => {
		await costNodes(graph, startNode, endNode);

		expect(graph[0][0].gCost).toBe(0);
		expect(graph[0][0].hCost).toBe(2);
		expect(graph[0][0].fCost).toBe(2);

		expect(graph[1][1].gCost).toBe(2);
		expect(graph[1][1].hCost).toBe(0);
		expect(graph[1][1].fCost).toBe(2);
	});
});
