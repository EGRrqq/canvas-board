import {
	type TLoad,
	type TSave,
	loadDrawings,
	saveDrawing,
} from "@/canvas/methods/storage/storage";

// Интерфейс для контроллера
export interface IStorage {
	saveDrawing: TSave;
	loadDrawings: TLoad;
}

// Контроллер
export const Storage: IStorage = {
	saveDrawing,
	loadDrawings,
};
