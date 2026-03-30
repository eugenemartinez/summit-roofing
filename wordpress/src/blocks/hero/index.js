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
import { Star, ShieldCheck, Award } from "lucide-react";
import { __ } from "@wordpress/i18n";
import metadata from "./block.json";

const TRUST_INDICATORS = [
	{
		icon: <Star size={20} fill="currentColor" />,
		text: "5-Star Rated",
	},
	{
		icon: <ShieldCheck size={20} />,
		text: "Licensed & Insured",
	},
	{
		icon: <Award size={20} />,
		text: "20+ Years Experience",
	},
];
// ── Dot pattern SVG (matches render.php) ─────────────────────────────────
const DOT_PATTERN_URL = `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`;

// ── Fallback image (matches render.php default) ───────────────────────────
const FALLBACK_IMAGE =
	"https://images.pexels.com/photos/209315/pexels-photo-209315.jpeg";

// ── Editor styles ─────────────────────────────────────────────────────────
const editorStyles = `
	.hero-editor-wrap {
		position: relative;
		min-height: 80vh;
		display: flex;
		align-items: center;
		overflow: hidden;
		font-family: var(--font-body, 'Inter', sans-serif);
	}
	.hero-editor-bg {
		position: absolute;
		inset: 0;
		background-size: cover;
		background-position: center;
		z-index: 0;
	}
	.hero-editor-overlay {
		position: absolute;
		inset: 0;
		z-index: 1;
	}
	.hero-editor-dots {
		position: absolute;
		inset: 0;
		z-index: 2;
		opacity: 0.2;
		pointer-events: none;
		background-repeat: repeat;
	}
	.hero-editor-content {
		position: relative;
		z-index: 10;
		padding: 6rem 1rem;
		width: 100%;
		max-width: 1280px;
		margin: 0 auto;
	}
	.hero-editor-inner {
		max-width: 42rem;
	}
	.hero-editor-h1 {
		font-family: var(--font-headline, 'Poppins', sans-serif);
		font-size: clamp(2rem, 5vw, 3.75rem);
		font-weight: 700;
		color: #ffffff;
		margin: 0 0 1rem;
		line-height: 1.1;
		text-shadow: 0 2px 8px rgba(0,0,0,0.4);
	}
	.hero-editor-subtitle {
		font-size: 1.25rem;
		color: #ffffff;
		margin: 0 0 2rem;
		text-shadow: 0 1px 4px rgba(0,0,0,0.3);
		line-height: 1.6;
	}
	.hero-editor-buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-bottom: 3rem;
	}
	.hero-editor-btn-primary {
		padding: 0.75rem 1.5rem;
		background-color: var(--cta, #D86A6A);
		color: #ffffff;
		border-radius: 0.375rem;
		font-weight: 500;
		font-size: 1rem;
		text-decoration: none;
		display: inline-block;
	}
	.hero-editor-btn-secondary {
		padding: 0.75rem 1.5rem;
		background-color: rgba(255,255,255,0.15);
		color: #ffffff;
		border-radius: 0.375rem;
		font-weight: 500;
		font-size: 1rem;
		text-decoration: none;
		display: inline-block;
		backdrop-filter: blur(4px);
	}
	.hero-editor-trust {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		align-items: center;
	}
	.hero-editor-badge {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background-color: rgba(255,255,255,0.1);
		border-radius: 0.375rem;
		backdrop-filter: blur(4px);
		color: #ffffff;
		font-size: 0.875rem;
		font-weight: 500;
	}
	.hero-editor-badge svg {
		color: var(--cta, #D86A6A);
		flex-shrink: 0;
	}
	/* Inspector helpers */
	.hero-inspector-image-preview {
		width: 100%;
		height: 80px;
		object-fit: cover;
		border-radius: 4px;
		margin-bottom: 8px;
		display: block;
	}
	.hero-inspector-image-placeholder {
		width: 100%;
		height: 80px;
		background: #e2e8f0;
		border-radius: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		color: #94a3b8;
		margin-bottom: 8px;
	}
`;

// ── Edit ──────────────────────────────────────────────────────────────────
function Edit({ attributes, setAttributes }) {
	const {
		title,
		subtitle,
		primaryButtonText,
		primaryButtonUrl,
		secondaryButtonText,
		secondaryButtonUrl,
		backgroundImage,
		backgroundImageUrl,
		backgroundImageAlt,
		overlayOpacity,
	} = attributes;

	const blockProps = useBlockProps({ className: "hero-block-editor-root" });

	// Resolved preview image — prefer uploaded, fall back to URL, then hardcoded fallback
	const previewImage = backgroundImageUrl || FALLBACK_IMAGE;
	const overlayAlpha = (overlayOpacity ?? 50) / 100;

	return (
		<>
			{/* ── Inspector sidebar ── */}
			<InspectorControls>
				{/* Background */}
				<PanelBody title={__("Background Image", "blocks")} initialOpen={true}>
					{previewImage && (
						<img
							src={previewImage}
							alt={backgroundImageAlt || ""}
							className="hero-inspector-image-preview"
						/>
					)}

					<PanelRow>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={(media) =>
									setAttributes({
										backgroundImage: media.id,
										backgroundImageUrl: media.url,
										backgroundImageAlt: media.alt || "",
									})
								}
								allowedTypes={["image"]}
								value={backgroundImage}
								render={({ open }) => (
									<Button
										onClick={open}
										variant="secondary"
										style={{ width: "100%", justifyContent: "center" }}
									>
										{backgroundImage
											? __("Replace Image", "blocks")
											: __("Select Image", "blocks")}
									</Button>
								)}
							/>
						</MediaUploadCheck>
					</PanelRow>

					{backgroundImage > 0 && (
						<PanelRow>
							<Button
								isDestructive
								variant="tertiary"
								onClick={() =>
									setAttributes({
										backgroundImage: 0,
										backgroundImageUrl: FALLBACK_IMAGE,
										backgroundImageAlt: "",
									})
								}
								style={{ width: "100%" }}
							>
								{__("Remove Image", "blocks")}
							</Button>
						</PanelRow>
					)}

					<TextControl
						label={__("Alt Text", "blocks")}
						value={backgroundImageAlt || ""}
						onChange={(v) => setAttributes({ backgroundImageAlt: v })}
					/>

					<RangeControl
						label={__("Overlay Opacity", "blocks")}
						value={overlayOpacity}
						onChange={(v) => setAttributes({ overlayOpacity: v })}
						min={0}
						max={90}
						step={5}
					/>
				</PanelBody>

				{/* Content */}
				<PanelBody title={__("Content", "blocks")} initialOpen={true}>
					<TextControl
						label={__("Heading", "blocks")}
						value={title}
						onChange={(v) => setAttributes({ title: v })}
					/>
					<TextareaControl
						label={__("Subtitle", "blocks")}
						value={subtitle}
						rows={3}
						onChange={(v) => setAttributes({ subtitle: v })}
					/>
				</PanelBody>

				{/* Primary button */}
				<PanelBody title={__("Primary Button", "blocks")} initialOpen={false}>
					<TextControl
						label={__("Text", "blocks")}
						value={primaryButtonText}
						onChange={(v) => setAttributes({ primaryButtonText: v })}
					/>
					<TextControl
						label={__("URL", "blocks")}
						value={primaryButtonUrl}
						onChange={(v) => setAttributes({ primaryButtonUrl: v })}
						placeholder="#contact"
					/>
				</PanelBody>

				{/* Secondary button */}
				<PanelBody title={__("Secondary Button", "blocks")} initialOpen={false}>
					<TextControl
						label={__("Text", "blocks")}
						value={secondaryButtonText}
						onChange={(v) => setAttributes({ secondaryButtonText: v })}
					/>
					<TextControl
						label={__("URL", "blocks")}
						value={secondaryButtonUrl}
						onChange={(v) => setAttributes({ secondaryButtonUrl: v })}
						placeholder="#services"
					/>
				</PanelBody>
			</InspectorControls>

			{/* ── Block preview ── */}
			<div {...blockProps}>
				<style>{editorStyles}</style>

				<section className="hero-editor-wrap">
					{/* Background image */}
					<div
						className="hero-editor-bg"
						style={{ backgroundImage: `url('${previewImage}')` }}
					/>

					{/* Dark overlay */}
					<div
						className="hero-editor-overlay"
						style={{ backgroundColor: `rgba(0,0,0,${overlayAlpha})` }}
					/>

					{/* Dot pattern */}
					<div
						className="hero-editor-dots"
						style={{ backgroundImage: DOT_PATTERN_URL }}
					/>

					{/* Content */}
					<div className="hero-editor-content">
						<div className="hero-editor-inner">
							<h1 className="hero-editor-h1">{title}</h1>
							<p className="hero-editor-subtitle">{subtitle}</p>

							<div className="hero-editor-buttons">
								<span className="hero-editor-btn-primary">
									{primaryButtonText}
								</span>
								<span className="hero-editor-btn-secondary">
									{secondaryButtonText}
								</span>
							</div>

							{/* Trust indicators */}
							<div className="hero-editor-trust">
								{TRUST_INDICATORS.map((item, i) => (
									<div key={i} className="hero-editor-badge">
										{item.icon}
										<span>{item.text}</span>
									</div>
								))}
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

