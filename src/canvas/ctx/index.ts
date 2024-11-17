import {
	type TGetCtx,
	type TSetCtx,
	getCtx,
	setCtx,
} from "@/canvas/ctx/context";

// Интерфейс для контроллера
export interface ICtx {
	setCtx: TSetCtx;
	getCtx: TGetCtx;
}

// Контроллер
export const Ctx: ICtx = { getCtx, setCtx };

// Настройки
export type { ICtxSettings } from "@/canvas/ctx/context";
