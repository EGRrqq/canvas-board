let CTX: CanvasRenderingContext2D | null = null;

type TGetCtx = () => CanvasRenderingContext2D;
type TSetCtx = (id: string) => { getCtx: TGetCtx };
interface ICtx {
	setCtx: TSetCtx;
	getCtx: TGetCtx;
}

const setCtx: TSetCtx = (id) => {
	const canvas = document.getElementById(id);

	if (!(canvas instanceof HTMLCanvasElement))
		throw new Error(`canvas елемент c id: '${id}' не найден`);

	CTX = canvas.getContext("2d");

	return { getCtx };
};

const getCtx: TGetCtx = () => {
	if (!CTX) throw new Error("Ошибка во время получения 2д контекста");

	return CTX;
};

export const Ctx: ICtx = { setCtx, getCtx };
