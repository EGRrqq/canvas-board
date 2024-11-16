import { setObstacles } from "@/aStarAlgorithm/Graph/setObstacles";
import type { Point, TGraph } from "@/models";
import { describe, expect, it } from "vitest";

describe("setObstacles", () => {
	it("должен установить препятствия в граф", () => {
		const graph: TGraph = new Map();
		const startNode: Point = { x: 0, y: 0 };
		const endNode: Point = { x: 2, y: 2 };

		graph.set("0,0", {
			x: 0,
			y: 0,
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
		graph.set("2,2", {
			x: 2,
			y: 2,
			traversable: true,
			gCost: 0,
			hCost: 0,
			fCost: 0,
		});

		const obstacles: Point[] = [{ x: 1, y: 1 }];

		setObstacles(graph, obstacles, startNode, endNode);

		expect(graph.get("1,1")?.traversable).toBe(false);
	});

	it("не должен устанавливать препятствия на стартовую и конечную точки", () => {
		const graph: TGraph = new Map();
		const startNode: Point = { x: 0, y: 0 };
		const endNode: Point = { x: 2, y: 2 };

		graph.set("0,0", {
			x: 0,
			y: 0,
			traversable: true,
			gCost: 0,
			hCost: 0,
			fCost: 0,
		});
		graph.set("2,2", {
			x: 2,
			y: 2,
			traversable: true,
			gCost: 0,
			hCost: 0,
			fCost: 0,
		});

		const obstacles: Point[] = [
			{ x: 0, y: 0 },
			{ x: 2, y: 2 },
		];

		setObstacles(graph, obstacles, startNode, endNode);

		expect(graph.get("0,0")?.traversable).toBe(true);
		expect(graph.get("2,2")?.traversable).toBe(true);
	});
});
