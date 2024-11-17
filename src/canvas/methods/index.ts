import { Ctx, type ICtx } from "@/canvas/ctx";
import { Draw, type IDraw } from "@/canvas/methods/Draw";
import { type IView, View } from "@/canvas/methods/view";
import { type TUpdateSettings, updateSettings } from "./settings";

// Интерфейс для контроллера
export interface TMethods extends IDraw, IView {
	updateSettings: TUpdateSettings;
	getCtx: ICtx["getCtx"];
}

// Контроллер
export const Methods: TMethods = {
	...Draw,
	...View,
	updateSettings,
	getCtx: Ctx.getCtx,
};

// Настройки
export type {
	IDrawGridSettings,
	IDrawPathSettings,
	IDrawRectSettings,
} from "@/canvas/methods/Draw/";
export type { ISettings } from "@/canvas/methods/settings";
