import type { TCanvas } from "@/canvas";
import type { TToolType } from "@/models/ui/IDrawingItem";

type TMouseHandler = (e: MouseEvent) => void;
export type TMouseHandlerClosure = (
	board: ReturnType<TCanvas>,
) => TMouseHandler;

interface IClosures {
	mouseDownClosure: TMouseHandlerClosure;
	mouseMoveClosure: TMouseHandlerClosure;
	mouseUpClosure: TMouseHandlerClosure;
}

type TGetHandlers = (type: TToolType) => {
	mouseDown: TMouseHandler;
	mouseMove: TMouseHandler;
	mouseUp: TMouseHandler;
};
type TSetHandlers = (Board: ReturnType<TCanvas>, closures: IClosures) => void;

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
export const set: TSetHandlers = (brd, c) => {
	handlers = {
		mouseDown: c.mouseDownClosure(brd),
		mouseMove: c.mouseMoveClosure(brd),
		mouseUp: c.mouseUpClosure(brd),
	};
};
