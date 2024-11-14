import type { Point } from "@/models";

import { checkPoint } from "@/aStarAlgorithm/Graph/checkPoint";
import { costNodes } from "@/aStarAlgorithm/Graph/costNodes";
import { createGraph } from "@/aStarAlgorithm/Graph/createGraph";
import { findPath } from "@/aStarAlgorithm/Graph/findPath";
import { log } from "@/aStarAlgorithm/Graph/log";
import { setObstacles } from "@/aStarAlgorithm/Graph/setObstacles";

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

export const calcPath = async (
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

	// Запускаем поиск пути
	const path = await findPath(graph, startNode, endNode);

	// Логируем граф, если требуется
	settings?.log &&
		path.map(
			async ({ x, y }) => await log(graph, startNode, endNode, graph[y][x]),
		);

	return path;
};
