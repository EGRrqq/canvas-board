import type { Point, Rect } from "@/models";

export const isPointOnRectBoundary = (point: Point, rect: Rect): boolean => {
	const { x, y } = point;
	const { position, size } = rect;
	const halfWidth = size.width / 2;
	const halfHeight = size.height / 2;

	return (
		((x === position.x - halfWidth || x === position.x + halfWidth) &&
			y >= position.y - halfHeight &&
			y <= position.y + halfHeight) ||
		((y === position.y - halfHeight || y === position.y + halfHeight) &&
			x >= position.x - halfWidth &&
			x <= position.x + halfWidth)
	);
};
