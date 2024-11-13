import type { GraphNode } from "@/aStarAlgorithm/TNode";

type Graph = GraphNode[][];

export const loadGraph = async (
	width: number,
	height: number,
	obstacles: [number, number][],
): Promise<Graph> => {
	const graph: Graph = Array.from({ length: height }, (_, y) =>
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
	graph: Graph,
	start: GraphNode,
	end: GraphNode,
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
