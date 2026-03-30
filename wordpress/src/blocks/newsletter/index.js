import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, TextareaControl, Button, __experimentalText as Text } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Mail, Zap, CheckCircle, AlertTriangle, Send } from 'lucide-react';

registerBlockType('summit-roofing/newsletter', {
  title: __('Newsletter Subscribe', 'summit-roofing'),
  icon: 'email',
  category: 'summit-roofing',

  attributes: {
    title: {
      type: 'string',
      default: 'Subscribe to Our Newsletter'
    },
    subtitle: {
      type: 'string',
      default: 'Stay updated with our latest offers, promotions and roofing tips'
    },
    features: {
      type: 'array',
      default: [
        'Monthly Updates',
        'Expert Tips',
        'Special Offers'
      ]
    },
    buttonText: {
      type: 'string',
      default: 'Subscribe'
    },
    placeholderText: {
      type: 'string',
      default: 'Your email address'
    },
    privacyText: {
      type: 'string',
      default: 'We respect your privacy. You can unsubscribe at any time.'
    },
    successTitle: {
      type: 'string',
      default: 'Success!'
    },
    successMessage: {
      type: 'string',
      default: 'Redirecting to repository details...'
    },
    errorTitle: {
      type: 'string',
      default: 'Something Went Wrong'
    },
    errorMessage: {
      type: 'string',
      default: 'Please try again or contact us directly.'
    }
  },

  edit: ({ attributes, setAttributes }) => {
    const {
      title,
      subtitle,
      features,
      buttonText,
      placeholderText,
      privacyText,
      successTitle,
      successMessage,
      errorTitle,
      errorMessage
    } = attributes;

    const blockProps = useBlockProps();

    const updateFeature = (index, value) => {
      const newFeatures = [...features];
      newFeatures[index] = value;
      setAttributes({ features: newFeatures });
    };

    const addFeature = () => {
      setAttributes({
        features: [...features, 'New Feature']
      });
    };

    const removeFeature = (index) => {
      const newFeatures = features.filter((_, i) => i !== index);
      setAttributes({ features: newFeatures });
    };

    return (
      <>
        <InspectorControls>
          <PanelBody title={__('Content Settings', 'summit-roofing')}>
            <TextControl
              label={__('Title', 'summit-roofing')}
              value={title}
              onChange={(value) => setAttributes({ title: value })}
              __next40pxDefaultSize
              __nextHasNoMarginBottom
            />
            <TextareaControl
              label={__('Subtitle', 'summit-roofing')}
              value={subtitle}
              onChange={(value) => setAttributes({ subtitle: value })}
              __next40pxDefaultSize
              __nextHasNoMarginBottom
            />
          </PanelBody>

          <PanelBody title={__('Features', 'summit-roofing')}>
            {Array.isArray(features) && features.map((feature, index) => (
              <div key={index} style={{ marginBottom: '16px', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <Zap size={16} style={{ marginRight: '8px' }} />
                  <Text>Feature {index + 1}</Text>
                </div>
                <TextControl
                  label={__('Feature Text', 'summit-roofing')}
                  value={feature}
                  onChange={(value) => updateFeature(index, value)}
                  __next40pxDefaultSize
                  __nextHasNoMarginBottom
                />
                <Button
                  isDestructive
                  onClick={() => removeFeature(index)}
                  style={{ marginTop: '8px' }}
                >
                  {__('Remove', 'summit-roofing')}
                </Button>
              </div>
            ))}
            <Button onClick={addFeature} variant="secondary">
              {__('Add Feature', 'summit-roofing')}
            </Button>
          </PanelBody>

          <PanelBody title={__('Form Settings', 'summit-roofing')}>
            <TextControl
              label={__('Button Text', 'summit-roofing')}
              value={buttonText}
              onChange={(value) => setAttributes({ buttonText: value })}
              __next40pxDefaultSize
              __nextHasNoMarginBottom
            />
            <TextControl
              label={__('Placeholder Text', 'summit-roofing')}
              value={placeholderText}
              onChange={(value) => setAttributes({ placeholderText: value })}
              __next40pxDefaultSize
              __nextHasNoMarginBottom
            />
            <TextareaControl
              label={__('Privacy Text', 'summit-roofing')}
              value={privacyText}
              onChange={(value) => setAttributes({ privacyText: value })}
              __next40pxDefaultSize
              __nextHasNoMarginBottom
            />
          </PanelBody>

          <PanelBody title={__('Success/Error Messages', 'summit-roofing')}>
            <TextControl
              label={__('Success Title', 'summit-roofing')}
              value={successTitle}
              onChange={(value) => setAttributes({ successTitle: value })}
              __next40pxDefaultSize
              __nextHasNoMarginBottom
            />
            <TextareaControl
              label={__('Success Message', 'summit-roofing')}
              value={successMessage}
              onChange={(value) => setAttributes({ successMessage: value })}
              __next40pxDefaultSize
              __nextHasNoMarginBottom
            />
            <TextControl
              label={__('Error Title', 'summit-roofing')}
              value={errorTitle}
              onChange={(value) => setAttributes({ errorTitle: value })}
              __next40pxDefaultSize
              __nextHasNoMarginBottom
            />
            <TextareaControl
              label={__('Error Message', 'summit-roofing')}
              value={errorMessage}
              onChange={(value) => setAttributes({ errorMessage: value })}
              __next40pxDefaultSize
              __nextHasNoMarginBottom
            />
          </PanelBody>
        </InspectorControls>

        <div {...blockProps} style={{ padding: '20px', background: 'linear-gradient(to bottom right, rgba(30, 58, 94, 0.3), rgba(30, 58, 94, 0.2))', borderRadius: '8px' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px', marginBottom: '16px', background: 'rgba(216, 106, 106, 0.2)', borderRadius: '50%', width: 'fit-content', margin: '0 auto 16px' }}>
              <Mail size={24} style={{ color: '#D86A6A' }} />
            </div>

            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '8px', color: '#1E3A5E' }}>
              {title}
            </h3>

            <p style={{ marginBottom: '16px', color: 'rgba(30, 58, 94, 0.7)' }}>
              {subtitle}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
              {Array.isArray(features) && features.map((feature, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', padding: '6px 12px', background: 'rgba(255, 255, 255, 0.8)', borderRadius: '20px', fontSize: '12px' }}>
                  <Zap size={12} style={{ marginRight: '6px', color: '#D86A6A' }} />
                  <span style={{ fontWeight: '500' }}>{feature}</span>
                </div>
              ))}
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', padding: '8px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.2)', marginBottom: '16px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="email"
                  placeholder={placeholderText}
                  style={{ flex: 1, padding: '12px', borderRadius: '6px', border: 'none', background: 'white', outline: 'none' }}
                />
                <button
                  style={{ padding: '12px 24px', background: '#D86A6A', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  {buttonText}
                  <Send size={16} />
                </button>
              </div>
            </div>

            <p style={{ fontSize: '12px', color: 'rgba(30, 58, 94, 0.6)' }}>
              {privacyText}
            </p>
          </div>
        </div>
      </>
    );
  },

  save: () => null, // Dynamic block
});