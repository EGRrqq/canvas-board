import { Graph, type IGraphData } from "@/aStarAlgorithm";
import type { ConnectionPoint, Point, Rect } from "@/models";

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

const getRectObstacles = (rect: Rect): Point[] => {
	const { position, size } = rect;
	const halfWidth = size.width / 2;
	const halfHeight = size.height / 2;

	const obstacles: Point[] = [];

	for (let x = position.x - halfWidth; x <= position.x + halfWidth; x++) {
		for (let y = position.y - halfHeight; y <= position.y + halfHeight; y++) {
			obstacles.push({ x, y });
		}
	}

	return obstacles;
};

const getRectDimensions = (
	rect1: Rect,
	rect2: Rect,
): { width: number; height: number } => {
	const maxX = Math.max(
		rect1.position.x + rect1.size.width / 2,
		rect2.position.x + rect2.size.width / 2,
	);
	const maxY = Math.max(
		rect1.position.y + rect1.size.height / 2,
		rect2.position.y + rect2.size.height / 2,
	);

	return {
		width: maxX * 2,
		height: maxY * 2,
	};
};
