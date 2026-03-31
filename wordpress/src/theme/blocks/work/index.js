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

/***/ "./src/blocks/work/block.json"
/*!************************************!*\
  !*** ./src/blocks/work/block.json ***!
  \************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"apiVersion":3,"name":"theme/work","title":"Our Work","category":"theme","description":"Portfolio showcase with category filtering and project modal","supports":{"html":false,"align":false,"spacing":{"padding":false,"margin":false}},"attributes":{"title":{"type":"string","default":"Featured Roofing Projects"},"subtitle":{"type":"string","default":"Our Portfolio"},"description":{"type":"string","default":"Browse through our completed projects to see the quality and craftsmanship we bring to every roof."},"categories":{"type":"array","default":["All","Residential","Commercial","Repairs","Metal Roofing"]},"projects":{"type":"array","default":[{"id":1,"title":"Modern Home Shingle Installation","category":"Residential","description":"Complete roof replacement with premium architectural shingles for this modern family home.","image":"https://images.pexels.com/photos/15421142/pexels-photo-15421142/free-photo-of-tiles-on-house-roof.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1","location":"Lakeside, CA"},{"id":2,"title":"Commercial Office Complex","category":"Commercial","description":"New TPO roofing system for a 15,000 sq ft office complex with improved insulation and drainage.","image":"https://images.pexels.com/photos/986829/pexels-photo-986829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1","location":"Downtown Metro"},{"id":3,"title":"Storm Damage Restoration","category":"Repairs","description":"Emergency roof repair after severe wind damage, including structural reinforcement and shingle replacement.","image":"https://images.pexels.com/photos/17931269/pexels-photo-17931269/free-photo-of-destroyed-house-in-village.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1","location":"Highland Heights"},{"id":4,"title":"Standing Seam Metal Roof","category":"Metal Roofing","description":"Custom metal roofing installation with seamless gutters and snow guards for this mountain retreat.","image":"https://images.unsplash.com/photo-1628002881911-8bcdfbdf320e?q=80&w=902&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","location":"Mountain View"},{"id":5,"title":"Craftsman Style Home","category":"Residential","description":"Complete tear-off and replacement with architectural shingles that complement the craftsman aesthetic.","image":"https://images.unsplash.com/photo-1713789271157-5cebf11b961e?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","location":"Heritage District"},{"id":6,"title":"Retail Shopping Center","category":"Commercial","description":"Large-scale commercial roofing project featuring energy-efficient materials and built-up membrane system.","image":"https://images.unsplash.com/photo-1525478440856-b40668b83b79?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","location":"Commerce Square"}]},"ctaText":{"type":"string","default":"Request Your Free Estimate"},"ctaUrl":{"type":"string","default":"#contact"}},"textdomain":"theme","editorScript":"file:./index.js","render":"file:./render.php"}');

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
/*!**********************************!*\
  !*** ./src/blocks/work/index.js ***!
  \**********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/blocks/work/block.json");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");






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
function Edit({
  attributes,
  setAttributes
}) {
  const {
    title,
    subtitle,
    description,
    categories,
    projects,
    ctaText,
    ctaUrl
  } = attributes;
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
    className: 'work-block-editor-root'
  });

  // ── Category helpers ──────────────────────────────────────────────────
  const updateCategory = (index, value) => {
    const updated = [...categories];
    updated[index] = value;
    setAttributes({
      categories: updated
    });
  };
  const addCategory = () => {
    setAttributes({
      categories: [...categories, 'New Category']
    });
  };
  const removeCategory = index => {
    if (categories.length > 1) {
      setAttributes({
        categories: categories.filter((_, i) => i !== index)
      });
    }
  };

  // ── Project helpers ───────────────────────────────────────────────────
  const updateProject = (index, key, value) => {
    const updated = projects.map((p, i) => i === index ? {
      ...p,
      [key]: value
    } : p);
    setAttributes({
      projects: updated
    });
  };
  const addProject = () => {
    const newId = (projects[projects.length - 1]?.id ?? 0) + 1;
    setAttributes({
      projects: [...projects, {
        id: newId,
        title: 'New Project',
        category: categories[1] || 'Residential',
        description: '',
        image: '',
        location: ''
      }]
    });
  };
  const removeProject = index => {
    if (projects.length > 1) {
      setAttributes({
        projects: projects.filter((_, i) => i !== index)
      });
    }
  };

  // ── Render ───────────────────────────────────────────────────────────
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Header', 'theme'),
        initialOpen: true,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Title', 'theme'),
          value: title,
          onChange: v => setAttributes({
            title: v
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Subtitle', 'theme'),
          value: subtitle,
          onChange: v => setAttributes({
            subtitle: v
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextareaControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Description', 'theme'),
          value: description,
          rows: 3,
          onChange: v => setAttributes({
            description: v
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Categories', 'theme'),
        initialOpen: false,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          className: "work-inspector-section",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
            className: "work-inspector-section-title",
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Filter Categories', 'theme')
          }), categories.map((category, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
            className: "work-inspector-category-item",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
              className: "work-inspector-category-row",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
                value: category,
                onChange: v => updateCategory(index, v),
                placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Category name...', 'theme'),
                hideLabelFromVision: true
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
                isDestructive: true,
                variant: "tertiary",
                size: "small",
                onClick: () => removeCategory(index),
                disabled: categories.length <= 1,
                children: "\u2715"
              })]
            })
          }, index)), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
            variant: "secondary",
            onClick: addCategory,
            style: {
              width: '100%',
              justifyContent: 'center'
            },
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('+ Add Category', 'theme')
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Projects', 'theme'),
        initialOpen: false,
        children: [projects.map((project, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          className: "work-inspector-project-item",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("p", {
            className: "work-inspector-section-title",
            children: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Project', 'theme'), " ", index + 1, " \u2014 ", project.title || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Untitled', 'theme')]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Title', 'theme'),
            value: project.title,
            onChange: v => updateProject(index, 'title', v)
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Category', 'theme'),
            value: project.category,
            onChange: v => updateProject(index, 'category', v)
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextareaControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Description', 'theme'),
            value: project.description,
            rows: 3,
            onChange: v => updateProject(index, 'description', v)
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Location', 'theme'),
            value: project.location,
            onChange: v => updateProject(index, 'location', v)
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUploadCheck, {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUpload, {
                onSelect: media => updateProject(index, 'image', media.url),
                allowedTypes: ['image'],
                value: project.image,
                render: ({
                  open
                }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
                  onClick: open,
                  variant: "secondary",
                  style: {
                    width: '100%',
                    justifyContent: 'center'
                  },
                  children: project.image ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Replace Image', 'theme') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Select Image', 'theme')
                })
              })
            })
          }), project.image && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("img", {
            src: project.image,
            alt: project.title,
            className: "work-inspector-image-preview"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
              isDestructive: true,
              variant: "tertiary",
              onClick: () => removeProject(index),
              disabled: projects.length <= 1,
              style: {
                width: '100%'
              },
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Remove Project', 'theme')
            })
          })]
        }, project.id)), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
          variant: "secondary",
          onClick: addProject,
          style: {
            width: '100%',
            justifyContent: 'center',
            marginTop: '12px'
          },
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('+ Add Project', 'theme')
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Call to Action', 'theme'),
        initialOpen: false,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Button Text', 'theme'),
          value: ctaText,
          onChange: v => setAttributes({
            ctaText: v
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Button URL', 'theme'),
          value: ctaUrl,
          onChange: v => setAttributes({
            ctaUrl: v
          }),
          placeholder: "#contact"
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      ...blockProps,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("style", {
        children: editorStyles
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("section", {
        className: "work-editor-wrap",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          className: "work-editor-container",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
            className: "work-editor-header",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
              className: "work-editor-eyebrow",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
                className: "work-editor-eyebrow-line left"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                className: "work-editor-eyebrow-text",
                children: subtitle
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
                className: "work-editor-eyebrow-line right"
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("h2", {
              className: "work-editor-heading",
              children: title
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
              className: "work-editor-subheading",
              children: description
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
              className: "work-editor-categories",
              children: categories.map((category, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("button", {
                className: `work-editor-category-btn ${index === 0 ? 'active' : 'inactive'}`,
                children: category
              }, index))
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
            className: "work-editor-grid",
            children: projects.map((project, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
              className: "work-editor-card",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
                className: "work-editor-card-image",
                children: project.image ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("img", {
                  src: project.image,
                  alt: project.title
                }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                  children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Select image in sidebar →', 'theme')
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
                className: "work-editor-card-content",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
                  className: "work-editor-card-meta",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                    className: "work-editor-card-category",
                    children: project.category
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                    className: "work-editor-card-location",
                    children: project.location
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("h3", {
                  className: "work-editor-card-title",
                  children: project.title
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
                  className: "work-editor-card-desc",
                  children: project.description
                })]
              })]
            }, project.id))
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
            className: "work-editor-cta",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
              className: "work-editor-cta-btn",
              children: ctaText
            })
          })]
        })
      })]
    })]
  });
}

// ── Register ──────────────────────────────────────────────────────────────
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_4__.name, {
  edit: Edit,
  save: () => null // PHP render handles frontend
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map