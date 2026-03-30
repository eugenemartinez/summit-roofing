import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, TextareaControl, Button, __experimentalText as Text } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Shield, Clock, DollarSign } from 'lucide-react';

// Icon mapping for trust indicators
const iconMap = {
  shield: Shield,
  clock: Clock,
  'dollar-sign': DollarSign,
};

registerBlockType('summit-roofing/call-to-action', {
  title: __('Call to Action', 'summit-roofing'),
  icon: 'megaphone',
  category: 'summit-roofing',

  attributes: {
    heading: {
      type: 'string',
      default: 'Ready for a Roof That <span class="text-cta">Lasts</span>?<br /> Get Your Free Estimate Today'
    },
    subheading: {
      type: 'string',
      default: 'Don\'t wait until leaks or damage worsen. Our team of experts is ready to provide you with a detailed assessment and competitive quote for your roofing project.'
    },
    primaryButtonText: {
      type: 'string',
      default: 'Request Free Estimate'
    },
    primaryButtonUrl: {
      type: 'string',
      default: '#contact'
    },
    secondaryButtonText: {
      type: 'string',
      default: 'Call Us Now'
    },
    secondaryButtonPhone: {
      type: 'string',
      default: 'tel:+15551234567'
    },
    trustIndicators: {
      type: 'array',
      default: [
        { icon: 'shield', text: 'No Obligation Quotes' },
        { icon: 'clock', text: 'Fast Response Time' },
        { icon: 'dollar-sign', text: 'Financing Available' }
      ]
    },
    socialProofText: {
      type: 'string',
      default: 'We\'ve completed over 1,500 projects with a 4.9/5 customer satisfaction rating!'
    },
    projectsCompleted: {
      type: 'string',
      default: '1,500'
    },
    rating: {
      type: 'string',
      default: '4.9/5'
    }
  },

  edit: ({ attributes, setAttributes }) => {
    const {
      heading,
      subheading,
      primaryButtonText,
      primaryButtonUrl,
      secondaryButtonText,
      secondaryButtonPhone,
      trustIndicators,
      socialProofText,
      projectsCompleted,
      rating
    } = attributes;

    const blockProps = useBlockProps();

    const updateTrustIndicator = (index, field, value) => {
      const newIndicators = [...trustIndicators];
      newIndicators[index] = { ...newIndicators[index], [field]: value };
      setAttributes({ trustIndicators: newIndicators });
    };

    const addTrustIndicator = () => {
      setAttributes({
        trustIndicators: [...trustIndicators, { icon: 'shield', text: 'New Indicator' }]
      });
    };

    const removeTrustIndicator = (index) => {
      const newIndicators = trustIndicators.filter((_, i) => i !== index);
      setAttributes({ trustIndicators: newIndicators });
    };

    return (
      <>
        <InspectorControls>
          <PanelBody title={__('Content Settings', 'summit-roofing')}>
            <TextareaControl
              label={__('Heading', 'summit-roofing')}
              value={heading}
              onChange={(value) => setAttributes({ heading: value })}
              __next40pxDefaultSize
              __nextHasNoMarginBottom
            />
            <TextareaControl
              label={__('Subheading', 'summit-roofing')}
              value={subheading}
              onChange={(value) => setAttributes({ subheading: value })}
              __next40pxDefaultSize
              __nextHasNoMarginBottom
            />
          </PanelBody>

          <PanelBody title={__('Button Settings', 'summit-roofing')}>
            <TextControl
              label={__('Primary Button Text', 'summit-roofing')}
              value={primaryButtonText}
              onChange={(value) => setAttributes({ primaryButtonText: value })}
              __next40pxDefaultSize
              __nextHasNoMarginBottom
            />
            <TextControl
              label={__('Primary Button URL', 'summit-roofing')}
              value={primaryButtonUrl}
              onChange={(value) => setAttributes({ primaryButtonUrl: value })}
              __next40pxDefaultSize
              __nextHasNoMarginBottom
            />
            <TextControl
              label={__('Secondary Button Text', 'summit-roofing')}
              value={secondaryButtonText}
              onChange={(value) => setAttributes({ secondaryButtonText: value })}
              __next40pxDefaultSize
              __nextHasNoMarginBottom
            />
            <TextControl
              label={__('Secondary Button Phone', 'summit-roofing')}
              value={secondaryButtonPhone}
              onChange={(value) => setAttributes({ secondaryButtonPhone: value })}
              __next40pxDefaultSize
              __nextHasNoMarginBottom
            />
          </PanelBody>

          <PanelBody title={__('Trust Indicators', 'summit-roofing')}>
            {Array.isArray(trustIndicators) && trustIndicators.map((indicator, index) => {
              const IconComponent = iconMap[indicator.icon] || Shield;
              return (
                <div key={index} style={{ marginBottom: '16px', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <IconComponent size={16} style={{ marginRight: '8px' }} />
                    <Text>Indicator {index + 1}</Text>
                  </div>
                  <TextControl
                    label={__('Icon', 'summit-roofing')}
                    value={indicator.icon}
                    onChange={(value) => updateTrustIndicator(index, 'icon', value)}
                    __next40pxDefaultSize
                    __nextHasNoMarginBottom
                  />
                  <TextControl
                    label={__('Text', 'summit-roofing')}
                    value={indicator.text}
                    onChange={(value) => updateTrustIndicator(index, 'text', value)}
                    __next40pxDefaultSize
                    __nextHasNoMarginBottom
                  />
                  <Button
                    isDestructive
                    onClick={() => removeTrustIndicator(index)}
                    style={{ marginTop: '8px' }}
                  >
                    {__('Remove', 'summit-roofing')}
                  </Button>
                </div>
              );
            })}
            <Button onClick={addTrustIndicator} variant="secondary">
              {__('Add Trust Indicator', 'summit-roofing')}
            </Button>
          </PanelBody>

          <PanelBody title={__('Social Proof', 'summit-roofing')}>
            <TextareaControl
              label={__('Social Proof Text', 'summit-roofing')}
              value={socialProofText}
              onChange={(value) => setAttributes({ socialProofText: value })}
              __next40pxDefaultSize
              __nextHasNoMarginBottom
            />
            <TextControl
              label={__('Projects Completed', 'summit-roofing')}
              value={projectsCompleted}
              onChange={(value) => setAttributes({ projectsCompleted: value })}
              __next40pxDefaultSize
              __nextHasNoMarginBottom
            />
            <TextControl
              label={__('Rating', 'summit-roofing')}
              value={rating}
              onChange={(value) => setAttributes({ rating: value })}
              __next40pxDefaultSize
              __nextHasNoMarginBottom
            />
          </PanelBody>
        </InspectorControls>

        <div {...blockProps} style={{ padding: '20px', background: 'linear-gradient(to bottom right, #1E3A5E, #1E3A5E)', color: 'white', borderRadius: '8px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ height: '4px', width: '80px', background: '#D86A6A', margin: '0 auto 16px' }}></div>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '16px' }} dangerouslySetInnerHTML={{ __html: heading }} />
            <p style={{ marginBottom: '24px', opacity: 0.8 }}>{subheading}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', marginBottom: '32px' }}>
              <a href={primaryButtonUrl} style={{ background: '#D86A6A', color: 'white', padding: '12px 24px', borderRadius: '6px', textDecoration: 'none', fontWeight: '500' }}>
                {primaryButtonText}
              </a>
              <a href={secondaryButtonPhone} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', padding: '12px 24px', borderRadius: '6px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '8px' }}>📞</span>
                {secondaryButtonText}
              </a>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', marginBottom: '32px' }}>
              {Array.isArray(trustIndicators) && trustIndicators.map((indicator, index) => {
                const IconComponent = iconMap[indicator.icon] || Shield;
                return (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <IconComponent size={16} style={{ marginRight: '8px', color: '#D86A6A' }} />
                    <span style={{ fontSize: '14px' }}>{indicator.text}</span>
                  </div>
                );
              })}
            </div>

            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', maxWidth: '600px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: '#FFD700', fontSize: '20px' }}>★</span>
                ))}
              </div>
              <p style={{ textAlign: 'center' }}>
                <strong>We've completed over {projectsCompleted} projects</strong> with a <strong style={{ color: '#FFD700' }}>{rating}</strong> customer satisfaction rating!
              </p>
            </div>
          </div>
        </div>
      </>
    );
  },

  save: () => null, // Dynamic block
});