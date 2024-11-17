import type { TCanvas } from "@/canvas";
import { activateRect, deactivateRect } from "@/ui/toolbox/rect/states";

type TRectTool = (Board: ReturnType<TCanvas>) => {
	activate: () => void;
	deactivate: () => void;
};

export const rectTool: TRectTool = (Board) => {
	return {
		activate: () => activateRect(Board),
		deactivate: () => deactivateRect(Board),
	};
};
