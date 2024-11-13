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

	// Расчет стоимости узлов
	await costNodes(graph, startNode, endNode);
	// Визуализируем граф, если требуется
	settings?.log && (await visualize(graph, startNode, endNode));

	return graph;
};

const costNodes = async (
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

			return `${node.fCost}`;
		}),
	);

	console.log(visualGraph);
};
