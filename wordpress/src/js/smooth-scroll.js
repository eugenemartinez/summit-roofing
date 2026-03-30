/**
 * Smooth Scroll Utility
 * @param {string} targetSelector - The ID of the element (e.g., "#projects")
 * @param {number} offset - Offset for fixed header (default 80)
 */
export function scrollToElement(targetSelector, offset = 80) {
	const startPosition = window.pageYOffset;
	let distance;

	// IF WE ARE GOING TO THE TOP
	if (targetSelector === "#top") {
		distance = 0 - startPosition;
	} else {
		// IF WE ARE GOING TO A SECTION
		const target = document.querySelector(targetSelector);
		if (!target) return;

		const header = document.getElementById("main-header");
		const headerHeight = header ? header.offsetHeight : offset;
		const targetPosition =
			target.getBoundingClientRect().top + startPosition - headerHeight;
		distance = targetPosition - startPosition;
	}

	const duration = 800;
	let start = null;

	function step(timestamp) {
		if (!start) start = timestamp;
		const progress = timestamp - start;
		const percentage = Math.min(progress / duration, 1);
		const easing = 1 - Math.pow(1 - percentage, 3);

		window.scrollTo(0, startPosition + distance * easing);

		if (progress < duration) {
			window.requestAnimationFrame(step);
		} else {
			// Sync URL: If top, clear hash. If section, set hash.
			const newHash = targetSelector === "#top" ? " " : targetSelector;
			history.pushState(null, null, newHash);
		}
	}

	window.requestAnimationFrame(step);
}

/**
 * Attaches smooth scroll to any element with a hash href
 * Useful for Hero CTAs and general links
 */
export function initGlobalSmoothScroll() {
	document.addEventListener("click", (e) => {
		const link = e.target.closest("a");
		if (!link) return;

		const href = link.getAttribute("href");
		if (!href) return;

		// Logic: If the link is just a hash (#about)
		// OR if it's a full URL that ends with a hash pointing to the CURRENT page
		const isInternalHash =
			href.startsWith("#") ||
			(href.includes("#") &&
				href.includes(window.location.hostname) &&
				href.split("#")[0] === window.location.href.split("#")[0]);

		if (isInternalHash) {
			const hash = href.substring(href.indexOf("#"));
			if (hash === "#") return;

			if (hash === "#top") {
				e.preventDefault();
				scrollToElement("#top");
				return;
			}

			const target = document.querySelector(hash);
			if (target) {
				e.preventDefault();
				scrollToElement(hash);
			}
		}
	});
}
