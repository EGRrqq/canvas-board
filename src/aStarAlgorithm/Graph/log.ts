import type { TGraph, TGraphNode } from "@/aStarAlgorithm/models";

export const log = async (
	graph: TGraph,
	startNode: TGraphNode,
	endNode: TGraphNode,
	curNode?: TGraphNode,
): Promise<void> => {
	const visualGraph = graph.map((row) =>
		row.map((node) => {
			const { fSpace, eSpace } = calcSpaces(node);

			if (node === curNode) return `${eSpace}🏃`; // Старт
			if (node === startNode) return `${eSpace}🏁`; // Старт
			if (node === endNode) return `${eSpace}🏆`; // Конец
			if (!node.traversable) return `${eSpace}⬛`; // Непроходимый узел

			// add a white space for a perfect alignment with the emoji
			return `${fSpace}${node.fCost}`;
		}),
	);

	console.log(visualGraph);
};

const calcSpaces = (node: TGraphNode) => {
	const fCostLength = node.fCost.toString().length;
	const fSpace = " ".repeat(4 - fCostLength); // Ensure fSpace is always 3 characters long
	const eSpace = fSpace.length > 1 ? "  " : ""; // Adjust eSpace based on fSpace length

	return { fSpace, eSpace };
};
