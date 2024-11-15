let CTX: CanvasRenderingContext2D | null = null;

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

export const Ctx = { setCtx, getCtx };
