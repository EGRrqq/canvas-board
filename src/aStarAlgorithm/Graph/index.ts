import type { Point } from "@/models";

import { costNodes } from "@/aStarAlgorithm/Graph/costNodes";
import { createGraph } from "@/aStarAlgorithm/Graph/createGraph";
import { findPath } from "@/aStarAlgorithm/Graph/findPath";
import { setObstacles } from "@/aStarAlgorithm/Graph/setObstacles";
import { validatePoint } from "@/aStarAlgorithm/Graph/validatePoint";

export interface IGraphData {
	start: Point;
	end: Point;
	obstacles: Point[];
	width: number;
	height: number;
}

type TCalcPath = (data: IGraphData) => Promise<Point[]>;

export const calcPath: TCalcPath = async (data) => {
	// Создание графа
	const graph = createGraph(data);

	// Установка препятствий
	setObstacles(graph, data.obstacles, data.start, data.end);

	// Получение начальную и конечную точек
	const startNode = validatePoint(graph, data.start, "Конечной точки");
	const endNode = validatePoint(graph, data.end, "Конечной точки");

	if (!startNode || !endNode) {
		throw new Error("Стартовая или конечная точка не найдена в графе");
	}

	// Расчет стоимости узлов
	await costNodes(graph, startNode, endNode);

	// Поиск пути
	const path = await findPath(graph, startNode, endNode);

	return path;
};
