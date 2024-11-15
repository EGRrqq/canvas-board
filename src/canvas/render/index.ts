import { type TClear, clear } from "@/canvas/render/clear";
import { type TScale, scale } from "@/canvas/render/scale";

// Интерфейс для контроллера
interface IRender {
	scale: TScale;
	clear: TClear;
}

// Render контроллер
export const Render: IRender = { clear, scale };
