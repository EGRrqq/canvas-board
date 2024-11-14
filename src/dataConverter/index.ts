import { Graph, type IGraphData } from "@/aStarAlgorithm";
import type { ConnectionPoint, Point, Rect } from "@/models";

import { getRectDimensions } from "@/dataConverter/getRectDimensions";
import { getRectObstacles } from "@/dataConverter/getRectObstacles";
import { isAngleCorrect } from "@/dataConverter/isAngleCorrect";
import { isPointOnRectBoundary } from "@/dataConverter/isPointOnRectBoundary";

export const dataConverter = async (
	rect1: Rect,
	rect2: Rect,
	cPoint1: ConnectionPoint,
	cPoint2: ConnectionPoint,
): Promise<Point[]> => {
	// Проверка корректности точек подсоединения
	validateConnectionPoint(cPoint1, rect1, "Точка подсоединения 1");
	validateConnectionPoint(cPoint2, rect2, "Точка подсоединения 2");

	// Определение размеров графа
	const graphDimensions = getRectDimensions(rect1, rect2);

	// Создание графа
	const graphData: IGraphData = {
		start: cPoint1.point,
		end: cPoint2.point,
		obstacles: getRectObstacles(rect1).concat(getRectObstacles(rect2)),
		width: graphDimensions.width,
		height: graphDimensions.height,
	};

	// Вычисление пути
	const path = await Graph.calcPath(graphData, { log: true });

	return path;
};

const validateConnectionPoint = (
	cPoint: ConnectionPoint,
	rect: Rect,
	pointName: string,
): void => {
	if (!isPointOnRectBoundary(cPoint.point, rect)) {
		throw new Error(`${pointName} не лежит на грани прямоугольника`);
	}
	if (!isAngleCorrect(cPoint.angle, cPoint.point, rect)) {
		throw new Error(
			`Угол ${pointName} не перпендикулярен грани прямоугольника`,
		);
	}
};
