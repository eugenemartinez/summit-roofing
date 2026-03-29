import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	FaPaperPlane,
	FaEnvelope,
	FaCheckCircle,
	FaExclamationTriangle,
	FaBolt,
} from "react-icons/fa";
// Import your new modal component
import DemoEndModal from "./DemoEndModal";

const NewsletterSubscribe = () => {
	const [email, setEmail] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitSuccess, setSubmitSuccess] = useState(false);
	const [submitError, setSubmitError] = useState(false);
	const [isFocused, setIsFocused] = useState(false);
	// State to control the Modal visibility
	const [showModal, setShowModal] = useState(false);

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!email) return;

		setIsSubmitting(true);
		setSubmitError(false);

		// Simulate form submission
		setTimeout(() => {
			setIsSubmitting(false);
			setSubmitSuccess(true);
			setEmail("");

			// Trigger the Archive Modal after a brief delay for the "Success" UI to feel real
			setTimeout(() => {
				setShowModal(true);
			}, 800);

			// Reset internal success message state
			setTimeout(() => {
				setSubmitSuccess(false);
			}, 5000);
		}, 1500);
	};

	// Animation variants
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				ease: "easeOut",
			},
		},
	};

	const iconVariants = {
		hidden: { scale: 0, rotate: -45 },
		visible: {
			scale: 1,
			rotate: 0,
			transition: {
				type: "spring",
				stiffness: 260,
				damping: 20,
				delay: 0.1,
			},
		},
		hover: {
			scale: 1.1,
			rotate: 5,
			transition: {
				duration: 0.2,
				repeatType: "mirror",
				repeat: Infinity,
				repeatDelay: 0.8,
			},
		},
		tap: {
			scale: 0.9,
			rotate: 0,
		},
	};

	return (
		<>
			<motion.div
				className="overflow-hidden relative py-12 bg-gradient-to-br from-primary-dark/30 to-primary/20 backdrop-blur-sm"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{ duration: 0.6 }}
				viewport={{ once: true }}
			>
				{/* Decorative elements */}
				<motion.div
					className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent to-transparent via-cta/50"
					initial={{ scaleX: 0 }}
					whileInView={{ scaleX: 1 }}
					transition={{ duration: 1.2, ease: "easeOut" }}
					viewport={{ once: true }}
				/>

				<motion.div
					className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-cta/10"
					animate={{
						y: [0, 10, 0],
						scale: [1, 1.05, 1],
					}}
					transition={{
						duration: 6,
						repeat: Infinity,
						repeatType: "mirror",
					}}
				/>

				<motion.div
					className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-primary-dark/20"
					animate={{
						y: [0, -15, 0],
						scale: [1, 1.08, 1],
					}}
					transition={{
						duration: 7,
						repeat: Infinity,
						repeatType: "mirror",
					}}
				/>

				<div className="container relative z-10 px-4 mx-auto">
					<div className="mx-auto max-w-3xl text-center">
						<motion.div
							className="flex flex-col items-center mb-8"
							variants={containerVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
						>
							<motion.div
								className="inline-flex justify-center items-center p-4 mb-4 rounded-full transition-all duration-300 bg-cta/20 hover:bg-cta/30"
								variants={iconVariants}
								whileHover="hover"
							>
								<FaEnvelope className="text-2xl text-cta" />
							</motion.div>

							<motion.h3
								className="mb-2 text-2xl font-bold text-gray-800 bg-clip-text bg-gradient-to-r sm:text-3xl from-bg to-bg/80"
								variants={itemVariants}
							>
								Subscribe to Our Newsletter
							</motion.h3>

							<motion.p
								className="mb-2 text-gray-800/70"
								variants={itemVariants}
							>
								Stay updated with our latest offers, promotions and roofing tips
							</motion.p>

							<motion.div
								className="flex flex-wrap gap-3 justify-center items-center mb-6 text-xs text-black"
								variants={itemVariants}
							>
								{["Monthly Updates", "Expert Tips", "Special Offers"].map(
									(item, index) => (
										<div key={index} className="flex items-center">
											{index > 0 && (
												<span className="hidden mx-2 text-black sm:inline-block">
													•
												</span>
											)}
											<motion.div
												className="flex items-center py-1.5 px-3 rounded-full transition-all duration-300 bg-white/80 hover:bg-white/90"
												whileHover={{
													scale: 1.05,
												}}
											>
												<FaBolt className="mr-1.5 text-xs text-cta" />
												<span className="font-medium">{item}</span>
											</motion.div>
										</div>
									),
								)}
							</motion.div>
						</motion.div>

						<AnimatePresence mode="wait">
							{submitSuccess ? (
								<motion.div
									className="p-6 text-white rounded-lg border bg-green-500/20 border-green-500/30"
									initial={{ opacity: 0, y: 10, scale: 0.95 }}
									animate={{ opacity: 1, y: 0, scale: 1 }}
									exit={{ opacity: 0, scale: 0.95 }}
									transition={{ duration: 0.3 }}
								>
									<div className="flex flex-col items-center text-primary">
										<div className="p-3 mb-3 rounded-full bg-green-500/30">
											<FaCheckCircle className="text-2xl text-green-600" />
										</div>
										<h4 className="mb-1 text-xl font-semibold">Success!</h4>
										<p>Redirecting to repository details...</p>
									</div>
								</motion.div>
							) : submitError ? (
								<motion.div
									className="p-6 text-white rounded-lg border bg-red-500/20 border-red-500/30"
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.3 }}
								>
									<div className="flex flex-col items-center text-primary">
										<div className="p-3 mb-3 rounded-full bg-red-500/30">
											<FaExclamationTriangle className="text-2xl text-red-400" />
										</div>
										<h4 className="mb-1 text-xl font-semibold">
											Something Went Wrong
										</h4>
										<p>Please try again or contact us directly.</p>
									</div>
								</motion.div>
							) : (
								<motion.div
									className="relative z-10 p-2 rounded-lg border shadow-xl transition-shadow duration-300 hover:shadow-2xl bg-white/10 backdrop-blur-md border-white/20"
									whileHover={{
										boxShadow:
											"0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
									}}
									initial={{ y: 20, opacity: 0 }}
									whileInView={{ y: 0, opacity: 1 }}
									transition={{ duration: 0.5 }}
									viewport={{ once: true }}
								>
									<motion.form
										onSubmit={handleSubmit}
										className="flex flex-col gap-3 sm:flex-row"
									>
										<div className="relative flex-grow">
											<motion.div
												className="absolute left-3 top-1/2 text-gray-400 -translate-y-1/2"
												animate={{
													x: isFocused || email ? -30 : 0,
													opacity: isFocused || email ? 0 : 1,
												}}
												transition={{ duration: 0.2 }}
											>
												<FaEnvelope />
											</motion.div>
											<motion.input
												type="email"
												placeholder="Your email address"
												value={email}
												onChange={handleEmailChange}
												onFocus={() => setIsFocused(true)}
												onBlur={() => setIsFocused(false)}
												className={`w-full px-4 py-3 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-cta text-accent ${isFocused || email ? "pl-4" : "pl-10"}`}
												whileFocus={{ scale: 1.01 }}
												transition={{ duration: 0.2 }}
												required
											/>
										</div>
										<motion.button
											type="submit"
											disabled={isSubmitting}
											className="flex justify-center items-center py-3 px-6 font-medium text-white rounded-md transition-colors duration-300 cursor-pointer bg-cta min-w-[120px] hover:bg-cta/90"
											whileHover={{
												scale: 1.03,
												boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)",
											}}
											whileTap={{ scale: 0.97 }}
											transition={{
												type: "spring",
												stiffness: 400,
												damping: 10,
											}}
										>
											{isSubmitting ? (
												<div className="flex justify-center items-center">
													<svg
														className="mr-2 -ml-1 w-4 h-4 text-white animate-spin"
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
													>
														<circle
															className="opacity-25"
															cx="12"
															cy="12"
															r="10"
															stroke="currentColor"
															strokeWidth="4"
														></circle>
														<path
															className="opacity-75"
															fill="currentColor"
															d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
														></path>
													</svg>
													<span>Sending...</span>
												</div>
											) : (
												<>
													<span>Subscribe</span>
													<motion.span
														className="ml-2"
														variants={{
															rest: { x: 0 },
															hover: { x: 3 },
														}}
														initial="rest"
														whileHover="hover"
													>
														<FaPaperPlane />
													</motion.span>
												</>
											)}
										</motion.button>
									</motion.form>
								</motion.div>
							)}
						</AnimatePresence>

						<motion.p
							className="mt-4 text-xs text-bg/60"
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							transition={{ duration: 0.5, delay: 0.3 }}
							viewport={{ once: true }}
						>
							We respect your privacy. You can unsubscribe at any time.
						</motion.p>
					</div>
				</div>
			</motion.div>

			{/* The Demo Modal */}
			<DemoEndModal isOpen={showModal} onClose={() => setShowModal(false)} />
		</>
	);
};

export default NewsletterSubscribe;

