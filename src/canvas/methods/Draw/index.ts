import type { TMethods } from "@/canvas/methods";
import {
	type IDrawGridData,
	type IDrawGridSettings,
	type TDrawGrid,
	drawGrid,
} from "@/canvas/methods/Draw/drawGrid";
import {
	type IDrawLineData,
	type IDrawLineSettings,
	type TDrawLine,
	drawLine,
} from "@/canvas/methods/Draw/drawLine";
import {
	type IDrawRectData,
	type IDrawRectSettings,
	type TDrawRect,
	drawRect,
} from "@/canvas/methods/Draw/drawRect";

export type TDraw<D, S> = (data: D, settings?: Partial<S>) => TMethods;
// Интерфейс для контроллера
export interface IDraw {
	rect: TDrawRect;
	grid: TDrawGrid;
	line: TDrawLine;
}

// Интерфейс для настроек
export interface IDrawSettings {
	rect: IDrawRectSettings;
	grid: IDrawGridSettings;
	line: IDrawLineSettings;
}

// Интерфейс для данных
export interface IDrawData {
	rect: IDrawRectData;
	grid: IDrawGridData;
	line: IDrawLineData;
}

// Ключи контроллера
export type TDrawType = keyof IDraw;

// Данные инструмента
export interface IDrawTool<TT extends TDrawType> {
	type: TT;
	settings: IDrawSettings[TT];
	data: IDrawData[TT];
}

// Контроллер
export const Draw: IDraw = {
	rect: drawRect,
	line: drawLine,
	grid: drawGrid,
};

// Настройки
export type { IDrawGridSettings } from "@/canvas/methods/Draw/drawGrid";
export type { IDrawRectSettings } from "@/canvas/methods/Draw/drawRect";
export type { IDrawLineSettings } from "@/canvas/methods/Draw/drawLine";
