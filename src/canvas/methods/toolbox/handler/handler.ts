import type { TDrawType } from "@/canvas/methods/Draw";

export type TMouseHandler = (e: MouseEvent) => void;

export interface IHandlers {
	mouseDown: TMouseHandler;
	mouseMove: TMouseHandler;
	mouseUp: TMouseHandler;
}

type TGetHandlers = (type: TDrawType) => IHandlers;
type TSetHandlers = (handlers: IHandlers) => void;

let handlers: ReturnType<TGetHandlers> | null = null;

export const get: TGetHandlers = (type) => {
	if (!handlers)
		throw Error(`Хендлеры для инструмента '${type}' не определены`);

	return {
		mouseDown: handlers.mouseDown,
		mouseMove: handlers.mouseMove,
		mouseUp: handlers.mouseUp,
	};
};
export const set: TSetHandlers = (c) => {
	handlers = {
		mouseDown: c.mouseDown,
		mouseMove: c.mouseMove,
		mouseUp: c.mouseUp,
	};
};
