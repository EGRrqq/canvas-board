import type { Rect } from "@/models";

export const isRect = (rect: Rect): boolean => {
	return rect.size.width !== 0 && rect.size.height !== 0;
};
