// Newsletter Subscribe Block View Script
// Handles form submission, state management, and animations

document.addEventListener("DOMContentLoaded", function () {
	// Find all newsletter forms
	const newsletterForms = document.querySelectorAll(".newsletter-form");

	newsletterForms.forEach((form) => {
		const emailInput = form.querySelector(".newsletter-email");
		const submitButton = form.querySelector(".newsletter-submit");
		const submitText = form.querySelector(".submit-text");
		const submitIcon = form.querySelector(".submit-icon");
		const loadingSpinner = form.querySelector(".loading-spinner");
		const envelopeIcon = form.querySelector("[data-envelope-icon]");
		const successDiv = form.parentElement.querySelector(".newsletter-success");
		const errorDiv = form.parentElement.querySelector(".newsletter-error");

		let isSubmitting = false;

		// Handle form submission
		form.addEventListener("submit", function (e) {
			e.preventDefault();

			if (isSubmitting || !emailInput.value.trim()) {
				return;
			}

			isSubmitting = true;

			// Update form state to submitting
			form.setAttribute("data-form-state", "submitting");
			submitText.textContent = "Sending...";
			submitIcon.style.display = "none";
			loadingSpinner.style.display = "block";
			submitButton.disabled = true;

			// Hide envelope icon
			if (envelopeIcon) {
				envelopeIcon.style.opacity = "0";
			}

			// Simulate form submission
			setTimeout(() => {
				// Success state
				form.setAttribute("data-form-state", "success");
				form.style.display = "none";
				successDiv.style.display = "block";

				// Reset form after some time
				setTimeout(() => {
					resetForm();
				}, 5000);
			}, 1500); // Simulate 1.5s submission time
		});

		// Handle email input focus/blur for envelope icon animation
		emailInput.addEventListener("focus", function () {
			if (envelopeIcon) {
				envelopeIcon.style.transform = "translateX(-30px)";
				envelopeIcon.style.opacity = "0";
				this.style.paddingLeft = "1rem";
			}
		});

		emailInput.addEventListener("blur", function () {
			if (!this.value.trim() && envelopeIcon) {
				envelopeIcon.style.transform = "translateX(0)";
				envelopeIcon.style.opacity = "1";
				this.style.paddingLeft = "2.5rem";
			}
		});

		// Reset form function
		function resetForm() {
			isSubmitting = false;
			form.setAttribute("data-form-state", "idle");
			form.style.display = "flex";
			successDiv.style.display = "none";
			errorDiv.style.display = "none";

			submitText.textContent = "Subscribe";
			submitIcon.style.display = "inline-block";
			loadingSpinner.style.display = "none";
			submitButton.disabled = false;
			emailInput.value = "";

			if (envelopeIcon) {
				envelopeIcon.style.transform = "translateX(0)";
				envelopeIcon.style.opacity = "1";
			}
		}

		// Handle error simulation (for testing)
		// You can trigger this by adding a data attribute or custom logic
		window.triggerNewsletterError = function () {
			if (isSubmitting) return;

			isSubmitting = true;
			form.setAttribute("data-form-state", "error");
			submitText.textContent = "Sending...";
			submitIcon.style.display = "none";
			loadingSpinner.style.display = "block";
			submitButton.disabled = true;

			setTimeout(() => {
				form.style.display = "none";
				errorDiv.style.display = "block";

				setTimeout(() => {
					resetForm();
				}, 5000);
			}, 1500);
		};
	});
});

