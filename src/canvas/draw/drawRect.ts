import * as Ctx from "@/canvas/ctx";
import type { IDraw } from "@/canvas/draw";
import type { Rect } from "@/models";

export type TDrawRect = (rect: Rect) => IDraw;

export const drawRect: TDrawRect = (rect) => {
	const { position, size } = rect;
	const halfWidth = size.width / 2;
	const halfHeight = size.height / 2;

	Ctx.getCtx().fillStyle = "#007bff";
	Ctx.getCtx().fillRect(
		position.x - halfWidth,
		position.y - halfHeight,
		size.width,
		size.height,
	);

	return { drawRect };
};
