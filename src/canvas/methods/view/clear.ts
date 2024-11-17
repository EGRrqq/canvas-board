import { Ctx } from "@/canvas/ctx";
import { Methods, type TMethods } from "@/canvas/methods";

export type TClear = () => TMethods;

export const clear: TClear = () => {
	Ctx.getCtx().clearRect(
		0,
		0,
		Ctx.getCtx().canvas.width,
		Ctx.getCtx().canvas.height,
	);

	return Methods;
};
