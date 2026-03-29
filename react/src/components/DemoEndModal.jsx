import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	FaGithub,
	FaCheckCircle,
	FaTimes,
	FaExternalLinkAlt,
} from "react-icons/fa";

const DemoEndModal = ({ isOpen, onClose }) => {
	const themeUrl =
		"https://github.com/eugenemartinez/summit-roofing/tree/main/theme";

	const backdropVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
	};

	const modalVariants = {
		hidden: { opacity: 0, scale: 0.9, y: 20 },
		visible: {
			opacity: 1,
			scale: 1,
			y: 0,
			transition: { type: "spring", duration: 0.5, bounce: 0.3 },
		},
		exit: {
			opacity: 0,
			scale: 0.9,
			y: 20,
			transition: { duration: 0.3 },
		},
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<div className="flex fixed inset-0 justify-center items-center p-4 z-[100]">
					<motion.div
						className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
						variants={backdropVariants}
						initial="hidden"
						animate="visible"
						exit="hidden"
						onClick={onClose}
					/>

					<motion.div
						className="overflow-hidden relative w-full max-w-lg bg-white rounded-xl shadow-2xl"
						variants={modalVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
					>
						{/* Header / Accent Bar */}
						<div className="w-full h-2 bg-cta" />

						<button
							onClick={onClose}
							className="absolute top-4 right-4 p-2 transition-colors cursor-pointer text-accent/50 hover:text-accent"
						>
							<FaTimes size={20} />
						</button>

						<div className="p-8 text-center">
							<motion.div
								className="inline-flex justify-center items-center mb-6 w-16 h-16 text-green-600 bg-green-100 rounded-full"
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ delay: 0.2, type: "spring" }}
							>
								<FaCheckCircle size={32} />
							</motion.div>

							<h3 className="mb-2 text-2xl font-bold text-primary">
								Project Archive Demo
							</h3>

							<p className="mb-8 leading-relaxed text-accent">
								Thank you for testing the Summit Roofing interface! This React
								build is a functional demo of the custom WordPress theme
								architecture.
							</p>

							<div className="space-y-4">
								<a
									href={themeUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="flex gap-3 justify-center items-center py-4 px-6 w-full font-semibold text-white rounded-lg shadow-lg transition-all bg-primary hover:bg-primary/90 hover:shadow-primary/20"
								>
									<FaGithub size={20} />
									<span>View WordPress Theme Code</span>
									<FaExternalLinkAlt size={14} className="opacity-50" />
								</a>

								<button
									onClick={onClose}
									className="py-3 px-6 w-full font-medium rounded-lg transition-colors cursor-pointer bg-neutral-100 text-accent hover:bg-neutral-200"
								>
									Return to Site
								</button>
							</div>

							<div className="flex gap-6 justify-center pt-6 mt-8 font-mono text-xs tracking-widest uppercase border-t border-gray-100 text-accent/60">
								<span>WordPress</span>
								<span>Tailwind</span>
								<span>Motion.dev</span>
							</div>
						</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
};

export default DemoEndModal;
