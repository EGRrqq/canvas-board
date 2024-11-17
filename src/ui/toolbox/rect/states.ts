import type { TCanvas } from "@/canvas";
import { Handlers } from "@/ui/toolbox/handler";
import { RectClosures } from "@/ui/toolbox/rect/mouseHandlers";

type TRectToolState = (Board: ReturnType<TCanvas>) => void;
const logType = "rect";

export const activateRect: TRectToolState = (Board) => {
	Board.updateSettings({ css: { cursor: "crosshair" } });
	Handlers.set(Board, RectClosures);
	Board.getCtx().canvas.addEventListener(
		"mousedown",
		Handlers.get(logType).mouseDown,
	);
	Board.getCtx().canvas.addEventListener(
		"mousemove",
		Handlers.get(logType).mouseMove,
	);
	Board.getCtx().canvas.addEventListener(
		"mouseup",
		Handlers.get(logType).mouseUp,
	);

	console.log("runnin");
	deactivateRect(Board);
};

export const deactivateRect: TRectToolState = (Board) => {
	Board.updateSettings({ css: { cursor: "initial" } });

	Board.getCtx().canvas.removeEventListener(
		"mousedown",
		Handlers.get(logType).mouseDown,
	);
	Board.getCtx().canvas.removeEventListener(
		"mousemove",
		Handlers.get(logType).mouseMove,
	);
	Board.getCtx().canvas.removeEventListener(
		"mouseup",
		Handlers.get(logType).mouseUp,
	);
};
