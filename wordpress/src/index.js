import { initMotion } from "./js/motion-presets.js";
import { initPageTransition } from "./js/page-transition.js";
import { initIcons } from "./js/icons.js";
import { initNavigation } from "./js/navigation.js";
import { initScrollToTop } from "./js/scroll-to-top.js";
import { initGlobalSmoothScroll } from "./js/smooth-scroll.js";
import "./js/single.js";

document.addEventListener("DOMContentLoaded", () => {
	initIcons();
	initMotion();
	initPageTransition();
	initNavigation();
	initScrollToTop();
	initGlobalSmoothScroll();
});
