import type { IMethods } from "@/canvas/methods";
import * as ToolboxColors from "@/ui/toolbox/colors";
import { getStartBtn } from "@/ui/utils";

type TInit = (
	rectToolBtnId: string,
	Canvas: IMethods,
	firstRender?: boolean,
) => void;
export const init: TInit = (id, Canvas, firstRender) => {
	const btn = getStartBtn(id);

	btn.addEventListener("click", () => {
		onClick(Canvas);
		btn.style.background = ToolboxColors.active;
	});

	firstRender && btn.click();
};

type TOnClick = (Canvas: IMethods) => void;
const onClick: TOnClick = (Canvas) => {
	const render = () => {
		Canvas.clear()
			.scale()
			.updateSettings({ bgColor: "#fff" })
			.setActiveTool("rect")
			.loadDrawings();

		window.requestAnimationFrame(render);
	};

	render();
};
