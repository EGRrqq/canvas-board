import type { TGraph, TGraphNode } from "@/aStarAlgorithm/models";
import type { Point } from "@/models";

export interface IGraphData {
	start: Point;
	end: Point;
	obstacles: Point[];
	width: number;
	height: number;
}

export interface IGraphSettings {
	log: boolean;
}

export const init = async (
	data: IGraphData,
	settings?: Partial<IGraphSettings>,
): Promise<TGraph> => {
	const graph: TGraph = Array.from({ length: data.height }, (_, y) =>
		Array.from({ length: data.width }, (_, x) => ({
			x,
			y,
			traversable: true,
			gCost: 0,
			hCost: 0,
			fCost: 0,
		})),
	);

	// Устанавливаем препятствия
	for (const { x, y } of data.obstacles) {
		if (graph[y]?.[x]) {
			graph[y][x].traversable = false;
		}
	}

	// Получаем стартовую и конечную точки
	const startNode = graph[data.start.y][data.start.x];
	const endNode = graph[data.end.y][data.end.x];

	// Визуализируем граф, если требуется
	settings?.log && (await visualize(graph, startNode, endNode));

	return graph;
};

const visualize = async (
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
