import "style.css";
import { ActiveToolBtn, type TBtnIds } from "@/ui/toolbox";
import { Canvas } from "./canvas";

const Brd = Canvas("board");
const btnIds: TBtnIds = { rect: "rect-tool" };

// События
window.addEventListener(
	"load",
	() =>
		ActiveToolBtn.init({
			Canvas: Brd,
			activeToolType: "rect",
			btnIds,
			firstRender: true,
		}),
	{
		once: true,
	},
);
window.addEventListener(
	"resize",
	() => ActiveToolBtn.init({ Canvas: Brd, activeToolType: "rect", btnIds }),
	{
		once: true,
	},
);
