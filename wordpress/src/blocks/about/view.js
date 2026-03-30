import { animate, inView, stagger } from "motion";

export function initAboutAnimations() {
	const section = document.querySelector(".js-inview-trigger");
	if (!section) return;

	inView(
		section,
		() => {
			// 1. Image Blur & Opacity
			animate(
				".js-animate-blur",
				{ filter: "blur(0px)", opacity: 1 },
				{ duration: 0.8 },
			);

			// 2. Badge Pop-in
			animate(
				".js-animate-badge",
				{ opacity: 1, y: 0 },
				{ duration: 0.6, delay: 0.4 },
			);

			// 3. Content Slide-in
			animate(
				".js-animate-content",
				{ opacity: 1, x: 0 },
				{ duration: 0.8, delay: 0.2 },
			);

			// 4. Feature Grid Stagger
			animate(
				".js-stagger-item",
				{ opacity: 1, y: 0 },
				{
					delay: stagger(0.1, { start: 0.6 }),
					duration: 0.5,
				},
			);

			return () => {}; // Optional: reset on exit if once: false
		},
		{ margin: "-100px" },
	);
}
