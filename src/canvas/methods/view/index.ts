import { type TClear, clear } from "@/canvas/methods/view/clear";
import { type TScale, scale } from "@/canvas/methods/view/scale";

// Интерфейс для контроллера
export interface IView {
	clear: TClear;
	scale: TScale;
}

// Контроллер
export const View: IView = {
	clear,
	scale,
};
