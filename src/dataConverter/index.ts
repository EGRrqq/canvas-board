import type { ConnectionPoint, Point, Rect } from "@/models";

export const dataConverter = (
	rect1: Rect,
	rect2: Rect,
	cPoint1: ConnectionPoint,
	cPoint2: ConnectionPoint,
): Point[] => {
	// if (!isPointOnRect(cPoint2.point, rect2)) {
	//   throw new Error("Точка подсоединения не лежит на грани прямоугольника.");
	// }
	// if (!isAngleValid(cPoint1, rect1)) {
	//   throw new Error("Угол подсоединения не направлен перпендикулярно и наружу от грани прямоугольника.");
	// }
	//
	// return aStarAlgorithm(rect1, rect2, cPoint1, cPoint2);
};
