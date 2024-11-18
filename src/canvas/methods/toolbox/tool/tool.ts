import { Methods, type TMethods } from "@/canvas/methods";
import type { TDrawType } from "@/canvas/methods/Draw";
import {
	type IRectTool,
	getRectDrawingState,
	rectTool,
} from "@/canvas/methods/toolbox/rect";
export { getRectDrawingState } from "@/canvas/methods/toolbox/rect";

// Интерфейс для контроллера
interface ITools {
	rect: IRectTool;
	// line be in the future
}
// Методы контроллера
type TToolsMethods = ITools[keyof ITools];
// Контроллер
const Tools: ITools = {
	rect: rectTool,
};

// Инициализурием выбранный инструмент
let activeTool: TToolsMethods = Tools.rect;

// Типы для взаимодействия с инструментом
type TSetActiveTool = (type: TDrawType) => TMethods;
type TGetActiveTool = () => TToolsMethods;

// Взаимодействие с инструментом
const getTool = (type: TDrawType) => {
	const tool = Tools[type];
	if (!tool) throw Error(`Инструмент с типом '${type}' не найден`);

	return tool;
};
export const setActiveTool: TSetActiveTool = (type) => {
	activeTool = getTool(type);

	return Methods;
};
export const getActiveTool: TGetActiveTool = () => activeTool;
// getRectDrawingState() || getLineDrawingState()
export const getDrawingState = (): boolean => getRectDrawingState();
