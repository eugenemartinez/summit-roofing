/**
 * Testimonials Block - Frontend View Script
 * Handles mobile carousel functionality, auto-advance, and navigation
 */

export function initTestimonialsCarousel() {
	const carousels = document.querySelectorAll(".testimonials-mobile-carousel");

	carousels.forEach((carousel) => {
		const slides = carousel.querySelectorAll(".testimonials-slide");
		const dots = carousel.querySelectorAll(".testimonials-dot");
		const prevBtn = carousel.querySelector(".testimonials-prev");
		const nextBtn = carousel.querySelector(".testimonials-next");

		let currentSlide = 0;
		const totalSlides = slides.length;
		const autoDelay = parseInt(
			carousel.getAttribute("data-auto-delay") || "6000",
			10,
		);
		let autoAdvanceInterval;

		/**
		 * Show slide by index
		 */
		const showSlide = (index) => {
			// Clamp index to valid range with wrapping
			currentSlide = ((index % totalSlides) + totalSlides) % totalSlides;

			// Update slides visibility
			slides.forEach((slide, i) => {
				slide.style.opacity = i === currentSlide ? "1" : "0";
				slide.style.pointerEvents = i === currentSlide ? "auto" : "none";
			});

			// Update dots
			dots.forEach((dot, i) => {
				if (i === currentSlide) {
					dot.classList.remove("w-2.5", "bg-gray-300");
					dot.classList.add("w-8", "bg-cta");
				} else {
					dot.classList.remove("w-8", "bg-cta");
					dot.classList.add("w-2.5", "bg-gray-300");
				}
			});
		};

		/**
		 * Reset auto-advance timer
		 */
		const resetAutoAdvance = () => {
			clearInterval(autoAdvanceInterval);
			autoAdvanceInterval = setInterval(() => {
				showSlide(currentSlide + 1);
			}, autoDelay);
		};

		/**
		 * Next slide
		 */
		const nextSlide = () => {
			showSlide(currentSlide + 1);
			resetAutoAdvance();
		};

		/**
		 * Previous slide
		 */
		const prevSlide = () => {
			showSlide(currentSlide - 1);
			resetAutoAdvance();
		};

		/**
		 * Go to specific slide
		 */
		const goToSlide = (index) => {
			showSlide(index);
			resetAutoAdvance();
		};

		// Event listeners
		prevBtn?.addEventListener("click", prevSlide);
		nextBtn?.addEventListener("click", nextSlide);

		dots.forEach((dot, index) => {
			dot.addEventListener("click", () => goToSlide(index));
		});

		// Keyboard navigation
		document.addEventListener("keydown", (e) => {
			if (e.key === "ArrowLeft") prevSlide();
			if (e.key === "ArrowRight") nextSlide();
		});

		// Pause auto-advance on hover
		carousel.addEventListener("mouseenter", () => {
			clearInterval(autoAdvanceInterval);
		});

		carousel.addEventListener("mouseleave", () => {
			resetAutoAdvance();
		});

		// Initialize
		showSlide(0);
		resetAutoAdvance();
	});
}

// Initialize on DOMContentLoaded
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", initTestimonialsCarousel);
} else {
	initTestimonialsCarousel();
}
