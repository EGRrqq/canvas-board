import { type TGetCtx, type TSetCtx, getCtx, setCtx } from "./context";

interface ICtx {
	setCtx: TSetCtx;
	getCtx: TGetCtx;
}

export const Ctx: ICtx = { getCtx, setCtx };
export type { ICtxSettings } from "@/canvas/ctx/context";
