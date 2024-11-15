import type { Point, Rect } from "@/models";

export const getRectObstacles = (rect: Rect): Point[] => {
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
