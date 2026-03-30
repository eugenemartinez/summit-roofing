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
	Button,
	__experimentalInputControl as InputControl,
} from "@wordpress/components";
import { Check, ArrowRight } from "lucide-react";
import { __ } from "@wordpress/i18n";
import metadata from "./block.json";

// ── Editor styles (scoped — mirrors the front-end layout without motion) ──
const editorStyles = `
	.about-editor-wrap {
		font-family: var(--font-body, 'Inter', sans-serif);
		background: #F5F5F5;
		padding: 4rem 1rem;
	}
	.about-editor-inner {
		max-width: 1280px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 3rem;
		align-items: center;
	}
	@media (min-width: 1024px) {
		.about-editor-inner {
			flex-direction: row;
		}
	}
	/* ── Image column ── */
	.about-editor-image-col {
		width: 100%;
		position: relative;
	}
	@media (min-width: 1024px) {
		.about-editor-image-col { width: 50%; }
	}
	.about-editor-image-col img {
		border-radius: 0.5rem;
		box-shadow: 0 10px 30px rgba(0,0,0,0.15);
		width: 100%;
		height: 500px;
		object-fit: cover;
		display: block;
	}
	.about-editor-badge {
		position: absolute;
		bottom: -1.5rem;
		right: -1.5rem;
		background: #ffffff;
		padding: 1rem;
		border-radius: 0.5rem;
		box-shadow: 0 10px 30px rgba(0,0,0,0.2);
		display: none;
	}
	@media (min-width: 768px) {
		.about-editor-badge { display: block; }
	}
	.about-editor-badge-number {
		font-family: var(--font-headline, 'Poppins', sans-serif);
		font-size: 2.25rem;
		font-weight: 700;
		color: var(--primary, #1E3A5E);
		line-height: 1;
	}
	.about-editor-badge-label {
		font-size: 0.875rem;
		color: var(--accent, #36454F);
		margin-top: 0.25rem;
	}
	/* ── Content column ── */
	.about-editor-content-col {
		width: 100%;
	}
	@media (min-width: 1024px) {
		.about-editor-content-col { width: 50%; }
	}
	.about-editor-eyebrow {
		display: flex;
		align-items: center;
		margin-bottom: 1rem;
	}
	.about-editor-eyebrow-line {
		height: 4px;
		width: 3rem;
		background: var(--cta, #D86A6A);
		margin-right: 1rem;
		border-radius: 2px;
		flex-shrink: 0;
	}
	.about-editor-eyebrow-text {
		font-size: 0.875rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--accent, #36454F);
	}
	.about-editor-heading {
		font-family: var(--font-headline, 'Poppins', sans-serif);
		font-size: clamp(1.75rem, 3vw, 2.25rem);
		font-weight: 700;
		color: var(--primary, #1E3A5E);
		margin: 0 0 1.5rem;
		line-height: 1.2;
	}
	.about-editor-body {
		color: var(--accent, #36454F);
		margin-bottom: 1.5rem;
		line-height: 1.6;
	}
	.about-editor-features {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
		margin-bottom: 2rem;
	}
	@media (min-width: 768px) {
		.about-editor-features { grid-template-columns: 1fr 1fr; }
	}
	.about-editor-feature {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
	}
	.about-editor-feature-icon {
		background: var(--primary, #1E3A5E);
		border-radius: 9999px;
		padding: 0.5rem;
		color: #fff;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.about-editor-feature-title {
		font-weight: 600;
		color: var(--primary, #1E3A5E);
		margin: 0 0 0.25rem;
		font-size: 0.95rem;
	}
	.about-editor-feature-desc {
		font-size: 0.875rem;
		color: var(--accent, #36454F);
		margin: 0;
	}
	.about-editor-cta {
		display: inline-flex;
		align-items: center;
		color: var(--cta, #D86A6A);
		font-weight: 500;
		text-decoration: none;
		font-size: 1rem;
	}
	/* ── Inspector panel helpers ── */
	.about-inspector-feature {
		border: 1px solid #e0e0e0;
		border-radius: 6px;
		padding: 12px;
		margin-bottom: 12px;
		background: #fafafa;
	}
	.about-inspector-feature-header {
		font-size: 12px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #555;
		margin-bottom: 8px;
	}
	.about-inspector-remove-btn {
		margin-top: 6px;
	}
	.about-inspector-add-btn {
		width: 100%;
		justify-content: center;
		margin-top: 4px;
	}
`;

// ── Edit component ────────────────────────────────────────────────────────
function Edit({ attributes, setAttributes }) {
	const {
		eyebrowText,
		heading,
		body,
		features,
		ctaText,
		ctaUrl,
		badgeNumber,
		badgeLabel,
		imageUrl,
		imageId,
		imageAlt,
	} = attributes;

	const blockProps = useBlockProps({ className: "about-block-editor-root" });

	// ── Feature helpers ──────────────────────────────────────────────────
	const updateFeature = (index, key, value) => {
		const updated = features.map((f, i) =>
			i === index ? { ...f, [key]: value } : f,
		);
		setAttributes({ features: updated });
	};

	const addFeature = () => {
		setAttributes({
			features: [...features, { title: "New Feature", description: "" }],
		});
	};

	const removeFeature = (index) => {
		setAttributes({ features: features.filter((_, i) => i !== index) });
	};

	// ── Render ───────────────────────────────────────────────────────────
	return (
		<>
			{/* ── Inspector sidebar ── */}
			<InspectorControls>
				{/* Image */}
				<PanelBody title={__("Image", "blocks")} initialOpen={true}>
					<PanelRow>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={(media) =>
									setAttributes({
										imageUrl: media.url,
										imageId: media.id,
										imageAlt: media.alt || imageAlt,
									})
								}
								allowedTypes={["image"]}
								value={imageId}
								render={({ open }) => (
									<Button
										onClick={open}
										variant="secondary"
										style={{ width: "100%", justifyContent: "center" }}
									>
										{imageId
											? __("Replace Image", "blocks")
											: __("Select Image", "blocks")}
									</Button>
								)}
							/>
						</MediaUploadCheck>
					</PanelRow>
					{imageId > 0 && (
						<PanelRow>
							<Button
								isDestructive
								variant="tertiary"
								onClick={() =>
									setAttributes({ imageUrl: "", imageId: 0, imageAlt: "" })
								}
								style={{ width: "100%" }}
							>
								{__("Remove Image", "blocks")}
							</Button>
						</PanelRow>
					)}
					<TextControl
						label={__("Alt Text", "blocks")}
						value={imageAlt}
						onChange={(v) => setAttributes({ imageAlt: v })}
					/>
				</PanelBody>

				{/* Badge */}
				<PanelBody title={__("Experience Badge", "blocks")} initialOpen={false}>
					<TextControl
						label={__("Number / Value", "blocks")}
						value={badgeNumber}
						onChange={(v) => setAttributes({ badgeNumber: v })}
					/>
					<TextControl
						label={__("Label", "blocks")}
						value={badgeLabel}
						onChange={(v) => setAttributes({ badgeLabel: v })}
					/>
				</PanelBody>

				{/* Content */}
				<PanelBody title={__("Content", "blocks")} initialOpen={true}>
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
						label={__("Body Paragraph", "blocks")}
						value={body}
						rows={5}
						onChange={(v) => setAttributes({ body: v })}
					/>
				</PanelBody>

				{/* Features */}
				<PanelBody title={__("Features", "blocks")} initialOpen={false}>
					{features.map((feature, index) => (
						<div key={index} className="about-inspector-feature">
							<p className="about-inspector-feature-header">
								{__("Feature", "blocks")} {index + 1}
							</p>
							<TextControl
								label={__("Title", "blocks")}
								value={feature.title}
								onChange={(v) => updateFeature(index, "title", v)}
							/>
							<TextControl
								label={__("Description", "blocks")}
								value={feature.description}
								onChange={(v) => updateFeature(index, "description", v)}
							/>
							<Button
								isDestructive
								variant="tertiary"
								size="small"
								className="about-inspector-remove-btn"
								onClick={() => removeFeature(index)}
								disabled={features.length <= 1}
							>
								{__("Remove", "blocks")}
							</Button>
						</div>
					))}
					<Button
						variant="secondary"
						className="about-inspector-add-btn"
						onClick={addFeature}
						disabled={features.length >= 6}
					>
						{__("+ Add Feature", "blocks")}
					</Button>
				</PanelBody>

				{/* CTA */}
				<PanelBody title={__("CTA Link", "blocks")} initialOpen={false}>
					<TextControl
						label={__("Link Text", "blocks")}
						value={ctaText}
						onChange={(v) => setAttributes({ ctaText: v })}
					/>
					<TextControl
						label={__("Link URL", "blocks")}
						value={ctaUrl}
						onChange={(v) => setAttributes({ ctaUrl: v })}
						placeholder="#services"
					/>
				</PanelBody>
			</InspectorControls>

			{/* ── Block preview in editor ── */}
			<div {...blockProps}>
				<style>{editorStyles}</style>

				<section className="about-editor-wrap">
					<div className="about-editor-inner">
						{/* ── Image column ── */}
						<div className="about-editor-image-col">
							<div style={{ position: "relative" }}>
								{imageUrl ? (
									<img src={imageUrl} alt={imageAlt} />
								) : (
									<div
										style={{
											width: "100%",
											height: "500px",
											background: "#e2e8f0",
											borderRadius: "0.5rem",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											color: "#94a3b8",
											fontSize: "0.875rem",
										}}
									>
										{__("Select an image in the sidebar →", "blocks")}
									</div>
								)}

								{/* Badge */}
								<div className="about-editor-badge">
									<div className="about-editor-badge-number">{badgeNumber}</div>
									<div className="about-editor-badge-label">{badgeLabel}</div>
								</div>
							</div>
						</div>

						{/* ── Content column ── */}
						<div className="about-editor-content-col">
							{/* Eyebrow */}
							<div className="about-editor-eyebrow">
								<div className="about-editor-eyebrow-line" />
								<span className="about-editor-eyebrow-text">{eyebrowText}</span>
							</div>

							{/* Heading */}
							<h2 className="about-editor-heading">{heading}</h2>

							{/* Body */}
							<p className="about-editor-body">{body}</p>

							{/* Features grid */}
							<div className="about-editor-features">
								{features.map((feature, index) => (
									<div key={index} className="about-editor-feature">
										<div className="about-editor-feature-icon">
											<Check
												size={20}
												className="mr-2 text-cta"
												strokeWidth={3}
											/>
										</div>
										<div>
											<h4 className="about-editor-feature-title">
												{feature.title}
											</h4>
											<p className="about-editor-feature-desc">
												{feature.description}
											</p>
										</div>
									</div>
								))}
							</div>

							{/* CTA */}
							<span className="about-editor-cta">
								{ctaText}
								<ArrowRight size={20} style={{ marginLeft: "0.5rem" }} />
							</span>
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
	save: () => null, // server-side rendered via render.php
});

