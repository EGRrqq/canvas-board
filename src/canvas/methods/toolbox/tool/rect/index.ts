import { Methods } from "@/canvas/methods";
import type { ITool } from "@/canvas/methods/toolbox/tool/ITools";
import { rectHover } from "@/canvas/methods/toolbox/tool/rect/rect";

export const Rect: ITool = {
	init: () => {
		rectHover();

		return Methods;
	},
};
