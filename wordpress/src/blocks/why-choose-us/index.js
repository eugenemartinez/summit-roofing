import { registerBlockType } from "@wordpress/blocks";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import {
	PanelBody,
	TextControl,
	TextareaControl,
	Button,
	BaseControl,
} from "@wordpress/components";
import {
	Trash2,
	Plus,
	Star,
	Medal,
	Briefcase,
	DollarSign,
	Clock,
	Shield,
	ThumbsUp,
} from "lucide-react";

registerBlockType("theme/why-choose-us", {
	edit: ({ attributes, setAttributes }) => {
		const blockProps = useBlockProps({
			className: "py-6 px-4",
		});

		const {
			title,
			subtitle,
			description,
			section1Title,
			section1Description,
			section1Image,
			section1Points,
			section2Title,
			section2Description,
			section2Image,
			section2Points,
			benefits,
			ctaText,
			ctaUrl,
		} = attributes;

		const safeSection1Points = Array.isArray(section1Points)
			? section1Points
			: [];
		const safeSection2Points = Array.isArray(section2Points)
			? section2Points
			: [];
		const safeBenefits = Array.isArray(benefits) ? benefits : [];
		const safeSection1Image =
			typeof section1Image === "string" ? section1Image : "";
		const safeSection2Image =
			typeof section2Image === "string" ? section2Image : "";
		const safeTitle = typeof title === "string" ? title : "";
		const safeSubtitle = typeof subtitle === "string" ? subtitle : "";
		const safeDescription = typeof description === "string" ? description : "";
		const safeCtaText = typeof ctaText === "string" ? ctaText : "";
		const safeCtaUrl = typeof ctaUrl === "string" ? ctaUrl : "#";

		// Helper functions for benefits management
		const currentBenefits = safeBenefits;

		const updateBenefit = (id, field, value) => {
			const updated = currentBenefits.map((b) =>
				b.id === id ? { ...b, [field]: value } : b,
			);
			setAttributes({ benefits: updated });
		};

		const removeBenefit = (id) => {
			setAttributes({ benefits: currentBenefits.filter((b) => b.id !== id) });
		};

		const addBenefit = () => {
			const maxId = Math.max(...currentBenefits.map((b) => b.id), 0);
			setAttributes({
				benefits: [
					...currentBenefits,
					{
						id: maxId + 1,
						title: "New Benefit",
						description: "",
						icon: "star",
					},
				],
			});
		};

		// Helper functions for section points
		const currentSection1Points = safeSection1Points;
		const currentSection2Points = safeSection2Points;

		const normalizeLucideName = (name) => {
			if (!name || typeof name !== "string") {
				return "";
			}
			return name
				.split("-")
				.map((token) => token.charAt(0).toUpperCase() + token.slice(1))
				.join("");
		};

		const ICON_MAP = {
			medal: Medal,
			briefcase: Briefcase,
			"dollar-sign": DollarSign,
			clock: Clock,
			shield: Shield,
			"thumbs-up": ThumbsUp,
			star: Star,
		};

		const getBenefitIcon = (name) => {
			const iconName = normalizeLucideName(name) || "Star";
			return ICON_MAP[name] || Star;
		};

		const updateSectionPoints = (section, index, value) => {
			const key = `section${section}Points`;
			const currentPoints =
				section === 1 ? currentSection1Points : currentSection2Points;
			const updated = [...currentPoints];
			updated[index] = value;
			setAttributes({ [key]: updated });
		};

		const removeSectionPoint = (section, index) => {
			const key = `section${section}Points`;
			const currentPoints =
				section === 1 ? currentSection1Points : currentSection2Points;
			const updated = currentPoints.filter((_, i) => i !== index);
			setAttributes({ [key]: updated });
		};

		const addSectionPoint = (section) => {
			const key = `section${section}Points`;
			const currentPoints =
				section === 1 ? currentSection1Points : currentSection2Points;
			setAttributes({ [key]: [...currentPoints, "New point"] });
		};

		return (
			<>
				<InspectorControls>
					{/* Header Section */}
					<PanelBody title="Header Section" initialOpen={true}>
						<TextControl
							label="Subtitle (Eyebrow)"
							value={subtitle}
							onChange={(value) => setAttributes({ subtitle: value })}
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
						<TextControl
							label="Title"
							value={title}
							onChange={(value) => setAttributes({ title: value })}
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
						<TextareaControl
							label="Description"
							value={description}
							onChange={(value) => setAttributes({ description: value })}
							__nextHasNoMarginBottom
						/>
					</PanelBody>

					{/* Section 1 */}
					<PanelBody title="Professional Team Section">
						<TextControl
							label="Title"
							value={section1Title}
							onChange={(value) => setAttributes({ section1Title: value })}
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
						<TextareaControl
							label="Description"
							value={section1Description}
							onChange={(value) =>
								setAttributes({ section1Description: value })
							}
							__nextHasNoMarginBottom
						/>
						<TextControl
							label="Image URL"
							value={section1Image}
							onChange={(value) => setAttributes({ section1Image: value })}
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
						<BaseControl label="Bullet Points">
							{safeSection1Points.map((point, index) => (
								<div
									key={index}
									style={{
										display: "flex",
										marginBottom: "8px",
										gap: "8px",
									}}
								>
									<TextControl
										value={point}
										onChange={(value) => updateSectionPoints(1, index, value)}
										placeholder="Enter point"
										style={{ flex: 1 }}
									/>
									<Button
										onClick={() => removeSectionPoint(1, index)}
										isSmall
										isDestructive
									>
										<Trash2 size={14} />
									</Button>
								</div>
							))}
							<Button onClick={() => addSectionPoint(1)} isSmall>
								<Plus size={14} style={{ marginRight: "6px" }} />
								Add Point
							</Button>
						</BaseControl>
					</PanelBody>

					{/* Section 2 */}
					<PanelBody title="Premium Materials Section">
						<TextControl
							label="Title"
							value={section2Title}
							onChange={(value) => setAttributes({ section2Title: value })}
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
						<TextareaControl
							label="Description"
							value={section2Description}
							onChange={(value) =>
								setAttributes({ section2Description: value })
							}
							__nextHasNoMarginBottom
						/>
						<TextControl
							label="Image URL"
							value={section2Image}
							onChange={(value) => setAttributes({ section2Image: value })}
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
						<BaseControl label="Bullet Points">
							{safeSection2Points.map((point, index) => (
								<div
									key={index}
									style={{
										display: "flex",
										marginBottom: "8px",
										gap: "8px",
									}}
								>
									<TextControl
										value={point}
										onChange={(value) => updateSectionPoints(2, index, value)}
										placeholder="Enter point"
										style={{ flex: 1 }}
									/>
									<Button
										onClick={() => removeSectionPoint(2, index)}
										isSmall
										isDestructive
									>
										<Trash2 size={14} />
									</Button>
								</div>
							))}
							<Button onClick={() => addSectionPoint(2)} isSmall>
								<Plus size={14} style={{ marginRight: "6px" }} />
								Add Point
							</Button>
						</BaseControl>
					</PanelBody>

					{/* Benefits */}
					<PanelBody title="Benefits Cards" initialOpen={false}>
						{safeBenefits.map((benefit) => (
							<BaseControl key={benefit.id} label={`Benefit: ${benefit.title}`}>
								<TextControl
									label="Title"
									value={benefit.title}
									onChange={(value) =>
										updateBenefit(benefit.id, "title", value)
									}
									style={{ marginBottom: "8px" }}
								/>
								<TextareaControl
									label="Description"
									value={benefit.description}
									onChange={(value) =>
										updateBenefit(benefit.id, "description", value)
									}
									style={{ marginBottom: "8px" }}
								/>
								<TextControl
									label="Icon (Lucide name)"
									value={benefit.icon}
									onChange={(value) => updateBenefit(benefit.id, "icon", value)}
									style={{ marginBottom: "8px" }}
								/>
								<Button
									onClick={() => removeBenefit(benefit.id)}
									isDestructive
									isSmall
								>
									<Trash2 size={14} style={{ marginRight: "6px" }} />
									Remove Benefit
								</Button>
								<hr style={{ margin: "16px 0" }} />
							</BaseControl>
						))}
						<Button onClick={addBenefit} icon={Plus} variant="primary">
							Add Benefit
						</Button>
					</PanelBody>

					{/* CTA */}
					<PanelBody title="Call to Action" initialOpen={false}>
						<TextControl
							label="CTA Text"
							value={ctaText}
							onChange={(value) => setAttributes({ ctaText: value })}
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
						<TextControl
							label="CTA URL"
							value={ctaUrl}
							onChange={(value) => setAttributes({ ctaUrl: value })}
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
					</PanelBody>
				</InspectorControls>

				<div {...blockProps}>
					{/* Preview */}
					<div
						style={{
							backgroundColor: "#f5f5f5",
							padding: "24px",
							borderRadius: "8px",
							fontFamily: "system-ui, sans-serif",
						}}
					>
						<div style={{ textAlign: "center", marginBottom: "24px" }}>
							<p
								style={{
									color: "#999",
									fontSize: "12px",
									marginBottom: "8px",
									textTransform: "uppercase",
									letterSpacing: "1px",
								}}
							>
								{safeSubtitle}
							</p>
							<h2
								style={{
									fontSize: "32px",
									fontWeight: "bold",
									margin: "0 0 16px",
								}}
							>
								{safeTitle}
							</h2>
							<p style={{ color: "#666", maxWidth: "600px", margin: "0 auto" }}>
								{safeDescription}
							</p>
						</div>

						{/* Section 1 Preview */}
						<div
							style={{
								display: "grid",
								gridTemplateColumns: "1fr 1fr",
								gap: "24px",
								marginBottom: "32px",
								alignItems: "center",
							}}
						>
							<div>
								<h3
									style={{
										fontSize: "20px",
										fontWeight: "bold",
										marginBottom: "12px",
									}}
								>
									{section1Title}
								</h3>
								<p
									style={{
										color: "#666",
										marginBottom: "16px",
										fontSize: "14px",
									}}
								>
									{section1Description}
								</p>
								<ul style={{ margin: 0, paddingLeft: "20px" }}>
									{safeSection1Points.map((point, i) => (
										<li
											key={i}
											style={{
												fontSize: "14px",
												color: "#666",
												marginBottom: "8px",
											}}
										>
											{point}
										</li>
									))}
								</ul>
							</div>
							<div
								style={{
									height: "300px",
									backgroundColor: "#ddd",
									borderRadius: "8px",
									overflow: "hidden",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									fontSize: "12px",
									color: "#999",
								}}
							>
								{safeSection1Image ? (
									<img
										src={safeSection1Image}
										alt={section1Title || "Section 1"}
										style={{
											width: "100%",
											height: "100%",
											objectFit: "cover",
										}}
									/>
								) : (
									<span>No image URL</span>
								)}
							</div>
						</div>

						{/* Section 2 Preview (reversed) */}
						<div
							style={{
								display: "grid",
								gridTemplateColumns: "1fr 1fr",
								gap: "24px",
								marginBottom: "32px",
								alignItems: "center",
							}}
						>
							<div
								style={{
									height: "300px",
									backgroundColor: "#ddd",
									borderRadius: "8px",
									overflow: "hidden",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									fontSize: "12px",
									color: "#999",
									order: -1,
								}}
							>
								{safeSection2Image ? (
									<img
										src={safeSection2Image}
										alt={section2Title || "Section 2"}
										style={{
											width: "100%",
											height: "100%",
											objectFit: "cover",
										}}
									/>
								) : (
									<span>No image URL</span>
								)}
							</div>
							<div>
								<h3
									style={{
										fontSize: "20px",
										fontWeight: "bold",
										marginBottom: "12px",
									}}
								>
									{section2Title}
								</h3>
								<p
									style={{
										color: "#666",
										marginBottom: "16px",
										fontSize: "14px",
									}}
								>
									{section2Description}
								</p>
								<ul style={{ margin: 0, paddingLeft: "20px" }}>
									{safeSection2Points.map((point, i) => (
										<li
											key={i}
											style={{
												fontSize: "14px",
												color: "#666",
												marginBottom: "8px",
											}}
										>
											{point}
										</li>
									))}
								</ul>
							</div>
						</div>

						{/* Benefits Preview */}
						<div style={{ marginBottom: "24px" }}>
							<h3
								style={{
									textAlign: "center",
									fontSize: "20px",
									fontWeight: "bold",
									marginBottom: "16px",
								}}
							>
								Benefits
							</h3>
							<div
								style={{
									display: "grid",
									gridTemplateColumns: "repeat(3, 1fr)",
									gap: "16px",
								}}
							>
								{safeBenefits.map((benefit) => {
									const BenefitIcon = getBenefitIcon(benefit.icon);
									return (
										<div
											key={benefit.id}
											style={{
												backgroundColor: "white",
												padding: "16px",
												borderRadius: "8px",
												textAlign: "center",
											}}
										>
											<div
												style={{
													fontSize: "24px",
													marginBottom: "8px",
													color: "#D86A6A",
													display: "flex",
													justifyContent: "center",
												}}
											>
												<BenefitIcon size={24} />
											</div>
											<h4
												style={{
													fontSize: "14px",
													fontWeight: "bold",
													margin: "0 0 8px",
												}}
											>
												{benefit.title}
											</h4>
											<p style={{ fontSize: "12px", color: "#666", margin: 0 }}>
												{benefit.description.substring(0, 50)}...
											</p>
										</div>
									);
								})}
							</div>
						</div>

						{/* CTA Preview */}
						<div style={{ textAlign: "center" }}>
							<button
								style={{
									padding: "12px 32px",
									backgroundColor: "#D86A6A",
									color: "white",
									border: "none",
									borderRadius: "4px",
									cursor: "pointer",
									fontSize: "14px",
									fontWeight: "bold",
								}}
							>
								{safeCtaText || "Experience the Summit Difference"}
							</button>
						</div>
					</div>
				</div>
			</>
		);
	},

	save: () => null,
});
