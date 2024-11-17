import { Ctx } from "@/canvas/ctx";
import { type ISettings, Methods, type TMethods } from "@/canvas/methods";
import { View } from "canvas/methods/view";

export interface IBoardSettings extends ISettings {
	alpha: boolean;
}

export type TBoard = (
	id: string,
	settings?: Partial<IBoardSettings>,
) => TMethods;

const defaultSettings: IBoardSettings = {
	alpha: false,
	bgColor: "#fff",
	css: {
		cursor: "initial",
	},
};

export const Board: TBoard = (id, settings) => {
	const { alpha, ...s } = { ...defaultSettings, ...settings };

	// Необходимо для инициализации
	Ctx.setCtx(id, { alpha });
	View.clear().scale();

	// применяем настройки
	Methods.updateSettings(s);

	return Methods;
};
