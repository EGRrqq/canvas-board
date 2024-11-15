import { Ctx } from "@/canvas/ctx";
import { Draw, type IDraw } from "@/canvas/draw";
import { Render } from "@/canvas/render";
import { type TBgColor, setBg } from "./setBg";

export interface IBoardSettings {
	alpha: boolean;
	bgColor: TBgColor;
}

type TBoard = (id: string, settings?: Partial<IBoardSettings>) => IDraw;

const defaultSettings: IBoardSettings = {
	alpha: false,
	bgColor: "#fff",
};

export const Board: TBoard = (id, settings) => {
	const s = { ...defaultSettings, ...settings };

	// Необходимо для инициализации
	Ctx.setCtx(id, { alpha: s.alpha });
	Render.clear().scale();

	// настройка бг
	setBg(s.bgColor);

	return Draw;
};
