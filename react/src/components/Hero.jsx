import React from "react";
import { motion } from "framer-motion";
import useSmoothScroll from "../hooks/useSmoothScroll"; // Import our hook

const Hero = () => {
	// Use smooth scroll hook with a small offset for better positioning
	const { scrollToSection } = useSmoothScroll(80);

	return (
		<section className="flex relative items-center bg-accent min-h-[80vh]">
			{/* Hero background image */}
			<div
				className="absolute inset-0 z-0 bg-center bg-cover"
				style={{
					backgroundImage:
						'url("https://images.pexels.com/photos/209315/pexels-photo-209315.jpeg")',
					backgroundBlendMode: "overlay",
					backgroundColor: "rgba(0,0,0,0.5)",
				}}
			></div>

			{/* Subtle overlay pattern */}
			<div
				className="absolute inset-0 z-0 bg-repeat opacity-20"
				style={{
					backgroundImage:
						"url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")",
				}}
			></div>

			{/* Content */}
			<div className="container relative z-10 py-24 px-4 mx-auto md:py-32">
				<div className="max-w-2xl">
					<motion.h1
						className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl drop-shadow-lg"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						Quality Roofing Solutions for Every Home
					</motion.h1>

					<motion.p
						className="mb-8 text-xl text-white drop-shadow-md"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						Professional roof installation, repair, and maintenance services
						with over 20 years of experience.
					</motion.p>

					<motion.div
						className="flex flex-col gap-4 sm:flex-row"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.4 }}
					>
						<motion.a
							href="#contact"
							className="py-3 px-6 font-medium text-center text-white rounded-md transition-all duration-300 bg-cta hover:bg-cta/90"
							whileHover={{
								scale: 1.05,
								boxShadow: "0px 5px 15px rgba(216, 106, 106, 0.4)",
							}}
							whileTap={{ scale: 0.98 }}
							onClick={scrollToSection} // Add smooth scroll
						>
							Get Free Estimate
						</motion.a>
						<motion.a
							href="#services"
							className="py-3 px-6 font-medium text-center text-white rounded-md transition-all duration-300 bg-white/10 backdrop-blur-sm hover:bg-white/20"
							whileHover={{
								scale: 1.05,
							}}
							whileTap={{ scale: 0.98 }}
							onClick={scrollToSection} // Add smooth scroll
						>
							Our Services
						</motion.a>
					</motion.div>

					{/* Trust indicators with updated hover animations */}
					<motion.div
						className="flex flex-wrap gap-6 items-center mt-12"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.8, delay: 0.6 }}
					>
						{[
							{
								icon: (
									<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
								),
								text: "5-Star Rated",
							},
							{
								icon: (
									<path
										fillRule="evenodd"
										d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
										clipRule="evenodd"
									/>
								),
								text: "Licensed & Insured",
							},
							{
								icon: (
									<path
										fillRule="evenodd"
										d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z"
										clipRule="evenodd"
									/>
								),
								text: "20+ Years Experience",
							},
						].map((item, index) => (
							<motion.div
								key={index}
								className="flex items-center py-2 px-4 rounded-md bg-white/10 backdrop-blur-sm hover:bg-white/20"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
								whileHover={{
									scale: 1.05,
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="mr-2 w-5 h-5 text-cta"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									{item.icon}
								</svg>
								<span className="text-sm font-medium text-white">
									{item.text}
								</span>
							</motion.div>
						))}
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default Hero;

