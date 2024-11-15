import { getCtx, setCtx, type TGetCtx, type TSetCtx } from "./context";

interface ICtx {
	setCtx: TSetCtx;
	getCtx: TGetCtx;
}

export const Ctx: ICtx = { getCtx, setCtx };
