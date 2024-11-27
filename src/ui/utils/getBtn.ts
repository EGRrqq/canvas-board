type TGetBtn = (id: string) => HTMLButtonElement;

export const getBtn: TGetBtn = (id) => {
	const btn = document.getElementById(id);

	if (!(btn instanceof HTMLButtonElement))
		throw new Error(`button елемент c id: '${id}' не найден`);

	return btn;
};
