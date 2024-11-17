import { Ctx } from "@/canvas/ctx";
import { Methods, type TMethods } from "@/canvas/methods";
import type { Point } from "@/models";

export interface IDrawPathSettings {
	strokeStyle: CanvasFillStrokeStyles["strokeStyle"];
	lineWidth: CanvasPathDrawingStyles["lineWidth"];
}
export type TDrawPath = (
	path: Point[],
	settings?: Partial<IDrawPathSettings>,
) => TMethods;

const defaultSettings: IDrawPathSettings = {
	strokeStyle: "#000",
	lineWidth: 0.5,
};

export const drawPath: TDrawPath = (path, settings) => {
	const s = { ...defaultSettings, ...settings };

	Ctx.getCtx().strokeStyle = s.strokeStyle;
	Ctx.getCtx().lineWidth = s.lineWidth;

	Ctx.getCtx().beginPath();
	Ctx.getCtx().moveTo(path[0].x, path[0].y);

	for (let i = 1; i < path.length; i++) {
		Ctx.getCtx().lineTo(path[i].x, path[i].y);
	}

	Ctx.getCtx().stroke();

	return Methods;
};
