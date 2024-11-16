import type { Rect } from "@/models";

export const isRectsIntersect = (rect1: Rect, rect2: Rect): boolean => {
	const rect1Left = rect1.position.x - rect1.size.width / 2;
	const rect1Right = rect1.position.x + rect1.size.width / 2;
	const rect1Top = rect1.position.y - rect1.size.height / 2;
	const rect1Bottom = rect1.position.y + rect1.size.height / 2;

	const rect2Left = rect2.position.x - rect2.size.width / 2;
	const rect2Right = rect2.position.x + rect2.size.width / 2;
	const rect2Top = rect2.position.y - rect2.size.height / 2;
	const rect2Bottom = rect2.position.y + rect2.size.height / 2;

	return (
		rect1Left < rect2Right &&
		rect1Right > rect2Left &&
		rect1Top < rect2Bottom &&
		rect1Bottom > rect2Top
	);
};
