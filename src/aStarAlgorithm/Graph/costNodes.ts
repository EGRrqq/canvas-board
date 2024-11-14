import type { TGraph, TGraphNode } from "@/aStarAlgorithm/models";

export const costNodes = async (
	graph: TGraph,
	startNode: TGraphNode,
	endNode: TGraphNode,
): Promise<void> => {
	for (const row of graph) {
		for (const node of row) {
			if (node.traversable) {
				// gCost: расстояние от стартового узла
				node.gCost =
					Math.abs(node.x - startNode.x) + Math.abs(node.y - startNode.y);

				// hCost: эвристическая стоимость до конечного узла (используем манхэттенское расстояние)
				node.hCost =
					Math.abs(node.x - endNode.x) + Math.abs(node.y - endNode.y);

				// fCost: сумма gCost и hCost
				node.fCost = node.gCost + node.hCost;
			}
		}
	}
};
