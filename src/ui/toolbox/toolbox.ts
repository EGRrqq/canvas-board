import type { IMethods } from "@/canvas/methods";
import { TDrawRect } from "@/canvas/methods/Draw/drawRect";
import type { TTools } from "@/canvas/methods/toolbox/tool/ITools";
import * as ToolboxColors from "@/ui/toolbox/colors";
import { getBtn } from "@/ui/utils/getBtn";

type TBtns = { [T in keyof TTools]: HTMLButtonElement };
export type TBtnIds = { [T in keyof TTools]: string };
type TBtnStyles = { [T in keyof TTools]: CSSStyleDeclaration };

let activeToolType: keyof TTools = "rect";
const getActiveToolType = () => activeToolType;

type TInit = (props: {
	btnIds: TBtnIds;
	Canvas: IMethods;
	firstRender?: boolean;
}) => void;
export const init: TInit = ({ btnIds, Canvas, firstRender }) => {
	const btns: TBtns = { rect: getBtn(btnIds.rect), line: getBtn(btnIds.line) };
	const styles: TBtnStyles = { rect: btns.rect.style, line: btns.line.style };

	for (const type in btns) {
		btns[type as keyof TTools].addEventListener("click", () => {
			activeToolType = type as keyof TTools;
			Canvas.resetSettings();
			updateBtnStyles({ styles });
		});
	}

	renderCanvasWithTool({ Canvas });

	firstRender && btns[activeToolType].click();
};

type TRenderCanvasWithTool = (props: {
	Canvas: IMethods;
}) => void;
const renderCanvasWithTool: TRenderCanvasWithTool = ({ Canvas, styles }) => {
	const render = () => {
		Canvas.clear()
			.scale()
			.updateSettings({ bgColor: "#fff" })
			.loadDrawings()
			.setActiveTool(getActiveToolType());

		window.requestAnimationFrame(render);
	};

	render();
};

type TUpdateBtnStyle = (props: { styles: TBtnStyles }) => void;
const updateBtnStyles: TUpdateBtnStyle = ({ styles }) => {
	for (const tool in styles) {
		if (tool === activeToolType) {
			styles[tool].background = ToolboxColors.active;
			continue;
		}
		styles[tool as keyof TTools].background = ToolboxColors.notActive;
	}
};

type TResetCanvasStyles = (props: { Canvas: IMethods }) => void;
const resetCanvasStyles: TResetCanvasStyles = ({ Canvas }) => {
	Canvas.updateSettings({ css: { cursor: "initial" } });
};
