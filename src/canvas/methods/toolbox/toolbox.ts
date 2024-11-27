import { type IMethods, Methods } from "@/canvas/methods";
import { Tools } from "@/canvas/methods/toolbox/tool";
import type { ITool, TTools } from "@/canvas/methods/toolbox/tool/ITools";

let activeTool: ITool = Tools.rect;

type TSetActiveTool = (type: keyof TTools) => IMethods;
type TGetActiveTool = () => TTools;

export const setActiveTool: TSetActiveTool = (type) => {
	activeTool = Tools[type];
	activeTool.init();

	return Methods;
};

export const getTools: TGetActiveTool = () => Tools;
