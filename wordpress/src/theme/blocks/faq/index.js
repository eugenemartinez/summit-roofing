/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/lucide-react/dist/esm/Icon.js"
/*!****************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/Icon.js ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Icon)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _defaultAttributes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./defaultAttributes.js */ "./node_modules/lucide-react/dist/esm/defaultAttributes.js");
/* harmony import */ var _shared_src_utils_hasA11yProp_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared/src/utils/hasA11yProp.js */ "./node_modules/lucide-react/dist/esm/shared/src/utils/hasA11yProp.js");
/* harmony import */ var _shared_src_utils_mergeClasses_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shared/src/utils/mergeClasses.js */ "./node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.js");
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./context.js */ "./node_modules/lucide-react/dist/esm/context.js");

"use client";
/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */







const Icon = (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(
  ({ color, size, strokeWidth, absoluteStrokeWidth, className = "", children, iconNode, ...rest }, ref) => {
    const {
      size: contextSize = 24,
      strokeWidth: contextStrokeWidth = 2,
      absoluteStrokeWidth: contextAbsoluteStrokeWidth = false,
      color: contextColor = "currentColor",
      className: contextClass = ""
    } = (0,_context_js__WEBPACK_IMPORTED_MODULE_4__.useLucideContext)() ?? {};
    const calculatedStrokeWidth = absoluteStrokeWidth ?? contextAbsoluteStrokeWidth ? Number(strokeWidth ?? contextStrokeWidth) * 24 / Number(size ?? contextSize) : strokeWidth ?? contextStrokeWidth;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(
      "svg",
      {
        ref,
        ..._defaultAttributes_js__WEBPACK_IMPORTED_MODULE_1__["default"],
        width: size ?? contextSize ?? _defaultAttributes_js__WEBPACK_IMPORTED_MODULE_1__["default"].width,
        height: size ?? contextSize ?? _defaultAttributes_js__WEBPACK_IMPORTED_MODULE_1__["default"].height,
        stroke: color ?? contextColor,
        strokeWidth: calculatedStrokeWidth,
        className: (0,_shared_src_utils_mergeClasses_js__WEBPACK_IMPORTED_MODULE_3__.mergeClasses)("lucide", contextClass, className),
        ...!children && !(0,_shared_src_utils_hasA11yProp_js__WEBPACK_IMPORTED_MODULE_2__.hasA11yProp)(rest) && { "aria-hidden": "true" },
        ...rest
      },
      [
        ...iconNode.map(([tag, attrs]) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(tag, attrs)),
        ...Array.isArray(children) ? children : [children]
      ]
    );
  }
);


//# sourceMappingURL=Icon.js.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/context.js"
/*!*******************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/context.js ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LucideProvider: () => (/* binding */ LucideProvider),
/* harmony export */   useLucideContext: () => (/* binding */ useLucideContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

"use client";
/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const LucideContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({});
function LucideProvider({
  children,
  size,
  color,
  strokeWidth,
  absoluteStrokeWidth,
  className
}) {
  const value = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(
    () => ({
      size,
      color,
      strokeWidth,
      absoluteStrokeWidth,
      className
    }),
    [size, color, strokeWidth, absoluteStrokeWidth, className]
  );
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(LucideContext.Provider, { value }, children);
}
const useLucideContext = () => (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(LucideContext);


//# sourceMappingURL=context.js.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/createLucideIcon.js"
/*!****************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/createLucideIcon.js ***!
  \****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createLucideIcon)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shared_src_utils_mergeClasses_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared/src/utils/mergeClasses.js */ "./node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.js");
/* harmony import */ var _shared_src_utils_toKebabCase_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared/src/utils/toKebabCase.js */ "./node_modules/lucide-react/dist/esm/shared/src/utils/toKebabCase.js");
/* harmony import */ var _shared_src_utils_toPascalCase_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shared/src/utils/toPascalCase.js */ "./node_modules/lucide-react/dist/esm/shared/src/utils/toPascalCase.js");
/* harmony import */ var _Icon_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Icon.js */ "./node_modules/lucide-react/dist/esm/Icon.js");
/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */







const createLucideIcon = (iconName, iconNode) => {
  const Component = (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(
    ({ className, ...props }, ref) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Icon_js__WEBPACK_IMPORTED_MODULE_4__["default"], {
      ref,
      iconNode,
      className: (0,_shared_src_utils_mergeClasses_js__WEBPACK_IMPORTED_MODULE_1__.mergeClasses)(
        `lucide-${(0,_shared_src_utils_toKebabCase_js__WEBPACK_IMPORTED_MODULE_2__.toKebabCase)((0,_shared_src_utils_toPascalCase_js__WEBPACK_IMPORTED_MODULE_3__.toPascalCase)(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = (0,_shared_src_utils_toPascalCase_js__WEBPACK_IMPORTED_MODULE_3__.toPascalCase)(iconName);
  return Component;
};


//# sourceMappingURL=createLucideIcon.js.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/defaultAttributes.js"
/*!*****************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/defaultAttributes.js ***!
  \*****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ defaultAttributes)
/* harmony export */ });
/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};


//# sourceMappingURL=defaultAttributes.js.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/chevron-down.js"
/*!******************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/chevron-down.js ***!
  \******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ ChevronDown)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("chevron-down", __iconNode);


//# sourceMappingURL=chevron-down.js.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/circle-question-mark.js"
/*!**************************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/circle-question-mark.js ***!
  \**************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ CircleQuestionMark)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const CircleQuestionMark = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("circle-question-mark", __iconNode);


//# sourceMappingURL=circle-question-mark.js.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/shared/src/utils/hasA11yProp.js"
/*!****************************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/shared/src/utils/hasA11yProp.js ***!
  \****************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hasA11yProp: () => (/* binding */ hasA11yProp)
/* harmony export */ });
/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
  return false;
};


//# sourceMappingURL=hasA11yProp.js.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.js"
/*!*****************************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.js ***!
  \*****************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mergeClasses: () => (/* binding */ mergeClasses)
/* harmony export */ });
/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();


//# sourceMappingURL=mergeClasses.js.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.js"
/*!****************************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.js ***!
  \****************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   toCamelCase: () => (/* binding */ toCamelCase)
/* harmony export */ });
/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

const toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);


//# sourceMappingURL=toCamelCase.js.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/shared/src/utils/toKebabCase.js"
/*!****************************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/shared/src/utils/toKebabCase.js ***!
  \****************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   toKebabCase: () => (/* binding */ toKebabCase)
/* harmony export */ });
/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();


//# sourceMappingURL=toKebabCase.js.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/shared/src/utils/toPascalCase.js"
/*!*****************************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/shared/src/utils/toPascalCase.js ***!
  \*****************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   toPascalCase: () => (/* binding */ toPascalCase)
/* harmony export */ });
/* harmony import */ var _toCamelCase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toCamelCase.js */ "./node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.js");
/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const toPascalCase = (string) => {
  const camelCase = (0,_toCamelCase_js__WEBPACK_IMPORTED_MODULE_0__.toCamelCase)(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};


//# sourceMappingURL=toPascalCase.js.map


/***/ },

/***/ "react"
/*!************************!*\
  !*** external "React" ***!
  \************************/
(module) {

module.exports = window["React"];

/***/ },

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

/***/ "./src/blocks/faq/block.json"
/*!***********************************!*\
  !*** ./src/blocks/faq/block.json ***!
  \***********************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"theme/faq","title":"FAQ","category":"theme","description":"FAQ accordion section with frequently asked questions","supports":{"html":false,"inserter":true},"attributes":{"eyebrowText":{"type":"string","default":"FAQ"},"heading":{"type":"string","default":"Frequently Asked Questions"},"subheading":{"type":"string","default":"Find answers to common questions about our roofing services, materials, and process."},"faqItems":{"type":"array","default":[{"id":1,"question":"How long does a typical roof installation take?","answer":"Most residential roof installations can be completed in 1-3 days, depending on the size of your roof, weather conditions, and complexity of the job. Larger commercial projects may take longer. Our team will provide you with a specific timeline during your consultation."},{"id":2,"question":"What types of roofing materials do you offer?","answer":"We offer a variety of high-quality roofing materials including asphalt shingles, metal roofing, tile, slate, and flat roofing systems. Each material comes with different benefits, aesthetics, and price points. Our experts can help you choose the best option for your specific needs and budget."},{"id":3,"question":"Do you provide warranties on your roofing work?","answer":"Yes, all our roofing installations come with a comprehensive workmanship warranty. Additionally, the materials we use are covered by manufacturer warranties ranging from 20-50 years depending on the product. We\'ll explain all warranty details before beginning your project."},{"id":4,"question":"How do I know if I need a roof repair or a complete replacement?","answer":"Signs you might need roof work include missing or damaged shingles, leaks, water stains on ceilings, excessive granules in gutters, or a roof over 20 years old. Our free inspection service will assess your roof\'s condition and help you determine whether a repair or replacement is the most cost-effective solution."},{"id":5,"question":"Do you offer financing options for roofing projects?","answer":"Yes, we understand roof replacements can be a significant investment, which is why we offer flexible financing options with competitive rates to qualified customers. Our team can guide you through the application process and help you find a payment plan that fits your budget."},{"id":6,"question":"Are you licensed and insured?","answer":"Absolutely. Summit Roofing is fully licensed, bonded, and insured in all areas we operate. We carry comprehensive liability insurance and workers\' compensation coverage to protect both our team and your property throughout the project."}]},"showCTA":{"type":"boolean","default":true},"ctaText":{"type":"string","default":"Get in Touch"},"ctaHeading":{"type":"string","default":"Still have questions?"},"ctaSubheading":{"type":"string","default":"Our roofing experts are here to help you with any specific questions about your project."}},"editorScript":"file:./index.js","viewScript":"file:./view.js","render":"file:./render.php"}');

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
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
/*!*********************************!*\
  !*** ./src/blocks/faq/index.js ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/circle-question-mark.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/chevron-down.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./block.json */ "./src/blocks/faq/block.json");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");







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
function Edit({
  attributes,
  setAttributes
}) {
  const {
    eyebrowText,
    heading,
    subheading,
    faqItems = [],
    showCTA,
    ctaText,
    ctaHeading,
    ctaSubheading
  } = attributes;
  const [expandedId, setExpandedId] = react__WEBPACK_IMPORTED_MODULE_7__.useState(null);
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
    className: "faq-block-editor-root"
  });

  // ── FAQ helpers ──────────────────────────────────────────────────────
  const updateFAQItem = (index, key, value) => {
    const updated = faqItems.map((item, i) => i === index ? {
      ...item,
      [key]: value
    } : item);
    setAttributes({
      faqItems: updated
    });
  };
  const addFAQItem = () => {
    const newId = (faqItems[faqItems.length - 1]?.id ?? 0) + 1;
    setAttributes({
      faqItems: [...faqItems, {
        id: newId,
        question: "New Question",
        answer: ""
      }]
    });
  };
  const removeFAQItem = index => {
    setAttributes({
      faqItems: faqItems.filter((_, i) => i !== index)
    });
  };

  // ── Render ───────────────────────────────────────────────────────────
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("Section Header", "blocks"),
        initialOpen: true,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("Eyebrow Text", "blocks"),
          value: eyebrowText,
          onChange: v => setAttributes({
            eyebrowText: v
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("Heading", "blocks"),
          value: heading,
          onChange: v => setAttributes({
            heading: v
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextareaControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("Subheading", "blocks"),
          value: subheading,
          rows: 3,
          onChange: v => setAttributes({
            subheading: v
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("FAQ Items", "blocks"),
        initialOpen: false,
        children: [faqItems.map((item, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
          className: "inspector-card",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("p", {
            className: "inspector-card-header",
            children: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("Question", "blocks"), " ", index + 1]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("Question", "blocks"),
            value: item.question,
            onChange: v => updateFAQItem(index, "question", v),
            placeholder: "Enter question..."
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextareaControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("Answer", "blocks"),
            value: item.answer,
            rows: 4,
            onChange: v => updateFAQItem(index, "answer", v),
            placeholder: "Enter answer..."
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
            isDestructive: true,
            variant: "tertiary",
            size: "small",
            onClick: () => removeFAQItem(index),
            disabled: faqItems.length <= 1,
            style: {
              marginTop: "4px",
              width: "100%"
            },
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("Remove Question", "blocks")
          })]
        }, item.id)), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
          variant: "secondary",
          onClick: addFAQItem,
          style: {
            width: "100%",
            justifyContent: "center"
          },
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("+ Add Question", "blocks")
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("CTA Section", "blocks"),
        initialOpen: false,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("Show CTA Section", "blocks"),
          checked: showCTA,
          onChange: v => setAttributes({
            showCTA: v
          })
        }), showCTA && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("CTA Heading", "blocks"),
            value: ctaHeading,
            onChange: v => setAttributes({
              ctaHeading: v
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextareaControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("CTA Subheading", "blocks"),
            value: ctaSubheading,
            rows: 2,
            onChange: v => setAttributes({
              ctaSubheading: v
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("Button Text", "blocks"),
            value: ctaText,
            onChange: v => setAttributes({
              ctaText: v
            })
          })]
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
      ...blockProps,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("style", {
        children: editorStyles
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("section", {
        className: "faq-editor-wrap",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
          className: "faq-editor-container",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
            className: "faq-editor-header",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
              className: "faq-editor-eyebrow",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
                className: "faq-editor-eyebrow-line left"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
                className: "faq-editor-eyebrow-text",
                children: eyebrowText
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
                className: "faq-editor-eyebrow-line right"
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("h2", {
              className: "faq-editor-heading",
              children: heading
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("p", {
              className: "faq-editor-subheading",
              children: subheading
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
            className: "faq-editor-items",
            children: faqItems.map((item, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
              className: `faq-editor-item ${expandedId === item.id ? "open" : ""}`,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                className: "faq-editor-item-question",
                onClick: () => setExpandedId(expandedId === item.id ? null : item.id),
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("p", {
                  className: "faq-editor-question-text",
                  children: item.question || `Question ${index + 1}`
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
                  className: "faq-editor-chevron",
                  size: 20
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
                className: "faq-editor-item-answer",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("p", {
                  className: "faq-editor-answer-text",
                  children: item.answer || "Answer will appear here..."
                })
              })]
            }, item.id))
          }), showCTA && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
            className: "faq-cta-preview",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
              className: "faq-cta-icon",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {
                strokeWidth: 2,
                style: {
                  width: "2rem",
                  height: "2rem"
                }
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("h3", {
              className: "faq-cta-heading",
              children: ctaHeading
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("p", {
              className: "faq-cta-subheading",
              children: ctaSubheading
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("a", {
              href: "#contact",
              className: "faq-cta-button",
              children: [ctaText, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
                style: {
                  marginLeft: "0.5rem"
                },
                children: "\u2192"
              })]
            })]
          })]
        })
      })]
    })]
  });
}

// Add React for hooks


// ── Register ──────────────────────────────────────────────────────────────

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_6__.name, {
  edit: Edit,
  save: () => null
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map