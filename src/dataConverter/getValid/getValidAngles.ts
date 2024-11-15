import type { Point, Rect } from "@/models";

export const getValidAngles = (point: Point, rect: Rect): number[] => {
	const { position, size } = rect;
	const halfWidth = size.width / 2;
	const halfHeight = size.height / 2;

	const isVerticalBoundary =
		point.x === position.x - halfWidth || point.x === position.x + halfWidth;
	const isHorizontalBoundary =
		point.y === position.y - halfHeight || point.y === position.y + halfHeight;

	if (isVerticalBoundary) {
		return [90, 270];
	}
	if (isHorizontalBoundary) {
		return [0, 180];
	}

	return [];
};
