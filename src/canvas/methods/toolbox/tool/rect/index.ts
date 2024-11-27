import { Methods } from "@/canvas/methods";
import type { ITool } from "@/canvas/methods/toolbox/tool/ITools";
import {
	rectDown,
	rectMove,
	rectUp,
	rectValidate,
} from "@/canvas/methods/toolbox/tool/rect/rect";

export const Rect: ITool = {
	init: () => {
		rectMove();
		rectDown();
		rectUp();
		// валидация ВСЕГДА должна быть последней
		rectValidate();

		return Methods;
	},
};
