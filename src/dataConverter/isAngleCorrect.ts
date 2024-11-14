import type { Point, Rect } from "@/models";

export const isAngleCorrect = (
	angle: number,
	point: Point,
	rect: Rect,
): boolean => {
	const { position, size } = rect;
	const halfWidth = size.width / 2;
	const halfHeight = size.height / 2;

	const isVerticalBoundary =
		point.x === position.x - halfWidth || point.x === position.x + halfWidth;
	const isHorizontalBoundary =
		point.y === position.y - halfHeight || point.y === position.y + halfHeight;

	if (isVerticalBoundary) {
		return angle === 90 || angle === 270;
	}
	if (isHorizontalBoundary) {
		return angle === 0 || angle === 180;
	}

	return false;
};
