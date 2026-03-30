import React from "react";
import { motion } from "framer-motion";
import useSmoothScroll from "../hooks/useSmoothScroll"; // Import our hook

const About = () => {
	// Use the smooth scroll hook with a header offset
	const { scrollToSection } = useSmoothScroll(80);

	return (
		<section id="about" className="py-16 bg-neutral-bg">
			<div className="container px-4 mx-auto">
				<motion.div
					className="flex flex-col gap-12 items-center lg:flex-row"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true, margin: "-100px" }}
				>
					{/* Image side - with animations */}
					<motion.div
						className="lg:w-1/2"
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						viewport={{ once: true, margin: "-100px" }}
					>
						<div className="relative">
							<motion.img
								src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?"
								alt="Summit Roofing team"
								className="object-cover w-full rounded-lg shadow-lg h-[500px]"
								initial={{ filter: "blur(10px)" }}
								whileInView={{ filter: "blur(0px)" }}
								transition={{ duration: 0.8 }}
								viewport={{ once: true, margin: "-100px" }}
							/>
							<motion.div
								className="hidden absolute -right-6 -bottom-6 p-4 bg-white rounded-lg shadow-xl md:block"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.6 }}
								viewport={{ once: true, margin: "-100px" }}
							>
								<motion.p
									className="text-4xl font-bold text-primary"
									initial={{ scale: 0.8 }}
									whileInView={{ scale: 1 }}
									transition={{ duration: 0.4, delay: 0.9 }}
									viewport={{ once: true }}
								>
									20+
								</motion.p>
								<p className="text-accent">Years Experience</p>
							</motion.div>
						</div>
					</motion.div>

					{/* Content side - with staggered animations */}
					<motion.div
						className="lg:w-1/2"
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						viewport={{ once: true, margin: "-100px" }}
					>
						<motion.div
							className="flex items-center mb-4"
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5 }}
							viewport={{ once: true }}
						>
							<div className="mr-4 w-12 h-1 bg-cta"></div>
							<span className="text-sm font-semibold tracking-wider uppercase text-accent">
								About Us
							</span>
						</motion.div>

						<motion.h2
							className="mb-6 text-3xl font-bold md:text-4xl text-primary"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							viewport={{ once: true }}
						>
							Your Trusted Local Roofing Experts Since 2003
						</motion.h2>

						<motion.p
							className="mb-6 text-accent"
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							transition={{ duration: 0.6, delay: 0.3 }}
							viewport={{ once: true }}
						>
							At Summit Roofing, we've built our reputation on quality
							craftsmanship, honest pricing, and exceptional customer service.
							Our team of experienced professionals is dedicated to providing
							top-tier roofing solutions for both residential and commercial
							properties.
						</motion.p>

						<motion.div
							className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2"
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							transition={{ duration: 0.5, delay: 0.4 }}
							viewport={{ once: true }}
						>
							{[
								{
									title: "Expert Installation",
									description:
										"Trained professionals with meticulous attention to detail",
								},
								{
									title: "Quality Materials",
									description: "Premium products from trusted manufacturers",
								},
								{
									title: "Comprehensive Warranty",
									description: "Peace of mind with our workmanship guarantee",
								},
								{
									title: "Free Inspections",
									description: "Thorough assessments with no obligation",
								},
							].map((item, index) => (
								<motion.div
									key={index}
									className="flex items-start"
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
									viewport={{ once: true }}
									whileHover={{ scale: 1.02, x: 5 }}
								>
									<div className="p-2 mr-4 text-white rounded-full bg-primary">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="w-5 h-5"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd"
											/>
										</svg>
									</div>
									<div>
										<h4 className="mb-1 font-semibold text-primary">
											{item.title}
										</h4>
										<p className="text-sm text-accent">{item.description}</p>
									</div>
								</motion.div>
							))}
						</motion.div>

						{/* Add smooth scroll to the "Explore Our Services" link */}
						<motion.a
							href="#services"
							className="inline-flex items-center font-medium transition-colors duration-300 cursor-pointer text-cta group hover:text-secondary"
							whileHover={{ x: 5 }}
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							transition={{ duration: 0.5, delay: 0.9 }}
							viewport={{ once: true }}
							onClick={scrollToSection} // Add smooth scroll
						>
							Explore Our Services
							<motion.svg
								xmlns="http://www.w3.org/2000/svg"
								className="ml-2 w-5 h-5"
								viewBox="0 0 20 20"
								fill="currentColor"
								initial={{ x: 0 }}
								animate={{ x: [0, 5, 0] }}
								transition={{
									duration: 1.5,
									repeat: Infinity,
									repeatType: "loop",
									ease: "easeInOut",
								}}
							>
								<path
									fillRule="evenodd"
									d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
									clipRule="evenodd"
								/>
							</motion.svg>
						</motion.a>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
};

export default About;

