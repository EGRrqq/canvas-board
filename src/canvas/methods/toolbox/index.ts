import { getActiveTool, setActiveTool } from "@/canvas/methods/toolbox/tool";

export interface IToolbox {
	setActiveTool: typeof setActiveTool;
	getActiveTool: typeof getActiveTool;
}

export const Toolbox: IToolbox = {
	setActiveTool,
	getActiveTool,
};

export { getDrawingState } from "@/canvas/methods/toolbox/tool";
