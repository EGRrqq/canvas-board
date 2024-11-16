import { findPath } from "@/aStarAlgorithm/Graph/findPath";
import type { TGraphNode } from "@/models";
import { describe, expect, it } from "vitest";

describe("findPath", () => {
	it("должен найти путь от начального узла до конечного узла", async () => {
		const graph: Map<string, TGraphNode> = new Map();
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

		graph.set("0,0", startNode);
		graph.set("1,0", {
			x: 1,
			y: 0,
			traversable: true,
			gCost: 0,
			hCost: 0,
			fCost: 0,
		});
		graph.set("2,0", {
			x: 2,
			y: 0,
			traversable: true,
			gCost: 0,
			hCost: 0,
			fCost: 0,
		});
		graph.set("2,1", {
			x: 2,
			y: 1,
			traversable: true,
			gCost: 0,
			hCost: 0,
			fCost: 0,
		});
		graph.set("2,2", endNode);

		const path = await findPath(graph, startNode, endNode);

		expect(path).toEqual([
			{ x: 0, y: 0 },
			{ x: 1, y: 0 },
			{ x: 2, y: 0 },
			{ x: 2, y: 1 },
			{ x: 2, y: 2 },
		]);
	});

	it("должен выбросить ошибку, если путь не найден", async () => {
		const graph: Map<string, TGraphNode> = new Map();
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

		graph.set("0,0", startNode);
		graph.set("1,0", {
			x: 1,
			y: 0,
			traversable: false,
			gCost: 0,
			hCost: 0,
			fCost: 0,
		});
		graph.set("2,0", {
			x: 2,
			y: 0,
			traversable: false,
			gCost: 0,
			hCost: 0,
			fCost: 0,
		});
		graph.set("2,1", {
			x: 2,
			y: 1,
			traversable: false,
			gCost: 0,
			hCost: 0,
			fCost: 0,
		});
		graph.set("2,2", endNode);

		await expect(findPath(graph, startNode, endNode)).rejects.toThrow(
			"Путь не найден",
		);
	});
});
