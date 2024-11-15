import {
	getValidAngles,
	getValidConnectionPoints,
} from "@/dataConverter/validate/getValid";
import {
	isAngleCorrect,
	isPointOnRectBoundary,
	isRect,
} from "@/dataConverter/validate/isValid";
import type { ConnectionPoint, Rect } from "@/models";

export const validateConnectionPoint = (
	cPoint: ConnectionPoint,
	rect: Rect,
	pointName: string,
): void => {
	if (!isRect(rect)) {
		throw new Error(
			`Прямоугольник имеет нулевые размеры.\nТекущие размеры: ширина = ${rect.size.width}, высота = ${rect.size.height}`,
		);
	}

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
