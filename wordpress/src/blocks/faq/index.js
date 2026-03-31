import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import {
	PanelBody,
	TextControl,
	TextareaControl,
	Button,
	ToggleControl,
} from "@wordpress/components";
import { ChevronDown, CircleHelp } from "lucide-react";
import { __ } from "@wordpress/i18n";
import metadata from "./block.json";

// ── Editor styles ─────────────────────────────────────────────────────────
const editorStyles = `
	.faq-editor-wrap {
		font-family: var(--font-body, 'Inter', sans-serif);
		background-color: #f9fafb;
		padding: 4rem 1rem;
	}
	.faq-editor-container {
		max-width: 1280px;
		margin: 0 auto;
	}
	.faq-editor-header {
		text-align: center;
		margin-bottom: 3rem;
	}
	.faq-editor-eyebrow {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 1rem;
	}
	.faq-editor-eyebrow-line {
		height: 4px;
		width: 3rem;
		background-color: #d86a6a;
		border-radius: 2px;
		flex-shrink: 0;
	}
	.faq-editor-eyebrow-line.left { margin-right: 1rem; }
	.faq-editor-eyebrow-line.right { margin-left: 1rem; }
	.faq-editor-eyebrow-text {
		font-size: 0.875rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: #36454f;
	}
	.faq-editor-heading {
		font-family: var(--font-headline, 'Poppins', sans-serif);
		font-size: clamp(1.75rem, 3vw, 2.25rem);
		font-weight: 700;
		color: #1e3a5e;
		margin: 0 0 1rem;
		line-height: 1.2;
	}
	.faq-editor-subheading {
		color: #36454f;
		max-width: 42rem;
		margin: 0 auto;
		line-height: 1.6;
	}
	.faq-editor-items {
		max-width: 48rem;
		margin: 0 auto 2rem;
	}
	.faq-editor-item {
		background: #ffffff;
		border: 1px solid #e5e7eb;
		border-radius: 0.5rem;
		margin-bottom: 1rem;
		box-shadow: 0 1px 3px rgba(0,0,0,0.1);
		overflow: hidden;
	}
	.faq-editor-item-question {
		background: #f3f4f6;
		padding: 1rem;
		cursor: pointer;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		user-select: none;
	}
	.faq-editor-question-text {
		font-weight: 600;
		color: #1e3a5e;
		margin: 0;
		flex: 1;
		font-size: 0.95rem;
	}
	.faq-editor-chevron {
		width: 1.5rem;
		height: 1.5rem;
		color: #d86a6a;
		flex-shrink: 0;
		margin-left: 1rem;
		transition: transform 0.3s ease;
	}
	.faq-editor-item.open .faq-editor-chevron {
		transform: rotate(180deg);
	}
	.faq-editor-item-answer {
		padding: 1rem;
		background: #ffffff;
		display: none;
		border-top: 1px solid #e5e7eb;
	}
	.faq-editor-item.open .faq-editor-item-answer {
		display: block;
	}
	.faq-editor-answer-text {
		color: #36454f;
		line-height: 1.6;
		margin: 0 0 1rem;
		font-size: 0.9rem;
	}
	.faq-editor-item-controls {
		display: flex;
		gap: 0.5rem;
		margin-top: 1rem;
	}
	.faq-editor-item-controls button {
		padding: 0.5rem 1rem;
		font-size: 0.875rem;
	}
	.inspector-card {
		border: 1px solid #e0e0e0;
		border-radius: 6px;
		padding: 12px;
		margin-bottom: 12px;
		background: #fafafa;
	}
	.inspector-card-header {
		font-size: 12px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #555;
		margin-bottom: 8px;
	}
	.faq-cta-preview {
		background: #ffffff;
		border: 1px solid #e5e7eb;
		border-radius: 0.75rem;
		padding: 2rem;
		text-align: center;
		max-width: 48rem;
		margin: 2rem auto 0;
		box-shadow: 0 1px 3px rgba(0,0,0,0.1);
	}
	.faq-cta-icon {
		display: inline-block;
		background: #d86a6a;
		background: rgba(216, 106, 106, 0.1);
		padding: 0.75rem;
		border-radius: 9999px;
		margin-bottom: 1rem;
		color: #d86a6a;
	}
	.faq-cta-heading {
		font-size: 1.25rem;
		font-weight: 700;
		color: #1e3a5e;
		margin: 0 0 0.5rem;
	}
	.faq-cta-subheading {
		color: #36454f;
		margin: 0 0 1rem;
		font-size: 0.9rem;
	}
	.faq-cta-button {
		display: inline-block;
		background: #d86a6a;
		color: #ffffff;
		padding: 0.75rem 1.5rem;
		border-radius: 0.375rem;
		text-decoration: none;
		font-weight: 500;
		transition: all 0.3s ease;
	}
	.faq-cta-button:hover {
		background: #c25555;
	}
`;

// ── Edit ──────────────────────────────────────────────────────────────────
function Edit({ attributes, setAttributes }) {
	const {
		eyebrowText,
		heading,
		subheading,
		faqItems = [],
		showCTA,
		ctaText,
		ctaHeading,
		ctaSubheading,
	} = attributes;

	const [expandedId, setExpandedId] = React.useState(null);

	const blockProps = useBlockProps({
		className: "faq-block-editor-root",
	});

	// ── FAQ helpers ──────────────────────────────────────────────────────
	const updateFAQItem = (index, key, value) => {
		const updated = faqItems.map((item, i) =>
			i === index ? { ...item, [key]: value } : item,
		);
		setAttributes({ faqItems: updated });
	};

	const addFAQItem = () => {
		const newId = (faqItems[faqItems.length - 1]?.id ?? 0) + 1;
		setAttributes({
			faqItems: [
				...faqItems,
				{
					id: newId,
					question: "New Question",
					answer: "",
				},
			],
		});
	};

	const removeFAQItem = (index) => {
		setAttributes({ faqItems: faqItems.filter((_, i) => i !== index) });
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

				{/* FAQ Items */}
				<PanelBody title={__("FAQ Items", "blocks")} initialOpen={false}>
					{faqItems.map((item, index) => (
						<div key={item.id} className="inspector-card">
							<p className="inspector-card-header">
								{__("Question", "blocks")} {index + 1}
							</p>
							<TextControl
								label={__("Question", "blocks")}
								value={item.question}
								onChange={(v) => updateFAQItem(index, "question", v)}
								placeholder="Enter question..."
							/>
							<TextareaControl
								label={__("Answer", "blocks")}
								value={item.answer}
								rows={4}
								onChange={(v) => updateFAQItem(index, "answer", v)}
								placeholder="Enter answer..."
							/>
							<Button
								isDestructive
								variant="tertiary"
								size="small"
								onClick={() => removeFAQItem(index)}
								disabled={faqItems.length <= 1}
								style={{ marginTop: "4px", width: "100%" }}
							>
								{__("Remove Question", "blocks")}
							</Button>
						</div>
					))}

					<Button
						variant="secondary"
						onClick={addFAQItem}
						style={{ width: "100%", justifyContent: "center" }}
					>
						{__("+ Add Question", "blocks")}
					</Button>
				</PanelBody>

				{/* CTA Section */}
				<PanelBody title={__("CTA Section", "blocks")} initialOpen={false}>
					<ToggleControl
						label={__("Show CTA Section", "blocks")}
						checked={showCTA}
						onChange={(v) => setAttributes({ showCTA: v })}
					/>
					{showCTA && (
						<>
							<TextControl
								label={__("CTA Heading", "blocks")}
								value={ctaHeading}
								onChange={(v) => setAttributes({ ctaHeading: v })}
							/>
							<TextareaControl
								label={__("CTA Subheading", "blocks")}
								value={ctaSubheading}
								rows={2}
								onChange={(v) => setAttributes({ ctaSubheading: v })}
							/>
							<TextControl
								label={__("Button Text", "blocks")}
								value={ctaText}
								onChange={(v) => setAttributes({ ctaText: v })}
							/>
						</>
					)}
				</PanelBody>
			</InspectorControls>

			{/* ── Block preview ── */}
			<div {...blockProps}>
				<style>{editorStyles}</style>

				<section className="faq-editor-wrap">
					<div className="faq-editor-container">
						{/* Header */}
						<div className="faq-editor-header">
							<div className="faq-editor-eyebrow">
								<div className="faq-editor-eyebrow-line left" />
								<span className="faq-editor-eyebrow-text">{eyebrowText}</span>
								<div className="faq-editor-eyebrow-line right" />
							</div>
							<h2 className="faq-editor-heading">{heading}</h2>
							<p className="faq-editor-subheading">{subheading}</p>
						</div>

						{/* FAQ Items */}
						<div className="faq-editor-items">
							{faqItems.map((item, index) => (
								<div
									key={item.id}
									className={`faq-editor-item ${
										expandedId === item.id ? "open" : ""
									}`}
								>
									<div
										className="faq-editor-item-question"
										onClick={() =>
											setExpandedId(expandedId === item.id ? null : item.id)
										}
									>
										<p className="faq-editor-question-text">
											{item.question || `Question ${index + 1}`}
										</p>
										<ChevronDown className="faq-editor-chevron" size={20} />
									</div>

									<div className="faq-editor-item-answer">
										<p className="faq-editor-answer-text">
											{item.answer || "Answer will appear here..."}
										</p>
									</div>
								</div>
							))}
						</div>

						{/* CTA Section */}
						{showCTA && (
							<div className="faq-cta-preview">
								<div className="faq-cta-icon">
									<CircleHelp
										strokeWidth={2}
										style={{ width: "2rem", height: "2rem" }}
									/>
								</div>
								<h3 className="faq-cta-heading">{ctaHeading}</h3>
								<p className="faq-cta-subheading">{ctaSubheading}</p>
								<a href="#contact" className="faq-cta-button">
									{ctaText}
									<span style={{ marginLeft: "0.5rem" }}>→</span>
								</a>
							</div>
						)}
					</div>
				</section>
			</div>
		</>
	);
}

// Add React for hooks
import React from "react";

// ── Register ──────────────────────────────────────────────────────────────
registerBlockType(metadata.name, {
	edit: Edit,
	save: () => null,
});
