import type { TGraph, TGraphNode } from "@/aStarAlgorithm/models";

export const log = async (
	graph: TGraph,
	startNode: TGraphNode,
	endNode: TGraphNode,
	curNode?: TGraphNode,
): Promise<void> => {
	const visualGraph = graph.map((row) =>
		row.map((node) => {
			if (node === curNode) return "🏃"; // Старт
			if (node === startNode) return "🏁"; // Старт
			if (node === endNode) return "🏆"; // Конец
			if (!node.traversable) return "⬛"; // Непроходимый узел

			// add a white space for a perfect alignment with the emoji
			return ` ${node.gCost}`;
		}),
	);

	console.log(visualGraph);
};
