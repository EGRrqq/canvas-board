import { Ctx } from "@/canvas/ctx";
import { Methods, type TMethods } from "@/canvas/methods";
import { Handlers } from "@/canvas/methods/toolbox/handler";
import { RectHandlers } from "@/canvas/methods/toolbox/rect/mouseHandlers";
import { updateSettings } from "../../settings";

type TRectToolState = () => TMethods;
const logType = "rect";

export const activateRect: TRectToolState = () => {
	Handlers.set(RectHandlers);
	updateSettings({ css: { cursor: "crosshair" } });

	const canvasElem = Ctx.getCtx().canvas;
	canvasElem.addEventListener("mousedown", Handlers.get(logType).mouseDown);
	canvasElem.addEventListener("mousemove", Handlers.get(logType).mouseMove);
	canvasElem.addEventListener("mouseup", Handlers.get(logType).mouseUp);

	return Methods;
};

export const deactivateRect: TRectToolState = () => {
	updateSettings({ css: { cursor: "initial" } });

	const canvasElem = Ctx.getCtx().canvas;
	canvasElem.removeEventListener("mousedown", Handlers.get(logType).mouseDown);
	canvasElem.removeEventListener("mousemove", Handlers.get(logType).mouseMove);
	canvasElem.removeEventListener("mouseup", Handlers.get(logType).mouseUp);

	return Methods;
};
