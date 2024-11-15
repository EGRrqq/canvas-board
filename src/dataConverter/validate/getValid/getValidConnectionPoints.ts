import type { Point, Rect } from "@/models";

export const getValidConnectionPoints = (rect: Rect): Point[] => {
	const { position, size } = rect;
	const halfWidth = size.width / 2;
	const halfHeight = size.height / 2;

	const validPoints: Point[] = [];

	// Верхняя и нижняя грани
	for (let x = position.x - halfWidth; x <= position.x + halfWidth; x++) {
		validPoints.push({ x, y: position.y - halfHeight });
		validPoints.push({ x, y: position.y + halfHeight });
	}

	// Левая и правая грани
	for (let y = position.y - halfHeight; y <= position.y + halfHeight; y++) {
		validPoints.push({ x: position.x - halfWidth, y });
		validPoints.push({ x: position.x + halfWidth, y });
	}

	return validPoints;
};
