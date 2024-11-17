import type { TCanvas } from "@/canvas";
import { activateRect, deactivateRect } from "@/ui/toolbox/rect/states";

type TRectTool = (Board: ReturnType<TCanvas>) => {
	activate: () => void;
	deactivate: () => void;
};

export const rectTool: TRectTool = (Board) => {
	// design proto:
	// - Canvas: Cursor point  -> DONE
	// - CanvasEvent: (drag, drawRect) -> DONE
	// - - on event success return IDrawingItem
	return {
		activate: () => activateRect(Board),
		deactivate: () => deactivateRect(Board),
	};
};
