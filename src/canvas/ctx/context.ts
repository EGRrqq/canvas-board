let CTX: CanvasRenderingContext2D | null = null;

export type TGetCtx = () => CanvasRenderingContext2D;
export type TSetCtx = (
	id: string,
	settings?: Partial<ICtxSettings>,
) => { getCtx: TGetCtx };

export interface ICtxSettings {
	alpha: boolean;
}

const defaultSettings: ICtxSettings = {
	alpha: false,
};

export const setCtx: TSetCtx = (id, settings) => {
	const s = { ...defaultSettings, ...settings };

	const canvas = document.getElementById(id);

	if (!(canvas instanceof HTMLCanvasElement))
		throw new Error(`canvas елемент c id: '${id}' не найден`);

	CTX = canvas.getContext("2d", { alpha: s.alpha });

	return { getCtx };
};

export const getCtx: TGetCtx = () => {
	if (!CTX) throw new Error("Ошибка во время получения 2д контекста");

	return CTX;
};
