import type { TGraph, TGraphNode } from "@/aStarAlgorithm/models";

export const log = async (
	graph: TGraph,
	startNode: TGraphNode,
	endNode: TGraphNode,
): Promise<void> => {
	const visualGraph = graph.map((row) =>
		row.map((node) => {
			if (node === startNode) return "S"; // Старт
			if (node === endNode) return "E"; // Конец
			if (!node.traversable) return "x"; // Непроходимый узел

			return `${node.fCost}`;
		}),
	);

	console.log(visualGraph);
};
