import {
	type TLoad,
	type TSave,
	load,
	save,
} from "@/canvas/methods/storage/storage";

// Интерфейс для контроллера
export interface IStorage {
	save: TSave;
	load: TLoad;
}

// Контроллер
export const Storage: IStorage = {
	save,
	load,
};
