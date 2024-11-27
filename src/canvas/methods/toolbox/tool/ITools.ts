import type { IMethods } from "@/canvas/methods";
import type { Tools } from "@/canvas/methods/toolbox/tool";

export type TTools = typeof Tools;

export interface ITool {
	init: () => IMethods;
}
