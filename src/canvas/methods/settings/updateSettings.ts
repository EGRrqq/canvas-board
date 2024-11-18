import { Ctx } from "@/canvas/ctx";
import { Methods, type TMethods } from "@/canvas/methods";
import { type TBgColor, setBg } from "@/canvas/methods/settings/setBg";

export interface ISettings {
	bgColor: TBgColor;
	css: {
		cursor: CSSStyleDeclaration["cursor"];
	};
}

export type TUpdateSettings = (settings: Partial<ISettings>) => TMethods;

const updateCss = (value: ISettings["css"]) => {
	for (const [key, val] of Object.entries(value)) {
		const canvasStyle = Ctx.getCtx().canvas.style;
		if (!(key in canvasStyle))
			throw new Error(
				`Свойство CSS "${key}" не поддерживается. Список поддерживаемых свойств:\n ${JSON.stringify(Object.keys(canvasStyle))}`,
			);

		(canvasStyle[key as keyof CSSStyleDeclaration] as string) = val;
	}
};

const updateFunctions: {
	[K in keyof ISettings]: (value: ISettings[K]) => void;
} = {
	bgColor: setBg,
	css: updateCss,
};

export const updateSettings: TUpdateSettings = (s) => {
	for (const key in s) {
		if (!(key in updateFunctions))
			throw new Error(
				`Настройка "${key}" не поддерживается. Список доступных настроек: ${JSON.stringify(Object.keys(updateFunctions))}`,
			);

		updateFunctions[key as keyof ISettings](s[key]!);
	}

	return Methods;
};
