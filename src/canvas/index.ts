import * as Ctx from "@/canvas/ctx";
import { type IDraw, drawRect } from "@/canvas/draw";
import * as Render from "@/canvas/render";

type ICanvasSettings = {
	scale: boolean;
};
type TCanvas = (id: string, settings?: Partial<ICanvasSettings>) => IDraw;

const defaultSettings: ICanvasSettings = {
	scale: true,
};

export const Canvas: TCanvas = (id, settings = defaultSettings) => {
	// Необходимо для инициализации
	Ctx.setCtx(id);

	// Настройки
	settings.scale ?? Render.clear().scale();

	return { drawRect };
};
