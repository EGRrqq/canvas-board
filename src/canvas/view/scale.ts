import { Ctx } from "@/canvas/ctx";
import { type TClearRender, clear } from "@/canvas/view/clear";

export type TScale = () => { clear: () => TClearRender };

// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas#scaling_for_high_resolution_displays
export const scale: TScale = () => {
	// Получаем DPR и размеры окна
	const dpr = window.devicePixelRatio;
	const width = window.innerWidth;
	const height = window.innerHeight;

	// Устанавливаем "фактический" размер канваса в соответствии с нашим DPR
	Ctx.getCtx().canvas.width = width * dpr;
	Ctx.getCtx().canvas.height = height * dpr;

	// Масштабируем контекст для правильного рендера элементов
	Ctx.getCtx().scale(dpr, dpr);

	// Устанавливаем "видимый" размер канваса с помощью CSS
	Ctx.getCtx().canvas.style.width = `${width}px`;
	Ctx.getCtx().canvas.style.height = `${height}px`;

	return { clear: () => clear("Render") };
};
