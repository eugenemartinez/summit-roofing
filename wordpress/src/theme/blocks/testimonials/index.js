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

/***/ "./src/blocks/testimonials/block.json"
/*!********************************************!*\
  !*** ./src/blocks/testimonials/block.json ***!
  \********************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"blocks/section-testimonials","version":"1.0.0","title":"Testimonials","category":"theme","description":"Testimonial cards grid (desktop) with mobile slider, star ratings, avatars, and review badges.","keywords":["testimonials","reviews","slider","cards"],"textdomain":"blocks","editorScript":"file:./index.js","viewScript":"file:./view.js","render":"file:./render.php","supports":{"html":false,"align":false,"spacing":{"padding":false,"margin":false}},"attributes":{"eyebrowText":{"type":"string","default":"Testimonials"},"heading":{"type":"string","default":"What Our Customers Say"},"subheading":{"type":"string","default":"Don\'t just take our word for it. Hear from homeowners and businesses who trust Summit Roofing for their roofing needs."},"testimonials":{"type":"array","default":[{"id":1,"name":"Jennifer Thompson","location":"Westview, CA","rating":5,"text":"Summit Roofing replaced our entire roof after storm damage, and we couldn\'t be happier with the results. Their team was professional, efficient, and cleaned up thoroughly after the job. The new roof looks fantastic and has already protected us through several storms.","imageUrl":"https://randomuser.me/api/portraits/women/32.jpg","imageId":0},{"id":2,"name":"Robert Garcia","location":"Lakeside, CA","rating":5,"text":"I needed emergency repairs after a tree fell on my roof. Summit Roofing responded quickly, secured the damage, and completed the repairs within a week. Their pricing was transparent and fair, and the quality of work was excellent. I highly recommend their services.","imageUrl":"https://randomuser.me/api/portraits/men/45.jpg","imageId":0},{"id":3,"name":"Sarah Wilson","location":"Highland Heights, CA","rating":5,"text":"As a first-time homeowner, I was nervous about replacing my aging roof. Summit Roofing walked me through every step of the process, helped me select the perfect materials, and completed the work on schedule. My new roof is beautiful and I\'ve already noticed improvements in my energy bills.","imageUrl":"https://randomuser.me/api/portraits/women/64.jpg","imageId":0},{"id":4,"name":"Michael Johnson","location":"Crestview, CA","rating":4,"text":"Summit Roofing installed a metal roof on our mountain cabin last year. Despite challenging weather conditions and difficult access, they completed the project professionally and efficiently. The roof has held up perfectly through winter storms and high winds.","imageUrl":"https://randomuser.me/api/portraits/men/22.jpg","imageId":0},{"id":5,"name":"Emily Rodriguez","location":"Riverdale, CA","rating":5,"text":"We hired Summit Roofing for our office building\'s roof replacement. Their commercial team minimized disruption to our business operations and delivered exceptional results. The project manager kept us informed throughout the entire process, and they even finished ahead of schedule.","imageUrl":"https://randomuser.me/api/portraits/women/45.jpg","imageId":0},{"id":6,"name":"David Chen","location":"Oak Hills, CA","rating":5,"text":"After getting quotes from several companies, we chose Summit Roofing for their competitive pricing and outstanding reviews. They didn\'t disappoint! The crew was respectful of our property, the workmanship is excellent, and they honored every aspect of their warranty when we had a minor issue.","imageUrl":"https://randomuser.me/api/portraits/men/33.jpg","imageId":0}],"items":{"type":"object","properties":{"id":{"type":"number"},"name":{"type":"string"},"location":{"type":"string"},"rating":{"type":"number"},"text":{"type":"string"},"imageUrl":{"type":"string"},"imageId":{"type":"number"}}}},"reviewScore":{"type":"string","default":"4.9/5.0"},"reviewCount":{"type":"string","default":"Based on 150+ Reviews"},"bbbRating":{"type":"string","default":"A+ Rating"},"bbbLabel":{"type":"string","default":"Better Business Bureau"},"yearsTitle":{"type":"string","default":"20+ Years"},"yearsLabel":{"type":"string","default":"Serving our community"},"autoAdvanceDelay":{"type":"number","default":6000}}}');

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
/*!******************************************!*\
  !*** ./src/blocks/testimonials/index.js ***!
  \******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/blocks/testimonials/block.json");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");






// ── Fallback avatar URL ───────────────────────────────────────────────────

const FALLBACK_AVATARS = ["https://randomuser.me/api/portraits/women/32.jpg", "https://randomuser.me/api/portraits/men/45.jpg", "https://randomuser.me/api/portraits/women/64.jpg", "https://randomuser.me/api/portraits/men/22.jpg", "https://randomuser.me/api/portraits/women/45.jpg", "https://randomuser.me/api/portraits/men/33.jpg"];

// ── Star renderer ─────────────────────────────────────────────────────────
const Stars = ({
  rating
}) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
  style: {
    display: "flex",
    gap: "2px"
  },
  children: Array.from({
    length: 5
  }, (_, i) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("i", {
    "data-lucide": "star",
    style: {
      width: "1rem",
      height: "1rem",
      color: i < rating ? "#FACC15" : "#D1D5DB",
      fill: i < rating ? "#FACC15" : "none"
    }
  }, i))
});

// ── Quote icon ────────────────────────────────────────────────────────────
const QuoteIcon = () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("i", {
  "data-lucide": "quote",
  style: {
    width: "1.25rem",
    height: "1.25rem",
    color: "#ffffff"
  }
});

// ── Editor styles ─────────────────────────────────────────────────────────
const editorStyles = `
	.testimonials-editor-wrap {
		font-family: var(--font-body, 'Inter', sans-serif);
		background: linear-gradient(135deg, var(--primary, #1E3A5E) 0%, #152d4a 100%);
		padding: 4rem 1rem;
	}
	.testimonials-editor-container {
		max-width: 1280px;
		margin: 0 auto;
	}
	/* Header */
	.testimonials-editor-header {
		text-align: center;
		margin-bottom: 3rem;
	}
	.testimonials-editor-eyebrow {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 1rem;
	}
	.testimonials-editor-eyebrow-line {
		height: 4px;
		width: 3rem;
		background-color: var(--cta, #D86A6A);
		border-radius: 2px;
		flex-shrink: 0;
	}
	.testimonials-editor-eyebrow-line.left  { margin-right: 1rem; }
	.testimonials-editor-eyebrow-line.right { margin-left: 1rem; }
	.testimonials-editor-eyebrow-text {
		font-size: 0.875rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: #ffffff;
	}
	.testimonials-editor-heading {
		font-family: var(--font-headline, 'Poppins', sans-serif);
		font-size: clamp(1.75rem, 3vw, 2.25rem);
		font-weight: 700;
		color: #ffffff;
		margin: 0 0 1rem;
		line-height: 1.2;
	}
	.testimonials-editor-subheading {
		color: rgba(255,255,255,0.8);
		max-width: 42rem;
		margin: 0 auto;
		line-height: 1.6;
	}
	/* Cards grid */
	.testimonials-editor-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1.5rem;
		margin-bottom: 3rem;
	}
	/* Card */
	.testimonials-editor-card {
		background: #ffffff;
		border-radius: 0.5rem;
		box-shadow: 0 4px 20px rgba(0,0,0,0.12);
		padding: 1.5rem;
		position: relative;
		padding-top: 2.5rem;
	}
	.testimonials-editor-quote-badge {
		position: absolute;
		top: -1.25rem;
		left: 1.5rem;
		background-color: var(--cta, #D86A6A);
		border-radius: 9999px;
		padding: 0.75rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.testimonials-editor-avatar-row {
		display: flex;
		align-items: center;
		margin-bottom: 1rem;
		margin-top: 0.5rem;
	}
	.testimonials-editor-avatar {
		width: 3rem;
		height: 3rem;
		border-radius: 9999px;
		object-fit: cover;
		margin-right: 1rem;
		border: 2px solid rgba(30,58,95,0.15);
		flex-shrink: 0;
	}
	.testimonials-editor-name {
		font-weight: 700;
		color: var(--primary, #1E3A5E);
		margin: 0 0 2px;
		font-size: 0.95rem;
	}
	.testimonials-editor-location {
		display: flex;
		align-items: center;
		font-size: 0.8rem;
		color: var(--accent, #36454F);
		margin: 0;
	}
	.testimonials-editor-stars {
		display: flex;
		gap: 2px;
		margin-bottom: 0.75rem;
	}
	.testimonials-editor-text {
		color: var(--accent, #36454F);
		font-size: 0.9rem;
		line-height: 1.6;
		margin: 0;
	}
	/* Badges row */
	.testimonials-editor-badges {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1.5rem;
	}
	.testimonials-editor-badge {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		background: rgba(255,255,255,0.1);
		backdrop-filter: blur(4px);
		padding: 0.75rem 1.5rem;
		border-radius: 0.5rem;
		color: #ffffff;
	}
	.testimonials-editor-badge-icon {
		color: #ffffff;
		flex-shrink: 0;
	}
	.testimonials-editor-badge-title {
		font-weight: 700;
		font-size: 1.1rem;
		margin: 0 0 2px;
		line-height: 1;
	}
	.testimonials-editor-badge-subtitle {
		font-size: 0.8rem;
		opacity: 0.8;
		margin: 0;
	}
	/* Inspector helpers */
	.testimonials-inspector-card {
		border: 1px solid #e0e0e0;
		border-radius: 6px;
		padding: 12px;
		margin-bottom: 12px;
		background: #fafafa;
	}
	.testimonials-inspector-card-header {
		font-size: 12px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #555;
		margin-bottom: 8px;
	}
	.testimonials-inspector-avatar-preview {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		object-fit: cover;
		display: block;
		margin-bottom: 8px;
		border: 2px solid #e2e8f0;
	}
`;

// ── Star rating component for inspector ───────────────────────────────────
const InspectorStars = ({
  rating,
  onChange
}) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
    style: {
      fontSize: "11px",
      fontWeight: 600,
      color: "#777",
      textTransform: "uppercase",
      letterSpacing: "0.04em",
      marginBottom: "6px"
    },
    children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Rating", "blocks")
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
    style: {
      display: "flex",
      gap: "4px"
    },
    children: Array.from({
      length: 5
    }, (_, i) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("button", {
      onClick: () => onChange(i + 1),
      style: {
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "2px",
        fontSize: "1.25rem",
        color: i < rating ? "#FACC15" : "#D1D5DB"
      },
      title: `${i + 1} star${i > 0 ? "s" : ""}`,
      children: "\u2605"
    }, i))
  })]
});

// ── Edit ──────────────────────────────────────────────────────────────────
function Edit({
  attributes,
  setAttributes
}) {
  const {
    eyebrowText,
    heading,
    subheading,
    testimonials,
    reviewScore,
    reviewCount,
    bbbRating,
    bbbLabel,
    yearsTitle,
    yearsLabel,
    autoAdvanceDelay
  } = attributes;
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
    className: "testimonials-block-editor-root"
  });

  // ── Testimonial helpers ──────────────────────────────────────────────
  const updateTestimonial = (index, key, value) => {
    const updated = testimonials.map((t, i) => i === index ? {
      ...t,
      [key]: value
    } : t);
    setAttributes({
      testimonials: updated
    });
  };
  const addTestimonial = () => {
    const newId = (testimonials[testimonials.length - 1]?.id ?? 0) + 1;
    const fallback = FALLBACK_AVATARS[testimonials.length % FALLBACK_AVATARS.length];
    setAttributes({
      testimonials: [...testimonials, {
        id: newId,
        name: "New Reviewer",
        location: "City, CA",
        rating: 5,
        text: "",
        imageUrl: fallback,
        imageId: 0
      }]
    });
  };
  const removeTestimonial = index => {
    setAttributes({
      testimonials: testimonials.filter((_, i) => i !== index)
    });
  };

  // ── Render ───────────────────────────────────────────────────────────
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Section Header", "blocks"),
        initialOpen: true,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Eyebrow Text", "blocks"),
          value: eyebrowText,
          onChange: v => setAttributes({
            eyebrowText: v
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Heading", "blocks"),
          value: heading,
          onChange: v => setAttributes({
            heading: v
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextareaControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Subheading", "blocks"),
          value: subheading,
          rows: 3,
          onChange: v => setAttributes({
            subheading: v
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Testimonials", "blocks"),
        initialOpen: false,
        children: [testimonials.map((testimonial, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          className: "testimonials-inspector-card",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("p", {
            className: "testimonials-inspector-card-header",
            children: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Review", "blocks"), " ", index + 1, " \u2014", " ", testimonial.name || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Unnamed", "blocks")]
          }), testimonial.imageUrl && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("img", {
            src: testimonial.imageUrl,
            alt: testimonial.name,
            className: "testimonials-inspector-avatar-preview"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUploadCheck, {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUpload, {
                onSelect: media => updateTestimonial(index, "imageId", media.id) || updateTestimonial(index, "imageUrl", media.url),
                allowedTypes: ["image"],
                value: testimonial.imageId,
                render: ({
                  open
                }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
                  onClick: open,
                  variant: "secondary",
                  style: {
                    width: "100%",
                    justifyContent: "center",
                    marginBottom: "8px"
                  },
                  children: testimonial.imageId ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Replace Avatar", "blocks") : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Select Avatar", "blocks")
                })
              })
            })
          }), testimonial.imageId > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
              isDestructive: true,
              variant: "tertiary",
              size: "small",
              onClick: () => {
                const fallback = FALLBACK_AVATARS[index % FALLBACK_AVATARS.length];
                updateTestimonial(index, "imageId", 0);
                updateTestimonial(index, "imageUrl", fallback);
              },
              style: {
                width: "100%",
                marginBottom: "8px"
              },
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Remove Avatar", "blocks")
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Name", "blocks"),
            value: testimonial.name,
            onChange: v => updateTestimonial(index, "name", v)
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Location", "blocks"),
            value: testimonial.location,
            onChange: v => updateTestimonial(index, "location", v)
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(InspectorStars, {
            rating: testimonial.rating,
            onChange: v => updateTestimonial(index, "rating", v)
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
            style: {
              marginTop: "8px"
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextareaControl, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Review Text", "blocks"),
              value: testimonial.text,
              rows: 4,
              onChange: v => updateTestimonial(index, "text", v)
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
            isDestructive: true,
            variant: "tertiary",
            size: "small",
            onClick: () => removeTestimonial(index),
            disabled: testimonials.length <= 1,
            style: {
              marginTop: "4px"
            },
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Remove Review", "blocks")
          })]
        }, testimonial.id)), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
          variant: "secondary",
          onClick: addTestimonial,
          disabled: testimonials.length >= 12,
          style: {
            width: "100%",
            justifyContent: "center"
          },
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("+ Add Review", "blocks")
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Review Badges", "blocks"),
        initialOpen: false,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
          style: {
            fontSize: "11px",
            color: "#777",
            marginBottom: "12px"
          },
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Star Rating Badge", "blocks")
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Score", "blocks"),
          value: reviewScore,
          onChange: v => setAttributes({
            reviewScore: v
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Label", "blocks"),
          value: reviewCount,
          onChange: v => setAttributes({
            reviewCount: v
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
          style: {
            fontSize: "11px",
            color: "#777",
            margin: "12px 0 8px"
          },
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("BBB Badge", "blocks")
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Rating", "blocks"),
          value: bbbRating,
          onChange: v => setAttributes({
            bbbRating: v
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Label", "blocks"),
          value: bbbLabel,
          onChange: v => setAttributes({
            bbbLabel: v
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
          style: {
            fontSize: "11px",
            color: "#777",
            margin: "12px 0 8px"
          },
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Years Badge", "blocks")
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Value", "blocks"),
          value: yearsTitle,
          onChange: v => setAttributes({
            yearsTitle: v
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Label", "blocks"),
          value: yearsLabel,
          onChange: v => setAttributes({
            yearsLabel: v
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Slider Settings", "blocks"),
        initialOpen: false,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Auto-advance Delay (ms)", "blocks"),
          value: autoAdvanceDelay,
          onChange: v => setAttributes({
            autoAdvanceDelay: v
          }),
          min: 2000,
          max: 12000,
          step: 500
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      ...blockProps,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("style", {
        children: editorStyles
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("section", {
        className: "testimonials-editor-wrap",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          className: "testimonials-editor-container",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
            className: "testimonials-editor-header",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
              className: "testimonials-editor-eyebrow",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
                className: "testimonials-editor-eyebrow-line left"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                className: "testimonials-editor-eyebrow-text",
                children: eyebrowText
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
                className: "testimonials-editor-eyebrow-line right"
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("h2", {
              className: "testimonials-editor-heading",
              children: heading
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
              className: "testimonials-editor-subheading",
              children: subheading
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
            className: "testimonials-editor-grid",
            children: testimonials.map((testimonial, i) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
              className: "testimonials-editor-card",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
                className: "testimonials-editor-quote-badge",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(QuoteIcon, {})
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
                className: "testimonials-editor-avatar-row",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("img", {
                  src: testimonial.imageUrl || FALLBACK_AVATARS[i % FALLBACK_AVATARS.length],
                  alt: testimonial.name,
                  className: "testimonials-editor-avatar"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
                    className: "testimonials-editor-name",
                    children: testimonial.name
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("p", {
                    className: "testimonials-editor-location",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("i", {
                      "data-lucide": "map-pin",
                      style: {
                        width: "0.75rem",
                        height: "0.75rem",
                        marginRight: "4px"
                      }
                    }), testimonial.location]
                  })]
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
                className: "testimonials-editor-stars",
                children: Array.from({
                  length: 5
                }, (_, si) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                  style: {
                    fontSize: "1rem",
                    color: si < testimonial.rating ? "#FACC15" : "#D1D5DB"
                  },
                  children: "\u2605"
                }, si))
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("p", {
                className: "testimonials-editor-text",
                children: ["\u201C", testimonial.text, "\u201D"]
              })]
            }, testimonial.id ?? i))
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
            className: "testimonials-editor-badges",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
              className: "testimonials-editor-badge",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("i", {
                "data-lucide": "star",
                className: "testimonials-editor-badge-icon",
                style: {
                  width: "1.5rem",
                  height: "1.5rem"
                }
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
                  className: "testimonials-editor-badge-title",
                  children: reviewScore
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
                  className: "testimonials-editor-badge-subtitle",
                  children: reviewCount
                })]
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
              className: "testimonials-editor-badge",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("i", {
                "data-lucide": "file-text",
                className: "testimonials-editor-badge-icon",
                style: {
                  width: "1.5rem",
                  height: "1.5rem"
                }
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
                  className: "testimonials-editor-badge-title",
                  children: bbbRating
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
                  className: "testimonials-editor-badge-subtitle",
                  children: bbbLabel
                })]
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
              className: "testimonials-editor-badge",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("i", {
                "data-lucide": "clock",
                className: "testimonials-editor-badge-icon",
                style: {
                  width: "1.5rem",
                  height: "1.5rem"
                }
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
                  className: "testimonials-editor-badge-title",
                  children: yearsTitle
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
                  className: "testimonials-editor-badge-subtitle",
                  children: yearsLabel
                })]
              })]
            })]
          })]
        })
      })]
    })]
  });
}

// ── Register ──────────────────────────────────────────────────────────────
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_4__.name, {
  edit: Edit,
  save: () => null
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map