import type { TGraph, TGraphNode } from "@/aStarAlgorithm/models";

export const log = async (
	graph: TGraph,
	start: TGraphNode,
	end: TGraphNode,
): Promise<void> => {
	const visualGraph = graph.map((row) =>
		row.map((node) => {
			if (node === start) return "S"; // Старт
			if (node === end) return "E"; // Конец
			if (!node.traversable) return "x"; // Непроходимый узел

			return `${node.fCost}`;
		}),
	);

	console.log(visualGraph);
};
