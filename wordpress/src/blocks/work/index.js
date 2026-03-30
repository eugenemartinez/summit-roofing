import { registerBlockType } from '@wordpress/blocks';
import {
  useBlockProps,
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
} from '@wordpress/block-editor';
import {
  PanelBody,
  PanelRow,
  TextControl,
  TextareaControl,
  Button,
  __experimentalInputControl as InputControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import metadata from './block.json';

// ── Editor styles ─────────────────────────────────────────────────────────
const editorStyles = `
  .work-editor-wrap {
    font-family: var(--font-body, 'Inter', sans-serif);
    background: #ffffff;
    padding: 4rem 1rem;
  }
  .work-editor-container {
    max-width: 1280px;
    margin: 0 auto;
  }
  /* Header */
  .work-editor-header {
    text-align: center;
    margin-bottom: 3rem;
  }
  .work-editor-eyebrow {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    gap: 0;
  }
  .work-editor-eyebrow-line {
    height: 4px;
    width: 3rem;
    background-color: var(--cta, #D86A6A);
    border-radius: 2px;
  }
  .work-editor-eyebrow-line.left  { margin-right: 1rem; }
  .work-editor-eyebrow-line.right { margin-left: 1rem; }
  .work-editor-eyebrow-text {
    font-size: 0.875rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--accent, #36454F);
  }
  .work-editor-heading {
    font-family: var(--font-headline, 'Poppins', sans-serif);
    font-size: clamp(1.75rem, 3vw, 2.25rem);
    font-weight: 700;
    color: var(--primary, #1E3A5E);
    margin: 0 0 1rem;
    line-height: 1.2;
  }
  .work-editor-subheading {
    color: var(--accent, #36454F);
    max-width: 42rem;
    margin: 0 auto;
    line-height: 1.6;
  }
  /* Category filters */
  .work-editor-categories {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 3rem;
  }
  .work-editor-category-btn {
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.2s ease;
    cursor: pointer;
    border: 1px solid #e5e7eb;
  }
  .work-editor-category-btn.active {
    background-color: var(--primary, #1E3A5E);
    color: #ffffff;
    border-color: var(--primary, #1E3A5E);
  }
  .work-editor-category-btn.inactive {
    background-color: #f9fafb;
    color: var(--accent, #36454F);
  }
  /* Projects grid */
  .work-editor-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
    margin-bottom: 4rem;
  }
  .work-editor-card {
    background: #f5f5f5;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0,0,0,0.08);
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .work-editor-card-image {
    height: 200px;
    background: #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #94a3b8;
    font-size: 0.875rem;
    position: relative;
    overflow: hidden;
  }
  .work-editor-card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .work-editor-card-content {
    padding: 1.5rem;
  }
  .work-editor-card-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
  }
  .work-editor-card-category {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--cta, #D86A6A);
    background: rgba(216, 106, 106, 0.1);
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
  }
  .work-editor-card-location {
    font-size: 0.75rem;
    color: var(--accent, #36454F);
  }
  .work-editor-card-title {
    font-family: var(--font-headline, 'Poppins', sans-serif);
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--primary, #1E3A5E);
    margin: 0 0 0.5rem;
  }
  .work-editor-card-desc {
    color: var(--accent, #36454F);
    font-size: 0.875rem;
    margin: 0;
    line-height: 1.5;
  }
  /* CTA */
  .work-editor-cta {
    text-align: center;
  }
  .work-editor-cta-btn {
    display: inline-flex;
    align-items: center;
    background-color: var(--primary, #1E3A5E);
    color: #ffffff;
    font-weight: 500;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-size: 1rem;
    text-decoration: none;
    transition: all 0.2s ease;
  }
  /* Inspector helpers */
  .work-inspector-section {
    margin-bottom: 1.5rem;
  }
  .work-inspector-section-title {
    font-size: 14px;
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .work-inspector-category-item,
  .work-inspector-project-item {
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    padding: 12px;
    margin-bottom: 12px;
    background: #fafafa;
  }
  .work-inspector-category-row,
  .work-inspector-project-row {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-bottom: 8px;
  }
  .work-inspector-category-row input,
  .work-inspector-project-row input {
    flex: 1;
  }
  .work-inspector-image-preview {
    width: 100%;
    height: 80px;
    object-fit: cover;
    border-radius: 4px;
    margin-bottom: 8px;
    display: block;
  }
  .work-inspector-image-placeholder {
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

// ── Edit component ────────────────────────────────────────────────────────
function Edit({ attributes, setAttributes }) {
  const {
    title,
    subtitle,
    description,
    categories,
    projects,
    ctaText,
    ctaUrl,
  } = attributes;

  const blockProps = useBlockProps({ className: 'work-block-editor-root' });

  // ── Category helpers ──────────────────────────────────────────────────
  const updateCategory = (index, value) => {
    const updated = [...categories];
    updated[index] = value;
    setAttributes({ categories: updated });
  };

  const addCategory = () => {
    setAttributes({ categories: [...categories, 'New Category'] });
  };

  const removeCategory = (index) => {
    if (categories.length > 1) {
      setAttributes({ categories: categories.filter((_, i) => i !== index) });
    }
  };

  // ── Project helpers ───────────────────────────────────────────────────
  const updateProject = (index, key, value) => {
    const updated = projects.map((p, i) =>
      i === index ? { ...p, [key]: value } : p
    );
    setAttributes({ projects: updated });
  };

  const addProject = () => {
    const newId = (projects[projects.length - 1]?.id ?? 0) + 1;
    setAttributes({
      projects: [
        ...projects,
        {
          id: newId,
          title: 'New Project',
          category: categories[1] || 'Residential',
          description: '',
          image: '',
          location: '',
        },
      ],
    });
  };

  const removeProject = (index) => {
    if (projects.length > 1) {
      setAttributes({ projects: projects.filter((_, i) => i !== index) });
    }
  };

  // ── Render ───────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Inspector sidebar ── */}
      <InspectorControls>
        {/* Header */}
        <PanelBody title={__('Header', 'theme')} initialOpen={true}>
          <TextControl
            label={__('Title', 'theme')}
            value={title}
            onChange={(v) => setAttributes({ title: v })}
          />
          <TextControl
            label={__('Subtitle', 'theme')}
            value={subtitle}
            onChange={(v) => setAttributes({ subtitle: v })}
          />
          <TextareaControl
            label={__('Description', 'theme')}
            value={description}
            rows={3}
            onChange={(v) => setAttributes({ description: v })}
          />
        </PanelBody>

        {/* Categories */}
        <PanelBody title={__('Categories', 'theme')} initialOpen={false}>
          <div className="work-inspector-section">
            <p className="work-inspector-section-title">
              {__('Filter Categories', 'theme')}
            </p>
            {categories.map((category, index) => (
              <div key={index} className="work-inspector-category-item">
                <div className="work-inspector-category-row">
                  <TextControl
                    value={category}
                    onChange={(v) => updateCategory(index, v)}
                    placeholder={__('Category name...', 'theme')}
                    hideLabelFromVision
                  />
                  <Button
                    isDestructive
                    variant="tertiary"
                    size="small"
                    onClick={() => removeCategory(index)}
                    disabled={categories.length <= 1}
                  >
                    ✕
                  </Button>
                </div>
              </div>
            ))}
            <Button
              variant="secondary"
              onClick={addCategory}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              {__('+ Add Category', 'theme')}
            </Button>
          </div>
        </PanelBody>

        {/* Projects */}
        <PanelBody title={__('Projects', 'theme')} initialOpen={false}>
          {projects.map((project, index) => (
            <div key={project.id} className="work-inspector-project-item">
              <p className="work-inspector-section-title">
                {__('Project', 'theme')} {index + 1} — {project.title || __('Untitled', 'theme')}
              </p>

              <TextControl
                label={__('Title', 'theme')}
                value={project.title}
                onChange={(v) => updateProject(index, 'title', v)}
              />

              <TextControl
                label={__('Category', 'theme')}
                value={project.category}
                onChange={(v) => updateProject(index, 'category', v)}
              />

              <TextareaControl
                label={__('Description', 'theme')}
                value={project.description}
                rows={3}
                onChange={(v) => updateProject(index, 'description', v)}
              />

              <TextControl
                label={__('Location', 'theme')}
                value={project.location}
                onChange={(v) => updateProject(index, 'location', v)}
              />

              {/* Image upload */}
              <PanelRow>
                <MediaUploadCheck>
                  <MediaUpload
                    onSelect={(media) =>
                      updateProject(index, 'image', media.url)
                    }
                    allowedTypes={['image']}
                    value={project.image}
                    render={({ open }) => (
                      <Button
                        onClick={open}
                        variant="secondary"
                        style={{ width: '100%', justifyContent: 'center' }}
                      >
                        {project.image
                          ? __('Replace Image', 'theme')
                          : __('Select Image', 'theme')}
                      </Button>
                    )}
                  />
                </MediaUploadCheck>
              </PanelRow>

              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="work-inspector-image-preview"
                />
              )}

              <PanelRow>
                <Button
                  isDestructive
                  variant="tertiary"
                  onClick={() => removeProject(index)}
                  disabled={projects.length <= 1}
                  style={{ width: '100%' }}
                >
                  {__('Remove Project', 'theme')}
                </Button>
              </PanelRow>
            </div>
          ))}

          <Button
            variant="secondary"
            onClick={addProject}
            style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}
          >
            {__('+ Add Project', 'theme')}
          </Button>
        </PanelBody>

        {/* CTA */}
        <PanelBody title={__('Call to Action', 'theme')} initialOpen={false}>
          <TextControl
            label={__('Button Text', 'theme')}
            value={ctaText}
            onChange={(v) => setAttributes({ ctaText: v })}
          />
          <TextControl
            label={__('Button URL', 'theme')}
            value={ctaUrl}
            onChange={(v) => setAttributes({ ctaUrl: v })}
            placeholder="#contact"
          />
        </PanelBody>
      </InspectorControls>

      {/* ── Block preview ── */}
      <div {...blockProps}>
        <style>{editorStyles}</style>

        <section className="work-editor-wrap">
          <div className="work-editor-container">
            {/* Header */}
            <div className="work-editor-header">
              <div className="work-editor-eyebrow">
                <div className="work-editor-eyebrow-line left" />
                <span className="work-editor-eyebrow-text">{subtitle}</span>
                <div className="work-editor-eyebrow-line right" />
              </div>
              <h2 className="work-editor-heading">{title}</h2>
              <p className="work-editor-subheading">{description}</p>

              {/* Category filters */}
              <div className="work-editor-categories">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className={`work-editor-category-btn ${index === 0 ? 'active' : 'inactive'}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Projects grid */}
            <div className="work-editor-grid">
              {projects.map((project, index) => (
                <div key={project.id} className="work-editor-card">
                  <div className="work-editor-card-image">
                    {project.image ? (
                      <img src={project.image} alt={project.title} />
                    ) : (
                      <span>{__('Select image in sidebar →', 'theme')}</span>
                    )}
                  </div>
                  <div className="work-editor-card-content">
                    <div className="work-editor-card-meta">
                      <span className="work-editor-card-category">{project.category}</span>
                      <span className="work-editor-card-location">{project.location}</span>
                    </div>
                    <h3 className="work-editor-card-title">{project.title}</h3>
                    <p className="work-editor-card-desc">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="work-editor-cta">
              <span className="work-editor-cta-btn">{ctaText}</span>
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
  save: () => null, // PHP render handles frontend
});