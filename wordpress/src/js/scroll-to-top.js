import { scrollToElement } from "./smooth-scroll";

export const initScrollToTop = () => {
	const scrollContainer = document.getElementById("scroll-to-top");
	const scrollButton = document.querySelector("#scroll-to-top button");

	if (!scrollContainer || !scrollButton) return;

	// 1. Use the shared utility
	scrollButton.onclick = function (e) {
		e.preventDefault();
		// We pass "#top" to the utility
		scrollToElement("#top");
	};

	// 2. Visibility Logic (Exactly as your working version)
	const toggleVisibility = () => {
		if (window.pageYOffset > 300) {
			scrollContainer.style.opacity = "1";
			scrollContainer.style.transform = "translateY(0)";
			scrollContainer.style.pointerEvents = "auto";
		} else {
			scrollContainer.style.opacity = "0";
			scrollContainer.style.transform = "translateY(20px)";
			scrollContainer.style.pointerEvents = "none";
		}
	};

	window.addEventListener("scroll", toggleVisibility);
	toggleVisibility();
};
