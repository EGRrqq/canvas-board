import { Ctx } from "@/canvas/ctx";
import { type TScale, scale } from "@/canvas/render/scale";

export type TClear = () => { scale: TScale };

export const clear: TClear = () => {
	Ctx.getCtx().clearRect(
		0,
		0,
		Ctx.getCtx().canvas.width,
		Ctx.getCtx().canvas.height,
	);

	return { scale };
};
