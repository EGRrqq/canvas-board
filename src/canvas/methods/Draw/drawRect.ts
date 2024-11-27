import { Ctx } from "@/canvas/ctx";
import { Methods } from "@/canvas/methods";
import type { TDraw } from "@/canvas/methods/Draw";
import type { Rect } from "@/models";

export interface IDrawRectSettings {
	fillStyle: CanvasFillStrokeStyles["fillStyle"];
	strokeStyle: CanvasFillStrokeStyles["strokeStyle"];
	style: "fill" | "stroke" | "fillAndStroke";
}

const defaultSettings: IDrawRectSettings = {
	fillStyle: "#007bff",
	strokeStyle: "black",
	style: "fill",
};

export interface IDrawRectData {
	rect: Rect;
}
export type TDrawRect = TDraw<IDrawRectData, IDrawRectSettings>;

export const drawRect: TDrawRect = ({ rect }, settings) => {
	const s = { ...defaultSettings, ...settings };

	const { position, size } = rect;
	const halfWidth = size.width / 2;
	const halfHeight = size.height / 2;
	const x = position.x - halfWidth;
	const y = position.y - halfHeight;

	if (s.style === "fill" || s.style === "fillAndStroke") {
		Ctx.getCtx().fillStyle = s.fillStyle;
		Ctx.getCtx().fillRect(x, y, size.width, size.height);
	}

	if (s.style === "stroke" || s.style === "fillAndStroke") {
		Ctx.getCtx().strokeStyle = s.strokeStyle; // Use default if not provided
		Ctx.getCtx().strokeRect(x, y, size.width, size.height);
	}

	return Methods;
};
