import { Draw, type IDraw } from "@/canvas/methods/Draw";
import { type TUpdateSettings, updateSettings } from "./settings";

// Интерфейс для контроллера
export interface TMethods extends IDraw {
	updateSettings: TUpdateSettings;
}

// Контроллерs
export const Methods: TMethods = {
	...Draw,
	updateSettings,
};

// Настройки
export type {
	IDrawGridSettings,
	IDrawPathSettings,
	IDrawRectSettings,
} from "@/canvas/methods/Draw/";
export type { ISettings } from "@/canvas/methods/settings";
