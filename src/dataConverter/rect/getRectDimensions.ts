import type { Rect } from "@/models";

export const getRectDimensions = (
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
