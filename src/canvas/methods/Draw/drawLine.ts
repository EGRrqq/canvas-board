import { Ctx } from "@/canvas/ctx";
import { Methods } from "@/canvas/methods";
import type { TDraw } from "@/canvas/methods/Draw";
import type { Point } from "@/models";

export interface IDrawLineSettings {
	strokeStyle: CanvasFillStrokeStyles["strokeStyle"];
	lineWidth: CanvasPathDrawingStyles["lineWidth"];
}
export interface IDrawLineData {
	path: Point[];
}
export type TDrawLine = TDraw<IDrawLineData, IDrawLineSettings>;

const defaultSettings: IDrawLineSettings = {
	strokeStyle: "#000",
	lineWidth: 0.5,
};

export const drawLine: TDrawLine = ({ path }, settings) => {
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
