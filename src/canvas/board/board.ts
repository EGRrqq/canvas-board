import { Ctx } from "@/canvas/ctx";
import { type ISettings, Methods, type TMethods } from "@/canvas/methods";
import { Handlers } from "@/canvas/methods/toolbox/tool/handlers";

export interface IBoardSettings extends ISettings {
	alpha: boolean;
}

export type TBoard = (
	id: string,
	settings?: Partial<IBoardSettings>,
) => TMethods;

export const defaultSettings: IBoardSettings = {
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
	Handlers.setMouseHandlers();
	Methods.clear().scale().updateSettings(s);

	return Methods;
};
