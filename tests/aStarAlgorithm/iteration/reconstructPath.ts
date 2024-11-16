import { reconstructPath } from "@/aStarAlgorithm/iteration/reconstructPath";
import type { TGraphNode } from "@/models";
import { describe, expect, it } from "vitest";

describe("reconstructPath", () => {
	it("должен восстановить путь от конечного узла до начального", () => {
		const endNode: TGraphNode = {
			x: 2,
			y: 2,
			traversable: true,
			gCost: 0,
			hCost: 0,
			fCost: 0,
			parent: undefined,
		};
		const middleNode: TGraphNode = {
			x: 1,
			y: 1,
			traversable: true,
			gCost: 0,
			hCost: 0,
			fCost: 0,
			parent: endNode,
		};
		const startNode: TGraphNode = {
			x: 0,
			y: 0,
			traversable: true,
			gCost: 0,
			hCost: 0,
			fCost: 0,
			parent: middleNode,
		};

		endNode.parent = middleNode;
		middleNode.parent = startNode;

		const path = reconstructPath(endNode);

		expect(path).toEqual([
			{ x: 0, y: 0 },
			{ x: 1, y: 1 },
			{ x: 2, y: 2 },
		]);
	});

	it("должен вернуть пустой путь, если у конечного узла нет родителя", () => {
		const endNode: TGraphNode = {
			x: 2,
			y: 2,
			traversable: true,
			gCost: 0,
			hCost: 0,
			fCost: 0,
			parent: undefined,
		};

		const path = reconstructPath(endNode);

		expect(path).toEqual([{ x: 2, y: 2 }]);
	});
});
