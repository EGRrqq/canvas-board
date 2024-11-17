import { Ctx, type ICtx } from "@/canvas/ctx";
import { Draw, type IDraw } from "@/canvas/methods/Draw";
import { type TClearCanvas, clear } from "../view/clear";
import { type TUpdateSettings, updateSettings } from "./settings";

// Интерфейс для контроллера
export interface TMethods extends IDraw {
	updateSettings: TUpdateSettings;
	getCtx: ICtx["getCtx"];
	clear: () => TClearCanvas;
}

// Контроллер
export const Methods: TMethods = {
	...Draw,
	updateSettings,
	getCtx: Ctx.getCtx,
	clear: () => clear("Canvas"),
};

// Настройки
export type {
	IDrawGridSettings,
	IDrawPathSettings,
	IDrawRectSettings,
} from "@/canvas/methods/Draw/";
export type { ISettings } from "@/canvas/methods/settings";
