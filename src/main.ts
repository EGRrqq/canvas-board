import "style.css";
import { rectToolBtn } from "@/ui/toolbox";
import { Canvas } from "./canvas";

const Brd = Canvas("board");
const rectToolBtnId = "rect-tool";

// События
window.addEventListener(
	"load",
	() => rectToolBtn.init(rectToolBtnId, Brd, true),
	{
		once: true,
	},
);
window.addEventListener("resize", () => rectToolBtn.init(rectToolBtnId, Brd), {
	once: true,
});
