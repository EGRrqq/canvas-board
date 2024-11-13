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

	// Проверка на корректность стартовой и конечной точек
	if (!graph[data.start.y] || !graph[data.start.y][data.start.x]) {
		throw new Error(
			`Стартовой точки (${data.start.x}, ${data.start.y}) нет в графе ${data.width}x${data.height}`,
		);
	}
	if (!graph[data.end.y] || !graph[data.end.y][data.end.x]) {
		throw new Error(
			`Конечной точки (${data.end.x}, ${data.end.y}) нет в графе ${data.width}x${data.height}`,
		);
	}

	// Устанавливаем препятствия
	for (const { x, y } of data.obstacles) {
		// Проверка на выход за границы графа
		if (!graph[y]?.[x]) {
			console.warn(
				`Препятствие (${x}, ${y}) вне границ ${data.width}x${data.height} графа`,
			);
			continue; // Пропускаем итерацию, если препятствие вне границ
		}

		// Устанавливаем препятствие
		graph[y][x].traversable = false;

		// Проверка, попадает ли стартовая или конечная точка в препятствия
		if (data.start.x === x && data.start.y === y) {
			throw new Error(
				`Стартовая точка (${data.start.x}, ${data.start.y}) находится на препятствии`,
			);
		}
		if (data.end.x === x && data.end.y === y) {
			throw new Error(
				`Конечная точка (${data.end.x}, ${data.end.y}) находится на препятствии`,
			);
		}
	}

	// Получаем стартовую и конечную точки
	const startNode = graph[data.start.y][data.start.x];
	const endNode = graph[data.end.y][data.end.x];

	// Расчет стоимости узлов
	await costNodes(graph, startNode, endNode);
	// Визуализируем граф, если требуется
	settings?.log && (await log(graph, startNode, endNode));

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

const log = async (
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
