import type { TGraph, TGraphNode } from "@/models";

export const costNodes = async (
	graph: TGraph,
	startNode: TGraphNode,
	endNode: TGraphNode,
): Promise<void> => {
	for (const node of graph.values()) {
		if (node.traversable) {
			// gCost: расстояние от стартового узла
			node.gCost =
				Math.abs(node.x - startNode.x) + Math.abs(node.y - startNode.y);

			// hCost: эвристическая стоимость до конечного узла (используем манхэттенское расстояние)
			node.hCost = Math.abs(node.x - endNode.x) + Math.abs(node.y - endNode.y);

			// fCost: сумма gCost и hCost
			node.fCost = node.gCost + node.hCost;
		}
	}
};
