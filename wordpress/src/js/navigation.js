import { animate } from "motion";
import { scrollToElement } from "./smooth-scroll";

export function initNavigation() {
	const header = document.getElementById("main-header");
	const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");
	const sections = document.querySelectorAll("section[id]");
	const menuBtn = document.getElementById("mobile-menu-btn");
	const mobileMenu = document.getElementById("mobile-menu");

	if (!header) return;

	// 1. Mobile Menu Toggle
	if (menuBtn && mobileMenu) {
		menuBtn.onclick = () => {
			const isHidden = mobileMenu.classList.contains("hidden");
			if (isHidden) {
				mobileMenu.classList.remove("hidden");
				animate(mobileMenu, { opacity: [0, 1] }, { duration: 0.2 });
			} else {
				animate(mobileMenu, { opacity: 0 }, { duration: 0.2 }).finished.then(
					() => {
						mobileMenu.classList.add("hidden");
					},
				);
			}
		};
	}

	// 2. Navigation Click Logic (Using the imported Utility)
	navLinks.forEach((link) => {
		link.addEventListener("click", (e) => {
			const href = link.getAttribute("href");
			if (href && href.startsWith("#") && href.length > 1) {
				e.preventDefault();

				// Use the utility!
				scrollToElement(href);

				// Close mobile menu if open
				if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
					animate(mobileMenu, { opacity: 0 }, { duration: 0.2 }).finished.then(
						() => {
							mobileMenu.classList.add("hidden");
						},
					);
				}
			}
		});
	});

	// ── 3. Header Appearance Observer ──

	// Create a tiny invisible box at the very top of the page to trigger header state

	const sentinel = document.createElement("div");

	sentinel.style.cssText =
		"position:absolute;top:0;left:0;height:1px;width:1px;pointer-events:none;z-index:-1;";

	document.body.prepend(sentinel);

	const headerObserver = new IntersectionObserver(
		([entry]) => {
			if (!entry.isIntersecting) {
				// SCROLLED STATE: Header is solid and compact
				header.classList.add(
					"bg-primary/95",
					"backdrop-blur-md",
					"py-2",
					"shadow-lg",
				);

				header.classList.remove("py-4", "bg-transparent");

				// Optional: Animate the specific background color using Motion
				animate(
					header,
					{ backgroundColor: "var(--color-primary)" },
					{ duration: 0.3 },
				);
			} else {
				// TOP STATE: Header is transparent and tall

				header.classList.remove(
					"bg-primary/95",
					"backdrop-blur-md",
					"py-2",
					"shadow-lg",
				);

				header.classList.add("py-4", "bg-transparent");

				// Animate back to transparent

				animate(
					header,
					{ backgroundColor: "rgba(0,0,0,0)" },
					{ duration: 0.3 },
				);
			}
		},

		{ threshold: 0 },
	);

	headerObserver.observe(sentinel);
}
