/**
 * FAQ Block - Frontend View Script
 * Handles accordion functionality for FAQ items
 */

export function initFAQAccordion() {
	const faqItems = document.querySelectorAll('.faq-item');

	faqItems.forEach((item) => {
		const toggle = item.querySelector('.faq-toggle');
		const content = item.querySelector('.faq-content');
		const chevron = item.querySelector('.faq-chevron');

		if (!toggle || !content) return;

		const toggleItem = () => {
			const isOpen = toggle.getAttribute('aria-expanded') === 'true';
			toggle.setAttribute('aria-expanded', !isOpen);

			if (!isOpen) {
				// Open
				item.classList.add('open');
				content.style.maxHeight = content.scrollHeight + 'px';
				if (chevron) chevron.style.transform = 'rotate(180deg)';
			} else {
				// Close
				item.classList.remove('open');
				content.style.maxHeight = '0';
				if (chevron) chevron.style.transform = 'rotate(0deg)';
			}
		};

		toggle.addEventListener('click', toggleItem);

		// Keyboard support (Enter and Space)
		toggle.addEventListener('keydown', (e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				toggleItem();
			}
		});
	});
}

// Initialize on DOMContentLoaded
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initFAQAccordion);
} else {
	initFAQAccordion();
}
