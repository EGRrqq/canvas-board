import { Graph, type IGraphData } from "@/aStarAlgorithm";
import type { ConnectionPoint, Point, Rect } from "@/models";

import { getRectDimensions } from "@/dataConverter/getRectDimensions";
import { getRectObstacles } from "@/dataConverter/getRectObstacles";

export const dataConverter = async (
	rect1: Rect,
	rect2: Rect,
	cPoint1: ConnectionPoint,
	cPoint2: ConnectionPoint,
): Promise<Point[]> => {
	// design proto
	/*
     if (!isPointOnRect(cPoint2.point, rect2)) {
      throw new Error("Точка подсоединения не лежит на грани прямоугольника.");
     }
     if (!isAngleValid(cPoint1, rect1)) {
      throw new Error("Угол подсоединения не направлен перпендикулярно и наружу от грани прямоугольника.");
     }

     return aStarAlgorithm(rect1, rect2, cPoint1, cPoint2);
	*/
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
