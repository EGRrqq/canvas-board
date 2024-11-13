import type { TGraph, TGraphNode } from "@/aStarAlgorithm/models";

export const loadGraph = async (
	width: number,
	height: number,
	obstacles: [number, number][],
): Promise<TGraph> => {
	const graph: TGraph = Array.from({ length: height }, (_, y) =>
		Array.from({ length: width }, (_, x) => ({
			x,
			y,
			traversable: true,
			gCost: 0,
			hCost: 0,
			fCost: 0,
		})),
	);

	// Устанавливаем препятствия
	for (const [x, y] of obstacles) {
		if (graph[y]?.[x]) {
			graph[y][x].traversable = false;
		}
	}

	return graph;
};

export const visualizeGraph = async (
	graph: TGraph,
	start: TGraphNode,
	end: TGraphNode,
): Promise<void> => {
	const visualGraph = graph.map((row) =>
		row.map((node) => {
			if (node === start) return "S"; // Старт
			if (node === end) return "E"; // Конец
			if (!node.traversable) return "x"; // Непроходимый узел
			return ""; // Проходимый узел
		}),
	);

	console.log(visualGraph);
};
