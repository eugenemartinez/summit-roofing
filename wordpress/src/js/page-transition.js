import { animate } from "motion";

export function initPageTransition() {
	const overlay = document.createElement("div");
	overlay.id = "page-transition";
	overlay.style.cssText = `
    position: fixed;
    inset: 0;
    background: var(--color-primary);
    z-index: 9999;
    pointer-events: none;
    transform: translateY(0%);
  `;
	document.body.appendChild(overlay);

	// Exit animation — slide overlay up and out on page load
	animate(
		overlay,
		{ y: ["-0%", "-100%"] },
		{ duration: 0.6, delay: 0.1, easing: [0.45, 0, 0.55, 1] },
	);

	document.querySelectorAll("a[href]").forEach((link) => {
		link.addEventListener("click", (e) => {
			const href = link.getAttribute("href");
			const url = new URL(link.href, window.location.origin);

			// 1. THE BAIL-OUT CHECKS
			// Ignore hashes, mailto, tel, or external targets
			if (
				!href ||
				href.startsWith("#") ||
				href.startsWith("mailto") ||
				href.startsWith("tel") ||
				link.hasAttribute("target")
			)
				return;

			// 2. SAME-PAGE CHECK (The Culprit)
			// If the URL (without the hash) is the same as the current page,
			// do NOT trigger the transition.
			const isSamePage =
				url.pathname === window.location.pathname &&
				url.hostname === window.location.hostname;

			if (isSamePage && url.hash) {
				return; // Let navigation.js handle the smooth scroll
			}

			// 3. EXTERNAL CHECK
			if (url.origin !== window.location.origin) return;

			// 4. TRIGGER TRANSITION
			e.preventDefault();
			const destination = link.href;

			animate(
				overlay,
				{ y: ["100%", "0%"] },
				{ duration: 0.4, easing: [0.45, 0, 0.55, 1] },
			).finished.then(() => {
				window.location.href = destination;
			});
		});
	});

	window.addEventListener("pageshow", (event) => {
		// if event.persisted is true, the page was loaded from the BFCache (back button)
		if (event.persisted) {
			animate(overlay, { y: "-100%" }, { duration: 0.3 });
		}
	});
}
