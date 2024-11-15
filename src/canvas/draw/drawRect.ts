import { Ctx } from "@/canvas/ctx";
import { Draw, type IDraw } from "@/canvas/draw";
import type { Rect } from "@/models";

export interface IDrawRectSettings {
	fillStyle: CanvasFillStrokeStyles["fillStyle"];
	// add rect-style settings = "fill" | "stroke"
}

const defaultSettings: IDrawRectSettings = {
	fillStyle: "#007bff",
};

export type TDrawRect = (
	rect: Rect,
	settings?: Partial<IDrawRectSettings>,
) => IDraw;

export const drawRect: TDrawRect = (rect, settings) => {
	const s = { ...defaultSettings, ...settings };

	const { position, size } = rect;
	const halfWidth = size.width / 2;
	const halfHeight = size.height / 2;

	Ctx.getCtx().fillStyle = s.fillStyle;
	Ctx.getCtx().fillRect(
		position.x - halfWidth,
		position.y - halfHeight,
		size.width,
		size.height,
	);

	return Draw;
};
