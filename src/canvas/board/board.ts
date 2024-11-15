import { Ctx } from "@/canvas/ctx";
import { Draw, type IDraw } from "@/canvas/draw";
import { Render } from "@/canvas/render";

export interface IBoardSettings {
	alpha: boolean;
}

type TBoard = (id: string, settings?: Partial<IBoardSettings>) => IDraw;

const defaultSettings: IBoardSettings = {
	alpha: false,
};

export const Board: TBoard = (id, settings) => {
	const s = { ...defaultSettings, ...settings };

	// Необходимо для инициализации
	Ctx.setCtx(id, { alpha: s.alpha });
	Render.clear().scale();

	return Draw;
};
