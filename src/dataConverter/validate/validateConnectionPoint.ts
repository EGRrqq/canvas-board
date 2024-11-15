import type { ConnectionPoint, Rect } from "@/models";
import { getValidAngles, getValidConnectionPoints } from "./getValid";
import { isAngleCorrect, isPointOnRectBoundary } from "./isValid";

export const validateConnectionPoint = (
	cPoint: ConnectionPoint,
	rect: Rect,
	pointName: string,
): void => {
	if (!isPointOnRectBoundary(cPoint.point, rect)) {
		const validPoints = getValidConnectionPoints(rect);
		throw new Error(
			`${pointName} не лежит на грани прямоугольника. Допустимые точки: ${JSON.stringify(
				validPoints,
			)}`,
		);
	}
	if (!isAngleCorrect(cPoint.angle, cPoint.point, rect)) {
		const validAngles = getValidAngles(cPoint.point, rect);
		throw new Error(
			`Угол ${pointName} не перпендикулярен грани прямоугольника. Допустимые углы: ${JSON.stringify(
				validAngles,
			)}`,
		);
	}
};
