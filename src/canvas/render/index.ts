import { type TClear, clear } from "@/canvas/render/clear";
import { type TScale, scale } from "@/canvas/render/scale";

interface IRender {
	scale: TScale;
	clear: TClear;
}

export const Render: IRender = { clear, scale };
