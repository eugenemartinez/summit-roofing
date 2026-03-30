import { animate, inView } from "motion";

// 1. Animate the SVG Container (Rotate and Scale)
inView("[data-motion='svg-container']", ({ target }) => {
	animate(
		target,
		{
			rotate: [-5, 0],
			scale: [0.9, 1],
			opacity: [0, 0.1],
		},
		{ duration: 1.5, easing: "ease-out" },
	);
});

// 2. Animate the Paths (Draw effect)
inView("[data-motion='path-anim']", (entry) => {
	// entry is the IntersectionObserverEntry object
	const target = entry.target;

	// Safety check: Ensure the target exists and has the dataset
	if (!target || !target.dataset) return;

	// Get the delay from data-motion-delay
	const delay = parseFloat(target.dataset.motionDelay) || 0;

	// IMPORTANT: Ensure this is a path/circle/rect/polyline
	if (typeof target.getTotalLength !== "function") {
		console.error("Target is not a drawable SVG element:", target);
		return;
	}

	const length = target.getTotalLength();

	// Set initial state
	target.style.strokeDasharray = length;
	target.style.strokeDashoffset = length;

	// Trigger animation
	animate(
		target,
		{ strokeDashoffset: 0 },
		{
			duration: 2,
			delay: delay,
			easing: "ease-in-out",
		},
	);

	// Optional: return a cleanup function so it only animates once
	return () => {
		// This ensures the animation doesn't "reset" if the user scrolls away/back
	};
});

