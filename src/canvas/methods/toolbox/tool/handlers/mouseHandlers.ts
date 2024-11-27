import { Ctx } from "@/canvas/ctx/index.js";

interface IEvent {
	flag: boolean;
	e: MouseEvent | null;
}

interface IEvents {
	mouseMove: IEvent;
	mouseUp: IEvent;
	mouseDown: IEvent;
}

type TMouseHandler = (e: MouseEvent) => void;
type TGetMouseHandlers = () => IEvents;

const events: IEvents = {
	mouseMove: { flag: false, e: null },
	mouseDown: { flag: false, e: null },
	mouseUp: { flag: false, e: null },
};

const mouseMove: TMouseHandler = (e) => {
	events.mouseMove = {
		flag: true,
		e,
	};
};
const mouseLeave: TMouseHandler = () => {
	events.mouseMove.flag = false;
};
const mouseUp: TMouseHandler = (e) => {
	events.mouseDown.flag = false;

	events.mouseUp = {
		flag: true,
		e,
	};
};
/** @type {TMouseHandler} */
const mouseDown = (e) => {
	events.mouseUp.flag = false;

	events.mouseDown = {
		flag: true,
		e,
	};
};
const contextMenu: TMouseHandler = (e) => {
	e.preventDefault(); // Предотвращаем появление контекстного меню
};

export const setMouseHandlers = () => {
	const canvas = Ctx.getCtx().canvas;

	canvas.addEventListener("mousemove", mouseMove);
	canvas.addEventListener("mouseleave", mouseLeave);
	canvas.addEventListener("mouseup", mouseUp);
	canvas.addEventListener("mousedown", mouseDown);
	canvas.addEventListener("contextmenu", contextMenu);
};

export const getMouseHandlers: TGetMouseHandlers = () => events;
