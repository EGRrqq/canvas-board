import type { TGraph, TGraphNode } from "@/aStarAlgorithm/models";

export const costNodes = async (
	graph: TGraph,
	start: TGraphNode,
	end: TGraphNode,
): Promise<void> => {
	for (const row of graph) {
		for (const node of row) {
			if (node.traversable) {
				// gCost: расстояние от стартового узла
				node.gCost = Math.abs(node.x - start.x) + Math.abs(node.y - start.y);

				// hCost: эвристическая стоимость до конечного узла (используем манхэттенское расстояние)
				node.hCost = Math.abs(node.x - end.x) + Math.abs(node.y - end.y);

				// fCost: сумма gCost и hCost
				node.fCost = node.gCost + node.hCost;
			}
		}
	}
};
