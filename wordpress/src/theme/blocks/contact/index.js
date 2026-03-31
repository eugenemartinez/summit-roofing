/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "react/jsx-runtime"
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
(module) {

module.exports = window["ReactJSXRuntime"];

/***/ },

/***/ "@wordpress/block-editor"
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
(module) {

module.exports = window["wp"]["blockEditor"];

/***/ },

/***/ "@wordpress/blocks"
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
(module) {

module.exports = window["wp"]["blocks"];

/***/ },

/***/ "@wordpress/components"
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["components"];

/***/ },

/***/ "@wordpress/i18n"
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["i18n"];

/***/ },

/***/ "./src/blocks/contact/block.json"
/*!***************************************!*\
  !*** ./src/blocks/contact/block.json ***!
  \***************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"theme/contact","title":"Contact Form","category":"theme","description":"Contact form with contact information and submission form","supports":{"html":false,"inserter":true},"attributes":{"title":{"type":"string","default":"Get Your Free Roofing Estimate"},"subtitle":{"type":"string","default":"Contact Us"},"description":{"type":"string","default":"Fill out the form below and our team will get back to you within 24 hours to discuss your roofing needs."},"address":{"type":"string","default":"123 Roofing Way, Anytown, ST 12345"},"phone":{"type":"string","default":"(555) 123-4567"},"email":{"type":"string","default":"contact@summitroofing.com"},"hoursWeekday":{"type":"string","default":"Mon-Fri: 7am-6pm"},"hoursSaturday":{"type":"string","default":"Sat: 8am-2pm"},"tagline":{"type":"string","default":"Proudly serving homeowners throughout the region with quality roofing solutions."},"credentials":{"type":"array","default":["BBB Accredited","Fully Insured","Licensed Contractors"]},"serviceOptions":{"type":"array","default":["Roof Repair","Roof Replacement","Roof Inspection","Gutter Installation","Storm Damage Assessment","Commercial Roofing","Other Services"]},"ctaText":{"type":"string","default":"Request Free Estimate"}},"editorScript":"file:./index.js","viewScript":"file:./view.js","render":"file:./render.php"}');

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*************************************!*\
  !*** ./src/blocks/contact/index.js ***!
  \*************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/blocks/contact/block.json");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");






function Edit({
  attributes,
  setAttributes
}) {
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
    ctaText
  } = attributes;
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)();
  const updateCredential = (index, value) => {
    const updated = [...credentials];
    updated[index] = value;
    setAttributes({
      credentials: updated
    });
  };
  const addCredential = () => {
    setAttributes({
      credentials: [...credentials, 'New Credential']
    });
  };
  const removeCredential = index => {
    if (credentials.length > 1) {
      setAttributes({
        credentials: credentials.filter((_, i) => i !== index)
      });
    }
  };
  const updateService = (index, value) => {
    const updated = [...serviceOptions];
    updated[index] = value;
    setAttributes({
      serviceOptions: updated
    });
  };
  const addService = () => {
    setAttributes({
      serviceOptions: [...serviceOptions, 'New Service']
    });
  };
  const removeService = index => {
    if (serviceOptions.length > 1) {
      setAttributes({
        serviceOptions: serviceOptions.filter((_, i) => i !== index)
      });
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
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Header Content', 'theme'),
        initialOpen: true,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Subtitle', 'theme'),
          value: subtitle,
          onChange: v => setAttributes({
            subtitle: v
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Title', 'theme'),
          value: title,
          onChange: v => setAttributes({
            title: v
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextareaControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Description', 'theme'),
          value: description,
          rows: 3,
          onChange: v => setAttributes({
            description: v
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Contact Information', 'theme'),
        initialOpen: false,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Address', 'theme'),
          value: address,
          onChange: v => setAttributes({
            address: v
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Phone', 'theme'),
          value: phone,
          onChange: v => setAttributes({
            phone: v
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Email', 'theme'),
          value: email,
          onChange: v => setAttributes({
            email: v
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Hours - Weekday', 'theme'),
          value: hoursWeekday,
          onChange: v => setAttributes({
            hoursWeekday: v
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Hours - Saturday', 'theme'),
          value: hoursSaturday,
          onChange: v => setAttributes({
            hoursSaturday: v
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextareaControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Tagline', 'theme'),
          value: tagline,
          rows: 2,
          onChange: v => setAttributes({
            tagline: v
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Credentials', 'theme'),
        initialOpen: false,
        children: [credentials.map((credential, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          style: {
            marginBottom: '10px',
            display: 'flex',
            gap: '8px'
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
            value: credential,
            onChange: v => updateCredential(index, v),
            placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Credential...', 'theme'),
            hideLabelFromVision: true,
            style: {
              flex: 1
            }
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
            isDestructive: true,
            variant: "tertiary",
            size: "small",
            onClick: () => removeCredential(index),
            disabled: credentials.length <= 1,
            children: "\u2715"
          })]
        }, index)), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
          variant: "secondary",
          onClick: addCredential,
          style: {
            width: '100%'
          },
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('+ Add Credential', 'theme')
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Service Options', 'theme'),
        initialOpen: false,
        children: [serviceOptions.map((service, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          style: {
            marginBottom: '10px',
            display: 'flex',
            gap: '8px'
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
            value: service,
            onChange: v => updateService(index, v),
            placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Service...', 'theme'),
            hideLabelFromVision: true,
            style: {
              flex: 1
            }
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
            isDestructive: true,
            variant: "tertiary",
            size: "small",
            onClick: () => removeService(index),
            disabled: serviceOptions.length <= 1,
            children: "\u2715"
          })]
        }, index)), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
          variant: "secondary",
          onClick: addService,
          style: {
            width: '100%'
          },
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('+ Add Service', 'theme')
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Call to Action', 'theme'),
        initialOpen: false,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Button Text', 'theme'),
          value: ctaText,
          onChange: v => setAttributes({
            ctaText: v
          })
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      ...blockProps,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("style", {
        children: editorStyles
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        className: "contact-editor-preview",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          className: "contact-editor-header",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
            className: "contact-editor-header-eyebrow",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
              className: "contact-editor-header-line"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
              className: "contact-editor-header-text",
              children: subtitle
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
              className: "contact-editor-header-line"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("h2", {
            className: "contact-editor-heading",
            children: title
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
            className: "contact-editor-description",
            children: description
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          className: "contact-editor-container",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
            className: "contact-editor-left",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("h3", {
              children: "Contact Information"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
              className: "contact-editor-left-item",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                className: "contact-editor-left-badge",
                children: "\uD83D\uDCCD Address:"
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
              style: {
                fontSize: '12px',
                marginBottom: '0.75rem'
              },
              children: address
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
              className: "contact-editor-left-item",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                className: "contact-editor-left-badge",
                children: "\uD83D\uDCDE Phone:"
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
              style: {
                fontSize: '12px',
                marginBottom: '0.75rem'
              },
              children: phone
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
              className: "contact-editor-left-item",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                className: "contact-editor-left-badge",
                children: "\u2709\uFE0F Email:"
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
              style: {
                fontSize: '12px',
                marginBottom: '0.75rem'
              },
              children: email
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
              className: "contact-editor-left-item",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                className: "contact-editor-left-badge",
                children: "\uD83D\uDD50 Hours:"
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
              style: {
                fontSize: '12px',
                marginBottom: '1rem'
              },
              children: [hoursWeekday, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("br", {}), hoursSaturday]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
              style: {
                fontSize: '11px',
                opacity: 0.8,
                marginBottom: '0.75rem'
              },
              children: tagline
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
              style: {
                display: 'flex',
                gap: '0.25rem',
                flexWrap: 'wrap'
              },
              children: credentials.map((cred, i) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
                style: {
                  fontSize: '10px',
                  background: 'rgba(255,255,255,0.1)',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '12px',
                  whiteSpace: 'nowrap'
                },
                children: ["\u2713 ", cred]
              }, i))
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
            className: "contact-editor-right",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
              className: "contact-editor-form-group",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("label", {
                className: "contact-editor-form-label",
                children: "Full Name *"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("input", {
                type: "text",
                className: "contact-editor-form-input",
                placeholder: "John Doe",
                disabled: true
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
              className: "contact-editor-form-group",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("label", {
                className: "contact-editor-form-label",
                children: "Email Address *"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("input", {
                type: "email",
                className: "contact-editor-form-input",
                placeholder: "your@email.com",
                disabled: true
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
              style: {
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.5rem'
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
                className: "contact-editor-form-group",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("label", {
                  className: "contact-editor-form-label",
                  children: "Phone *"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("input", {
                  type: "tel",
                  className: "contact-editor-form-input",
                  placeholder: "(123) 456-7890",
                  disabled: true
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
                className: "contact-editor-form-group",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("label", {
                  className: "contact-editor-form-label",
                  children: "Service"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("select", {
                  className: "contact-editor-form-input",
                  disabled: true,
                  children: [serviceOptions.slice(0, 3).map(s => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("option", {
                    children: s
                  }, s)), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("option", {
                    children: "..."
                  })]
                })]
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
              className: "contact-editor-form-group",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("label", {
                className: "contact-editor-form-label",
                children: "Message"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("textarea", {
                className: "contact-editor-form-input",
                placeholder: "Please provide details...",
                rows: "3",
                disabled: true
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("button", {
              style: {
                width: '100%',
                padding: '0.5rem',
                background: 'var(--primary, #1E3A5E)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                marginTop: '0.5rem'
              },
              children: ctaText
            })]
          })]
        })]
      })]
    })]
  });
}
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_4__.name, {
  edit: Edit,
  save: () => null // PHP render handles frontend
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map