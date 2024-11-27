import { Methods } from "@/canvas/methods";
import type { ITool } from "@/canvas/methods/toolbox/tool/ITools";

export const Line: ITool = {
	init: () => {
		return Methods;
	},
};
