import type { Point } from "@/models";

import { costNodes, createGraph, setObstacles } from "@/aStarAlgorithm/Graph";
import { findPath } from "@/aStarAlgorithm/iteration";
import { roundPoint, roundPoints } from "@/aStarAlgorithm/utils";
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
	// Округление координат стартовой и конечной точек
	const roundedStart = roundPoint(data.start);
	const roundedEnd = roundPoint(data.end);

	// Округление координат препятствий
	const roundedObstacles = roundPoints(data.obstacles);

	// Создаем граф
	const graph = createGraph({
		start: roundedStart,
		end: roundedEnd,
		obstacles: roundedObstacles,
		width: data.width,
		height: data.height,
	});

	// Установка препятствий
	setObstacles(graph, roundedObstacles, roundedStart, roundedEnd);

	// Получение начальную и конечную точек
	const startNode = validatePoint(graph, roundedStart, "Начальной точки");
	const endNode = validatePoint(graph, roundedEnd, "Конечной точки");

	// Расчет стоимости узлов
	await costNodes(graph, startNode, endNode);

	// Поиск пути
	const path = await findPath(graph, startNode, endNode);

	return path;
};
