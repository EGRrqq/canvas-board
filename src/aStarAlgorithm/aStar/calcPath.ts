import type { Point } from "@/models";

import { costNodes, createGraph, setObstacles } from "@/aStarAlgorithm/Graph";
import { findPath } from "@/aStarAlgorithm/iteration";
import { validatePoint } from "@/aStarAlgorithm/validate";

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
