import {
	activateRect,
	deactivateRect,
} from "@/canvas/methods/toolbox/rect/states";

export interface IRectTool {
	activate: typeof activateRect;
	deactivate: typeof deactivateRect;
}

export const rectTool: IRectTool = {
	activate: activateRect,
	deactivate: deactivateRect,
};
