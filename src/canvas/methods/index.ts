import { Draw, type IDraw } from "@/canvas/methods/Draw";
import {
	type TUpdateSettings,
	updateSettings,
} from "@/canvas/methods/settings";
import { Storage } from "@/canvas/methods/storage";
import { type IView, View } from "@/canvas/methods/view";
import { defaultSettings } from "../board/board";
import { Toolbox } from "./toolbox";

type IStorage = typeof Storage;
type IToolbox = typeof Toolbox;

// Интерфейс для контроллера
export interface TMethods extends IDraw, IView, IStorage, IToolbox {
	updateSettings: TUpdateSettings;
	resetSettings: () => IMethods;
}

// Контроллер
export const Methods: TMethods = {
	...Draw,
	...View,
	...Storage,
	...Toolbox,
	updateSettings,
	resetSettings: () => {
		const { alpha, ...canvasSettings } = defaultSettings;
		return updateSettings(canvasSettings);
	},
};
export type IMethods = typeof Methods;

// Настройки
export type { IDrawSettings } from "@/canvas/methods/Draw";
export type { ISettings } from "@/canvas/methods/settings";
