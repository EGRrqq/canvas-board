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

			if (node === curNode) return `${eSpace}🏃`; // Шаг
			if (node === startNode) return `${eSpace}🏁`; // Старт
			if (node === endNode) return `${eSpace}🏆`; // Конец
			if (!node.traversable) return `${eSpace}⬛`; // Непроходимый узел

			return `${fSpace}${node.fCost}`;
		}),
	);

	console.log(visualGraph);
};

// Пробелы нужны для выравнивания логов
// - Чем длиньше число, тем меньше пробелов
// - Эмодзи имеют пробелы по умолчанию, поэтому им нужно меньше
const calcSpaces = (node: TGraphNode) => {
	const fCostLength = node.fCost.toString().length;
	const fSpace = " ".repeat(4 - fCostLength);
	const eSpace = fSpace.length > 1 ? "  " : "";

	return { fSpace, eSpace };
};
