import { Methods } from "@/canvas/methods";
import type { ITool } from "@/canvas/methods/toolbox/tool/ITools";
import {
	lineDown,
	lineMove,
	lineUp,
	lineValidate,
} from "@/canvas/methods/toolbox/tool/line/line";

export const Line: ITool = {
	init: () => {
		lineMove();
		lineDown();
		lineUp();
		// валидация ВСЕГДА должна быть последней
		lineValidate();

		return Methods;
	},
};
