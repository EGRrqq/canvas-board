import type { TCanvas } from "@/canvas";
import { Handlers } from "@/ui/toolbox/handler";
import { RectClosures } from "@/ui/toolbox/rect/mouseHandlers";

type TRectToolState = (Board: ReturnType<TCanvas>) => void;
const logType = "rect";

export const activateRect: TRectToolState = (Board) => {
	Handlers.set(Board, RectClosures);
	Board.updateSettings({ css: { cursor: "crosshair" } });

	const canvasElem = Board.getCtx().canvas;
	canvasElem.addEventListener("mousedown", Handlers.get(logType).mouseDown);
	canvasElem.addEventListener("mousemove", Handlers.get(logType).mouseMove);
	canvasElem.addEventListener("mouseup", Handlers.get(logType).mouseUp);
};

export const deactivateRect: TRectToolState = (Board) => {
	Board.updateSettings({ css: { cursor: "initial" } });

	const canvasElem = Board.getCtx().canvas;
	canvasElem.removeEventListener("mousedown", Handlers.get(logType).mouseDown);
	canvasElem.removeEventListener("mousemove", Handlers.get(logType).mouseMove);
	canvasElem.removeEventListener("mouseup", Handlers.get(logType).mouseUp);
};
