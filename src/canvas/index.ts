import { Ctx } from "@/canvas/ctx";
import { Draw, type IDraw } from "@/canvas/draw";
import { Render } from "@/canvas/render";

// place for all settings reexport

type ICanvasSettings = {
	alpha: boolean;
};

type TCanvas = (id: string, settings?: Partial<ICanvasSettings>) => IDraw;

const defaultSettings: ICanvasSettings = {
	alpha: false,
};

// move canvas out from index.ts
export const Canvas: TCanvas = (id, settings) => {
	const s = { ...defaultSettings, ...settings };
	// Необходимо для инициализации
	Ctx.setCtx(id, { alpha: s.alpha });
	Render.clear().scale();

	return Draw;
};
