import { Ctx } from "@/canvas/ctx";
import { Draw, type IDraw } from "@/canvas/draw";
import { Render } from "@/canvas/render";

// place for all settings reexport

// move canvas out from index.ts
type ICanvasSettings = {};
type TCanvas = (id: string, settings?: Partial<ICanvasSettings>) => IDraw;

const defaultSettings: ICanvasSettings = {};

export const Canvas: TCanvas = (id, settings = defaultSettings) => {
	// Необходимо для инициализации
	Ctx.setCtx(id);
	Render.clear().scale();

	return Draw;
};
