import { Draw } from "@/canvas/draw";

export type TBgColor = CanvasFillStrokeStyles["strokeStyle"];
type TSetBg = (color: TBgColor) => void;

export const setBg: TSetBg = (color) => {
	Draw.drawRect(
		{
			position: { x: 0, y: 0 },
			size: { width: window.innerWidth * 2, height: window.innerHeight * 2 },
		},
		{ fillStyle: color },
	);
};
