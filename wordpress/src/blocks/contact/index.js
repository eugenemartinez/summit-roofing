import { registerBlockType } from '@wordpress/blocks';
import {
  useBlockProps,
  InspectorControls,
} from '@wordpress/block-editor';
import {
  PanelBody,
  TextControl,
  TextareaControl,
  Button,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import metadata from './block.json';

function Edit({ attributes, setAttributes }) {
  const {
    title,
    subtitle,
    description,
    address,
    phone,
    email,
    hoursWeekday,
    hoursSaturday,
    tagline,
    credentials,
    serviceOptions,
    ctaText,
  } = attributes;

  const blockProps = useBlockProps();

  const updateCredential = (index, value) => {
    const updated = [...credentials];
    updated[index] = value;
    setAttributes({ credentials: updated });
  };

  const addCredential = () => {
    setAttributes({ credentials: [...credentials, 'New Credential'] });
  };

  const removeCredential = (index) => {
    if (credentials.length > 1) {
      setAttributes({ credentials: credentials.filter((_, i) => i !== index) });
    }
  };

  const updateService = (index, value) => {
    const updated = [...serviceOptions];
    updated[index] = value;
    setAttributes({ serviceOptions: updated });
  };

  const addService = () => {
    setAttributes({ serviceOptions: [...serviceOptions, 'New Service'] });
  };

  const removeService = (index) => {
    if (serviceOptions.length > 1) {
      setAttributes({ serviceOptions: serviceOptions.filter((_, i) => i !== index) });
    }
  };

  const editorStyles = `
    .contact-editor-preview {
      font-family: var(--font-body, 'Inter', sans-serif);
      background: #f5f5f5;
      padding: 3rem 1rem;
    }

    .contact-editor-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .contact-editor-header-eyebrow {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;
      gap: 1rem;
    }

    .contact-editor-header-line {
      height: 4px;
      width: 3rem;
      background-color: var(--cta, #D86A6A);
      border-radius: 2px;
    }

    .contact-editor-header-text {
      font-size: 0.875rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--accent, #36454F);
    }

    .contact-editor-heading {
      font-family: var(--font-headline, 'Poppins', sans-serif);
      font-size: clamp(1.75rem, 3vw, 2.25rem);
      font-weight: 700;
      color: var(--primary, #1E3A5E);
      margin: 0 0 1rem;
      line-height: 1.2;
    }

    .contact-editor-description {
      color: var(--accent, #36454F);
      max-width: 42rem;
      margin: 0 auto;
      line-height: 1.6;
    }

    .contact-editor-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      margin-top: 2rem;
      max-width: 1000px;
      margin-left: auto;
      margin-right: auto;
    }

    .contact-editor-left {
      background: linear-gradient(135deg, var(--primary, #1E3A5E) 0%, rgba(30, 58, 138, 0.9) 100%);
      color: white;
      padding: 1.5rem;
      border-radius: 0.5rem;
      font-size: 13px;
    }

    .contact-editor-left h3 {
      font-size: 15px;
      font-weight: 600;
      margin-bottom: 1rem;
      color: white;
    }

    .contact-editor-left-item {
      margin-bottom: 0.75rem;
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
    }

    .contact-editor-left-badge {
      font-weight: 600;
    }

    .contact-editor-right {
      background: white;
      padding: 1.5rem;
      border-radius: 0.5rem;
      border: 1px solid #e5e7eb;
    }

    .contact-editor-form-group {
      margin-bottom: 0.75rem;
    }

    .contact-editor-form-label {
      font-size: 12px;
      font-weight: 600;
      color: var(--accent, #36454F);
      margin-bottom: 0.25rem;
      display: block;
    }

    .contact-editor-form-input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #e5e7eb;
      border-radius: 4px;
      font-size: 12px;
    }

    @media (max-width: 768px) {
      .contact-editor-container {
        grid-template-columns: 1fr;
      }
    }
  `;

  return (
    <>
      <InspectorControls>
        {/* Header */}
        <PanelBody title={__('Header Content', 'theme')} initialOpen={true}>
          <TextControl
            label={__('Subtitle', 'theme')}
            value={subtitle}
            onChange={(v) => setAttributes({ subtitle: v })}
          />
          <TextControl
            label={__('Title', 'theme')}
            value={title}
            onChange={(v) => setAttributes({ title: v })}
          />
          <TextareaControl
            label={__('Description', 'theme')}
            value={description}
            rows={3}
            onChange={(v) => setAttributes({ description: v })}
          />
        </PanelBody>

        {/* Contact Information */}
        <PanelBody title={__('Contact Information', 'theme')} initialOpen={false}>
          <TextControl
            label={__('Address', 'theme')}
            value={address}
            onChange={(v) => setAttributes({ address: v })}
          />
          <TextControl
            label={__('Phone', 'theme')}
            value={phone}
            onChange={(v) => setAttributes({ phone: v })}
          />
          <TextControl
            label={__('Email', 'theme')}
            value={email}
            onChange={(v) => setAttributes({ email: v })}
          />
          <TextControl
            label={__('Hours - Weekday', 'theme')}
            value={hoursWeekday}
            onChange={(v) => setAttributes({ hoursWeekday: v })}
          />
          <TextControl
            label={__('Hours - Saturday', 'theme')}
            value={hoursSaturday}
            onChange={(v) => setAttributes({ hoursSaturday: v })}
          />
          <TextareaControl
            label={__('Tagline', 'theme')}
            value={tagline}
            rows={2}
            onChange={(v) => setAttributes({ tagline: v })}
          />
        </PanelBody>

        {/* Credentials */}
        <PanelBody title={__('Credentials', 'theme')} initialOpen={false}>
          {credentials.map((credential, index) => (
            <div key={index} style={{ marginBottom: '10px', display: 'flex', gap: '8px' }}>
              <TextControl
                value={credential}
                onChange={(v) => updateCredential(index, v)}
                placeholder={__('Credential...', 'theme')}
                hideLabelFromVision
                style={{ flex: 1 }}
              />
              <Button
                isDestructive
                variant="tertiary"
                size="small"
                onClick={() => removeCredential(index)}
                disabled={credentials.length <= 1}
              >
                ✕
              </Button>
            </div>
          ))}
          <Button
            variant="secondary"
            onClick={addCredential}
            style={{ width: '100%' }}
          >
            {__('+ Add Credential', 'theme')}
          </Button>
        </PanelBody>

        {/* Service Options */}
        <PanelBody title={__('Service Options', 'theme')} initialOpen={false}>
          {serviceOptions.map((service, index) => (
            <div key={index} style={{ marginBottom: '10px', display: 'flex', gap: '8px' }}>
              <TextControl
                value={service}
                onChange={(v) => updateService(index, v)}
                placeholder={__('Service...', 'theme')}
                hideLabelFromVision
                style={{ flex: 1 }}
              />
              <Button
                isDestructive
                variant="tertiary"
                size="small"
                onClick={() => removeService(index)}
                disabled={serviceOptions.length <= 1}
              >
                ✕
              </Button>
            </div>
          ))}
          <Button
            variant="secondary"
            onClick={addService}
            style={{ width: '100%' }}
          >
            {__('+ Add Service', 'theme')}
          </Button>
        </PanelBody>

        {/* CTA */}
        <PanelBody title={__('Call to Action', 'theme')} initialOpen={false}>
          <TextControl
            label={__('Button Text', 'theme')}
            value={ctaText}
            onChange={(v) => setAttributes({ ctaText: v })}
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <style>{editorStyles}</style>

        <div className="contact-editor-preview">
          {/* Header */}
          <div className="contact-editor-header">
            <div className="contact-editor-header-eyebrow">
              <div className="contact-editor-header-line" />
              <span className="contact-editor-header-text">{subtitle}</span>
              <div className="contact-editor-header-line" />
            </div>
            <h2 className="contact-editor-heading">{title}</h2>
            <p className="contact-editor-description">{description}</p>
          </div>

          {/* Two-column preview */}
          <div className="contact-editor-container">
            {/* Left: Contact Info Preview */}
            <div className="contact-editor-left">
              <h3>Contact Information</h3>
              <div className="contact-editor-left-item">
                <span className="contact-editor-left-badge">📍 Address:</span>
              </div>
              <div style={{ fontSize: '12px', marginBottom: '0.75rem' }}>
                {address}
              </div>

              <div className="contact-editor-left-item">
                <span className="contact-editor-left-badge">📞 Phone:</span>
              </div>
              <div style={{ fontSize: '12px', marginBottom: '0.75rem' }}>
                {phone}
              </div>

              <div className="contact-editor-left-item">
                <span className="contact-editor-left-badge">✉️ Email:</span>
              </div>
              <div style={{ fontSize: '12px', marginBottom: '0.75rem' }}>
                {email}
              </div>

              <div className="contact-editor-left-item">
                <span className="contact-editor-left-badge">🕐 Hours:</span>
              </div>
              <div style={{ fontSize: '12px', marginBottom: '1rem' }}>
                {hoursWeekday}
                <br />
                {hoursSaturday}
              </div>

              <div style={{ fontSize: '11px', opacity: 0.8, marginBottom: '0.75rem' }}>
                {tagline}
              </div>

              <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                {credentials.map((cred, i) => (
                  <div
                    key={i}
                    style={{
                      fontSize: '10px',
                      background: 'rgba(255,255,255,0.1)',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '12px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    ✓ {cred}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Form Preview */}
            <div className="contact-editor-right">
              <div className="contact-editor-form-group">
                <label className="contact-editor-form-label">Full Name *</label>
                <input
                  type="text"
                  className="contact-editor-form-input"
                  placeholder="John Doe"
                  disabled
                />
              </div>

              <div className="contact-editor-form-group">
                <label className="contact-editor-form-label">Email Address *</label>
                <input
                  type="email"
                  className="contact-editor-form-input"
                  placeholder="your@email.com"
                  disabled
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <div className="contact-editor-form-group">
                  <label className="contact-editor-form-label">Phone *</label>
                  <input
                    type="tel"
                    className="contact-editor-form-input"
                    placeholder="(123) 456-7890"
                    disabled
                  />
                </div>
                <div className="contact-editor-form-group">
                  <label className="contact-editor-form-label">Service</label>
                  <select
                    className="contact-editor-form-input"
                    disabled
                  >
                    {serviceOptions.slice(0, 3).map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                    <option>...</option>
                  </select>
                </div>
              </div>

              <div className="contact-editor-form-group">
                <label className="contact-editor-form-label">Message</label>
                <textarea
                  className="contact-editor-form-input"
                  placeholder="Please provide details..."
                  rows="3"
                  disabled
                />
              </div>

              <button
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  background: 'var(--primary, #1E3A5E)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginTop: '0.5rem',
                }}
              >
                {ctaText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

registerBlockType(metadata.name, {
  edit: Edit,
  save: () => null, // PHP render handles frontend
});