import { registerBlockType } from "@wordpress/blocks";
import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from "@wordpress/block-editor";
import {
	PanelBody,
	PanelRow,
	TextControl,
	TextareaControl,
	RangeControl,
	Button,
} from "@wordpress/components";
import { Quote, Star, MapPin, ShieldCheck, Clock, Award } from "lucide-react";
import { __ } from "@wordpress/i18n";
import metadata from "./block.json";

// ── Fallback avatar URL ───────────────────────────────────────────────────
const FALLBACK_AVATARS = [
	"https://randomuser.me/api/portraits/women/32.jpg",
	"https://randomuser.me/api/portraits/men/45.jpg",
	"https://randomuser.me/api/portraits/women/64.jpg",
	"https://randomuser.me/api/portraits/men/22.jpg",
	"https://randomuser.me/api/portraits/women/45.jpg",
	"https://randomuser.me/api/portraits/men/33.jpg",
];

// ── Star renderer ─────────────────────────────────────────────────────────
const Stars = ({ rating }) => (
	<div style={{ display: "flex", gap: "2px" }}>
		{Array.from({ length: 5 }, (_, i) => (
			<Star
				key={i}
				size={16}
				color={i < rating ? "#FACC15" : "#D1D5DB"}
				fill={i < rating ? "#FACC15" : "none"}
			/>
		))}
	</div>
);

// ── Quote icon ────────────────────────────────────────────────────────────
const QuoteIcon = () => <Quote size={20} color="#ffffff" fill="#ffffff" />;

// ── Editor styles ─────────────────────────────────────────────────────────
const editorStyles = `
	.testimonials-editor-wrap {
		font-family: var(--font-body, 'Inter', sans-serif);
		background: linear-gradient(135deg, var(--primary, #1E3A5E) 0%, #152d4a 100%);
		padding: 4rem 1rem;
	}
	.testimonials-editor-container {
		max-width: 1280px;
		margin: 0 auto;
	}
	/* Header */
	.testimonials-editor-header {
		text-align: center;
		margin-bottom: 3rem;
	}
	.testimonials-editor-eyebrow {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 1rem;
	}
	.testimonials-editor-eyebrow-line {
		height: 4px;
		width: 3rem;
		background-color: var(--cta, #D86A6A);
		border-radius: 2px;
		flex-shrink: 0;
	}
	.testimonials-editor-eyebrow-line.left  { margin-right: 1rem; }
	.testimonials-editor-eyebrow-line.right { margin-left: 1rem; }
	.testimonials-editor-eyebrow-text {
		font-size: 0.875rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: #ffffff;
	}
	.testimonials-editor-heading {
		font-family: var(--font-headline, 'Poppins', sans-serif);
		font-size: clamp(1.75rem, 3vw, 2.25rem);
		font-weight: 700;
		color: #ffffff;
		margin: 0 0 1rem;
		line-height: 1.2;
	}
	.testimonials-editor-subheading {
		color: rgba(255,255,255,0.8);
		max-width: 42rem;
		margin: 0 auto;
		line-height: 1.6;
	}
	/* Cards grid */
	.testimonials-editor-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1.5rem;
		margin-bottom: 3rem;
	}
	/* Card */
	.testimonials-editor-card {
		background: #ffffff;
		border-radius: 0.5rem;
		box-shadow: 0 4px 20px rgba(0,0,0,0.12);
		padding: 1.5rem;
		position: relative;
		padding-top: 2.5rem;
	}
	.testimonials-editor-quote-badge {
		position: absolute;
		top: -1.25rem;
		left: 1.5rem;
		background-color: var(--cta, #D86A6A);
		border-radius: 9999px;
		padding: 0.75rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.testimonials-editor-avatar-row {
		display: flex;
		align-items: center;
		margin-bottom: 1rem;
		margin-top: 0.5rem;
	}
	.testimonials-editor-avatar {
		width: 3rem;
		height: 3rem;
		border-radius: 9999px;
		object-fit: cover;
		margin-right: 1rem;
		border: 2px solid rgba(30,58,95,0.15);
		flex-shrink: 0;
	}
	.testimonials-editor-name {
		font-weight: 700;
		color: var(--primary, #1E3A5E);
		margin: 0 0 2px;
		font-size: 0.95rem;
	}
	.testimonials-editor-location {
		display: flex;
		align-items: center;
		font-size: 0.8rem;
		color: var(--accent, #36454F);
		margin: 0;
	}
	.testimonials-editor-stars {
		display: flex;
		gap: 2px;
		margin-bottom: 0.75rem;
	}
	.testimonials-editor-text {
		color: var(--accent, #36454F);
		font-size: 0.9rem;
		line-height: 1.6;
		margin: 0;
	}
	/* Badges row */
	.testimonials-editor-badges {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1.5rem;
	}
	.testimonials-editor-badge {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		background: rgba(255,255,255,0.1);
		backdrop-filter: blur(4px);
		padding: 0.75rem 1.5rem;
		border-radius: 0.5rem;
		color: #ffffff;
	}
	.testimonials-editor-badge-icon {
		color: #ffffff;
		flex-shrink: 0;
	}
	.testimonials-editor-badge-title {
		font-weight: 700;
		font-size: 1.1rem;
		margin: 0 0 2px;
		line-height: 1;
	}
	.testimonials-editor-badge-subtitle {
		font-size: 0.8rem;
		opacity: 0.8;
		margin: 0;
	}
	/* Inspector helpers */
	.testimonials-inspector-card {
		border: 1px solid #e0e0e0;
		border-radius: 6px;
		padding: 12px;
		margin-bottom: 12px;
		background: #fafafa;
	}
	.testimonials-inspector-card-header {
		font-size: 12px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #555;
		margin-bottom: 8px;
	}
	.testimonials-inspector-avatar-preview {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		object-fit: cover;
		display: block;
		margin-bottom: 8px;
		border: 2px solid #e2e8f0;
	}
`;

// ── Star rating component for inspector ───────────────────────────────────
const InspectorStars = ({ rating, onChange }) => (
	<div>
		<p
			style={{
				fontSize: "11px",
				fontWeight: 600,
				color: "#777",
				textTransform: "uppercase",
				letterSpacing: "0.04em",
				marginBottom: "6px",
			}}
		>
			{__("Rating", "blocks")}
		</p>
		<div style={{ display: "flex", gap: "4px" }}>
			{Array.from({ length: 5 }, (_, i) => (
				<button
					key={i}
					onClick={() => onChange(i + 1)}
					style={{
						background: "none",
						border: "none",
						cursor: "pointer",
						padding: "2px",
						fontSize: "1.25rem",
						color: i < rating ? "#FACC15" : "#D1D5DB",
					}}
					title={`${i + 1} star${i > 0 ? "s" : ""}`}
				>
					★
				</button>
			))}
		</div>
	</div>
);

// ── Edit ──────────────────────────────────────────────────────────────────
function Edit({ attributes, setAttributes }) {
	const {
		eyebrowText,
		heading,
		subheading,
		testimonials,
		reviewScore,
		reviewCount,
		bbbRating,
		bbbLabel,
		yearsTitle,
		yearsLabel,
		autoAdvanceDelay,
	} = attributes;

	const blockProps = useBlockProps({
		className: "testimonials-block-editor-root",
	});

	// ── Testimonial helpers ──────────────────────────────────────────────
	const updateTestimonial = (index, key, value) => {
		const updated = testimonials.map((t, i) =>
			i === index ? { ...t, [key]: value } : t,
		);
		setAttributes({ testimonials: updated });
	};

	const addTestimonial = () => {
		const newId = (testimonials[testimonials.length - 1]?.id ?? 0) + 1;
		const fallback =
			FALLBACK_AVATARS[testimonials.length % FALLBACK_AVATARS.length];
		setAttributes({
			testimonials: [
				...testimonials,
				{
					id: newId,
					name: "New Reviewer",
					location: "City, CA",
					rating: 5,
					text: "",
					imageUrl: fallback,
					imageId: 0,
				},
			],
		});
	};

	const removeTestimonial = (index) => {
		setAttributes({ testimonials: testimonials.filter((_, i) => i !== index) });
	};

	// ── Render ───────────────────────────────────────────────────────────
	return (
		<>
			{/* ── Inspector sidebar ── */}
			<InspectorControls>
				{/* Section header */}
				<PanelBody title={__("Section Header", "blocks")} initialOpen={true}>
					<TextControl
						label={__("Eyebrow Text", "blocks")}
						value={eyebrowText}
						onChange={(v) => setAttributes({ eyebrowText: v })}
					/>
					<TextControl
						label={__("Heading", "blocks")}
						value={heading}
						onChange={(v) => setAttributes({ heading: v })}
					/>
					<TextareaControl
						label={__("Subheading", "blocks")}
						value={subheading}
						rows={3}
						onChange={(v) => setAttributes({ subheading: v })}
					/>
				</PanelBody>

				{/* Testimonials */}
				<PanelBody title={__("Testimonials", "blocks")} initialOpen={false}>
					{testimonials.map((testimonial, index) => (
						<div key={testimonial.id} className="testimonials-inspector-card">
							<p className="testimonials-inspector-card-header">
								{__("Review", "blocks")} {index + 1} —{" "}
								{testimonial.name || __("Unnamed", "blocks")}
							</p>

							{/* Avatar */}
							{testimonial.imageUrl && (
								<img
									src={testimonial.imageUrl}
									alt={testimonial.name}
									className="testimonials-inspector-avatar-preview"
								/>
							)}
							<PanelRow>
								<MediaUploadCheck>
									<MediaUpload
										onSelect={(media) =>
											updateTestimonial(index, "imageId", media.id) ||
											updateTestimonial(index, "imageUrl", media.url)
										}
										allowedTypes={["image"]}
										value={testimonial.imageId}
										render={({ open }) => (
											<Button
												onClick={open}
												variant="secondary"
												style={{
													width: "100%",
													justifyContent: "center",
													marginBottom: "8px",
												}}
											>
												{testimonial.imageId
													? __("Replace Avatar", "blocks")
													: __("Select Avatar", "blocks")}
											</Button>
										)}
									/>
								</MediaUploadCheck>
							</PanelRow>
							{testimonial.imageId > 0 && (
								<PanelRow>
									<Button
										isDestructive
										variant="tertiary"
										size="small"
										onClick={() => {
											const fallback =
												FALLBACK_AVATARS[index % FALLBACK_AVATARS.length];
											updateTestimonial(index, "imageId", 0);
											updateTestimonial(index, "imageUrl", fallback);
										}}
										style={{ width: "100%", marginBottom: "8px" }}
									>
										{__("Remove Avatar", "blocks")}
									</Button>
								</PanelRow>
							)}

							<TextControl
								label={__("Name", "blocks")}
								value={testimonial.name}
								onChange={(v) => updateTestimonial(index, "name", v)}
							/>
							<TextControl
								label={__("Location", "blocks")}
								value={testimonial.location}
								onChange={(v) => updateTestimonial(index, "location", v)}
							/>
							<InspectorStars
								rating={testimonial.rating}
								onChange={(v) => updateTestimonial(index, "rating", v)}
							/>
							<div style={{ marginTop: "8px" }}>
								<TextareaControl
									label={__("Review Text", "blocks")}
									value={testimonial.text}
									rows={4}
									onChange={(v) => updateTestimonial(index, "text", v)}
								/>
							</div>

							<Button
								isDestructive
								variant="tertiary"
								size="small"
								onClick={() => removeTestimonial(index)}
								disabled={testimonials.length <= 1}
								style={{ marginTop: "4px" }}
							>
								{__("Remove Review", "blocks")}
							</Button>
						</div>
					))}

					<Button
						variant="secondary"
						onClick={addTestimonial}
						disabled={testimonials.length >= 12}
						style={{ width: "100%", justifyContent: "center" }}
					>
						{__("+ Add Review", "blocks")}
					</Button>
				</PanelBody>

				{/* Review badges */}
				<PanelBody title={__("Review Badges", "blocks")} initialOpen={false}>
					<p style={{ fontSize: "11px", color: "#777", marginBottom: "12px" }}>
						{__("Star Rating Badge", "blocks")}
					</p>
					<TextControl
						label={__("Score", "blocks")}
						value={reviewScore}
						onChange={(v) => setAttributes({ reviewScore: v })}
					/>
					<TextControl
						label={__("Label", "blocks")}
						value={reviewCount}
						onChange={(v) => setAttributes({ reviewCount: v })}
					/>
					<p style={{ fontSize: "11px", color: "#777", margin: "12px 0 8px" }}>
						{__("BBB Badge", "blocks")}
					</p>
					<TextControl
						label={__("Rating", "blocks")}
						value={bbbRating}
						onChange={(v) => setAttributes({ bbbRating: v })}
					/>
					<TextControl
						label={__("Label", "blocks")}
						value={bbbLabel}
						onChange={(v) => setAttributes({ bbbLabel: v })}
					/>
					<p style={{ fontSize: "11px", color: "#777", margin: "12px 0 8px" }}>
						{__("Years Badge", "blocks")}
					</p>
					<TextControl
						label={__("Value", "blocks")}
						value={yearsTitle}
						onChange={(v) => setAttributes({ yearsTitle: v })}
					/>
					<TextControl
						label={__("Label", "blocks")}
						value={yearsLabel}
						onChange={(v) => setAttributes({ yearsLabel: v })}
					/>
				</PanelBody>

				{/* Slider settings */}
				<PanelBody title={__("Slider Settings", "blocks")} initialOpen={false}>
					<RangeControl
						label={__("Auto-advance Delay (ms)", "blocks")}
						value={autoAdvanceDelay}
						onChange={(v) => setAttributes({ autoAdvanceDelay: v })}
						min={2000}
						max={12000}
						step={500}
					/>
				</PanelBody>
			</InspectorControls>

			{/* ── Block preview ── */}
			<div {...blockProps}>
				<style>{editorStyles}</style>

				<section className="testimonials-editor-wrap">
					<div className="testimonials-editor-container">
						{/* Header */}
						<div className="testimonials-editor-header">
							<div className="testimonials-editor-eyebrow">
								<div className="testimonials-editor-eyebrow-line left" />
								<span className="testimonials-editor-eyebrow-text">
									{eyebrowText}
								</span>
								<div className="testimonials-editor-eyebrow-line right" />
							</div>
							<h2 className="testimonials-editor-heading">{heading}</h2>
							<p className="testimonials-editor-subheading">{subheading}</p>
						</div>

						{/* Cards grid */}
						<div className="testimonials-editor-grid">
							{testimonials.map((testimonial, i) => (
								<div
									key={testimonial.id ?? i}
									className="testimonials-editor-card"
								>
									{/* Quote badge */}
									<div className="testimonials-editor-quote-badge">
										<QuoteIcon />
									</div>

									{/* Avatar + name */}
									<div className="testimonials-editor-avatar-row">
										<img
											src={
												testimonial.imageUrl ||
												FALLBACK_AVATARS[i % FALLBACK_AVATARS.length]
											}
											alt={testimonial.name}
											className="testimonials-editor-avatar"
										/>
										<div>
											<p className="testimonials-editor-name">
												{testimonial.name}
											</p>
											<p className="testimonials-editor-location">
												<MapPin size={12} style={{ marginRight: "4px" }} />
												{testimonial.location}
											</p>
										</div>
									</div>

									{/* Stars */}
									<div className="testimonials-editor-stars">
										{Array.from({ length: 5 }, (_, si) => (
											<span
												key={si}
												style={{
													fontSize: "1rem",
													color:
														si < testimonial.rating ? "#FACC15" : "#D1D5DB",
												}}
											>
												★
											</span>
										))}
									</div>

									{/* Text */}
									<p className="testimonials-editor-text">
										&ldquo;{testimonial.text}&rdquo;
									</p>
								</div>
							))}
						</div>

						{/* Badges row */}
						<div className="testimonials-editor-badges">
							<div className="testimonials-editor-badge">
								<Star size={24} className="testimonials-editor-badge-icon" />
								<div>
									<p className="testimonials-editor-badge-title">
										{reviewScore}
									</p>
									<p className="testimonials-editor-badge-subtitle">
										{reviewCount}
									</p>
								</div>
							</div>
							<div className="testimonials-editor-badge">
								<ShieldCheck
									size={24}
									className="testimonials-editor-badge-icon"
								/>
								<div>
									<p className="testimonials-editor-badge-title">{bbbRating}</p>
									<p className="testimonials-editor-badge-subtitle">
										{bbbLabel}
									</p>
								</div>
							</div>
							<div className="testimonials-editor-badge">
								<Clock size={24} className="testimonials-editor-badge-icon" />
								<div>
									<p className="testimonials-editor-badge-title">
										{yearsTitle}
									</p>
									<p className="testimonials-editor-badge-subtitle">
										{yearsLabel}
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</>
	);
}

// ── Register ──────────────────────────────────────────────────────────────
registerBlockType(metadata.name, {
	edit: Edit,
	save: () => null,
});
