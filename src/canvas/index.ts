import type { Rect } from "@/models";

let CTX: CanvasRenderingContext2D | null = null;

interface IDraw {
	drawRect: TDrawRect;
	drawGrid: never;
}
type TDrawRect = (rect: Rect) => IDraw;
type TCanvas = (id: string) => IDraw;

export const Canvas: TCanvas = (id) => {
	setCtx(id);

	console.log(CTX);
	return { drawRect };
};

const drawRect: TDrawRect = (rect) => {
	const { position, size } = rect;
	const halfWidth = size.width / 2;
	const halfHeight = size.height / 2;

	getCtx().fillStyle = "#007bff";
	getCtx().fillRect(
		position.x - halfWidth,
		position.y - halfHeight,
		size.width,
		size.height,
	);

	return { drawRect };
};

// context stuff
const setCtx = (canvasId: string): void => {
	const canvas = document.getElementById(canvasId);

	if (!(canvas instanceof HTMLCanvasElement))
		throw new Error(`canvas елемент c id: '${canvasId}' не найден`);

	CTX = canvas.getContext("2d");
};

const getCtx = (): CanvasRenderingContext2D => {
	if (!CTX) throw new Error("Ошибка во время получения 2д контекста");

	return CTX;
};
