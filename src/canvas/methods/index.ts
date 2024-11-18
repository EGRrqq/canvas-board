import { Ctx, type ICtx } from "@/canvas/ctx";
import { Draw, type IDraw } from "@/canvas/methods/Draw";
import {
	type TUpdateSettings,
	updateSettings,
} from "@/canvas/methods/settings";
import { type IStorage, Storage } from "@/canvas/methods/storage";
import { type IToolbox, Toolbox } from "@/canvas/methods/toolbox";
import { type IView, View } from "@/canvas/methods/view";

// Интерфейс для контроллера
export interface TMethods extends IDraw, IView, IStorage, IToolbox {
	updateSettings: TUpdateSettings;
	getCtx: ICtx["getCtx"];
}

// Контроллер
export const Methods: TMethods = {
	...Draw,
	...View,
	...Storage,
	...Toolbox,
	updateSettings,
	getCtx: Ctx.getCtx,
};

// Настройки
export type { IDrawSettings } from "@/canvas/methods/Draw";
export type { ISettings } from "@/canvas/methods/settings";
