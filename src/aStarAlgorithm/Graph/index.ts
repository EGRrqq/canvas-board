import type { TGraph, TGraphNode } from "@/aStarAlgorithm/models";
import type { Point } from "@/models";

import { costNodes } from "@/aStarAlgorithm/Graph/costNodes";
import { log } from "@/aStarAlgorithm/Graph/log";
import { findPath } from "./findPath";

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
): Promise<Point[]> => {
	// Создаем граф
	const graph = createGraph(data);

	// Проверка на корректность стартовой и конечной точек
	checkPoint(graph, data.start, "Стартовая точка");
	checkPoint(graph, data.end, "Конечная точка");

	// Устанавливаем препятствия
	setObstacles(graph, data.obstacles, data.start, data.end);

	// Получаем стартовую и конечную точки
	const startNode = graph[data.start.y][data.start.x];
	const endNode = graph[data.end.y][data.end.x];

	// Расчет стоимости узлов
	await costNodes(graph, startNode, endNode);

	// Визуализируем граф, если требуется
	settings?.log && (await log(graph, startNode, endNode));

	// Запускаем поиск пути
	const path = findPath(graph, startNode, endNode);
	return path;
};

const createGraph = (data: IGraphData): TGraph =>
	Array.from({ length: data.height }, (_, y) =>
		Array.from({ length: data.width }, (_, x) => ({
			x,
			y,
			traversable: true,
			gCost: 0,
			hCost: 0,
			fCost: 0,
		})),
	);

const checkPoint = (graph: TGraph, point: Point, pointName: string): void => {
	if (!graph[point.y] || !graph[point.y][point.x]) {
		throw new Error(`${pointName} (${point.x}, ${point.y}) нет в графе`);
	}
};

const setObstacles = (
	graph: TGraph,
	obstacles: Point[],
	start: Point,
	end: Point,
): void => {
	for (const { x, y } of obstacles) {
		// Проверка на выход за границы графа
		if (!graph[y]?.[x]) {
			console.warn(`Препятствие (${x}, ${y}) вне границ графа`);
			continue; // Пропускаем итерацию, если препятствие вне границ
		}

		// Устанавливаем препятствие
		graph[y][x].traversable = false;

		// Проверка, попадает ли стартовая или конечная точка в препятствия
		if (start.x === x && start.y === y) {
			throw new Error(
				`Стартовая точка (${start.x}, ${start.y}) находится на препятствии`,
			);
		}
		if (end.x === x && end.y === y) {
			throw new Error(
				`Конечная точка (${end.x}, ${end.y}) находится на препятствии`,
			);
		}
	}
};
