import { Ctx } from "@/canvas/ctx";
import { Methods, type TMethods } from "@/canvas/methods";
import { type TScale, scale } from "@/canvas/view/scale";

// Определяем типы для контекстов
export type TContextType = "Render" | "Canvas";

export type TClearRender = { scale: TScale };
export type TClearCanvas = TMethods;
export type TClear = (context: TContextType) => TClearRender | TClearCanvas;

// Создаем overload сигнатуры
export function clear(context: "Render"): TClearRender;
export function clear(context: "Canvas"): TClearCanvas;

// Реализуем функцию
export function clear(context: TContextType): TClearRender | TClearCanvas {
	// Очищаем холст
	Ctx.getCtx().clearRect(
		0,
		0,
		Ctx.getCtx().canvas.width,
		Ctx.getCtx().canvas.height,
	);

	// Возвращаем соответствующий тип в зависимости от контекста
	return context === "Render" ? { scale } : Methods;
}
