import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import {
	PanelBody,
	PanelRow,
	TextControl,
	TextareaControl,
	SelectControl,
	Button,
} from "@wordpress/components";
import {
	Home,
	Building2,
	Wrench,
	ClipboardList,
	Zap,
	Leaf,
	Check,
	ArrowRight,
} from "lucide-react";
import { __ } from "@wordpress/i18n";
import metadata from "./block.json";

// ── Icon map — inline SVGs keyed by the icon string stored in attributes ──
const ICON_MAP = {
	home: <Home size={48} strokeWidth={1.5} />,
	building: <Building2 size={48} strokeWidth={1.5} />,
	tools: <Wrench size={48} strokeWidth={1.5} />,
	clipboard: <ClipboardList size={48} strokeWidth={1.5} />,
	storm: <Zap size={48} strokeWidth={1.5} />,
	leaf: <Leaf size={48} strokeWidth={1.5} />,
};

const ICON_OPTIONS = [
	{ label: "Residential (Home)", value: "home" },
	{ label: "Commercial (Building)", value: "building" },
	{ label: "Repair (Tools)", value: "tools" },
	{ label: "Inspection (Clipboard)", value: "clipboard" },
	{ label: "Emergency (Storm)", value: "storm" },
	{ label: "Eco-Friendly (Leaf)", value: "leaf" },
];

// ── Editor styles ─────────────────────────────────────────────────────────
const editorStyles = `
	.services-editor-wrap {
		font-family: var(--font-body, 'Inter', sans-serif);
		background: #ffffff;
		padding: 4rem 1rem;
	}
	.services-editor-container {
		max-width: 1280px;
		margin: 0 auto;
	}
	/* Header */
	.services-editor-header {
		text-align: center;
		margin-bottom: 3rem;
	}
	.services-editor-eyebrow {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 1rem;
		gap: 0;
	}
	.services-editor-eyebrow-line {
		height: 4px;
		width: 3rem;
		background-color: var(--cta, #D86A6A);
		border-radius: 2px;
	}
	.services-editor-eyebrow-line.left  { margin-right: 1rem; }
	.services-editor-eyebrow-line.right { margin-left: 1rem; }
	.services-editor-eyebrow-text {
		font-size: 0.875rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--accent, #36454F);
	}
	.services-editor-heading {
		font-family: var(--font-headline, 'Poppins', sans-serif);
		font-size: clamp(1.75rem, 3vw, 2.25rem);
		font-weight: 700;
		color: var(--primary, #1E3A5E);
		margin: 0 0 1rem;
		line-height: 1.2;
	}
	.services-editor-subheading {
		color: var(--accent, #36454F);
		max-width: 42rem;
		margin: 0 auto;
		line-height: 1.6;
	}
	/* Grid */
	.services-editor-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 2rem;
		margin-bottom: 4rem;
	}
	/* Card */
	.services-editor-card {
		background: #F5F5F5;
		border-radius: 0.5rem;
		padding: 2rem;
		box-shadow: 0 1px 3px rgba(0,0,0,0.08);
		display: flex;
		flex-direction: column;
		height: 100%;
	}
	.services-editor-card-top {
		text-align: center;
		margin-bottom: 1.5rem;
	}
	.services-editor-icon-wrap {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: rgba(30,58,95,0.05);
		border-radius: 9999px;
		padding: 1.25rem;
		margin-bottom: 1rem;
		color: var(--cta, #D86A6A);
	}
	.services-editor-card-title {
		font-family: var(--font-headline, 'Poppins', sans-serif);
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--primary, #1E3A5E);
		margin: 0;
	}
	.services-editor-card-desc {
		color: var(--accent, #36454F);
		margin: 0 0 1.5rem;
		flex-grow: 1;
		line-height: 1.6;
		font-size: 0.95rem;
	}
	.services-editor-features {
		list-style: none;
		padding: 0;
		margin: 0 0 1.5rem;
		border-top: 1px solid #e5e7eb;
		padding-top: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.services-editor-feature-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.875rem;
		color: var(--accent, #36454F);
	}
	.services-editor-feature-item svg {
		color: var(--cta, #D86A6A);
	}
	.services-editor-card-cta {
		display: block;
		width: 100%;
		text-align: center;
		background-color: var(--primary, #1E3A5E);
		color: #ffffff;
		font-weight: 500;
		padding: 0.5rem 1rem;
		border-radius: 0.375rem;
		font-size: 0.95rem;
		border-top: 1px solid #e5e7eb;
		padding-top: 1rem;
		margin-top: auto;
		text-decoration: none;
	}
	/* Banner */
	.services-editor-banner {
		background: rgba(30,58,95,0.05);
		border: 1px solid rgba(30,58,95,0.1);
		border-radius: 0.5rem;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		align-items: flex-start;
	}
	@media (min-width: 768px) {
		.services-editor-banner {
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
		}
	}
	.services-editor-banner-heading {
		font-family: var(--font-headline, 'Poppins', sans-serif);
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--primary, #1E3A5E);
		margin: 0 0 0.5rem;
	}
	.services-editor-banner-subtext {
		color: var(--accent, #36454F);
		margin: 0;
		font-size: 0.95rem;
	}
	.services-editor-banner-cta {
		display: inline-flex;
		align-items: center;
		background-color: var(--cta, #D86A6A);
		color: #ffffff;
		font-weight: 500;
		padding: 0.75rem 1.5rem;
		border-radius: 0.375rem;
		white-space: nowrap;
		text-decoration: none;
		font-size: 0.95rem;
		flex-shrink: 0;
	}
	/* Inspector helpers */
	.services-inspector-card {
		border: 1px solid #e0e0e0;
		border-radius: 6px;
		padding: 12px;
		margin-bottom: 12px;
		background: #fafafa;
	}
	.services-inspector-card-header {
		font-size: 12px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #555;
		margin-bottom: 8px;
	}
	.services-inspector-features-label {
		font-size: 11px;
		font-weight: 600;
		color: #777;
		margin: 8px 0 4px;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}
	.services-inspector-feature-row {
		display: flex;
		gap: 6px;
		align-items: center;
		margin-bottom: 4px;
	}
	.services-inspector-feature-row input {
		flex: 1;
	}
`;

// ── Edit ──────────────────────────────────────────────────────────────────
function Edit({ attributes, setAttributes }) {
	const {
		eyebrowText,
		heading,
		subheading,
		services,
		bannerHeading,
		bannerSubtext,
		bannerCtaText,
		bannerCtaUrl,
	} = attributes;

	const blockProps = useBlockProps({ className: "services-block-editor-root" });

	// ── Service helpers ──────────────────────────────────────────────────
	const updateService = (index, key, value) => {
		const updated = services.map((s, i) =>
			i === index ? { ...s, [key]: value } : s,
		);
		setAttributes({ services: updated });
	};

	const updateFeature = (svcIndex, featIndex, value) => {
		const updated = services.map((s, i) => {
			if (i !== svcIndex) return s;
			const features = s.features.map((f, fi) =>
				fi === featIndex ? value : f,
			);
			return { ...s, features };
		});
		setAttributes({ services: updated });
	};

	const addFeature = (svcIndex) => {
		const updated = services.map((s, i) =>
			i === svcIndex ? { ...s, features: [...s.features, ""] } : s,
		);
		setAttributes({ services: updated });
	};

	const removeFeature = (svcIndex, featIndex) => {
		const updated = services.map((s, i) => {
			if (i !== svcIndex) return s;
			return { ...s, features: s.features.filter((_, fi) => fi !== featIndex) };
		});
		setAttributes({ services: updated });
	};

	const addService = () => {
		const newId = (services[services.length - 1]?.id ?? 0) + 1;
		setAttributes({
			services: [
				...services,
				{
					id: newId,
					icon: "home",
					title: "New Service",
					description: "",
					features: [""],
					ctaText: "Get a Quote",
					ctaUrl: "#contact",
				},
			],
		});
	};

	const removeService = (index) => {
		setAttributes({ services: services.filter((_, i) => i !== index) });
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

				{/* Services */}
				<PanelBody title={__("Service Cards", "blocks")} initialOpen={false}>
					{services.map((service, svcIndex) => (
						<div key={service.id} className="services-inspector-card">
							<p className="services-inspector-card-header">
								{__("Service", "blocks")} {svcIndex + 1} —{" "}
								{service.title || __("Untitled", "blocks")}
							</p>

							<SelectControl
								label={__("Icon", "blocks")}
								value={service.icon}
								options={ICON_OPTIONS}
								onChange={(v) => updateService(svcIndex, "icon", v)}
							/>
							<TextControl
								label={__("Title", "blocks")}
								value={service.title}
								onChange={(v) => updateService(svcIndex, "title", v)}
							/>
							<TextareaControl
								label={__("Description", "blocks")}
								value={service.description}
								rows={3}
								onChange={(v) => updateService(svcIndex, "description", v)}
							/>
							<TextControl
								label={__("Button Text", "blocks")}
								value={service.ctaText}
								onChange={(v) => updateService(svcIndex, "ctaText", v)}
							/>
							<TextControl
								label={__("Button URL", "blocks")}
								value={service.ctaUrl}
								onChange={(v) => updateService(svcIndex, "ctaUrl", v)}
								placeholder="#contact"
							/>

							{/* Features */}
							<p className="services-inspector-features-label">
								{__("Features", "blocks")}
							</p>
							{service.features.map((feat, featIndex) => (
								<div key={featIndex} className="services-inspector-feature-row">
									<TextControl
										value={feat}
										onChange={(v) => updateFeature(svcIndex, featIndex, v)}
										placeholder={__("Feature item…", "blocks")}
										hideLabelFromVision
										label={__("Feature", "blocks")}
									/>
									<Button
										isDestructive
										variant="tertiary"
										size="small"
										onClick={() => removeFeature(svcIndex, featIndex)}
										disabled={service.features.length <= 1}
									>
										✕
									</Button>
								</div>
							))}
							<Button
								variant="tertiary"
								size="small"
								onClick={() => addFeature(svcIndex)}
								disabled={service.features.length >= 8}
							>
								{__("+ Add Feature", "blocks")}
							</Button>

							<PanelRow>
								<Button
									isDestructive
									variant="tertiary"
									size="small"
									onClick={() => removeService(svcIndex)}
									disabled={services.length <= 1}
									style={{ marginTop: "8px" }}
								>
									{__("Remove Service", "blocks")}
								</Button>
							</PanelRow>
						</div>
					))}

					<Button
						variant="secondary"
						onClick={addService}
						disabled={services.length >= 9}
						style={{ width: "100%", justifyContent: "center" }}
					>
						{__("+ Add Service", "blocks")}
					</Button>
				</PanelBody>

				{/* Banner */}
				<PanelBody
					title={__("Bottom CTA Banner", "blocks")}
					initialOpen={false}
				>
					<TextControl
						label={__("Heading", "blocks")}
						value={bannerHeading}
						onChange={(v) => setAttributes({ bannerHeading: v })}
					/>
					<TextareaControl
						label={__("Subtext", "blocks")}
						value={bannerSubtext}
						rows={2}
						onChange={(v) => setAttributes({ bannerSubtext: v })}
					/>
					<TextControl
						label={__("Button Text", "blocks")}
						value={bannerCtaText}
						onChange={(v) => setAttributes({ bannerCtaText: v })}
					/>
					<TextControl
						label={__("Button URL", "blocks")}
						value={bannerCtaUrl}
						onChange={(v) => setAttributes({ bannerCtaUrl: v })}
						placeholder="#contact"
					/>
				</PanelBody>
			</InspectorControls>

			{/* ── Block preview ── */}
			<div {...blockProps}>
				<style>{editorStyles}</style>

				<section className="services-editor-wrap">
					<div className="services-editor-container">
						{/* Header */}
						<div className="services-editor-header">
							<div className="services-editor-eyebrow">
								<div className="services-editor-eyebrow-line left" />
								<span className="services-editor-eyebrow-text">
									{eyebrowText}
								</span>
								<div className="services-editor-eyebrow-line right" />
							</div>
							<h2 className="services-editor-heading">{heading}</h2>
							<p className="services-editor-subheading">{subheading}</p>
						</div>

						{/* Cards grid */}
						<div className="services-editor-grid">
							{services.map((service, i) => (
								<div key={service.id ?? i} className="services-editor-card">
									<div className="services-editor-card-top">
										<div className="services-editor-icon-wrap">
											{ICON_MAP[service.icon] ?? ICON_MAP.home}
										</div>
										<h3 className="services-editor-card-title">
											{service.title}
										</h3>
									</div>

									<p className="services-editor-card-desc">
										{service.description}
									</p>

									<ul className="services-editor-features">
										{service.features.map((feat, fi) => (
											<li key={fi} className="services-editor-feature-item">
												<Check
													size={16}
													strokeWidth={3}
													style={{ flexShrink: 0 }}
												/>
												{feat}
											</li>
										))}
									</ul>

									<div
										style={{
											borderTop: "1px solid #e5e7eb",
											paddingTop: "1rem",
											marginTop: "auto",
										}}
									>
										<span className="services-editor-card-cta">
											{service.ctaText}
										</span>
									</div>
								</div>
							))}
						</div>

						{/* Banner */}
						<div className="services-editor-banner">
							<div>
								<h3 className="services-editor-banner-heading">
									{bannerHeading}
								</h3>
								<p className="services-editor-banner-subtext">
									{bannerSubtext}
								</p>
							</div>
							<span className="services-editor-banner-cta">
								{bannerCtaText}
								<ArrowRight
									size={20}
									style={{ marginLeft: "0.5rem" }}
									strokeWidth={2}
								/>
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
	save: () => null,
});
