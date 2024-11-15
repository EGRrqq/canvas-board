import "style.css";

import { canvasSetup } from "@/setup";

// События
window.addEventListener("load", canvasSetup, { once: true });
window.addEventListener("resize", canvasSetup, { once: true });
