import type { IMethods } from "@/canvas/methods";
import type { TTools } from "@/canvas/methods/toolbox/tool/ITools";
import * as ToolboxColors from "@/ui/toolbox/colors";
import { getBtn } from "@/ui/utils/getBtn";

type TBtns = { [T in keyof TTools]: HTMLButtonElement };
export type TBtnIds = { [T in keyof TTools]: string };
type TBtnStyles = { [T in keyof TTools]: CSSStyleDeclaration };

type TInit = (props: {
	btnIds: TBtnIds;
	Canvas: IMethods;
	activeToolType: keyof TTools;
	firstRender?: boolean;
}) => void;
export const init: TInit = ({
	btnIds,
	Canvas,
	activeToolType,
	firstRender,
}) => {
	const btns: TBtns = { rect: getBtn(btnIds.rect) };
	const styles: TBtnStyles = { rect: btns.rect.style };

	for (const btn of Object.values(btns)) {
		btn.addEventListener("click", () =>
			onClick({ Canvas, activeToolType, styles }),
		);
	}

	firstRender && btns[activeToolType].click();
};

type TOnClick = (props: {
	Canvas: IMethods;
	activeToolType: keyof TTools;
	styles: TBtnStyles;
}) => void;
const onClick: TOnClick = ({ Canvas, activeToolType, styles: style }) => {
	const render = () => {
		Canvas.clear()
			.scale()
			.updateSettings({ bgColor: "#fff" })
			.setActiveTool(activeToolType)
			.loadDrawings();

		window.requestAnimationFrame(render);
	};

	for (const tool in style) {
		if (tool === activeToolType) {
			style[tool].background = ToolboxColors.active;
			continue;
		}
		style[tool as keyof TTools].background = ToolboxColors.notActive;
	}

	render();
};
