import { Ctx } from "@/canvas/ctx";
import { drawRect, type IDraw } from "@/canvas/draw";

type TCanvas = (id: string) => IDraw;

export const Canvas: TCanvas = (id) => {
	Ctx.setCtx(id);

	return { drawRect };
};
