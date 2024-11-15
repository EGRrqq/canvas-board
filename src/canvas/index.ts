// make Ctx with same pattern as a Render
import * as Ctx from "@/canvas/ctx";
import { type IDraw, drawRect } from "@/canvas/draw";
import * as Render from "@/canvas/render";

type TCanvas = (id: string) => IDraw;

export const Canvas: TCanvas = (id) => {
	// init
	Ctx.setCtx(id);

	// settings
	Render.clear().scale();

	return { drawRect };
};
