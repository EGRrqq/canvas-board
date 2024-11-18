import { dataConverter } from "@/dataConverter";
import type { Rect } from "@/models";

// Данные для примера

export const legLRect: Rect = {
	position: { x: 250, y: 450 },
	size: { width: 35, height: 175 },
};
export const legRRect: Rect = {
	position: { x: 300, y: 450 },
	size: { width: 35, height: 175 },
};

export const headRect: Rect = {
	position: { x: 275, y: 40 },
	size: { width: 50, height: 50 },
};
export const bodyRect: Rect = {
	position: { x: 275, y: 250 },
	size: { width: 100, height: 175 },
};
export const topRect: Rect = {
	position: { x: 275, y: 110 },
	size: { width: 100, height: 50 },
};

export const leftTCornerRect: Rect = {
	position: { x: 150, y: 140 },
	size: { width: 25, height: 25 },
};
export const rightTCornerRect: Rect = {
	position: { x: 400, y: 140 },
	size: { width: 25, height: 25 },
};

export const leftTopRect: Rect = {
	position: { x: 150, y: 230 },
	size: { width: 50, height: 75 },
};
export const rightTopRect: Rect = {
	position: { x: 400, y: 230 },
	size: { width: 50, height: 75 },
};
export const leftBCornerRect: Rect = {
	position: { x: 150, y: 320 },
	size: { width: 25, height: 25 },
};
export const rightBCornerRect: Rect = {
	position: { x: 400, y: 320 },
	size: { width: 25, height: 25 },
};

// ---
export const leftCornerPathB = await dataConverter({
	rect1: leftTopRect,
	rect2: leftTCornerRect,
	cPoint1: { point: { x: 150, y: 192.5 }, angle: 0 },
	cPoint2: {
		point: { x: 150, y: 152.5 },
		angle: 0,
	},
});

export const leftCornerPathR = await dataConverter({
	rect1: leftTCornerRect,
	rect2: topRect,
	cPoint1: {
		point: { x: 150, y: 127.5 },
		angle: 0,
	},
	cPoint2: { point: { x: 225, y: 110 }, angle: 90 },
});

export const rightCornerPathR = await dataConverter({
	rect1: topRect,
	rect2: rightTCornerRect,
	cPoint1: { angle: 90, point: { x: 325, y: 110 } },
	cPoint2: { angle: 0, point: { x: 399.5, y: 127.5 } },
});

export const rightCornerPathB = await dataConverter({
	rect1: rightTCornerRect,
	rect2: rightTopRect,
	cPoint1: { angle: 0, point: { x: 399.5, y: 152.5 } },
	cPoint2: { angle: 0, point: { x: 399.5, y: 192.5 } },
});

export const leftBottomCornerPathU = await dataConverter({
	rect1: leftTopRect,
	rect2: leftBCornerRect,
	cPoint1: { point: { x: 150, y: 267.5 }, angle: 0 },
	cPoint2: {
		point: { x: 150, y: 307.5 },
		angle: 0,
	},
});

export const rightBottomCornerPathU = await dataConverter({
	rect1: rightTopRect,
	rect2: rightBCornerRect,
	cPoint1: { point: { x: 399.5, y: 267.5 }, angle: 0 },
	cPoint2: {
		point: { x: 399.5, y: 307.5 },
		angle: 0,
	},
});
