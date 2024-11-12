import type { Point } from "@/models/Point";
import type { Size } from "@/models/Size";

export type Rect = {
	position: Point; // координата центра прямоугольника
	size: Size;
};
