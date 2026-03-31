/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/framer-motion/dist/es/animation/animate/index.mjs"
/*!************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/animation/animate/index.mjs ***!
  \************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   animate: () => (/* binding */ animate),
/* harmony export */   createScopedAnimate: () => (/* binding */ createScopedAnimate)
/* harmony export */ });
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-dom */ "./node_modules/motion-dom/dist/es/animation/GroupAnimationWithThen.mjs");
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/array.mjs");
/* harmony import */ var _sequence_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sequence.mjs */ "./node_modules/framer-motion/dist/es/animation/animate/sequence.mjs");
/* harmony import */ var _subject_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./subject.mjs */ "./node_modules/framer-motion/dist/es/animation/animate/subject.mjs");





function isSequence(value) {
    return Array.isArray(value) && value.some(Array.isArray);
}
/**
 * Creates an animation function that is optionally scoped
 * to a specific element.
 */
function createScopedAnimate(options = {}) {
    const { scope, reduceMotion } = options;
    /**
     * Implementation
     */
    function scopedAnimate(subjectOrSequence, optionsOrKeyframes, options) {
        let animations = [];
        let animationOnComplete;
        if (isSequence(subjectOrSequence)) {
            const { onComplete, ...sequenceOptions } = optionsOrKeyframes || {};
            if (typeof onComplete === "function") {
                animationOnComplete = onComplete;
            }
            animations = (0,_sequence_mjs__WEBPACK_IMPORTED_MODULE_2__.animateSequence)(subjectOrSequence, reduceMotion !== undefined
                ? { reduceMotion, ...sequenceOptions }
                : sequenceOptions, scope);
        }
        else {
            // Extract top-level onComplete so it doesn't get applied per-value
            const { onComplete, ...rest } = options || {};
            if (typeof onComplete === "function") {
                animationOnComplete = onComplete;
            }
            animations = (0,_subject_mjs__WEBPACK_IMPORTED_MODULE_3__.animateSubject)(subjectOrSequence, optionsOrKeyframes, (reduceMotion !== undefined
                ? { reduceMotion, ...rest }
                : rest), scope);
        }
        const animation = new motion_dom__WEBPACK_IMPORTED_MODULE_0__.GroupAnimationWithThen(animations);
        if (animationOnComplete) {
            animation.finished.then(animationOnComplete);
        }
        if (scope) {
            scope.animations.push(animation);
            animation.finished.then(() => {
                (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__.removeItem)(scope.animations, animation);
            });
        }
        return animation;
    }
    return scopedAnimate;
}
const animate = createScopedAnimate();


//# sourceMappingURL=index.mjs.map


/***/ },

/***/ "./node_modules/framer-motion/dist/es/animation/animate/resolve-subjects.mjs"
/*!***********************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/animation/animate/resolve-subjects.mjs ***!
  \***********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveSubjects: () => (/* binding */ resolveSubjects)
/* harmony export */ });
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-dom */ "./node_modules/motion-dom/dist/es/utils/resolve-elements.mjs");
/* harmony import */ var _utils_is_dom_keyframes_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/is-dom-keyframes.mjs */ "./node_modules/framer-motion/dist/es/animation/utils/is-dom-keyframes.mjs");



function resolveSubjects(subject, keyframes, scope, selectorCache) {
    if (subject == null) {
        return [];
    }
    if (typeof subject === "string" && (0,_utils_is_dom_keyframes_mjs__WEBPACK_IMPORTED_MODULE_1__.isDOMKeyframes)(keyframes)) {
        return (0,motion_dom__WEBPACK_IMPORTED_MODULE_0__.resolveElements)(subject, scope, selectorCache);
    }
    else if (subject instanceof NodeList) {
        return Array.from(subject);
    }
    else if (Array.isArray(subject)) {
        return subject.filter((s) => s != null);
    }
    else {
        return [subject];
    }
}


//# sourceMappingURL=resolve-subjects.mjs.map


/***/ },

/***/ "./node_modules/framer-motion/dist/es/animation/animate/sequence.mjs"
/*!***************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/animation/animate/sequence.mjs ***!
  \***************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   animateSequence: () => (/* binding */ animateSequence)
/* harmony export */ });
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-dom */ "./node_modules/motion-dom/dist/es/animation/generators/spring.mjs");
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! motion-dom */ "./node_modules/motion-dom/dist/es/value/index.mjs");
/* harmony import */ var _sequence_create_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../sequence/create.mjs */ "./node_modules/framer-motion/dist/es/animation/sequence/create.mjs");
/* harmony import */ var _subject_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./subject.mjs */ "./node_modules/framer-motion/dist/es/animation/animate/subject.mjs");




function animateSequence(sequence, options, scope) {
    const animations = [];
    /**
     * Pre-process: replace function segments with MotionValue segments,
     * subscribe callbacks immediately
     */
    const processedSequence = sequence.map((segment) => {
        if (Array.isArray(segment) && typeof segment[0] === "function") {
            const callback = segment[0];
            const mv = (0,motion_dom__WEBPACK_IMPORTED_MODULE_1__.motionValue)(0);
            mv.on("change", callback);
            if (segment.length === 1) {
                return [mv, [0, 1]];
            }
            else if (segment.length === 2) {
                return [mv, [0, 1], segment[1]];
            }
            else {
                return [mv, segment[1], segment[2]];
            }
        }
        return segment;
    });
    const animationDefinitions = (0,_sequence_create_mjs__WEBPACK_IMPORTED_MODULE_2__.createAnimationsFromSequence)(processedSequence, options, scope, { spring: motion_dom__WEBPACK_IMPORTED_MODULE_0__.spring });
    animationDefinitions.forEach(({ keyframes, transition }, subject) => {
        animations.push(...(0,_subject_mjs__WEBPACK_IMPORTED_MODULE_3__.animateSubject)(subject, keyframes, transition));
    });
    return animations;
}


//# sourceMappingURL=sequence.mjs.map


/***/ },

/***/ "./node_modules/framer-motion/dist/es/animation/animate/subject.mjs"
/*!**************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/animation/animate/subject.mjs ***!
  \**************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   animateSubject: () => (/* binding */ animateSubject)
/* harmony export */ });
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-dom */ "./node_modules/motion-dom/dist/es/animation/interfaces/visual-element-target.mjs");
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! motion-dom */ "./node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs");
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! motion-dom */ "./node_modules/motion-dom/dist/es/render/store.mjs");
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! motion-dom */ "./node_modules/motion-dom/dist/es/animation/animate/single-value.mjs");
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/errors.mjs");
/* harmony import */ var _utils_create_visual_element_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/create-visual-element.mjs */ "./node_modules/framer-motion/dist/es/animation/utils/create-visual-element.mjs");
/* harmony import */ var _utils_is_dom_keyframes_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/is-dom-keyframes.mjs */ "./node_modules/framer-motion/dist/es/animation/utils/is-dom-keyframes.mjs");
/* harmony import */ var _resolve_subjects_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./resolve-subjects.mjs */ "./node_modules/framer-motion/dist/es/animation/animate/resolve-subjects.mjs");






function isSingleValue(subject, keyframes) {
    return ((0,motion_dom__WEBPACK_IMPORTED_MODULE_1__.isMotionValue)(subject) ||
        typeof subject === "number" ||
        (typeof subject === "string" && !(0,_utils_is_dom_keyframes_mjs__WEBPACK_IMPORTED_MODULE_6__.isDOMKeyframes)(keyframes)));
}
/**
 * Implementation
 */
function animateSubject(subject, keyframes, options, scope) {
    const animations = [];
    if (isSingleValue(subject, keyframes)) {
        animations.push((0,motion_dom__WEBPACK_IMPORTED_MODULE_3__.animateSingleValue)(subject, (0,_utils_is_dom_keyframes_mjs__WEBPACK_IMPORTED_MODULE_6__.isDOMKeyframes)(keyframes)
            ? keyframes.default || keyframes
            : keyframes, options ? options.default || options : options));
    }
    else {
        // Gracefully handle null/undefined subjects (e.g., from querySelector returning null)
        if (subject == null) {
            return animations;
        }
        const subjects = (0,_resolve_subjects_mjs__WEBPACK_IMPORTED_MODULE_7__.resolveSubjects)(subject, keyframes, scope);
        const numSubjects = subjects.length;
        (0,motion_utils__WEBPACK_IMPORTED_MODULE_4__.invariant)(Boolean(numSubjects), "No valid elements provided.", "no-valid-elements");
        for (let i = 0; i < numSubjects; i++) {
            const thisSubject = subjects[i];
            const createVisualElement = thisSubject instanceof Element
                ? _utils_create_visual_element_mjs__WEBPACK_IMPORTED_MODULE_5__.createDOMVisualElement
                : _utils_create_visual_element_mjs__WEBPACK_IMPORTED_MODULE_5__.createObjectVisualElement;
            if (!motion_dom__WEBPACK_IMPORTED_MODULE_2__.visualElementStore.has(thisSubject)) {
                createVisualElement(thisSubject);
            }
            const visualElement = motion_dom__WEBPACK_IMPORTED_MODULE_2__.visualElementStore.get(thisSubject);
            const transition = { ...options };
            /**
             * Resolve stagger function if provided.
             */
            if ("delay" in transition &&
                typeof transition.delay === "function") {
                transition.delay = transition.delay(i, numSubjects);
            }
            animations.push(...(0,motion_dom__WEBPACK_IMPORTED_MODULE_0__.animateTarget)(visualElement, { ...keyframes, transition }, {}));
        }
    }
    return animations;
}


//# sourceMappingURL=subject.mjs.map


/***/ },

/***/ "./node_modules/framer-motion/dist/es/animation/sequence/create.mjs"
/*!**************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/animation/sequence/create.mjs ***!
  \**************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createAnimationsFromSequence: () => (/* binding */ createAnimationsFromSequence),
/* harmony export */   getValueTransition: () => (/* binding */ getValueTransition)
/* harmony export */ });
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-dom */ "./node_modules/motion-dom/dist/es/animation/generators/utils/create-generator-easing.mjs");
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! motion-dom */ "./node_modules/motion-dom/dist/es/animation/generators/utils/is-generator.mjs");
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! motion-dom */ "./node_modules/motion-dom/dist/es/animation/keyframes/offsets/default.mjs");
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! motion-dom */ "./node_modules/motion-dom/dist/es/animation/keyframes/offsets/fill.mjs");
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! motion-dom */ "./node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs");
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/errors.mjs");
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/progress.mjs");
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/time-conversion.mjs");
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/easing/utils/get-easing-for-segment.mjs");
/* harmony import */ var _animate_resolve_subjects_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../animate/resolve-subjects.mjs */ "./node_modules/framer-motion/dist/es/animation/animate/resolve-subjects.mjs");
/* harmony import */ var _utils_calc_repeat_duration_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./utils/calc-repeat-duration.mjs */ "./node_modules/framer-motion/dist/es/animation/sequence/utils/calc-repeat-duration.mjs");
/* harmony import */ var _utils_calc_time_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./utils/calc-time.mjs */ "./node_modules/framer-motion/dist/es/animation/sequence/utils/calc-time.mjs");
/* harmony import */ var _utils_edit_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./utils/edit.mjs */ "./node_modules/framer-motion/dist/es/animation/sequence/utils/edit.mjs");
/* harmony import */ var _utils_normalize_times_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./utils/normalize-times.mjs */ "./node_modules/framer-motion/dist/es/animation/sequence/utils/normalize-times.mjs");
/* harmony import */ var _utils_sort_mjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./utils/sort.mjs */ "./node_modules/framer-motion/dist/es/animation/sequence/utils/sort.mjs");









const defaultSegmentEasing = "easeInOut";
const MAX_REPEAT = 20;
function createAnimationsFromSequence(sequence, { defaultTransition = {}, ...sequenceTransition } = {}, scope, generators) {
    const defaultDuration = defaultTransition.duration || 0.3;
    const animationDefinitions = new Map();
    const sequences = new Map();
    const elementCache = {};
    const timeLabels = new Map();
    let prevTime = 0;
    let currentTime = 0;
    let totalDuration = 0;
    /**
     * Build the timeline by mapping over the sequence array and converting
     * the definitions into keyframes and offsets with absolute time values.
     * These will later get converted into relative offsets in a second pass.
     */
    for (let i = 0; i < sequence.length; i++) {
        const segment = sequence[i];
        /**
         * If this is a timeline label, mark it and skip the rest of this iteration.
         */
        if (typeof segment === "string") {
            timeLabels.set(segment, currentTime);
            continue;
        }
        else if (!Array.isArray(segment)) {
            timeLabels.set(segment.name, (0,_utils_calc_time_mjs__WEBPACK_IMPORTED_MODULE_11__.calcNextTime)(currentTime, segment.at, prevTime, timeLabels));
            continue;
        }
        let [subject, keyframes, transition = {}] = segment;
        /**
         * If a relative or absolute time value has been specified we need to resolve
         * it in relation to the currentTime.
         */
        if (transition.at !== undefined) {
            currentTime = (0,_utils_calc_time_mjs__WEBPACK_IMPORTED_MODULE_11__.calcNextTime)(currentTime, transition.at, prevTime, timeLabels);
        }
        /**
         * Keep track of the maximum duration in this definition. This will be
         * applied to currentTime once the definition has been parsed.
         */
        let maxDuration = 0;
        const resolveValueSequence = (valueKeyframes, valueTransition, valueSequence, elementIndex = 0, numSubjects = 0) => {
            const valueKeyframesAsList = keyframesAsList(valueKeyframes);
            const { delay = 0, times = (0,motion_dom__WEBPACK_IMPORTED_MODULE_2__.defaultOffset)(valueKeyframesAsList), type = defaultTransition.type || "keyframes", repeat, repeatType, repeatDelay = 0, ...remainingTransition } = valueTransition;
            let { ease = defaultTransition.ease || "easeOut", duration } = valueTransition;
            /**
             * Resolve stagger() if defined.
             */
            const calculatedDelay = typeof delay === "function"
                ? delay(elementIndex, numSubjects)
                : delay;
            /**
             * If this animation should and can use a spring, generate a spring easing function.
             */
            const numKeyframes = valueKeyframesAsList.length;
            const createGenerator = (0,motion_dom__WEBPACK_IMPORTED_MODULE_1__.isGenerator)(type)
                ? type
                : generators?.[type || "keyframes"];
            if (numKeyframes <= 2 && createGenerator) {
                /**
                 * As we're creating an easing function from a spring,
                 * ideally we want to generate it using the real distance
                 * between the two keyframes. However this isn't always
                 * possible - in these situations we use 0-100.
                 */
                let absoluteDelta = 100;
                if (numKeyframes === 2 &&
                    isNumberKeyframesArray(valueKeyframesAsList)) {
                    const delta = valueKeyframesAsList[1] - valueKeyframesAsList[0];
                    absoluteDelta = Math.abs(delta);
                }
                const springTransition = {
                    ...defaultTransition,
                    ...remainingTransition,
                };
                if (duration !== undefined) {
                    springTransition.duration = (0,motion_utils__WEBPACK_IMPORTED_MODULE_7__.secondsToMilliseconds)(duration);
                }
                const springEasing = (0,motion_dom__WEBPACK_IMPORTED_MODULE_0__.createGeneratorEasing)(springTransition, absoluteDelta, createGenerator);
                ease = springEasing.ease;
                duration = springEasing.duration;
            }
            duration ?? (duration = defaultDuration);
            const startTime = currentTime + calculatedDelay;
            /**
             * If there's only one time offset of 0, fill in a second with length 1
             */
            if (times.length === 1 && times[0] === 0) {
                times[1] = 1;
            }
            /**
             * Fill out if offset if fewer offsets than keyframes
             */
            const remainder = times.length - valueKeyframesAsList.length;
            remainder > 0 && (0,motion_dom__WEBPACK_IMPORTED_MODULE_3__.fillOffset)(times, remainder);
            /**
             * If only one value has been set, ie [1], push a null to the start of
             * the keyframe array. This will let us mark a keyframe at this point
             * that will later be hydrated with the previous value.
             */
            valueKeyframesAsList.length === 1 &&
                valueKeyframesAsList.unshift(null);
            /**
             * Handle repeat options
             */
            if (repeat) {
                (0,motion_utils__WEBPACK_IMPORTED_MODULE_5__.invariant)(repeat < MAX_REPEAT, "Repeat count too high, must be less than 20", "repeat-count-high");
                duration = (0,_utils_calc_repeat_duration_mjs__WEBPACK_IMPORTED_MODULE_10__.calculateRepeatDuration)(duration, repeat);
                const originalKeyframes = [...valueKeyframesAsList];
                const originalTimes = [...times];
                ease = Array.isArray(ease) ? [...ease] : [ease];
                const originalEase = [...ease];
                for (let repeatIndex = 0; repeatIndex < repeat; repeatIndex++) {
                    valueKeyframesAsList.push(...originalKeyframes);
                    for (let keyframeIndex = 0; keyframeIndex < originalKeyframes.length; keyframeIndex++) {
                        times.push(originalTimes[keyframeIndex] + (repeatIndex + 1));
                        ease.push(keyframeIndex === 0
                            ? "linear"
                            : (0,motion_utils__WEBPACK_IMPORTED_MODULE_8__.getEasingForSegment)(originalEase, keyframeIndex - 1));
                    }
                }
                (0,_utils_normalize_times_mjs__WEBPACK_IMPORTED_MODULE_13__.normalizeTimes)(times, repeat);
            }
            const targetTime = startTime + duration;
            /**
             * Add keyframes, mapping offsets to absolute time.
             */
            (0,_utils_edit_mjs__WEBPACK_IMPORTED_MODULE_12__.addKeyframes)(valueSequence, valueKeyframesAsList, ease, times, startTime, targetTime);
            maxDuration = Math.max(calculatedDelay + duration, maxDuration);
            totalDuration = Math.max(targetTime, totalDuration);
        };
        if ((0,motion_dom__WEBPACK_IMPORTED_MODULE_4__.isMotionValue)(subject)) {
            const subjectSequence = getSubjectSequence(subject, sequences);
            resolveValueSequence(keyframes, transition, getValueSequence("default", subjectSequence));
        }
        else {
            const subjects = (0,_animate_resolve_subjects_mjs__WEBPACK_IMPORTED_MODULE_9__.resolveSubjects)(subject, keyframes, scope, elementCache);
            const numSubjects = subjects.length;
            /**
             * For every element in this segment, process the defined values.
             */
            for (let subjectIndex = 0; subjectIndex < numSubjects; subjectIndex++) {
                /**
                 * Cast necessary, but we know these are of this type
                 */
                keyframes = keyframes;
                transition = transition;
                const thisSubject = subjects[subjectIndex];
                const subjectSequence = getSubjectSequence(thisSubject, sequences);
                for (const key in keyframes) {
                    resolveValueSequence(keyframes[key], getValueTransition(transition, key), getValueSequence(key, subjectSequence), subjectIndex, numSubjects);
                }
            }
        }
        prevTime = currentTime;
        currentTime += maxDuration;
    }
    /**
     * For every element and value combination create a new animation.
     */
    sequences.forEach((valueSequences, element) => {
        for (const key in valueSequences) {
            const valueSequence = valueSequences[key];
            /**
             * Arrange all the keyframes in ascending time order.
             */
            valueSequence.sort(_utils_sort_mjs__WEBPACK_IMPORTED_MODULE_14__.compareByTime);
            const keyframes = [];
            const valueOffset = [];
            const valueEasing = [];
            /**
             * For each keyframe, translate absolute times into
             * relative offsets based on the total duration of the timeline.
             */
            for (let i = 0; i < valueSequence.length; i++) {
                const { at, value, easing } = valueSequence[i];
                keyframes.push(value);
                valueOffset.push((0,motion_utils__WEBPACK_IMPORTED_MODULE_6__.progress)(0, totalDuration, at));
                valueEasing.push(easing || "easeOut");
            }
            /**
             * If the first keyframe doesn't land on offset: 0
             * provide one by duplicating the initial keyframe. This ensures
             * it snaps to the first keyframe when the animation starts.
             */
            if (valueOffset[0] !== 0) {
                valueOffset.unshift(0);
                keyframes.unshift(keyframes[0]);
                valueEasing.unshift(defaultSegmentEasing);
            }
            /**
             * If the last keyframe doesn't land on offset: 1
             * provide one with a null wildcard value. This will ensure it
             * stays static until the end of the animation.
             */
            if (valueOffset[valueOffset.length - 1] !== 1) {
                valueOffset.push(1);
                keyframes.push(null);
            }
            if (!animationDefinitions.has(element)) {
                animationDefinitions.set(element, {
                    keyframes: {},
                    transition: {},
                });
            }
            const definition = animationDefinitions.get(element);
            definition.keyframes[key] = keyframes;
            /**
             * Exclude `type` from defaultTransition since springs have been
             * converted to duration-based easing functions in resolveValueSequence.
             * Including `type: "spring"` would cause JSAnimation to error when
             * the merged keyframes array has more than 2 keyframes.
             */
            const { type: _type, ...remainingDefaultTransition } = defaultTransition;
            definition.transition[key] = {
                ...remainingDefaultTransition,
                duration: totalDuration,
                ease: valueEasing,
                times: valueOffset,
                ...sequenceTransition,
            };
        }
    });
    return animationDefinitions;
}
function getSubjectSequence(subject, sequences) {
    !sequences.has(subject) && sequences.set(subject, {});
    return sequences.get(subject);
}
function getValueSequence(name, sequences) {
    if (!sequences[name])
        sequences[name] = [];
    return sequences[name];
}
function keyframesAsList(keyframes) {
    return Array.isArray(keyframes) ? keyframes : [keyframes];
}
function getValueTransition(transition, key) {
    return transition && transition[key]
        ? {
            ...transition,
            ...transition[key],
        }
        : { ...transition };
}
const isNumber = (keyframe) => typeof keyframe === "number";
const isNumberKeyframesArray = (keyframes) => keyframes.every(isNumber);


//# sourceMappingURL=create.mjs.map


/***/ },

/***/ "./node_modules/framer-motion/dist/es/animation/sequence/utils/calc-repeat-duration.mjs"
/*!**********************************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/animation/sequence/utils/calc-repeat-duration.mjs ***!
  \**********************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calculateRepeatDuration: () => (/* binding */ calculateRepeatDuration)
/* harmony export */ });
function calculateRepeatDuration(duration, repeat, _repeatDelay) {
    return duration * (repeat + 1);
}


//# sourceMappingURL=calc-repeat-duration.mjs.map


/***/ },

/***/ "./node_modules/framer-motion/dist/es/animation/sequence/utils/calc-time.mjs"
/*!***********************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/animation/sequence/utils/calc-time.mjs ***!
  \***********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calcNextTime: () => (/* binding */ calcNextTime)
/* harmony export */ });
/**
 * Given a absolute or relative time definition and current/prev time state of the sequence,
 * calculate an absolute time for the next keyframes.
 */
function calcNextTime(current, next, prev, labels) {
    if (typeof next === "number") {
        return next;
    }
    else if (next.startsWith("-") || next.startsWith("+")) {
        return Math.max(0, current + parseFloat(next));
    }
    else if (next === "<") {
        return prev;
    }
    else if (next.startsWith("<")) {
        return Math.max(0, prev + parseFloat(next.slice(1)));
    }
    else {
        return labels.get(next) ?? current;
    }
}


//# sourceMappingURL=calc-time.mjs.map


/***/ },

/***/ "./node_modules/framer-motion/dist/es/animation/sequence/utils/edit.mjs"
/*!******************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/animation/sequence/utils/edit.mjs ***!
  \******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addKeyframes: () => (/* binding */ addKeyframes),
/* harmony export */   eraseKeyframes: () => (/* binding */ eraseKeyframes)
/* harmony export */ });
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-dom */ "./node_modules/motion-dom/dist/es/utils/mix/number.mjs");
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/array.mjs");
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/easing/utils/get-easing-for-segment.mjs");



function eraseKeyframes(sequence, startTime, endTime) {
    for (let i = 0; i < sequence.length; i++) {
        const keyframe = sequence[i];
        if (keyframe.at > startTime && keyframe.at < endTime) {
            (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__.removeItem)(sequence, keyframe);
            // If we remove this item we have to push the pointer back one
            i--;
        }
    }
}
function addKeyframes(sequence, keyframes, easing, offset, startTime, endTime) {
    /**
     * Erase every existing value between currentTime and targetTime,
     * this will essentially splice this timeline into any currently
     * defined ones.
     */
    eraseKeyframes(sequence, startTime, endTime);
    for (let i = 0; i < keyframes.length; i++) {
        sequence.push({
            value: keyframes[i],
            at: (0,motion_dom__WEBPACK_IMPORTED_MODULE_0__.mixNumber)(startTime, endTime, offset[i]),
            easing: (0,motion_utils__WEBPACK_IMPORTED_MODULE_2__.getEasingForSegment)(easing, i),
        });
    }
}


//# sourceMappingURL=edit.mjs.map


/***/ },

/***/ "./node_modules/framer-motion/dist/es/animation/sequence/utils/normalize-times.mjs"
/*!*****************************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/animation/sequence/utils/normalize-times.mjs ***!
  \*****************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   normalizeTimes: () => (/* binding */ normalizeTimes)
/* harmony export */ });
/**
 * Take an array of times that represent repeated keyframes. For instance
 * if we have original times of [0, 0.5, 1] then our repeated times will
 * be [0, 0.5, 1, 1, 1.5, 2]. Loop over the times and scale them back
 * down to a 0-1 scale.
 */
function normalizeTimes(times, repeat) {
    for (let i = 0; i < times.length; i++) {
        times[i] = times[i] / (repeat + 1);
    }
}


//# sourceMappingURL=normalize-times.mjs.map


/***/ },

/***/ "./node_modules/framer-motion/dist/es/animation/sequence/utils/sort.mjs"
/*!******************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/animation/sequence/utils/sort.mjs ***!
  \******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   compareByTime: () => (/* binding */ compareByTime)
/* harmony export */ });
function compareByTime(a, b) {
    if (a.at === b.at) {
        if (a.value === null)
            return 1;
        if (b.value === null)
            return -1;
        return 0;
    }
    else {
        return a.at - b.at;
    }
}


//# sourceMappingURL=sort.mjs.map


/***/ },

/***/ "./node_modules/framer-motion/dist/es/animation/utils/create-visual-element.mjs"
/*!**************************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/animation/utils/create-visual-element.mjs ***!
  \**************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createDOMVisualElement: () => (/* binding */ createDOMVisualElement),
/* harmony export */   createObjectVisualElement: () => (/* binding */ createObjectVisualElement)
/* harmony export */ });
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-dom */ "./node_modules/motion-dom/dist/es/utils/is-svg-element.mjs");
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! motion-dom */ "./node_modules/motion-dom/dist/es/utils/is-svg-svg-element.mjs");
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! motion-dom */ "./node_modules/motion-dom/dist/es/render/html/HTMLVisualElement.mjs");
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! motion-dom */ "./node_modules/motion-dom/dist/es/render/object/ObjectVisualElement.mjs");
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! motion-dom */ "./node_modules/motion-dom/dist/es/render/store.mjs");
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! motion-dom */ "./node_modules/motion-dom/dist/es/render/svg/SVGVisualElement.mjs");


function createDOMVisualElement(element) {
    const options = {
        presenceContext: null,
        props: {},
        visualState: {
            renderState: {
                transform: {},
                transformOrigin: {},
                style: {},
                vars: {},
                attrs: {},
            },
            latestValues: {},
        },
    };
    const node = (0,motion_dom__WEBPACK_IMPORTED_MODULE_0__.isSVGElement)(element) && !(0,motion_dom__WEBPACK_IMPORTED_MODULE_1__.isSVGSVGElement)(element)
        ? new motion_dom__WEBPACK_IMPORTED_MODULE_5__.SVGVisualElement(options)
        : new motion_dom__WEBPACK_IMPORTED_MODULE_2__.HTMLVisualElement(options);
    node.mount(element);
    motion_dom__WEBPACK_IMPORTED_MODULE_4__.visualElementStore.set(element, node);
}
function createObjectVisualElement(subject) {
    const options = {
        presenceContext: null,
        props: {},
        visualState: {
            renderState: {
                output: {},
            },
            latestValues: {},
        },
    };
    const node = new motion_dom__WEBPACK_IMPORTED_MODULE_3__.ObjectVisualElement(options);
    node.mount(subject);
    motion_dom__WEBPACK_IMPORTED_MODULE_4__.visualElementStore.set(subject, node);
}


//# sourceMappingURL=create-visual-element.mjs.map


/***/ },

/***/ "./node_modules/framer-motion/dist/es/animation/utils/is-dom-keyframes.mjs"
/*!*********************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/animation/utils/is-dom-keyframes.mjs ***!
  \*********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isDOMKeyframes: () => (/* binding */ isDOMKeyframes)
/* harmony export */ });
function isDOMKeyframes(keyframes) {
    return typeof keyframes === "object" && !Array.isArray(keyframes);
}


//# sourceMappingURL=is-dom-keyframes.mjs.map


/***/ },

/***/ "./node_modules/framer-motion/dist/es/render/dom/viewport/index.mjs"
/*!**************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/dom/viewport/index.mjs ***!
  \**************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   inView: () => (/* binding */ inView)
/* harmony export */ });
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-dom */ "./node_modules/motion-dom/dist/es/utils/resolve-elements.mjs");


const thresholds = {
    some: 0,
    all: 1,
};
function inView(elementOrSelector, onStart, { root, margin: rootMargin, amount = "some" } = {}) {
    const elements = (0,motion_dom__WEBPACK_IMPORTED_MODULE_0__.resolveElements)(elementOrSelector);
    const activeIntersections = new WeakMap();
    const onIntersectionChange = (entries) => {
        entries.forEach((entry) => {
            const onEnd = activeIntersections.get(entry.target);
            /**
             * If there's no change to the intersection, we don't need to
             * do anything here.
             */
            if (entry.isIntersecting === Boolean(onEnd))
                return;
            if (entry.isIntersecting) {
                const newOnEnd = onStart(entry.target, entry);
                if (typeof newOnEnd === "function") {
                    activeIntersections.set(entry.target, newOnEnd);
                }
                else {
                    observer.unobserve(entry.target);
                }
            }
            else if (typeof onEnd === "function") {
                onEnd(entry);
                activeIntersections.delete(entry.target);
            }
        });
    };
    const observer = new IntersectionObserver(onIntersectionChange, {
        root,
        rootMargin,
        threshold: typeof amount === "number" ? amount : thresholds[amount],
    });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
}


//# sourceMappingURL=index.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/AsyncMotionValueAnimation.mjs"
/*!*********************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/AsyncMotionValueAnimation.mjs ***!
  \*********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AsyncMotionValueAnimation: () => (/* binding */ AsyncMotionValueAnimation)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/global-config.mjs");
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/noop.mjs");
/* harmony import */ var _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../frameloop/sync-time.mjs */ "./node_modules/motion-dom/dist/es/frameloop/sync-time.mjs");
/* harmony import */ var _JSAnimation_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./JSAnimation.mjs */ "./node_modules/motion-dom/dist/es/animation/JSAnimation.mjs");
/* harmony import */ var _keyframes_get_final_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./keyframes/get-final.mjs */ "./node_modules/motion-dom/dist/es/animation/keyframes/get-final.mjs");
/* harmony import */ var _keyframes_KeyframesResolver_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./keyframes/KeyframesResolver.mjs */ "./node_modules/motion-dom/dist/es/animation/keyframes/KeyframesResolver.mjs");
/* harmony import */ var _NativeAnimationExtended_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./NativeAnimationExtended.mjs */ "./node_modules/motion-dom/dist/es/animation/NativeAnimationExtended.mjs");
/* harmony import */ var _utils_can_animate_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/can-animate.mjs */ "./node_modules/motion-dom/dist/es/animation/utils/can-animate.mjs");
/* harmony import */ var _utils_make_animation_instant_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/make-animation-instant.mjs */ "./node_modules/motion-dom/dist/es/animation/utils/make-animation-instant.mjs");
/* harmony import */ var _utils_WithPromise_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/WithPromise.mjs */ "./node_modules/motion-dom/dist/es/animation/utils/WithPromise.mjs");
/* harmony import */ var _waapi_supports_waapi_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./waapi/supports/waapi.mjs */ "./node_modules/motion-dom/dist/es/animation/waapi/supports/waapi.mjs");











/**
 * Maximum time allowed between an animation being created and it being
 * resolved for us to use the latter as the start time.
 *
 * This is to ensure that while we prefer to "start" an animation as soon
 * as it's triggered, we also want to avoid a visual jump if there's a big delay
 * between these two moments.
 */
const MAX_RESOLVE_DELAY = 40;
class AsyncMotionValueAnimation extends _utils_WithPromise_mjs__WEBPACK_IMPORTED_MODULE_9__.WithPromise {
    constructor({ autoplay = true, delay = 0, type = "keyframes", repeat = 0, repeatDelay = 0, repeatType = "loop", keyframes, name, motionValue, element, ...options }) {
        super();
        /**
         * Bound to support return animation.stop pattern
         */
        this.stop = () => {
            if (this._animation) {
                this._animation.stop();
                this.stopTimeline?.();
            }
            this.keyframeResolver?.cancel();
        };
        this.createdAt = _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_2__.time.now();
        const optionsWithDefaults = {
            autoplay,
            delay,
            type,
            repeat,
            repeatDelay,
            repeatType,
            name,
            motionValue,
            element,
            ...options,
        };
        const KeyframeResolver$1 = element?.KeyframeResolver || _keyframes_KeyframesResolver_mjs__WEBPACK_IMPORTED_MODULE_5__.KeyframeResolver;
        this.keyframeResolver = new KeyframeResolver$1(keyframes, (resolvedKeyframes, finalKeyframe, forced) => this.onKeyframesResolved(resolvedKeyframes, finalKeyframe, optionsWithDefaults, !forced), name, motionValue, element);
        this.keyframeResolver?.scheduleResolve();
    }
    onKeyframesResolved(keyframes, finalKeyframe, options, sync) {
        this.keyframeResolver = undefined;
        const { name, type, velocity, delay, isHandoff, onUpdate } = options;
        this.resolvedAt = _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_2__.time.now();
        /**
         * If we can't animate this value with the resolved keyframes
         * then we should complete it immediately.
         */
        let canAnimateValue = true;
        if (!(0,_utils_can_animate_mjs__WEBPACK_IMPORTED_MODULE_7__.canAnimate)(keyframes, name, type, velocity)) {
            canAnimateValue = false;
            if (motion_utils__WEBPACK_IMPORTED_MODULE_0__.MotionGlobalConfig.instantAnimations || !delay) {
                onUpdate?.((0,_keyframes_get_final_mjs__WEBPACK_IMPORTED_MODULE_4__.getFinalKeyframe)(keyframes, options, finalKeyframe));
            }
            keyframes[0] = keyframes[keyframes.length - 1];
            (0,_utils_make_animation_instant_mjs__WEBPACK_IMPORTED_MODULE_8__.makeAnimationInstant)(options);
            options.repeat = 0;
        }
        /**
         * Resolve startTime for the animation.
         *
         * This method uses the createdAt and resolvedAt to calculate the
         * animation startTime. *Ideally*, we would use the createdAt time as t=0
         * as the following frame would then be the first frame of the animation in
         * progress, which would feel snappier.
         *
         * However, if there's a delay (main thread work) between the creation of
         * the animation and the first committed frame, we prefer to use resolvedAt
         * to avoid a sudden jump into the animation.
         */
        const startTime = sync
            ? !this.resolvedAt
                ? this.createdAt
                : this.resolvedAt - this.createdAt > MAX_RESOLVE_DELAY
                    ? this.resolvedAt
                    : this.createdAt
            : undefined;
        const resolvedOptions = {
            startTime,
            finalKeyframe,
            ...options,
            keyframes,
        };
        /**
         * Animate via WAAPI if possible. If this is a handoff animation, the optimised animation will be running via
         * WAAPI. Therefore, this animation must be JS to ensure it runs "under" the
         * optimised animation.
         *
         * Also skip WAAPI when keyframes aren't animatable, as the resolved
         * values may not be valid CSS and would trigger browser warnings.
         */
        const useWaapi = canAnimateValue &&
            !isHandoff &&
            (0,_waapi_supports_waapi_mjs__WEBPACK_IMPORTED_MODULE_10__.supportsBrowserAnimation)(resolvedOptions);
        const element = resolvedOptions.motionValue?.owner?.current;
        let animation;
        if (useWaapi) {
            try {
                animation = new _NativeAnimationExtended_mjs__WEBPACK_IMPORTED_MODULE_6__.NativeAnimationExtended({
                    ...resolvedOptions,
                    element,
                });
            }
            catch {
                animation = new _JSAnimation_mjs__WEBPACK_IMPORTED_MODULE_3__.JSAnimation(resolvedOptions);
            }
        }
        else {
            animation = new _JSAnimation_mjs__WEBPACK_IMPORTED_MODULE_3__.JSAnimation(resolvedOptions);
        }
        animation.finished.then(() => {
            this.notifyFinished();
        }).catch(motion_utils__WEBPACK_IMPORTED_MODULE_1__.noop);
        if (this.pendingTimeline) {
            this.stopTimeline = animation.attachTimeline(this.pendingTimeline);
            this.pendingTimeline = undefined;
        }
        this._animation = animation;
    }
    get finished() {
        if (!this._animation) {
            return this._finished;
        }
        else {
            return this.animation.finished;
        }
    }
    then(onResolve, _onReject) {
        return this.finished.finally(onResolve).then(() => { });
    }
    get animation() {
        if (!this._animation) {
            this.keyframeResolver?.resume();
            (0,_keyframes_KeyframesResolver_mjs__WEBPACK_IMPORTED_MODULE_5__.flushKeyframeResolvers)();
        }
        return this._animation;
    }
    get duration() {
        return this.animation.duration;
    }
    get iterationDuration() {
        return this.animation.iterationDuration;
    }
    get time() {
        return this.animation.time;
    }
    set time(newTime) {
        this.animation.time = newTime;
    }
    get speed() {
        return this.animation.speed;
    }
    get state() {
        return this.animation.state;
    }
    set speed(newSpeed) {
        this.animation.speed = newSpeed;
    }
    get startTime() {
        return this.animation.startTime;
    }
    attachTimeline(timeline) {
        if (this._animation) {
            this.stopTimeline = this.animation.attachTimeline(timeline);
        }
        else {
            this.pendingTimeline = timeline;
        }
        return () => this.stop();
    }
    play() {
        this.animation.play();
    }
    pause() {
        this.animation.pause();
    }
    complete() {
        this.animation.complete();
    }
    cancel() {
        if (this._animation) {
            this.animation.cancel();
        }
        this.keyframeResolver?.cancel();
    }
}


//# sourceMappingURL=AsyncMotionValueAnimation.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/GroupAnimation.mjs"
/*!**********************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/GroupAnimation.mjs ***!
  \**********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GroupAnimation: () => (/* binding */ GroupAnimation)
/* harmony export */ });
class GroupAnimation {
    constructor(animations) {
        // Bound to accomadate common `return animation.stop` pattern
        this.stop = () => this.runAll("stop");
        this.animations = animations.filter(Boolean);
    }
    get finished() {
        return Promise.all(this.animations.map((animation) => animation.finished));
    }
    /**
     * TODO: Filter out cancelled or stopped animations before returning
     */
    getAll(propName) {
        return this.animations[0][propName];
    }
    setAll(propName, newValue) {
        for (let i = 0; i < this.animations.length; i++) {
            this.animations[i][propName] = newValue;
        }
    }
    attachTimeline(timeline) {
        const subscriptions = this.animations.map((animation) => animation.attachTimeline(timeline));
        return () => {
            subscriptions.forEach((cancel, i) => {
                cancel && cancel();
                this.animations[i].stop();
            });
        };
    }
    get time() {
        return this.getAll("time");
    }
    set time(time) {
        this.setAll("time", time);
    }
    get speed() {
        return this.getAll("speed");
    }
    set speed(speed) {
        this.setAll("speed", speed);
    }
    get state() {
        return this.getAll("state");
    }
    get startTime() {
        return this.getAll("startTime");
    }
    get duration() {
        return getMax(this.animations, "duration");
    }
    get iterationDuration() {
        return getMax(this.animations, "iterationDuration");
    }
    runAll(methodName) {
        this.animations.forEach((controls) => controls[methodName]());
    }
    play() {
        this.runAll("play");
    }
    pause() {
        this.runAll("pause");
    }
    cancel() {
        this.runAll("cancel");
    }
    complete() {
        this.runAll("complete");
    }
}
function getMax(animations, propName) {
    let max = 0;
    for (let i = 0; i < animations.length; i++) {
        const value = animations[i][propName];
        if (value !== null && value > max) {
            max = value;
        }
    }
    return max;
}


//# sourceMappingURL=GroupAnimation.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/GroupAnimationWithThen.mjs"
/*!******************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/GroupAnimationWithThen.mjs ***!
  \******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GroupAnimationWithThen: () => (/* binding */ GroupAnimationWithThen)
/* harmony export */ });
/* harmony import */ var _GroupAnimation_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GroupAnimation.mjs */ "./node_modules/motion-dom/dist/es/animation/GroupAnimation.mjs");


class GroupAnimationWithThen extends _GroupAnimation_mjs__WEBPACK_IMPORTED_MODULE_0__.GroupAnimation {
    then(onResolve, _onReject) {
        return this.finished.finally(onResolve).then(() => { });
    }
}


//# sourceMappingURL=GroupAnimationWithThen.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/JSAnimation.mjs"
/*!*******************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/JSAnimation.mjs ***!
  \*******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JSAnimation: () => (/* binding */ JSAnimation),
/* harmony export */   animateValue: () => (/* binding */ animateValue)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/clamp.mjs");
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/errors.mjs");
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/pipe.mjs");
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/time-conversion.mjs");
/* harmony import */ var _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../frameloop/sync-time.mjs */ "./node_modules/motion-dom/dist/es/frameloop/sync-time.mjs");
/* harmony import */ var _stats_animation_count_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../stats/animation-count.mjs */ "./node_modules/motion-dom/dist/es/stats/animation-count.mjs");
/* harmony import */ var _utils_mix_index_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/mix/index.mjs */ "./node_modules/motion-dom/dist/es/utils/mix/index.mjs");
/* harmony import */ var _drivers_frame_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./drivers/frame.mjs */ "./node_modules/motion-dom/dist/es/animation/drivers/frame.mjs");
/* harmony import */ var _generators_inertia_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./generators/inertia.mjs */ "./node_modules/motion-dom/dist/es/animation/generators/inertia.mjs");
/* harmony import */ var _generators_keyframes_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./generators/keyframes.mjs */ "./node_modules/motion-dom/dist/es/animation/generators/keyframes.mjs");
/* harmony import */ var _generators_utils_calc_duration_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./generators/utils/calc-duration.mjs */ "./node_modules/motion-dom/dist/es/animation/generators/utils/calc-duration.mjs");
/* harmony import */ var _generators_utils_velocity_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./generators/utils/velocity.mjs */ "./node_modules/motion-dom/dist/es/animation/generators/utils/velocity.mjs");
/* harmony import */ var _keyframes_get_final_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./keyframes/get-final.mjs */ "./node_modules/motion-dom/dist/es/animation/keyframes/get-final.mjs");
/* harmony import */ var _utils_replace_transition_type_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./utils/replace-transition-type.mjs */ "./node_modules/motion-dom/dist/es/animation/utils/replace-transition-type.mjs");
/* harmony import */ var _utils_WithPromise_mjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./utils/WithPromise.mjs */ "./node_modules/motion-dom/dist/es/animation/utils/WithPromise.mjs");













const percentToProgress = (percent) => percent / 100;
class JSAnimation extends _utils_WithPromise_mjs__WEBPACK_IMPORTED_MODULE_14__.WithPromise {
    constructor(options) {
        super();
        this.state = "idle";
        this.startTime = null;
        this.isStopped = false;
        /**
         * The current time of the animation.
         */
        this.currentTime = 0;
        /**
         * The time at which the animation was paused.
         */
        this.holdTime = null;
        /**
         * Playback speed as a factor. 0 would be stopped, -1 reverse and 2 double speed.
         */
        this.playbackSpeed = 1;
        /**
         * Reusable state object for the delay phase to avoid
         * allocating a new object every frame.
         */
        this.delayState = {
            done: false,
            value: undefined,
        };
        /**
         * This method is bound to the instance to fix a pattern where
         * animation.stop is returned as a reference from a useEffect.
         */
        this.stop = () => {
            const { motionValue } = this.options;
            if (motionValue && motionValue.updatedAt !== _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_4__.time.now()) {
                this.tick(_frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_4__.time.now());
            }
            this.isStopped = true;
            if (this.state === "idle")
                return;
            this.teardown();
            this.options.onStop?.();
        };
        _stats_animation_count_mjs__WEBPACK_IMPORTED_MODULE_5__.activeAnimations.mainThread++;
        this.options = options;
        this.initAnimation();
        this.play();
        if (options.autoplay === false)
            this.pause();
    }
    initAnimation() {
        const { options } = this;
        (0,_utils_replace_transition_type_mjs__WEBPACK_IMPORTED_MODULE_13__.replaceTransitionType)(options);
        const { type = _generators_keyframes_mjs__WEBPACK_IMPORTED_MODULE_9__.keyframes, repeat = 0, repeatDelay = 0, repeatType, velocity = 0, } = options;
        let { keyframes: keyframes$1 } = options;
        const generatorFactory = type || _generators_keyframes_mjs__WEBPACK_IMPORTED_MODULE_9__.keyframes;
        if ( true &&
            generatorFactory !== _generators_keyframes_mjs__WEBPACK_IMPORTED_MODULE_9__.keyframes) {
            (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__.invariant)(keyframes$1.length <= 2, `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${keyframes$1}`, "spring-two-frames");
        }
        if (generatorFactory !== _generators_keyframes_mjs__WEBPACK_IMPORTED_MODULE_9__.keyframes &&
            typeof keyframes$1[0] !== "number") {
            this.mixKeyframes = (0,motion_utils__WEBPACK_IMPORTED_MODULE_2__.pipe)(percentToProgress, (0,_utils_mix_index_mjs__WEBPACK_IMPORTED_MODULE_6__.mix)(keyframes$1[0], keyframes$1[1]));
            keyframes$1 = [0, 100];
        }
        const generator = generatorFactory({ ...options, keyframes: keyframes$1 });
        /**
         * If we have a mirror repeat type we need to create a second generator that outputs the
         * mirrored (not reversed) animation and later ping pong between the two generators.
         */
        if (repeatType === "mirror") {
            this.mirroredGenerator = generatorFactory({
                ...options,
                keyframes: [...keyframes$1].reverse(),
                velocity: -velocity,
            });
        }
        /**
         * If duration is undefined and we have repeat options,
         * we need to calculate a duration from the generator.
         *
         * We set it to the generator itself to cache the duration.
         * Any timeline resolver will need to have already precalculated
         * the duration by this step.
         */
        if (generator.calculatedDuration === null) {
            generator.calculatedDuration = (0,_generators_utils_calc_duration_mjs__WEBPACK_IMPORTED_MODULE_10__.calcGeneratorDuration)(generator);
        }
        const { calculatedDuration } = generator;
        this.calculatedDuration = calculatedDuration;
        this.resolvedDuration = calculatedDuration + repeatDelay;
        this.totalDuration = this.resolvedDuration * (repeat + 1) - repeatDelay;
        this.generator = generator;
    }
    updateTime(timestamp) {
        const animationTime = Math.round(timestamp - this.startTime) * this.playbackSpeed;
        // Update currentTime
        if (this.holdTime !== null) {
            this.currentTime = this.holdTime;
        }
        else {
            // Rounding the time because floating point arithmetic is not always accurate, e.g. 3000.367 - 1000.367 =
            // 2000.0000000000002. This is a problem when we are comparing the currentTime with the duration, for
            // example.
            this.currentTime = animationTime;
        }
    }
    tick(timestamp, sample = false) {
        const { generator, totalDuration, mixKeyframes, mirroredGenerator, resolvedDuration, calculatedDuration, } = this;
        if (this.startTime === null)
            return generator.next(0);
        const { delay = 0, keyframes, repeat, repeatType, repeatDelay, type, onUpdate, finalKeyframe, } = this.options;
        /**
         * requestAnimationFrame timestamps can come through as lower than
         * the startTime as set by performance.now(). Here we prevent this,
         * though in the future it could be possible to make setting startTime
         * a pending operation that gets resolved here.
         */
        if (this.speed > 0) {
            this.startTime = Math.min(this.startTime, timestamp);
        }
        else if (this.speed < 0) {
            this.startTime = Math.min(timestamp - totalDuration / this.speed, this.startTime);
        }
        if (sample) {
            this.currentTime = timestamp;
        }
        else {
            this.updateTime(timestamp);
        }
        // Rebase on delay
        const timeWithoutDelay = this.currentTime - delay * (this.playbackSpeed >= 0 ? 1 : -1);
        const isInDelayPhase = this.playbackSpeed >= 0
            ? timeWithoutDelay < 0
            : timeWithoutDelay > totalDuration;
        this.currentTime = Math.max(timeWithoutDelay, 0);
        // If this animation has finished, set the current time  to the total duration.
        if (this.state === "finished" && this.holdTime === null) {
            this.currentTime = totalDuration;
        }
        let elapsed = this.currentTime;
        let frameGenerator = generator;
        if (repeat) {
            /**
             * Get the current progress (0-1) of the animation. If t is >
             * than duration we'll get values like 2.5 (midway through the
             * third iteration)
             */
            const progress = Math.min(this.currentTime, totalDuration) / resolvedDuration;
            /**
             * Get the current iteration (0 indexed). For instance the floor of
             * 2.5 is 2.
             */
            let currentIteration = Math.floor(progress);
            /**
             * Get the current progress of the iteration by taking the remainder
             * so 2.5 is 0.5 through iteration 2
             */
            let iterationProgress = progress % 1.0;
            /**
             * If iteration progress is 1 we count that as the end
             * of the previous iteration.
             */
            if (!iterationProgress && progress >= 1) {
                iterationProgress = 1;
            }
            iterationProgress === 1 && currentIteration--;
            currentIteration = Math.min(currentIteration, repeat + 1);
            /**
             * Reverse progress if we're not running in "normal" direction
             */
            const isOddIteration = Boolean(currentIteration % 2);
            if (isOddIteration) {
                if (repeatType === "reverse") {
                    iterationProgress = 1 - iterationProgress;
                    if (repeatDelay) {
                        iterationProgress -= repeatDelay / resolvedDuration;
                    }
                }
                else if (repeatType === "mirror") {
                    frameGenerator = mirroredGenerator;
                }
            }
            elapsed = (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.clamp)(0, 1, iterationProgress) * resolvedDuration;
        }
        /**
         * If we're in negative time, set state as the initial keyframe.
         * This prevents delay: x, duration: 0 animations from finishing
         * instantly.
         */
        let state;
        if (isInDelayPhase) {
            this.delayState.value = keyframes[0];
            state = this.delayState;
        }
        else {
            state = frameGenerator.next(elapsed);
        }
        if (mixKeyframes && !isInDelayPhase) {
            state.value = mixKeyframes(state.value);
        }
        let { done } = state;
        if (!isInDelayPhase && calculatedDuration !== null) {
            done =
                this.playbackSpeed >= 0
                    ? this.currentTime >= totalDuration
                    : this.currentTime <= 0;
        }
        const isAnimationFinished = this.holdTime === null &&
            (this.state === "finished" || (this.state === "running" && done));
        // TODO: The exception for inertia could be cleaner here
        if (isAnimationFinished && type !== _generators_inertia_mjs__WEBPACK_IMPORTED_MODULE_8__.inertia) {
            state.value = (0,_keyframes_get_final_mjs__WEBPACK_IMPORTED_MODULE_12__.getFinalKeyframe)(keyframes, this.options, finalKeyframe, this.speed);
        }
        if (onUpdate) {
            onUpdate(state.value);
        }
        if (isAnimationFinished) {
            this.finish();
        }
        return state;
    }
    /**
     * Allows the returned animation to be awaited or promise-chained. Currently
     * resolves when the animation finishes at all but in a future update could/should
     * reject if its cancels.
     */
    then(resolve, reject) {
        return this.finished.then(resolve, reject);
    }
    get duration() {
        return (0,motion_utils__WEBPACK_IMPORTED_MODULE_3__.millisecondsToSeconds)(this.calculatedDuration);
    }
    get iterationDuration() {
        const { delay = 0 } = this.options || {};
        return this.duration + (0,motion_utils__WEBPACK_IMPORTED_MODULE_3__.millisecondsToSeconds)(delay);
    }
    get time() {
        return (0,motion_utils__WEBPACK_IMPORTED_MODULE_3__.millisecondsToSeconds)(this.currentTime);
    }
    set time(newTime) {
        newTime = (0,motion_utils__WEBPACK_IMPORTED_MODULE_3__.secondsToMilliseconds)(newTime);
        this.currentTime = newTime;
        if (this.startTime === null ||
            this.holdTime !== null ||
            this.playbackSpeed === 0) {
            this.holdTime = newTime;
        }
        else if (this.driver) {
            this.startTime = this.driver.now() - newTime / this.playbackSpeed;
        }
        if (this.driver) {
            this.driver.start(false);
        }
        else {
            this.startTime = 0;
            this.state = "paused";
            this.holdTime = newTime;
            this.tick(newTime);
        }
    }
    /**
     * Returns the generator's velocity at the current time in units/second.
     * Uses the analytical derivative when available (springs), avoiding
     * the MotionValue's frame-dependent velocity estimation.
     */
    getGeneratorVelocity() {
        const t = this.currentTime;
        if (t <= 0)
            return this.options.velocity || 0;
        if (this.generator.velocity) {
            return this.generator.velocity(t);
        }
        // Fallback: finite difference
        const current = this.generator.next(t).value;
        return (0,_generators_utils_velocity_mjs__WEBPACK_IMPORTED_MODULE_11__.getGeneratorVelocity)((s) => this.generator.next(s).value, t, current);
    }
    get speed() {
        return this.playbackSpeed;
    }
    set speed(newSpeed) {
        const hasChanged = this.playbackSpeed !== newSpeed;
        if (hasChanged && this.driver) {
            this.updateTime(_frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_4__.time.now());
        }
        this.playbackSpeed = newSpeed;
        if (hasChanged && this.driver) {
            this.time = (0,motion_utils__WEBPACK_IMPORTED_MODULE_3__.millisecondsToSeconds)(this.currentTime);
        }
    }
    play() {
        if (this.isStopped)
            return;
        const { driver = _drivers_frame_mjs__WEBPACK_IMPORTED_MODULE_7__.frameloopDriver, startTime } = this.options;
        if (!this.driver) {
            this.driver = driver((timestamp) => this.tick(timestamp));
        }
        this.options.onPlay?.();
        const now = this.driver.now();
        if (this.state === "finished") {
            this.updateFinished();
            this.startTime = now;
        }
        else if (this.holdTime !== null) {
            this.startTime = now - this.holdTime;
        }
        else if (!this.startTime) {
            this.startTime = startTime ?? now;
        }
        if (this.state === "finished" && this.speed < 0) {
            this.startTime += this.calculatedDuration;
        }
        this.holdTime = null;
        /**
         * Set playState to running only after we've used it in
         * the previous logic.
         */
        this.state = "running";
        this.driver.start();
    }
    pause() {
        this.state = "paused";
        this.updateTime(_frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_4__.time.now());
        this.holdTime = this.currentTime;
    }
    complete() {
        if (this.state !== "running") {
            this.play();
        }
        this.state = "finished";
        this.holdTime = null;
    }
    finish() {
        this.notifyFinished();
        this.teardown();
        this.state = "finished";
        this.options.onComplete?.();
    }
    cancel() {
        this.holdTime = null;
        this.startTime = 0;
        this.tick(0);
        this.teardown();
        this.options.onCancel?.();
    }
    teardown() {
        this.state = "idle";
        this.stopDriver();
        this.startTime = this.holdTime = null;
        _stats_animation_count_mjs__WEBPACK_IMPORTED_MODULE_5__.activeAnimations.mainThread--;
    }
    stopDriver() {
        if (!this.driver)
            return;
        this.driver.stop();
        this.driver = undefined;
    }
    sample(sampleTime) {
        this.startTime = 0;
        return this.tick(sampleTime, true);
    }
    attachTimeline(timeline) {
        if (this.options.allowFlatten) {
            this.options.type = "keyframes";
            this.options.ease = "linear";
            this.initAnimation();
        }
        this.driver?.stop();
        return timeline.observe(this);
    }
}
// Legacy function support
function animateValue(options) {
    return new JSAnimation(options);
}


//# sourceMappingURL=JSAnimation.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/NativeAnimation.mjs"
/*!***********************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/NativeAnimation.mjs ***!
  \***********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NativeAnimation: () => (/* binding */ NativeAnimation)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/errors.mjs");
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/noop.mjs");
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/time-conversion.mjs");
/* harmony import */ var _render_dom_style_set_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../render/dom/style-set.mjs */ "./node_modules/motion-dom/dist/es/render/dom/style-set.mjs");
/* harmony import */ var _utils_supports_scroll_timeline_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/supports/scroll-timeline.mjs */ "./node_modules/motion-dom/dist/es/utils/supports/scroll-timeline.mjs");
/* harmony import */ var _keyframes_get_final_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./keyframes/get-final.mjs */ "./node_modules/motion-dom/dist/es/animation/keyframes/get-final.mjs");
/* harmony import */ var _utils_WithPromise_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/WithPromise.mjs */ "./node_modules/motion-dom/dist/es/animation/utils/WithPromise.mjs");
/* harmony import */ var _waapi_start_waapi_animation_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./waapi/start-waapi-animation.mjs */ "./node_modules/motion-dom/dist/es/animation/waapi/start-waapi-animation.mjs");
/* harmony import */ var _waapi_utils_apply_generator_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./waapi/utils/apply-generator.mjs */ "./node_modules/motion-dom/dist/es/animation/waapi/utils/apply-generator.mjs");








/**
 * NativeAnimation implements AnimationPlaybackControls for the browser's Web Animations API.
 */
class NativeAnimation extends _utils_WithPromise_mjs__WEBPACK_IMPORTED_MODULE_6__.WithPromise {
    constructor(options) {
        super();
        this.finishedTime = null;
        this.isStopped = false;
        /**
         * Tracks a manually-set start time that takes precedence over WAAPI's
         * dynamic startTime. This is cleared when play() or time setter is called,
         * allowing WAAPI to take over timing.
         */
        this.manualStartTime = null;
        if (!options)
            return;
        const { element, name, keyframes, pseudoElement, allowFlatten = false, finalKeyframe, onComplete, } = options;
        this.isPseudoElement = Boolean(pseudoElement);
        this.allowFlatten = allowFlatten;
        this.options = options;
        (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.invariant)(typeof options.type !== "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
        const transition = (0,_waapi_utils_apply_generator_mjs__WEBPACK_IMPORTED_MODULE_8__.applyGeneratorOptions)(options);
        this.animation = (0,_waapi_start_waapi_animation_mjs__WEBPACK_IMPORTED_MODULE_7__.startWaapiAnimation)(element, name, keyframes, transition, pseudoElement);
        if (transition.autoplay === false) {
            this.animation.pause();
        }
        this.animation.onfinish = () => {
            this.finishedTime = this.time;
            if (!pseudoElement) {
                const keyframe = (0,_keyframes_get_final_mjs__WEBPACK_IMPORTED_MODULE_5__.getFinalKeyframe)(keyframes, this.options, finalKeyframe, this.speed);
                if (this.updateMotionValue) {
                    this.updateMotionValue(keyframe);
                }
                /**
                 * If we can, we want to commit the final style as set by the user,
                 * rather than the computed keyframe value supplied by the animation.
                 * We always do this, even when a motion value is present, to prevent
                 * a visual flash in Firefox where the WAAPI animation's fill is removed
                 * during cancel() before the scheduled render can apply the correct value.
                 */
                (0,_render_dom_style_set_mjs__WEBPACK_IMPORTED_MODULE_3__.setStyle)(element, name, keyframe);
                this.animation.cancel();
            }
            onComplete?.();
            this.notifyFinished();
        };
    }
    play() {
        if (this.isStopped)
            return;
        this.manualStartTime = null;
        this.animation.play();
        if (this.state === "finished") {
            this.updateFinished();
        }
    }
    pause() {
        this.animation.pause();
    }
    complete() {
        this.animation.finish?.();
    }
    cancel() {
        try {
            this.animation.cancel();
        }
        catch (e) { }
    }
    stop() {
        if (this.isStopped)
            return;
        this.isStopped = true;
        const { state } = this;
        if (state === "idle" || state === "finished") {
            return;
        }
        if (this.updateMotionValue) {
            this.updateMotionValue();
        }
        else {
            this.commitStyles();
        }
        if (!this.isPseudoElement)
            this.cancel();
    }
    /**
     * WAAPI doesn't natively have any interruption capabilities.
     *
     * In this method, we commit styles back to the DOM before cancelling
     * the animation.
     *
     * This is designed to be overridden by NativeAnimationExtended, which
     * will create a renderless JS animation and sample it twice to calculate
     * its current value, "previous" value, and therefore allow
     * Motion to also correctly calculate velocity for any subsequent animation
     * while deferring the commit until the next animation frame.
     */
    commitStyles() {
        const element = this.options?.element;
        if (!this.isPseudoElement && element?.isConnected) {
            this.animation.commitStyles?.();
        }
    }
    get duration() {
        const duration = this.animation.effect?.getComputedTiming?.().duration || 0;
        return (0,motion_utils__WEBPACK_IMPORTED_MODULE_2__.millisecondsToSeconds)(Number(duration));
    }
    get iterationDuration() {
        const { delay = 0 } = this.options || {};
        return this.duration + (0,motion_utils__WEBPACK_IMPORTED_MODULE_2__.millisecondsToSeconds)(delay);
    }
    get time() {
        return (0,motion_utils__WEBPACK_IMPORTED_MODULE_2__.millisecondsToSeconds)(Number(this.animation.currentTime) || 0);
    }
    set time(newTime) {
        const wasFinished = this.finishedTime !== null;
        this.manualStartTime = null;
        this.finishedTime = null;
        this.animation.currentTime = (0,motion_utils__WEBPACK_IMPORTED_MODULE_2__.secondsToMilliseconds)(newTime);
        if (wasFinished) {
            this.animation.pause();
        }
    }
    /**
     * The playback speed of the animation.
     * 1 = normal speed, 2 = double speed, 0.5 = half speed.
     */
    get speed() {
        return this.animation.playbackRate;
    }
    set speed(newSpeed) {
        // Allow backwards playback after finishing
        if (newSpeed < 0)
            this.finishedTime = null;
        this.animation.playbackRate = newSpeed;
    }
    get state() {
        return this.finishedTime !== null
            ? "finished"
            : this.animation.playState;
    }
    get startTime() {
        return this.manualStartTime ?? Number(this.animation.startTime);
    }
    set startTime(newStartTime) {
        this.manualStartTime = this.animation.startTime = newStartTime;
    }
    /**
     * Attaches a timeline to the animation, for instance the `ScrollTimeline`.
     */
    attachTimeline({ timeline, rangeStart, rangeEnd, observe, }) {
        if (this.allowFlatten) {
            this.animation.effect?.updateTiming({ easing: "linear" });
        }
        this.animation.onfinish = null;
        if (timeline && (0,_utils_supports_scroll_timeline_mjs__WEBPACK_IMPORTED_MODULE_4__.supportsScrollTimeline)()) {
            this.animation.timeline = timeline;
            if (rangeStart)
                this.animation.rangeStart = rangeStart;
            if (rangeEnd)
                this.animation.rangeEnd = rangeEnd;
            return motion_utils__WEBPACK_IMPORTED_MODULE_1__.noop;
        }
        else {
            return observe(this);
        }
    }
}


//# sourceMappingURL=NativeAnimation.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/NativeAnimationExtended.mjs"
/*!*******************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/NativeAnimationExtended.mjs ***!
  \*******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NativeAnimationExtended: () => (/* binding */ NativeAnimationExtended)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/clamp.mjs");
/* harmony import */ var _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../frameloop/sync-time.mjs */ "./node_modules/motion-dom/dist/es/frameloop/sync-time.mjs");
/* harmony import */ var _render_dom_style_set_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../render/dom/style-set.mjs */ "./node_modules/motion-dom/dist/es/render/dom/style-set.mjs");
/* harmony import */ var _JSAnimation_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./JSAnimation.mjs */ "./node_modules/motion-dom/dist/es/animation/JSAnimation.mjs");
/* harmony import */ var _NativeAnimation_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./NativeAnimation.mjs */ "./node_modules/motion-dom/dist/es/animation/NativeAnimation.mjs");
/* harmony import */ var _utils_replace_transition_type_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/replace-transition-type.mjs */ "./node_modules/motion-dom/dist/es/animation/utils/replace-transition-type.mjs");
/* harmony import */ var _waapi_utils_unsupported_easing_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./waapi/utils/unsupported-easing.mjs */ "./node_modules/motion-dom/dist/es/animation/waapi/utils/unsupported-easing.mjs");








/**
 * 10ms is chosen here as it strikes a balance between smooth
 * results (more than one keyframe per frame at 60fps) and
 * keyframe quantity.
 */
const sampleDelta = 10; //ms
class NativeAnimationExtended extends _NativeAnimation_mjs__WEBPACK_IMPORTED_MODULE_4__.NativeAnimation {
    constructor(options) {
        /**
         * The base NativeAnimation function only supports a subset
         * of Motion easings, and WAAPI also only supports some
         * easing functions via string/cubic-bezier definitions.
         *
         * This function replaces those unsupported easing functions
         * with a JS easing function. This will later get compiled
         * to a linear() easing function.
         */
        (0,_waapi_utils_unsupported_easing_mjs__WEBPACK_IMPORTED_MODULE_6__.replaceStringEasing)(options);
        /**
         * Ensure we replace the transition type with a generator function
         * before passing to WAAPI.
         *
         * TODO: Does this have a better home? It could be shared with
         * JSAnimation.
         */
        (0,_utils_replace_transition_type_mjs__WEBPACK_IMPORTED_MODULE_5__.replaceTransitionType)(options);
        super(options);
        /**
         * Only set startTime when the animation should autoplay.
         * Setting startTime on a paused WAAPI animation unpauses it
         * (per the WAAPI spec), which breaks autoplay: false.
         */
        if (options.startTime !== undefined && options.autoplay !== false) {
            this.startTime = options.startTime;
        }
        this.options = options;
    }
    /**
     * WAAPI doesn't natively have any interruption capabilities.
     *
     * Rather than read committed styles back out of the DOM, we can
     * create a renderless JS animation and sample it twice to calculate
     * its current value, "previous" value, and therefore allow
     * Motion to calculate velocity for any subsequent animation.
     */
    updateMotionValue(value) {
        const { motionValue, onUpdate, onComplete, element, ...options } = this.options;
        if (!motionValue)
            return;
        if (value !== undefined) {
            motionValue.set(value);
            return;
        }
        const sampleAnimation = new _JSAnimation_mjs__WEBPACK_IMPORTED_MODULE_3__.JSAnimation({
            ...options,
            autoplay: false,
        });
        /**
         * Use wall-clock elapsed time for sampling.
         * Under CPU load, WAAPI's currentTime may not reflect actual
         * elapsed time, causing incorrect sampling and visual jumps.
         */
        const sampleTime = Math.max(sampleDelta, _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_1__.time.now() - this.startTime);
        const delta = (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.clamp)(0, sampleDelta, sampleTime - sampleDelta);
        const current = sampleAnimation.sample(sampleTime).value;
        /**
         * Write the estimated value to inline style so it persists
         * after cancel(), covering the async gap before the next
         * animation starts.
         */
        const { name } = this.options;
        if (element && name)
            (0,_render_dom_style_set_mjs__WEBPACK_IMPORTED_MODULE_2__.setStyle)(element, name, current);
        motionValue.setWithVelocity(sampleAnimation.sample(Math.max(0, sampleTime - delta)).value, current, delta);
        sampleAnimation.stop();
    }
}


//# sourceMappingURL=NativeAnimationExtended.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/animate/single-value.mjs"
/*!****************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/animate/single-value.mjs ***!
  \****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   animateSingleValue: () => (/* binding */ animateSingleValue)
/* harmony export */ });
/* harmony import */ var _interfaces_motion_value_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../interfaces/motion-value.mjs */ "./node_modules/motion-dom/dist/es/animation/interfaces/motion-value.mjs");
/* harmony import */ var _value_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../value/index.mjs */ "./node_modules/motion-dom/dist/es/value/index.mjs");
/* harmony import */ var _value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../value/utils/is-motion-value.mjs */ "./node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs");




function animateSingleValue(value, keyframes, options) {
    const motionValue$1 = (0,_value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_2__.isMotionValue)(value) ? value : (0,_value_index_mjs__WEBPACK_IMPORTED_MODULE_1__.motionValue)(value);
    motionValue$1.start((0,_interfaces_motion_value_mjs__WEBPACK_IMPORTED_MODULE_0__.animateMotionValue)("", motionValue$1, keyframes, options));
    return motionValue$1.animation;
}


//# sourceMappingURL=single-value.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/drivers/frame.mjs"
/*!*********************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/drivers/frame.mjs ***!
  \*********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   frameloopDriver: () => (/* binding */ frameloopDriver)
/* harmony export */ });
/* harmony import */ var _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../frameloop/sync-time.mjs */ "./node_modules/motion-dom/dist/es/frameloop/sync-time.mjs");
/* harmony import */ var _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../frameloop/frame.mjs */ "./node_modules/motion-dom/dist/es/frameloop/frame.mjs");



const frameloopDriver = (update) => {
    const passTimestamp = ({ timestamp }) => update(timestamp);
    return {
        start: (keepAlive = true) => _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_1__.frame.update(passTimestamp, keepAlive),
        stop: () => (0,_frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_1__.cancelFrame)(passTimestamp),
        /**
         * If we're processing this frame we can use the
         * framelocked timestamp to keep things in sync.
         */
        now: () => (_frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_1__.frameData.isProcessing ? _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_1__.frameData.timestamp : _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_0__.time.now()),
    };
};


//# sourceMappingURL=frame.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/generators/inertia.mjs"
/*!**************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/generators/inertia.mjs ***!
  \**************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   inertia: () => (/* binding */ inertia)
/* harmony export */ });
/* harmony import */ var _spring_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./spring.mjs */ "./node_modules/motion-dom/dist/es/animation/generators/spring.mjs");
/* harmony import */ var _utils_velocity_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/velocity.mjs */ "./node_modules/motion-dom/dist/es/animation/generators/utils/velocity.mjs");



function inertia({ keyframes, velocity = 0.0, power = 0.8, timeConstant = 325, bounceDamping = 10, bounceStiffness = 500, modifyTarget, min, max, restDelta = 0.5, restSpeed, }) {
    const origin = keyframes[0];
    const state = {
        done: false,
        value: origin,
    };
    const isOutOfBounds = (v) => (min !== undefined && v < min) || (max !== undefined && v > max);
    const nearestBoundary = (v) => {
        if (min === undefined)
            return max;
        if (max === undefined)
            return min;
        return Math.abs(min - v) < Math.abs(max - v) ? min : max;
    };
    let amplitude = power * velocity;
    const ideal = origin + amplitude;
    const target = modifyTarget === undefined ? ideal : modifyTarget(ideal);
    /**
     * If the target has changed we need to re-calculate the amplitude, otherwise
     * the animation will start from the wrong position.
     */
    if (target !== ideal)
        amplitude = target - origin;
    const calcDelta = (t) => -amplitude * Math.exp(-t / timeConstant);
    const calcLatest = (t) => target + calcDelta(t);
    const applyFriction = (t) => {
        const delta = calcDelta(t);
        const latest = calcLatest(t);
        state.done = Math.abs(delta) <= restDelta;
        state.value = state.done ? target : latest;
    };
    /**
     * Ideally this would resolve for t in a stateless way, we could
     * do that by always precalculating the animation but as we know
     * this will be done anyway we can assume that spring will
     * be discovered during that.
     */
    let timeReachedBoundary;
    let spring$1;
    const checkCatchBoundary = (t) => {
        if (!isOutOfBounds(state.value))
            return;
        timeReachedBoundary = t;
        spring$1 = (0,_spring_mjs__WEBPACK_IMPORTED_MODULE_0__.spring)({
            keyframes: [state.value, nearestBoundary(state.value)],
            velocity: (0,_utils_velocity_mjs__WEBPACK_IMPORTED_MODULE_1__.getGeneratorVelocity)(calcLatest, t, state.value), // TODO: This should be passing * 1000
            damping: bounceDamping,
            stiffness: bounceStiffness,
            restDelta,
            restSpeed,
        });
    };
    checkCatchBoundary(0);
    return {
        calculatedDuration: null,
        next: (t) => {
            /**
             * We need to resolve the friction to figure out if we need a
             * spring but we don't want to do this twice per frame. So here
             * we flag if we updated for this frame and later if we did
             * we can skip doing it again.
             */
            let hasUpdatedFrame = false;
            if (!spring$1 && timeReachedBoundary === undefined) {
                hasUpdatedFrame = true;
                applyFriction(t);
                checkCatchBoundary(t);
            }
            /**
             * If we have a spring and the provided t is beyond the moment the friction
             * animation crossed the min/max boundary, use the spring.
             */
            if (timeReachedBoundary !== undefined && t >= timeReachedBoundary) {
                return spring$1.next(t - timeReachedBoundary);
            }
            else {
                !hasUpdatedFrame && applyFriction(t);
                return state;
            }
        },
    };
}


//# sourceMappingURL=inertia.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/generators/keyframes.mjs"
/*!****************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/generators/keyframes.mjs ***!
  \****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultEasing: () => (/* binding */ defaultEasing),
/* harmony export */   keyframes: () => (/* binding */ keyframes)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/easing/ease.mjs");
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/easing/utils/is-easing-array.mjs");
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/easing/utils/map.mjs");
/* harmony import */ var _utils_interpolate_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/interpolate.mjs */ "./node_modules/motion-dom/dist/es/utils/interpolate.mjs");
/* harmony import */ var _keyframes_offsets_default_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../keyframes/offsets/default.mjs */ "./node_modules/motion-dom/dist/es/animation/keyframes/offsets/default.mjs");
/* harmony import */ var _keyframes_offsets_time_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../keyframes/offsets/time.mjs */ "./node_modules/motion-dom/dist/es/animation/keyframes/offsets/time.mjs");





function defaultEasing(values, easing) {
    return values.map(() => easing || motion_utils__WEBPACK_IMPORTED_MODULE_0__.easeInOut).splice(0, values.length - 1);
}
function keyframes({ duration = 300, keyframes: keyframeValues, times, ease = "easeInOut", }) {
    /**
     * Easing functions can be externally defined as strings. Here we convert them
     * into actual functions.
     */
    const easingFunctions = (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__.isEasingArray)(ease)
        ? ease.map(motion_utils__WEBPACK_IMPORTED_MODULE_2__.easingDefinitionToFunction)
        : (0,motion_utils__WEBPACK_IMPORTED_MODULE_2__.easingDefinitionToFunction)(ease);
    /**
     * This is the Iterator-spec return value. We ensure it's mutable rather than using a generator
     * to reduce GC during animation.
     */
    const state = {
        done: false,
        value: keyframeValues[0],
    };
    /**
     * Create a times array based on the provided 0-1 offsets
     */
    const absoluteTimes = (0,_keyframes_offsets_time_mjs__WEBPACK_IMPORTED_MODULE_5__.convertOffsetToTimes)(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    times && times.length === keyframeValues.length
        ? times
        : (0,_keyframes_offsets_default_mjs__WEBPACK_IMPORTED_MODULE_4__.defaultOffset)(keyframeValues), duration);
    const mapTimeToKeyframe = (0,_utils_interpolate_mjs__WEBPACK_IMPORTED_MODULE_3__.interpolate)(absoluteTimes, keyframeValues, {
        ease: Array.isArray(easingFunctions)
            ? easingFunctions
            : defaultEasing(keyframeValues, easingFunctions),
    });
    return {
        calculatedDuration: duration,
        next: (t) => {
            state.value = mapTimeToKeyframe(t);
            state.done = t >= duration;
            return state;
        },
    };
}


//# sourceMappingURL=keyframes.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/generators/spring.mjs"
/*!*************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/generators/spring.mjs ***!
  \*************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   spring: () => (/* binding */ spring)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/clamp.mjs");
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/errors.mjs");
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/time-conversion.mjs");
/* harmony import */ var _waapi_utils_linear_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../waapi/utils/linear.mjs */ "./node_modules/motion-dom/dist/es/animation/waapi/utils/linear.mjs");
/* harmony import */ var _utils_calc_duration_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/calc-duration.mjs */ "./node_modules/motion-dom/dist/es/animation/generators/utils/calc-duration.mjs");
/* harmony import */ var _utils_create_generator_easing_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/create-generator-easing.mjs */ "./node_modules/motion-dom/dist/es/animation/generators/utils/create-generator-easing.mjs");





const springDefaults = {
    // Default spring physics
    stiffness: 100,
    damping: 10,
    mass: 1.0,
    velocity: 0.0,
    // Default duration/bounce-based options
    duration: 800, // in ms
    bounce: 0.3,
    visualDuration: 0.3, // in seconds
    // Rest thresholds
    restSpeed: {
        granular: 0.01,
        default: 2,
    },
    restDelta: {
        granular: 0.005,
        default: 0.5,
    },
    // Limits
    minDuration: 0.01, // in seconds
    maxDuration: 10.0, // in seconds
    minDamping: 0.05,
    maxDamping: 1,
};
function calcAngularFreq(undampedFreq, dampingRatio) {
    return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
}
const rootIterations = 12;
function approximateRoot(envelope, derivative, initialGuess) {
    let result = initialGuess;
    for (let i = 1; i < rootIterations; i++) {
        result = result - envelope(result) / derivative(result);
    }
    return result;
}
/**
 * This is ported from the Framer implementation of duration-based spring resolution.
 */
const safeMin = 0.001;
function findSpring({ duration = springDefaults.duration, bounce = springDefaults.bounce, velocity = springDefaults.velocity, mass = springDefaults.mass, }) {
    let envelope;
    let derivative;
    (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__.warning)(duration <= (0,motion_utils__WEBPACK_IMPORTED_MODULE_2__.secondsToMilliseconds)(springDefaults.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
    let dampingRatio = 1 - bounce;
    /**
     * Restrict dampingRatio and duration to within acceptable ranges.
     */
    dampingRatio = (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.clamp)(springDefaults.minDamping, springDefaults.maxDamping, dampingRatio);
    duration = (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.clamp)(springDefaults.minDuration, springDefaults.maxDuration, (0,motion_utils__WEBPACK_IMPORTED_MODULE_2__.millisecondsToSeconds)(duration));
    if (dampingRatio < 1) {
        /**
         * Underdamped spring
         */
        envelope = (undampedFreq) => {
            const exponentialDecay = undampedFreq * dampingRatio;
            const delta = exponentialDecay * duration;
            const a = exponentialDecay - velocity;
            const b = calcAngularFreq(undampedFreq, dampingRatio);
            const c = Math.exp(-delta);
            return safeMin - (a / b) * c;
        };
        derivative = (undampedFreq) => {
            const exponentialDecay = undampedFreq * dampingRatio;
            const delta = exponentialDecay * duration;
            const d = delta * velocity + velocity;
            const e = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq, 2) * duration;
            const f = Math.exp(-delta);
            const g = calcAngularFreq(Math.pow(undampedFreq, 2), dampingRatio);
            const factor = -envelope(undampedFreq) + safeMin > 0 ? -1 : 1;
            return (factor * ((d - e) * f)) / g;
        };
    }
    else {
        /**
         * Critically-damped spring
         */
        envelope = (undampedFreq) => {
            const a = Math.exp(-undampedFreq * duration);
            const b = (undampedFreq - velocity) * duration + 1;
            return -safeMin + a * b;
        };
        derivative = (undampedFreq) => {
            const a = Math.exp(-undampedFreq * duration);
            const b = (velocity - undampedFreq) * (duration * duration);
            return a * b;
        };
    }
    const initialGuess = 5 / duration;
    const undampedFreq = approximateRoot(envelope, derivative, initialGuess);
    duration = (0,motion_utils__WEBPACK_IMPORTED_MODULE_2__.secondsToMilliseconds)(duration);
    if (isNaN(undampedFreq)) {
        return {
            stiffness: springDefaults.stiffness,
            damping: springDefaults.damping,
            duration,
        };
    }
    else {
        const stiffness = Math.pow(undampedFreq, 2) * mass;
        return {
            stiffness,
            damping: dampingRatio * 2 * Math.sqrt(mass * stiffness),
            duration,
        };
    }
}
const durationKeys = ["duration", "bounce"];
const physicsKeys = ["stiffness", "damping", "mass"];
function isSpringType(options, keys) {
    return keys.some((key) => options[key] !== undefined);
}
function getSpringOptions(options) {
    let springOptions = {
        velocity: springDefaults.velocity,
        stiffness: springDefaults.stiffness,
        damping: springDefaults.damping,
        mass: springDefaults.mass,
        isResolvedFromDuration: false,
        ...options,
    };
    // stiffness/damping/mass overrides duration/bounce
    if (!isSpringType(options, physicsKeys) &&
        isSpringType(options, durationKeys)) {
        // Time-defined springs should ignore inherited velocity.
        // Velocity from interrupted animations can cause findSpring()
        // to compute wildly different spring parameters, leading to
        // massive oscillation on small-range animations.
        springOptions.velocity = 0;
        if (options.visualDuration) {
            const visualDuration = options.visualDuration;
            const root = (2 * Math.PI) / (visualDuration * 1.2);
            const stiffness = root * root;
            const damping = 2 *
                (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.clamp)(0.05, 1, 1 - (options.bounce || 0)) *
                Math.sqrt(stiffness);
            springOptions = {
                ...springOptions,
                mass: springDefaults.mass,
                stiffness,
                damping,
            };
        }
        else {
            const derived = findSpring({ ...options, velocity: 0 });
            springOptions = {
                ...springOptions,
                ...derived,
                mass: springDefaults.mass,
            };
            springOptions.isResolvedFromDuration = true;
        }
    }
    return springOptions;
}
function spring(optionsOrVisualDuration = springDefaults.visualDuration, bounce = springDefaults.bounce) {
    const options = typeof optionsOrVisualDuration !== "object"
        ? {
            visualDuration: optionsOrVisualDuration,
            keyframes: [0, 1],
            bounce,
        }
        : optionsOrVisualDuration;
    let { restSpeed, restDelta } = options;
    const origin = options.keyframes[0];
    const target = options.keyframes[options.keyframes.length - 1];
    /**
     * This is the Iterator-spec return value. We ensure it's mutable rather than using a generator
     * to reduce GC during animation.
     */
    const state = { done: false, value: origin };
    const { stiffness, damping, mass, duration, velocity, isResolvedFromDuration, } = getSpringOptions({
        ...options,
        velocity: -(0,motion_utils__WEBPACK_IMPORTED_MODULE_2__.millisecondsToSeconds)(options.velocity || 0),
    });
    const initialVelocity = velocity || 0.0;
    const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
    const initialDelta = target - origin;
    const undampedAngularFreq = (0,motion_utils__WEBPACK_IMPORTED_MODULE_2__.millisecondsToSeconds)(Math.sqrt(stiffness / mass));
    /**
     * If we're working on a granular scale, use smaller defaults for determining
     * when the spring is finished.
     *
     * These defaults have been selected emprically based on what strikes a good
     * ratio between feeling good and finishing as soon as changes are imperceptible.
     */
    const isGranularScale = Math.abs(initialDelta) < 5;
    restSpeed || (restSpeed = isGranularScale
        ? springDefaults.restSpeed.granular
        : springDefaults.restSpeed.default);
    restDelta || (restDelta = isGranularScale
        ? springDefaults.restDelta.granular
        : springDefaults.restDelta.default);
    let resolveSpring;
    let resolveVelocity;
    // Underdamped coefficients, hoisted for use in the inlined next() hot path
    let angularFreq;
    let A;
    let sinCoeff;
    let cosCoeff;
    if (dampingRatio < 1) {
        angularFreq = calcAngularFreq(undampedAngularFreq, dampingRatio);
        A =
            (initialVelocity +
                dampingRatio * undampedAngularFreq * initialDelta) /
                angularFreq;
        // Underdamped spring
        resolveSpring = (t) => {
            const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
            return (target -
                envelope *
                    (A * Math.sin(angularFreq * t) +
                        initialDelta * Math.cos(angularFreq * t)));
        };
        // Analytical derivative of underdamped spring (px/ms)
        sinCoeff =
            dampingRatio * undampedAngularFreq * A + initialDelta * angularFreq;
        cosCoeff =
            dampingRatio * undampedAngularFreq * initialDelta - A * angularFreq;
        resolveVelocity = (t) => {
            const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
            return envelope *
                (sinCoeff * Math.sin(angularFreq * t) +
                    cosCoeff * Math.cos(angularFreq * t));
        };
    }
    else if (dampingRatio === 1) {
        // Critically damped spring
        resolveSpring = (t) => target -
            Math.exp(-undampedAngularFreq * t) *
                (initialDelta +
                    (initialVelocity + undampedAngularFreq * initialDelta) * t);
        // Analytical derivative of critically damped spring (px/ms)
        const C = initialVelocity + undampedAngularFreq * initialDelta;
        resolveVelocity = (t) => Math.exp(-undampedAngularFreq * t) *
            (undampedAngularFreq * C * t - initialVelocity);
    }
    else {
        // Overdamped spring
        const dampedAngularFreq = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
        resolveSpring = (t) => {
            const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
            // When performing sinh or cosh values can hit Infinity so we cap them here
            const freqForT = Math.min(dampedAngularFreq * t, 300);
            return (target -
                (envelope *
                    ((initialVelocity +
                        dampingRatio * undampedAngularFreq * initialDelta) *
                        Math.sinh(freqForT) +
                        dampedAngularFreq *
                            initialDelta *
                            Math.cosh(freqForT))) /
                    dampedAngularFreq);
        };
        // Analytical derivative of overdamped spring (px/ms)
        const P = (initialVelocity +
            dampingRatio * undampedAngularFreq * initialDelta) /
            dampedAngularFreq;
        const sinhCoeff = dampingRatio * undampedAngularFreq * P - initialDelta * dampedAngularFreq;
        const coshCoeff = dampingRatio * undampedAngularFreq * initialDelta - P * dampedAngularFreq;
        resolveVelocity = (t) => {
            const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
            const freqForT = Math.min(dampedAngularFreq * t, 300);
            return envelope *
                (sinhCoeff * Math.sinh(freqForT) +
                    coshCoeff * Math.cosh(freqForT));
        };
    }
    const generator = {
        calculatedDuration: isResolvedFromDuration ? duration || null : null,
        velocity: (t) => (0,motion_utils__WEBPACK_IMPORTED_MODULE_2__.secondsToMilliseconds)(resolveVelocity(t)),
        next: (t) => {
            /**
             * For underdamped physics springs we need both position and
             * velocity each tick. Compute shared trig values once to avoid
             * duplicate Math.exp/sin/cos calls on the hot path.
             */
            if (!isResolvedFromDuration && dampingRatio < 1) {
                const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
                const sin = Math.sin(angularFreq * t);
                const cos = Math.cos(angularFreq * t);
                const current = target -
                    envelope *
                        (A * sin + initialDelta * cos);
                const currentVelocity = (0,motion_utils__WEBPACK_IMPORTED_MODULE_2__.secondsToMilliseconds)(envelope *
                    (sinCoeff * sin + cosCoeff * cos));
                state.done =
                    Math.abs(currentVelocity) <= restSpeed &&
                        Math.abs(target - current) <= restDelta;
                state.value = state.done ? target : current;
                return state;
            }
            const current = resolveSpring(t);
            if (!isResolvedFromDuration) {
                const currentVelocity = (0,motion_utils__WEBPACK_IMPORTED_MODULE_2__.secondsToMilliseconds)(resolveVelocity(t));
                state.done =
                    Math.abs(currentVelocity) <= restSpeed &&
                        Math.abs(target - current) <= restDelta;
            }
            else {
                state.done = t >= duration;
            }
            state.value = state.done ? target : current;
            return state;
        },
        toString: () => {
            const calculatedDuration = Math.min((0,_utils_calc_duration_mjs__WEBPACK_IMPORTED_MODULE_4__.calcGeneratorDuration)(generator), _utils_calc_duration_mjs__WEBPACK_IMPORTED_MODULE_4__.maxGeneratorDuration);
            const easing = (0,_waapi_utils_linear_mjs__WEBPACK_IMPORTED_MODULE_3__.generateLinearEasing)((progress) => generator.next(calculatedDuration * progress).value, calculatedDuration, 30);
            return calculatedDuration + "ms " + easing;
        },
        toTransition: () => { },
    };
    return generator;
}
spring.applyToOptions = (options) => {
    const generatorOptions = (0,_utils_create_generator_easing_mjs__WEBPACK_IMPORTED_MODULE_5__.createGeneratorEasing)(options, 100, spring);
    options.ease = generatorOptions.ease;
    options.duration = (0,motion_utils__WEBPACK_IMPORTED_MODULE_2__.secondsToMilliseconds)(generatorOptions.duration);
    options.type = "keyframes";
    return options;
};


//# sourceMappingURL=spring.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/generators/utils/calc-duration.mjs"
/*!**************************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/generators/utils/calc-duration.mjs ***!
  \**************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calcGeneratorDuration: () => (/* binding */ calcGeneratorDuration),
/* harmony export */   maxGeneratorDuration: () => (/* binding */ maxGeneratorDuration)
/* harmony export */ });
/**
 * Implement a practical max duration for keyframe generation
 * to prevent infinite loops
 */
const maxGeneratorDuration = 20000;
function calcGeneratorDuration(generator) {
    let duration = 0;
    const timeStep = 50;
    let state = generator.next(duration);
    while (!state.done && duration < maxGeneratorDuration) {
        duration += timeStep;
        state = generator.next(duration);
    }
    return duration >= maxGeneratorDuration ? Infinity : duration;
}


//# sourceMappingURL=calc-duration.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/generators/utils/create-generator-easing.mjs"
/*!************************************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/generators/utils/create-generator-easing.mjs ***!
  \************************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createGeneratorEasing: () => (/* binding */ createGeneratorEasing)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/time-conversion.mjs");
/* harmony import */ var _calc_duration_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./calc-duration.mjs */ "./node_modules/motion-dom/dist/es/animation/generators/utils/calc-duration.mjs");



/**
 * Create a progress => progress easing function from a generator.
 */
function createGeneratorEasing(options, scale = 100, createGenerator) {
    const generator = createGenerator({ ...options, keyframes: [0, scale] });
    const duration = Math.min((0,_calc_duration_mjs__WEBPACK_IMPORTED_MODULE_1__.calcGeneratorDuration)(generator), _calc_duration_mjs__WEBPACK_IMPORTED_MODULE_1__.maxGeneratorDuration);
    return {
        type: "keyframes",
        ease: (progress) => {
            return generator.next(duration * progress).value / scale;
        },
        duration: (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.millisecondsToSeconds)(duration),
    };
}


//# sourceMappingURL=create-generator-easing.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/generators/utils/is-generator.mjs"
/*!*************************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/generators/utils/is-generator.mjs ***!
  \*************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isGenerator: () => (/* binding */ isGenerator)
/* harmony export */ });
function isGenerator(type) {
    return typeof type === "function" && "applyToOptions" in type;
}


//# sourceMappingURL=is-generator.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/generators/utils/velocity.mjs"
/*!*********************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/generators/utils/velocity.mjs ***!
  \*********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getGeneratorVelocity: () => (/* binding */ getGeneratorVelocity)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/velocity-per-second.mjs");


const velocitySampleDuration = 5; // ms
function getGeneratorVelocity(resolveValue, t, current) {
    const prevT = Math.max(t - velocitySampleDuration, 0);
    return (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.velocityPerSecond)(current - resolveValue(prevT), t - prevT);
}


//# sourceMappingURL=velocity.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/interfaces/motion-value.mjs"
/*!*******************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/interfaces/motion-value.mjs ***!
  \*******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   animateMotionValue: () => (/* binding */ animateMotionValue)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/global-config.mjs");
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/time-conversion.mjs");
/* harmony import */ var _AsyncMotionValueAnimation_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AsyncMotionValueAnimation.mjs */ "./node_modules/motion-dom/dist/es/animation/AsyncMotionValueAnimation.mjs");
/* harmony import */ var _JSAnimation_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../JSAnimation.mjs */ "./node_modules/motion-dom/dist/es/animation/JSAnimation.mjs");
/* harmony import */ var _utils_get_value_transition_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/get-value-transition.mjs */ "./node_modules/motion-dom/dist/es/animation/utils/get-value-transition.mjs");
/* harmony import */ var _utils_make_animation_instant_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/make-animation-instant.mjs */ "./node_modules/motion-dom/dist/es/animation/utils/make-animation-instant.mjs");
/* harmony import */ var _utils_default_transitions_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/default-transitions.mjs */ "./node_modules/motion-dom/dist/es/animation/utils/default-transitions.mjs");
/* harmony import */ var _keyframes_get_final_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../keyframes/get-final.mjs */ "./node_modules/motion-dom/dist/es/animation/keyframes/get-final.mjs");
/* harmony import */ var _utils_is_transition_defined_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/is-transition-defined.mjs */ "./node_modules/motion-dom/dist/es/animation/utils/is-transition-defined.mjs");
/* harmony import */ var _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../frameloop/frame.mjs */ "./node_modules/motion-dom/dist/es/frameloop/frame.mjs");










const animateMotionValue = (name, value, target, transition = {}, element, isHandoff) => (onComplete) => {
    const valueTransition = (0,_utils_get_value_transition_mjs__WEBPACK_IMPORTED_MODULE_4__.getValueTransition)(transition, name) || {};
    /**
     * Most transition values are currently completely overwritten by value-specific
     * transitions. In the future it'd be nicer to blend these transitions. But for now
     * delay actually does inherit from the root transition if not value-specific.
     */
    const delay = valueTransition.delay || transition.delay || 0;
    /**
     * Elapsed isn't a public transition option but can be passed through from
     * optimized appear effects in milliseconds.
     */
    let { elapsed = 0 } = transition;
    elapsed = elapsed - (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__.secondsToMilliseconds)(delay);
    const options = {
        keyframes: Array.isArray(target) ? target : [null, target],
        ease: "easeOut",
        velocity: value.getVelocity(),
        ...valueTransition,
        delay: -elapsed,
        onUpdate: (v) => {
            value.set(v);
            valueTransition.onUpdate && valueTransition.onUpdate(v);
        },
        onComplete: () => {
            onComplete();
            valueTransition.onComplete && valueTransition.onComplete();
        },
        name,
        motionValue: value,
        element: isHandoff ? undefined : element,
    };
    /**
     * If there's no transition defined for this value, we can generate
     * unique transition settings for this value.
     */
    if (!(0,_utils_is_transition_defined_mjs__WEBPACK_IMPORTED_MODULE_8__.isTransitionDefined)(valueTransition)) {
        Object.assign(options, (0,_utils_default_transitions_mjs__WEBPACK_IMPORTED_MODULE_6__.getDefaultTransition)(name, options));
    }
    /**
     * Both WAAPI and our internal animation functions use durations
     * as defined by milliseconds, while our external API defines them
     * as seconds.
     */
    options.duration && (options.duration = (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__.secondsToMilliseconds)(options.duration));
    options.repeatDelay && (options.repeatDelay = (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__.secondsToMilliseconds)(options.repeatDelay));
    /**
     * Support deprecated way to set initial value. Prefer keyframe syntax.
     */
    if (options.from !== undefined) {
        options.keyframes[0] = options.from;
    }
    let shouldSkip = false;
    if (options.type === false ||
        (options.duration === 0 && !options.repeatDelay)) {
        (0,_utils_make_animation_instant_mjs__WEBPACK_IMPORTED_MODULE_5__.makeAnimationInstant)(options);
        if (options.delay === 0) {
            shouldSkip = true;
        }
    }
    if (motion_utils__WEBPACK_IMPORTED_MODULE_0__.MotionGlobalConfig.instantAnimations ||
        motion_utils__WEBPACK_IMPORTED_MODULE_0__.MotionGlobalConfig.skipAnimations ||
        element?.shouldSkipAnimations) {
        shouldSkip = true;
        (0,_utils_make_animation_instant_mjs__WEBPACK_IMPORTED_MODULE_5__.makeAnimationInstant)(options);
        options.delay = 0;
    }
    /**
     * If the transition type or easing has been explicitly set by the user
     * then we don't want to allow flattening the animation.
     */
    options.allowFlatten = !valueTransition.type && !valueTransition.ease;
    /**
     * If we can or must skip creating the animation, and apply only
     * the final keyframe, do so. We also check once keyframes are resolved but
     * this early check prevents the need to create an animation at all.
     */
    if (shouldSkip && !isHandoff && value.get() !== undefined) {
        const finalKeyframe = (0,_keyframes_get_final_mjs__WEBPACK_IMPORTED_MODULE_7__.getFinalKeyframe)(options.keyframes, valueTransition);
        if (finalKeyframe !== undefined) {
            _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_9__.frame.update(() => {
                options.onUpdate(finalKeyframe);
                options.onComplete();
            });
            return;
        }
    }
    return valueTransition.isSync
        ? new _JSAnimation_mjs__WEBPACK_IMPORTED_MODULE_3__.JSAnimation(options)
        : new _AsyncMotionValueAnimation_mjs__WEBPACK_IMPORTED_MODULE_2__.AsyncMotionValueAnimation(options);
};


//# sourceMappingURL=motion-value.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/interfaces/visual-element-target.mjs"
/*!****************************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/interfaces/visual-element-target.mjs ***!
  \****************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   animateTarget: () => (/* binding */ animateTarget)
/* harmony export */ });
/* harmony import */ var _utils_get_value_transition_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/get-value-transition.mjs */ "./node_modules/motion-dom/dist/es/animation/utils/get-value-transition.mjs");
/* harmony import */ var _utils_resolve_transition_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/resolve-transition.mjs */ "./node_modules/motion-dom/dist/es/animation/utils/resolve-transition.mjs");
/* harmony import */ var _render_utils_keys_position_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../render/utils/keys-position.mjs */ "./node_modules/motion-dom/dist/es/render/utils/keys-position.mjs");
/* harmony import */ var _render_utils_setters_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../render/utils/setters.mjs */ "./node_modules/motion-dom/dist/es/render/utils/setters.mjs");
/* harmony import */ var _value_will_change_add_will_change_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../value/will-change/add-will-change.mjs */ "./node_modules/motion-dom/dist/es/value/will-change/add-will-change.mjs");
/* harmony import */ var _optimized_appear_get_appear_id_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../optimized-appear/get-appear-id.mjs */ "./node_modules/motion-dom/dist/es/animation/optimized-appear/get-appear-id.mjs");
/* harmony import */ var _motion_value_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./motion-value.mjs */ "./node_modules/motion-dom/dist/es/animation/interfaces/motion-value.mjs");
/* harmony import */ var _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../frameloop/frame.mjs */ "./node_modules/motion-dom/dist/es/frameloop/frame.mjs");









/**
 * Decide whether we should block this animation. Previously, we achieved this
 * just by checking whether the key was listed in protectedKeys, but this
 * posed problems if an animation was triggered by afterChildren and protectedKeys
 * had been set to true in the meantime.
 */
function shouldBlockAnimation({ protectedKeys, needsAnimating }, key) {
    const shouldBlock = protectedKeys.hasOwnProperty(key) && needsAnimating[key] !== true;
    needsAnimating[key] = false;
    return shouldBlock;
}
function animateTarget(visualElement, targetAndTransition, { delay = 0, transitionOverride, type } = {}) {
    let { transition, transitionEnd, ...target } = targetAndTransition;
    const defaultTransition = visualElement.getDefaultTransition();
    transition = transition
        ? (0,_utils_resolve_transition_mjs__WEBPACK_IMPORTED_MODULE_1__.resolveTransition)(transition, defaultTransition)
        : defaultTransition;
    const reduceMotion = transition?.reduceMotion;
    if (transitionOverride)
        transition = transitionOverride;
    const animations = [];
    const animationTypeState = type &&
        visualElement.animationState &&
        visualElement.animationState.getState()[type];
    for (const key in target) {
        const value = visualElement.getValue(key, visualElement.latestValues[key] ?? null);
        const valueTarget = target[key];
        if (valueTarget === undefined ||
            (animationTypeState &&
                shouldBlockAnimation(animationTypeState, key))) {
            continue;
        }
        const valueTransition = {
            delay,
            ...(0,_utils_get_value_transition_mjs__WEBPACK_IMPORTED_MODULE_0__.getValueTransition)(transition || {}, key),
        };
        /**
         * If the value is already at the defined target, skip the animation.
         * We still re-assert the value via frame.update to take precedence
         * over any stale transitionEnd callbacks from previous animations.
         */
        const currentValue = value.get();
        if (currentValue !== undefined &&
            !value.isAnimating() &&
            !Array.isArray(valueTarget) &&
            valueTarget === currentValue &&
            !valueTransition.velocity) {
            _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_7__.frame.update(() => value.set(valueTarget));
            continue;
        }
        /**
         * If this is the first time a value is being animated, check
         * to see if we're handling off from an existing animation.
         */
        let isHandoff = false;
        if (window.MotionHandoffAnimation) {
            const appearId = (0,_optimized_appear_get_appear_id_mjs__WEBPACK_IMPORTED_MODULE_5__.getOptimisedAppearId)(visualElement);
            if (appearId) {
                const startTime = window.MotionHandoffAnimation(appearId, key, _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_7__.frame);
                if (startTime !== null) {
                    valueTransition.startTime = startTime;
                    isHandoff = true;
                }
            }
        }
        (0,_value_will_change_add_will_change_mjs__WEBPACK_IMPORTED_MODULE_4__.addValueToWillChange)(visualElement, key);
        const shouldReduceMotion = reduceMotion ?? visualElement.shouldReduceMotion;
        value.start((0,_motion_value_mjs__WEBPACK_IMPORTED_MODULE_6__.animateMotionValue)(key, value, valueTarget, shouldReduceMotion && _render_utils_keys_position_mjs__WEBPACK_IMPORTED_MODULE_2__.positionalKeys.has(key)
            ? { type: false }
            : valueTransition, visualElement, isHandoff));
        const animation = value.animation;
        if (animation) {
            animations.push(animation);
        }
    }
    if (transitionEnd) {
        const applyTransitionEnd = () => _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_7__.frame.update(() => {
            transitionEnd && (0,_render_utils_setters_mjs__WEBPACK_IMPORTED_MODULE_3__.setTarget)(visualElement, transitionEnd);
        });
        if (animations.length) {
            Promise.all(animations).then(applyTransitionEnd);
        }
        else {
            applyTransitionEnd();
        }
    }
    return animations;
}


//# sourceMappingURL=visual-element-target.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/keyframes/DOMKeyframesResolver.mjs"
/*!**************************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/keyframes/DOMKeyframesResolver.mjs ***!
  \**************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DOMKeyframesResolver: () => (/* binding */ DOMKeyframesResolver)
/* harmony export */ });
/* harmony import */ var _render_utils_keys_position_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../render/utils/keys-position.mjs */ "./node_modules/motion-dom/dist/es/render/utils/keys-position.mjs");
/* harmony import */ var _value_types_dimensions_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../value/types/dimensions.mjs */ "./node_modules/motion-dom/dist/es/value/types/dimensions.mjs");
/* harmony import */ var _utils_css_variables_conversion_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/css-variables-conversion.mjs */ "./node_modules/motion-dom/dist/es/animation/utils/css-variables-conversion.mjs");
/* harmony import */ var _utils_is_css_variable_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/is-css-variable.mjs */ "./node_modules/motion-dom/dist/es/animation/utils/is-css-variable.mjs");
/* harmony import */ var _KeyframesResolver_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./KeyframesResolver.mjs */ "./node_modules/motion-dom/dist/es/animation/keyframes/KeyframesResolver.mjs");
/* harmony import */ var _utils_is_none_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/is-none.mjs */ "./node_modules/motion-dom/dist/es/animation/keyframes/utils/is-none.mjs");
/* harmony import */ var _utils_make_none_animatable_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/make-none-animatable.mjs */ "./node_modules/motion-dom/dist/es/animation/keyframes/utils/make-none-animatable.mjs");
/* harmony import */ var _utils_unit_conversion_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/unit-conversion.mjs */ "./node_modules/motion-dom/dist/es/animation/keyframes/utils/unit-conversion.mjs");









class DOMKeyframesResolver extends _KeyframesResolver_mjs__WEBPACK_IMPORTED_MODULE_4__.KeyframeResolver {
    constructor(unresolvedKeyframes, onComplete, name, motionValue, element) {
        super(unresolvedKeyframes, onComplete, name, motionValue, element, true);
    }
    readKeyframes() {
        const { unresolvedKeyframes, element, name } = this;
        if (!element || !element.current)
            return;
        super.readKeyframes();
        /**
         * If any keyframe is a CSS variable, we need to find its value by sampling the element
         */
        for (let i = 0; i < unresolvedKeyframes.length; i++) {
            let keyframe = unresolvedKeyframes[i];
            if (typeof keyframe === "string") {
                keyframe = keyframe.trim();
                if ((0,_utils_is_css_variable_mjs__WEBPACK_IMPORTED_MODULE_3__.isCSSVariableToken)(keyframe)) {
                    const resolved = (0,_utils_css_variables_conversion_mjs__WEBPACK_IMPORTED_MODULE_2__.getVariableValue)(keyframe, element.current);
                    if (resolved !== undefined) {
                        unresolvedKeyframes[i] = resolved;
                    }
                    if (i === unresolvedKeyframes.length - 1) {
                        this.finalKeyframe = keyframe;
                    }
                }
            }
        }
        /**
         * Resolve "none" values. We do this potentially twice - once before and once after measuring keyframes.
         * This could be seen as inefficient but it's a trade-off to avoid measurements in more situations, which
         * have a far bigger performance impact.
         */
        this.resolveNoneKeyframes();
        /**
         * Check to see if unit type has changed. If so schedule jobs that will
         * temporarily set styles to the destination keyframes.
         * Skip if we have more than two keyframes or this isn't a positional value.
         * TODO: We can throw if there are multiple keyframes and the value type changes.
         */
        if (!_render_utils_keys_position_mjs__WEBPACK_IMPORTED_MODULE_0__.positionalKeys.has(name) || unresolvedKeyframes.length !== 2) {
            return;
        }
        const [origin, target] = unresolvedKeyframes;
        const originType = (0,_value_types_dimensions_mjs__WEBPACK_IMPORTED_MODULE_1__.findDimensionValueType)(origin);
        const targetType = (0,_value_types_dimensions_mjs__WEBPACK_IMPORTED_MODULE_1__.findDimensionValueType)(target);
        /**
         * If one keyframe contains embedded CSS variables (e.g. in calc()) and the other
         * doesn't, we need to measure to convert to pixels. This handles GitHub issue #3410.
         */
        const originHasVar = (0,_utils_is_css_variable_mjs__WEBPACK_IMPORTED_MODULE_3__.containsCSSVariable)(origin);
        const targetHasVar = (0,_utils_is_css_variable_mjs__WEBPACK_IMPORTED_MODULE_3__.containsCSSVariable)(target);
        if (originHasVar !== targetHasVar && _utils_unit_conversion_mjs__WEBPACK_IMPORTED_MODULE_7__.positionalValues[name]) {
            this.needsMeasurement = true;
            return;
        }
        /**
         * Either we don't recognise these value types or we can animate between them.
         */
        if (originType === targetType)
            return;
        /**
         * If both values are numbers or pixels, we can animate between them by
         * converting them to numbers.
         */
        if ((0,_utils_unit_conversion_mjs__WEBPACK_IMPORTED_MODULE_7__.isNumOrPxType)(originType) && (0,_utils_unit_conversion_mjs__WEBPACK_IMPORTED_MODULE_7__.isNumOrPxType)(targetType)) {
            for (let i = 0; i < unresolvedKeyframes.length; i++) {
                const value = unresolvedKeyframes[i];
                if (typeof value === "string") {
                    unresolvedKeyframes[i] = parseFloat(value);
                }
            }
        }
        else if (_utils_unit_conversion_mjs__WEBPACK_IMPORTED_MODULE_7__.positionalValues[name]) {
            /**
             * Else, the only way to resolve this is by measuring the element.
             */
            this.needsMeasurement = true;
        }
    }
    resolveNoneKeyframes() {
        const { unresolvedKeyframes, name } = this;
        const noneKeyframeIndexes = [];
        for (let i = 0; i < unresolvedKeyframes.length; i++) {
            if (unresolvedKeyframes[i] === null ||
                (0,_utils_is_none_mjs__WEBPACK_IMPORTED_MODULE_5__.isNone)(unresolvedKeyframes[i])) {
                noneKeyframeIndexes.push(i);
            }
        }
        if (noneKeyframeIndexes.length) {
            (0,_utils_make_none_animatable_mjs__WEBPACK_IMPORTED_MODULE_6__.makeNoneKeyframesAnimatable)(unresolvedKeyframes, noneKeyframeIndexes, name);
        }
    }
    measureInitialState() {
        const { element, unresolvedKeyframes, name } = this;
        if (!element || !element.current)
            return;
        if (name === "height") {
            this.suspendedScrollY = window.pageYOffset;
        }
        this.measuredOrigin = _utils_unit_conversion_mjs__WEBPACK_IMPORTED_MODULE_7__.positionalValues[name](element.measureViewportBox(), window.getComputedStyle(element.current));
        unresolvedKeyframes[0] = this.measuredOrigin;
        // Set final key frame to measure after next render
        const measureKeyframe = unresolvedKeyframes[unresolvedKeyframes.length - 1];
        if (measureKeyframe !== undefined) {
            element.getValue(name, measureKeyframe).jump(measureKeyframe, false);
        }
    }
    measureEndState() {
        const { element, name, unresolvedKeyframes } = this;
        if (!element || !element.current)
            return;
        const value = element.getValue(name);
        value && value.jump(this.measuredOrigin, false);
        const finalKeyframeIndex = unresolvedKeyframes.length - 1;
        const finalKeyframe = unresolvedKeyframes[finalKeyframeIndex];
        unresolvedKeyframes[finalKeyframeIndex] = _utils_unit_conversion_mjs__WEBPACK_IMPORTED_MODULE_7__.positionalValues[name](element.measureViewportBox(), window.getComputedStyle(element.current));
        if (finalKeyframe !== null && this.finalKeyframe === undefined) {
            this.finalKeyframe = finalKeyframe;
        }
        // If we removed transform values, reapply them before the next render
        if (this.removedTransforms?.length) {
            this.removedTransforms.forEach(([unsetTransformName, unsetTransformValue]) => {
                element
                    .getValue(unsetTransformName)
                    .set(unsetTransformValue);
            });
        }
        this.resolveNoneKeyframes();
    }
}


//# sourceMappingURL=DOMKeyframesResolver.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/keyframes/KeyframesResolver.mjs"
/*!***********************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/keyframes/KeyframesResolver.mjs ***!
  \***********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KeyframeResolver: () => (/* binding */ KeyframeResolver),
/* harmony export */   flushKeyframeResolvers: () => (/* binding */ flushKeyframeResolvers)
/* harmony export */ });
/* harmony import */ var _utils_fill_wildcards_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/fill-wildcards.mjs */ "./node_modules/motion-dom/dist/es/animation/keyframes/utils/fill-wildcards.mjs");
/* harmony import */ var _utils_unit_conversion_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/unit-conversion.mjs */ "./node_modules/motion-dom/dist/es/animation/keyframes/utils/unit-conversion.mjs");
/* harmony import */ var _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../frameloop/frame.mjs */ "./node_modules/motion-dom/dist/es/frameloop/frame.mjs");




const toResolve = new Set();
let isScheduled = false;
let anyNeedsMeasurement = false;
let isForced = false;
function measureAllKeyframes() {
    if (anyNeedsMeasurement) {
        const resolversToMeasure = Array.from(toResolve).filter((resolver) => resolver.needsMeasurement);
        const elementsToMeasure = new Set(resolversToMeasure.map((resolver) => resolver.element));
        const transformsToRestore = new Map();
        /**
         * Write pass
         * If we're measuring elements we want to remove bounding box-changing transforms.
         */
        elementsToMeasure.forEach((element) => {
            const removedTransforms = (0,_utils_unit_conversion_mjs__WEBPACK_IMPORTED_MODULE_1__.removeNonTranslationalTransform)(element);
            if (!removedTransforms.length)
                return;
            transformsToRestore.set(element, removedTransforms);
            element.render();
        });
        // Read
        resolversToMeasure.forEach((resolver) => resolver.measureInitialState());
        // Write
        elementsToMeasure.forEach((element) => {
            element.render();
            const restore = transformsToRestore.get(element);
            if (restore) {
                restore.forEach(([key, value]) => {
                    element.getValue(key)?.set(value);
                });
            }
        });
        // Read
        resolversToMeasure.forEach((resolver) => resolver.measureEndState());
        // Write
        resolversToMeasure.forEach((resolver) => {
            if (resolver.suspendedScrollY !== undefined) {
                window.scrollTo(0, resolver.suspendedScrollY);
            }
        });
    }
    anyNeedsMeasurement = false;
    isScheduled = false;
    toResolve.forEach((resolver) => resolver.complete(isForced));
    toResolve.clear();
}
function readAllKeyframes() {
    toResolve.forEach((resolver) => {
        resolver.readKeyframes();
        if (resolver.needsMeasurement) {
            anyNeedsMeasurement = true;
        }
    });
}
function flushKeyframeResolvers() {
    isForced = true;
    readAllKeyframes();
    measureAllKeyframes();
    isForced = false;
}
class KeyframeResolver {
    constructor(unresolvedKeyframes, onComplete, name, motionValue, element, isAsync = false) {
        this.state = "pending";
        /**
         * Track whether this resolver is async. If it is, it'll be added to the
         * resolver queue and flushed in the next frame. Resolvers that aren't going
         * to trigger read/write thrashing don't need to be async.
         */
        this.isAsync = false;
        /**
         * Track whether this resolver needs to perform a measurement
         * to resolve its keyframes.
         */
        this.needsMeasurement = false;
        this.unresolvedKeyframes = [...unresolvedKeyframes];
        this.onComplete = onComplete;
        this.name = name;
        this.motionValue = motionValue;
        this.element = element;
        this.isAsync = isAsync;
    }
    scheduleResolve() {
        this.state = "scheduled";
        if (this.isAsync) {
            toResolve.add(this);
            if (!isScheduled) {
                isScheduled = true;
                _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_2__.frame.read(readAllKeyframes);
                _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_2__.frame.resolveKeyframes(measureAllKeyframes);
            }
        }
        else {
            this.readKeyframes();
            this.complete();
        }
    }
    readKeyframes() {
        const { unresolvedKeyframes, name, element, motionValue } = this;
        // If initial keyframe is null we need to read it from the DOM
        if (unresolvedKeyframes[0] === null) {
            const currentValue = motionValue?.get();
            // TODO: This doesn't work if the final keyframe is a wildcard
            const finalKeyframe = unresolvedKeyframes[unresolvedKeyframes.length - 1];
            if (currentValue !== undefined) {
                unresolvedKeyframes[0] = currentValue;
            }
            else if (element && name) {
                const valueAsRead = element.readValue(name, finalKeyframe);
                if (valueAsRead !== undefined && valueAsRead !== null) {
                    unresolvedKeyframes[0] = valueAsRead;
                }
            }
            if (unresolvedKeyframes[0] === undefined) {
                unresolvedKeyframes[0] = finalKeyframe;
            }
            if (motionValue && currentValue === undefined) {
                motionValue.set(unresolvedKeyframes[0]);
            }
        }
        (0,_utils_fill_wildcards_mjs__WEBPACK_IMPORTED_MODULE_0__.fillWildcards)(unresolvedKeyframes);
    }
    setFinalKeyframe() { }
    measureInitialState() { }
    renderEndStyles() { }
    measureEndState() { }
    complete(isForcedComplete = false) {
        this.state = "complete";
        this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, isForcedComplete);
        toResolve.delete(this);
    }
    cancel() {
        if (this.state === "scheduled") {
            toResolve.delete(this);
            this.state = "pending";
        }
    }
    resume() {
        if (this.state === "pending")
            this.scheduleResolve();
    }
}


//# sourceMappingURL=KeyframesResolver.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/keyframes/get-final.mjs"
/*!***************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/keyframes/get-final.mjs ***!
  \***************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getFinalKeyframe: () => (/* binding */ getFinalKeyframe)
/* harmony export */ });
const isNotNull = (value) => value !== null;
function getFinalKeyframe(keyframes, { repeat, repeatType = "loop" }, finalKeyframe, speed = 1) {
    const resolvedKeyframes = keyframes.filter(isNotNull);
    const useFirstKeyframe = speed < 0 || (repeat && repeatType !== "loop" && repeat % 2 === 1);
    const index = useFirstKeyframe ? 0 : resolvedKeyframes.length - 1;
    return !index || finalKeyframe === undefined
        ? resolvedKeyframes[index]
        : finalKeyframe;
}


//# sourceMappingURL=get-final.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/keyframes/offsets/default.mjs"
/*!*********************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/keyframes/offsets/default.mjs ***!
  \*********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultOffset: () => (/* binding */ defaultOffset)
/* harmony export */ });
/* harmony import */ var _fill_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fill.mjs */ "./node_modules/motion-dom/dist/es/animation/keyframes/offsets/fill.mjs");


function defaultOffset(arr) {
    const offset = [0];
    (0,_fill_mjs__WEBPACK_IMPORTED_MODULE_0__.fillOffset)(offset, arr.length - 1);
    return offset;
}


//# sourceMappingURL=default.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/keyframes/offsets/fill.mjs"
/*!******************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/keyframes/offsets/fill.mjs ***!
  \******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fillOffset: () => (/* binding */ fillOffset)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/progress.mjs");
/* harmony import */ var _utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/mix/number.mjs */ "./node_modules/motion-dom/dist/es/utils/mix/number.mjs");



function fillOffset(offset, remaining) {
    const min = offset[offset.length - 1];
    for (let i = 1; i <= remaining; i++) {
        const offsetProgress = (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.progress)(0, remaining, i);
        offset.push((0,_utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_1__.mixNumber)(min, 1, offsetProgress));
    }
}


//# sourceMappingURL=fill.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/keyframes/offsets/time.mjs"
/*!******************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/keyframes/offsets/time.mjs ***!
  \******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   convertOffsetToTimes: () => (/* binding */ convertOffsetToTimes)
/* harmony export */ });
function convertOffsetToTimes(offset, duration) {
    return offset.map((o) => o * duration);
}


//# sourceMappingURL=time.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/keyframes/utils/fill-wildcards.mjs"
/*!**************************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/keyframes/utils/fill-wildcards.mjs ***!
  \**************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fillWildcards: () => (/* binding */ fillWildcards)
/* harmony export */ });
function fillWildcards(keyframes) {
    for (let i = 1; i < keyframes.length; i++) {
        keyframes[i] ?? (keyframes[i] = keyframes[i - 1]);
    }
}


//# sourceMappingURL=fill-wildcards.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/keyframes/utils/is-none.mjs"
/*!*******************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/keyframes/utils/is-none.mjs ***!
  \*******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isNone: () => (/* binding */ isNone)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/is-zero-value-string.mjs");


function isNone(value) {
    if (typeof value === "number") {
        return value === 0;
    }
    else if (value !== null) {
        return value === "none" || value === "0" || (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.isZeroValueString)(value);
    }
    else {
        return true;
    }
}


//# sourceMappingURL=is-none.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/keyframes/utils/make-none-animatable.mjs"
/*!********************************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/keyframes/utils/make-none-animatable.mjs ***!
  \********************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   makeNoneKeyframesAnimatable: () => (/* binding */ makeNoneKeyframesAnimatable)
/* harmony export */ });
/* harmony import */ var _value_types_complex_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../value/types/complex/index.mjs */ "./node_modules/motion-dom/dist/es/value/types/complex/index.mjs");
/* harmony import */ var _value_types_utils_animatable_none_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../value/types/utils/animatable-none.mjs */ "./node_modules/motion-dom/dist/es/value/types/utils/animatable-none.mjs");



/**
 * If we encounter keyframes like "none" or "0" and we also have keyframes like
 * "#fff" or "200px 200px" we want to find a keyframe to serve as a template for
 * the "none" keyframes. In this case "#fff" or "200px 200px" - then these get turned into
 * zero equivalents, i.e. "#fff0" or "0px 0px".
 */
const invalidTemplates = new Set(["auto", "none", "0"]);
function makeNoneKeyframesAnimatable(unresolvedKeyframes, noneKeyframeIndexes, name) {
    let i = 0;
    let animatableTemplate = undefined;
    while (i < unresolvedKeyframes.length && !animatableTemplate) {
        const keyframe = unresolvedKeyframes[i];
        if (typeof keyframe === "string" &&
            !invalidTemplates.has(keyframe) &&
            (0,_value_types_complex_index_mjs__WEBPACK_IMPORTED_MODULE_0__.analyseComplexValue)(keyframe).values.length) {
            animatableTemplate = unresolvedKeyframes[i];
        }
        i++;
    }
    if (animatableTemplate && name) {
        for (const noneIndex of noneKeyframeIndexes) {
            unresolvedKeyframes[noneIndex] = (0,_value_types_utils_animatable_none_mjs__WEBPACK_IMPORTED_MODULE_1__.getAnimatableNone)(name, animatableTemplate);
        }
    }
}


//# sourceMappingURL=make-none-animatable.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/keyframes/utils/unit-conversion.mjs"
/*!***************************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/keyframes/utils/unit-conversion.mjs ***!
  \***************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isNumOrPxType: () => (/* binding */ isNumOrPxType),
/* harmony export */   positionalValues: () => (/* binding */ positionalValues),
/* harmony export */   removeNonTranslationalTransform: () => (/* binding */ removeNonTranslationalTransform)
/* harmony export */ });
/* harmony import */ var _render_dom_parse_transform_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../render/dom/parse-transform.mjs */ "./node_modules/motion-dom/dist/es/render/dom/parse-transform.mjs");
/* harmony import */ var _render_utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../render/utils/keys-transform.mjs */ "./node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs");
/* harmony import */ var _value_types_numbers_index_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../value/types/numbers/index.mjs */ "./node_modules/motion-dom/dist/es/value/types/numbers/index.mjs");
/* harmony import */ var _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../value/types/numbers/units.mjs */ "./node_modules/motion-dom/dist/es/value/types/numbers/units.mjs");





const isNumOrPxType = (v) => v === _value_types_numbers_index_mjs__WEBPACK_IMPORTED_MODULE_2__.number || v === _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_3__.px;
const transformKeys = new Set(["x", "y", "z"]);
const nonTranslationalTransformKeys = _render_utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_1__.transformPropOrder.filter((key) => !transformKeys.has(key));
function removeNonTranslationalTransform(visualElement) {
    const removedTransforms = [];
    nonTranslationalTransformKeys.forEach((key) => {
        const value = visualElement.getValue(key);
        if (value !== undefined) {
            removedTransforms.push([key, value.get()]);
            value.set(key.startsWith("scale") ? 1 : 0);
        }
    });
    return removedTransforms;
}
const positionalValues = {
    // Dimensions
    width: ({ x }, { paddingLeft = "0", paddingRight = "0", boxSizing }) => {
        const width = x.max - x.min;
        return boxSizing === "border-box"
            ? width
            : width - parseFloat(paddingLeft) - parseFloat(paddingRight);
    },
    height: ({ y }, { paddingTop = "0", paddingBottom = "0", boxSizing }) => {
        const height = y.max - y.min;
        return boxSizing === "border-box"
            ? height
            : height - parseFloat(paddingTop) - parseFloat(paddingBottom);
    },
    top: (_bbox, { top }) => parseFloat(top),
    left: (_bbox, { left }) => parseFloat(left),
    bottom: ({ y }, { top }) => parseFloat(top) + (y.max - y.min),
    right: ({ x }, { left }) => parseFloat(left) + (x.max - x.min),
    // Transform
    x: (_bbox, { transform }) => (0,_render_dom_parse_transform_mjs__WEBPACK_IMPORTED_MODULE_0__.parseValueFromTransform)(transform, "x"),
    y: (_bbox, { transform }) => (0,_render_dom_parse_transform_mjs__WEBPACK_IMPORTED_MODULE_0__.parseValueFromTransform)(transform, "y"),
};
// Alias translate longform names
positionalValues.translateX = positionalValues.x;
positionalValues.translateY = positionalValues.y;


//# sourceMappingURL=unit-conversion.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/optimized-appear/data-id.mjs"
/*!********************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/optimized-appear/data-id.mjs ***!
  \********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   optimizedAppearDataAttribute: () => (/* binding */ optimizedAppearDataAttribute),
/* harmony export */   optimizedAppearDataId: () => (/* binding */ optimizedAppearDataId)
/* harmony export */ });
/* harmony import */ var _render_dom_utils_camel_to_dash_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../render/dom/utils/camel-to-dash.mjs */ "./node_modules/motion-dom/dist/es/render/dom/utils/camel-to-dash.mjs");


const optimizedAppearDataId = "framerAppearId";
const optimizedAppearDataAttribute = "data-" + (0,_render_dom_utils_camel_to_dash_mjs__WEBPACK_IMPORTED_MODULE_0__.camelToDash)(optimizedAppearDataId);


//# sourceMappingURL=data-id.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/optimized-appear/get-appear-id.mjs"
/*!**************************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/optimized-appear/get-appear-id.mjs ***!
  \**************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getOptimisedAppearId: () => (/* binding */ getOptimisedAppearId)
/* harmony export */ });
/* harmony import */ var _data_id_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data-id.mjs */ "./node_modules/motion-dom/dist/es/animation/optimized-appear/data-id.mjs");


function getOptimisedAppearId(visualElement) {
    return visualElement.props[_data_id_mjs__WEBPACK_IMPORTED_MODULE_0__.optimizedAppearDataAttribute];
}


//# sourceMappingURL=get-appear-id.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/utils/WithPromise.mjs"
/*!*************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/utils/WithPromise.mjs ***!
  \*************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WithPromise: () => (/* binding */ WithPromise)
/* harmony export */ });
class WithPromise {
    constructor() {
        this.updateFinished();
    }
    get finished() {
        return this._finished;
    }
    updateFinished() {
        this._finished = new Promise((resolve) => {
            this.resolve = resolve;
        });
    }
    notifyFinished() {
        this.resolve();
    }
    /**
     * Allows the animation to be awaited.
     *
     * @deprecated Use `finished` instead.
     */
    then(onResolve, onReject) {
        return this.finished.then(onResolve, onReject);
    }
}


//# sourceMappingURL=WithPromise.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/utils/can-animate.mjs"
/*!*************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/utils/can-animate.mjs ***!
  \*************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   canAnimate: () => (/* binding */ canAnimate)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/errors.mjs");
/* harmony import */ var _generators_utils_is_generator_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../generators/utils/is-generator.mjs */ "./node_modules/motion-dom/dist/es/animation/generators/utils/is-generator.mjs");
/* harmony import */ var _is_animatable_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./is-animatable.mjs */ "./node_modules/motion-dom/dist/es/animation/utils/is-animatable.mjs");




function hasKeyframesChanged(keyframes) {
    const current = keyframes[0];
    if (keyframes.length === 1)
        return true;
    for (let i = 0; i < keyframes.length; i++) {
        if (keyframes[i] !== current)
            return true;
    }
}
function canAnimate(keyframes, name, type, velocity) {
    /**
     * Check if we're able to animate between the start and end keyframes,
     * and throw a warning if we're attempting to animate between one that's
     * animatable and another that isn't.
     */
    const originKeyframe = keyframes[0];
    if (originKeyframe === null) {
        return false;
    }
    /**
     * These aren't traditionally animatable but we do support them.
     * In future we could look into making this more generic or replacing
     * this function with mix() === mixImmediate
     */
    if (name === "display" || name === "visibility")
        return true;
    const targetKeyframe = keyframes[keyframes.length - 1];
    const isOriginAnimatable = (0,_is_animatable_mjs__WEBPACK_IMPORTED_MODULE_2__.isAnimatable)(originKeyframe, name);
    const isTargetAnimatable = (0,_is_animatable_mjs__WEBPACK_IMPORTED_MODULE_2__.isAnimatable)(targetKeyframe, name);
    (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.warning)(isOriginAnimatable === isTargetAnimatable, `You are trying to animate ${name} from "${originKeyframe}" to "${targetKeyframe}". "${isOriginAnimatable ? targetKeyframe : originKeyframe}" is not an animatable value.`, "value-not-animatable");
    // Always skip if any of these are true
    if (!isOriginAnimatable || !isTargetAnimatable) {
        return false;
    }
    return (hasKeyframesChanged(keyframes) ||
        ((type === "spring" || (0,_generators_utils_is_generator_mjs__WEBPACK_IMPORTED_MODULE_1__.isGenerator)(type)) && velocity));
}


//# sourceMappingURL=can-animate.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/utils/css-variables-conversion.mjs"
/*!**************************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/utils/css-variables-conversion.mjs ***!
  \**************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getVariableValue: () => (/* binding */ getVariableValue),
/* harmony export */   parseCSSVariable: () => (/* binding */ parseCSSVariable)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/errors.mjs");
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/is-numerical-string.mjs");
/* harmony import */ var _is_css_variable_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./is-css-variable.mjs */ "./node_modules/motion-dom/dist/es/animation/utils/is-css-variable.mjs");



/**
 * Parse Framer's special CSS variable format into a CSS token and a fallback.
 *
 * ```
 * `var(--foo, #fff)` => [`--foo`, '#fff']
 * ```
 *
 * @param current
 */
const splitCSSVariableRegex = 
// eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function parseCSSVariable(current) {
    const match = splitCSSVariableRegex.exec(current);
    if (!match)
        return [,];
    const [, token1, token2, fallback] = match;
    return [`--${token1 ?? token2}`, fallback];
}
const maxDepth = 4;
function getVariableValue(current, element, depth = 1) {
    (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.invariant)(depth <= maxDepth, `Max CSS variable fallback depth detected in property "${current}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
    const [token, fallback] = parseCSSVariable(current);
    // No CSS variable detected
    if (!token)
        return;
    // Attempt to read this CSS variable off the element
    const resolved = window.getComputedStyle(element).getPropertyValue(token);
    if (resolved) {
        const trimmed = resolved.trim();
        return (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__.isNumericalString)(trimmed) ? parseFloat(trimmed) : trimmed;
    }
    return (0,_is_css_variable_mjs__WEBPACK_IMPORTED_MODULE_2__.isCSSVariableToken)(fallback)
        ? getVariableValue(fallback, element, depth + 1)
        : fallback;
}


//# sourceMappingURL=css-variables-conversion.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/utils/default-transitions.mjs"
/*!*********************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/utils/default-transitions.mjs ***!
  \*********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDefaultTransition: () => (/* binding */ getDefaultTransition)
/* harmony export */ });
/* harmony import */ var _render_utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../render/utils/keys-transform.mjs */ "./node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs");


const underDampedSpring = {
    type: "spring",
    stiffness: 500,
    damping: 25,
    restSpeed: 10,
};
const criticallyDampedSpring = (target) => ({
    type: "spring",
    stiffness: 550,
    damping: target === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10,
});
const keyframesTransition = {
    type: "keyframes",
    duration: 0.8,
};
/**
 * Default easing curve is a slightly shallower version of
 * the default browser easing curve.
 */
const ease = {
    type: "keyframes",
    ease: [0.25, 0.1, 0.35, 1],
    duration: 0.3,
};
const getDefaultTransition = (valueKey, { keyframes }) => {
    if (keyframes.length > 2) {
        return keyframesTransition;
    }
    else if (_render_utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_0__.transformProps.has(valueKey)) {
        return valueKey.startsWith("scale")
            ? criticallyDampedSpring(keyframes[1])
            : underDampedSpring;
    }
    return ease;
};


//# sourceMappingURL=default-transitions.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/utils/get-value-transition.mjs"
/*!**********************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/utils/get-value-transition.mjs ***!
  \**********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getValueTransition: () => (/* binding */ getValueTransition)
/* harmony export */ });
/* harmony import */ var _resolve_transition_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./resolve-transition.mjs */ "./node_modules/motion-dom/dist/es/animation/utils/resolve-transition.mjs");


function getValueTransition(transition, key) {
    const valueTransition = transition?.[key] ??
        transition?.["default"] ??
        transition;
    if (valueTransition !== transition) {
        return (0,_resolve_transition_mjs__WEBPACK_IMPORTED_MODULE_0__.resolveTransition)(valueTransition, transition);
    }
    return valueTransition;
}


//# sourceMappingURL=get-value-transition.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/utils/is-animatable.mjs"
/*!***************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/utils/is-animatable.mjs ***!
  \***************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isAnimatable: () => (/* binding */ isAnimatable)
/* harmony export */ });
/* harmony import */ var _value_types_complex_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../value/types/complex/index.mjs */ "./node_modules/motion-dom/dist/es/value/types/complex/index.mjs");


/**
 * Check if a value is animatable. Examples:
 *
 * ✅: 100, "100px", "#fff"
 * ❌: "block", "url(2.jpg)"
 * @param value
 *
 * @internal
 */
const isAnimatable = (value, name) => {
    // If the list of keys that might be non-animatable grows, replace with Set
    if (name === "zIndex")
        return false;
    // If it's a number or a keyframes array, we can animate it. We might at some point
    // need to do a deep isAnimatable check of keyframes, or let Popmotion handle this,
    // but for now lets leave it like this for performance reasons
    if (typeof value === "number" || Array.isArray(value))
        return true;
    if (typeof value === "string" && // It's animatable if we have a string
        (_value_types_complex_index_mjs__WEBPACK_IMPORTED_MODULE_0__.complex.test(value) || value === "0") && // And it contains numbers and/or colors
        !value.startsWith("url(") // Unless it starts with "url("
    ) {
        return true;
    }
    return false;
};


//# sourceMappingURL=is-animatable.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/utils/is-css-variable.mjs"
/*!*****************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/utils/is-css-variable.mjs ***!
  \*****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   containsCSSVariable: () => (/* binding */ containsCSSVariable),
/* harmony export */   isCSSVariableName: () => (/* binding */ isCSSVariableName),
/* harmony export */   isCSSVariableToken: () => (/* binding */ isCSSVariableToken)
/* harmony export */ });
const checkStringStartsWith = (token) => (key) => typeof key === "string" && key.startsWith(token);
const isCSSVariableName = 
/*@__PURE__*/ checkStringStartsWith("--");
const startsAsVariableToken = 
/*@__PURE__*/ checkStringStartsWith("var(--");
const isCSSVariableToken = (value) => {
    const startsWithToken = startsAsVariableToken(value);
    if (!startsWithToken)
        return false;
    // Ensure any comments are stripped from the value as this can harm performance of the regex.
    return singleCssVariableRegex.test(value.split("/*")[0].trim());
};
const singleCssVariableRegex = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
/**
 * Check if a value contains a CSS variable anywhere (e.g. inside calc()).
 * Unlike isCSSVariableToken which checks if the value IS a var() token,
 * this checks if the value CONTAINS var() somewhere in the string.
 */
function containsCSSVariable(value) {
    if (typeof value !== "string")
        return false;
    // Strip comments to avoid false positives
    return value.split("/*")[0].includes("var(--");
}


//# sourceMappingURL=is-css-variable.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/utils/is-transition-defined.mjs"
/*!***********************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/utils/is-transition-defined.mjs ***!
  \***********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isTransitionDefined: () => (/* binding */ isTransitionDefined)
/* harmony export */ });
const orchestrationKeys = new Set([
    "when",
    "delay",
    "delayChildren",
    "staggerChildren",
    "staggerDirection",
    "repeat",
    "repeatType",
    "repeatDelay",
    "from",
    "elapsed",
]);
/**
 * Decide whether a transition is defined on a given Transition.
 * This filters out orchestration options and returns true
 * if any options are left.
 */
function isTransitionDefined(transition) {
    for (const key in transition) {
        if (!orchestrationKeys.has(key))
            return true;
    }
    return false;
}


//# sourceMappingURL=is-transition-defined.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/utils/make-animation-instant.mjs"
/*!************************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/utils/make-animation-instant.mjs ***!
  \************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   makeAnimationInstant: () => (/* binding */ makeAnimationInstant)
/* harmony export */ });
function makeAnimationInstant(options) {
    options.duration = 0;
    options.type = "keyframes";
}


//# sourceMappingURL=make-animation-instant.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/utils/replace-transition-type.mjs"
/*!*************************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/utils/replace-transition-type.mjs ***!
  \*************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   replaceTransitionType: () => (/* binding */ replaceTransitionType)
/* harmony export */ });
/* harmony import */ var _generators_inertia_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../generators/inertia.mjs */ "./node_modules/motion-dom/dist/es/animation/generators/inertia.mjs");
/* harmony import */ var _generators_keyframes_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../generators/keyframes.mjs */ "./node_modules/motion-dom/dist/es/animation/generators/keyframes.mjs");
/* harmony import */ var _generators_spring_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../generators/spring.mjs */ "./node_modules/motion-dom/dist/es/animation/generators/spring.mjs");




const transitionTypeMap = {
    decay: _generators_inertia_mjs__WEBPACK_IMPORTED_MODULE_0__.inertia,
    inertia: _generators_inertia_mjs__WEBPACK_IMPORTED_MODULE_0__.inertia,
    tween: _generators_keyframes_mjs__WEBPACK_IMPORTED_MODULE_1__.keyframes,
    keyframes: _generators_keyframes_mjs__WEBPACK_IMPORTED_MODULE_1__.keyframes,
    spring: _generators_spring_mjs__WEBPACK_IMPORTED_MODULE_2__.spring,
};
function replaceTransitionType(transition) {
    if (typeof transition.type === "string") {
        transition.type = transitionTypeMap[transition.type];
    }
}


//# sourceMappingURL=replace-transition-type.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/utils/resolve-transition.mjs"
/*!********************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/utils/resolve-transition.mjs ***!
  \********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveTransition: () => (/* binding */ resolveTransition)
/* harmony export */ });
/**
 * If `transition` has `inherit: true`, shallow-merge it with
 * `parentTransition` (child keys win) and strip the `inherit` key.
 * Otherwise return `transition` unchanged.
 */
function resolveTransition(transition, parentTransition) {
    if (transition?.inherit && parentTransition) {
        const { inherit: _, ...rest } = transition;
        return { ...parentTransition, ...rest };
    }
    return transition;
}


//# sourceMappingURL=resolve-transition.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/waapi/easing/cubic-bezier.mjs"
/*!*********************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/waapi/easing/cubic-bezier.mjs ***!
  \*********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cubicBezierAsString: () => (/* binding */ cubicBezierAsString)
/* harmony export */ });
const cubicBezierAsString = ([a, b, c, d]) => `cubic-bezier(${a}, ${b}, ${c}, ${d})`;


//# sourceMappingURL=cubic-bezier.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/waapi/easing/map-easing.mjs"
/*!*******************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/waapi/easing/map-easing.mjs ***!
  \*******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mapEasingToNativeEasing: () => (/* binding */ mapEasingToNativeEasing)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/easing/utils/is-bezier-definition.mjs");
/* harmony import */ var _utils_supports_linear_easing_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/supports/linear-easing.mjs */ "./node_modules/motion-dom/dist/es/utils/supports/linear-easing.mjs");
/* harmony import */ var _utils_linear_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/linear.mjs */ "./node_modules/motion-dom/dist/es/animation/waapi/utils/linear.mjs");
/* harmony import */ var _cubic_bezier_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cubic-bezier.mjs */ "./node_modules/motion-dom/dist/es/animation/waapi/easing/cubic-bezier.mjs");
/* harmony import */ var _supported_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./supported.mjs */ "./node_modules/motion-dom/dist/es/animation/waapi/easing/supported.mjs");






function mapEasingToNativeEasing(easing, duration) {
    if (!easing) {
        return undefined;
    }
    else if (typeof easing === "function") {
        return (0,_utils_supports_linear_easing_mjs__WEBPACK_IMPORTED_MODULE_1__.supportsLinearEasing)()
            ? (0,_utils_linear_mjs__WEBPACK_IMPORTED_MODULE_2__.generateLinearEasing)(easing, duration)
            : "ease-out";
    }
    else if ((0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.isBezierDefinition)(easing)) {
        return (0,_cubic_bezier_mjs__WEBPACK_IMPORTED_MODULE_3__.cubicBezierAsString)(easing);
    }
    else if (Array.isArray(easing)) {
        return easing.map((segmentEasing) => mapEasingToNativeEasing(segmentEasing, duration) ||
            _supported_mjs__WEBPACK_IMPORTED_MODULE_4__.supportedWaapiEasing.easeOut);
    }
    else {
        return _supported_mjs__WEBPACK_IMPORTED_MODULE_4__.supportedWaapiEasing[easing];
    }
}


//# sourceMappingURL=map-easing.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/waapi/easing/supported.mjs"
/*!******************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/waapi/easing/supported.mjs ***!
  \******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   supportedWaapiEasing: () => (/* binding */ supportedWaapiEasing)
/* harmony export */ });
/* harmony import */ var _cubic_bezier_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cubic-bezier.mjs */ "./node_modules/motion-dom/dist/es/animation/waapi/easing/cubic-bezier.mjs");


const supportedWaapiEasing = {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    circIn: /*@__PURE__*/ (0,_cubic_bezier_mjs__WEBPACK_IMPORTED_MODULE_0__.cubicBezierAsString)([0, 0.65, 0.55, 1]),
    circOut: /*@__PURE__*/ (0,_cubic_bezier_mjs__WEBPACK_IMPORTED_MODULE_0__.cubicBezierAsString)([0.55, 0, 1, 0.45]),
    backIn: /*@__PURE__*/ (0,_cubic_bezier_mjs__WEBPACK_IMPORTED_MODULE_0__.cubicBezierAsString)([0.31, 0.01, 0.66, -0.59]),
    backOut: /*@__PURE__*/ (0,_cubic_bezier_mjs__WEBPACK_IMPORTED_MODULE_0__.cubicBezierAsString)([0.33, 1.53, 0.69, 0.99]),
};


//# sourceMappingURL=supported.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/waapi/start-waapi-animation.mjs"
/*!***********************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/waapi/start-waapi-animation.mjs ***!
  \***********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   startWaapiAnimation: () => (/* binding */ startWaapiAnimation)
/* harmony export */ });
/* harmony import */ var _stats_animation_count_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stats/animation-count.mjs */ "./node_modules/motion-dom/dist/es/stats/animation-count.mjs");
/* harmony import */ var _stats_buffer_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../stats/buffer.mjs */ "./node_modules/motion-dom/dist/es/stats/buffer.mjs");
/* harmony import */ var _easing_map_easing_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./easing/map-easing.mjs */ "./node_modules/motion-dom/dist/es/animation/waapi/easing/map-easing.mjs");




function startWaapiAnimation(element, valueName, keyframes, { delay = 0, duration = 300, repeat = 0, repeatType = "loop", ease = "easeOut", times, } = {}, pseudoElement = undefined) {
    const keyframeOptions = {
        [valueName]: keyframes,
    };
    if (times)
        keyframeOptions.offset = times;
    const easing = (0,_easing_map_easing_mjs__WEBPACK_IMPORTED_MODULE_2__.mapEasingToNativeEasing)(ease, duration);
    /**
     * If this is an easing array, apply to keyframes, not animation as a whole
     */
    if (Array.isArray(easing))
        keyframeOptions.easing = easing;
    if (_stats_buffer_mjs__WEBPACK_IMPORTED_MODULE_1__.statsBuffer.value) {
        _stats_animation_count_mjs__WEBPACK_IMPORTED_MODULE_0__.activeAnimations.waapi++;
    }
    const options = {
        delay,
        duration,
        easing: !Array.isArray(easing) ? easing : "linear",
        fill: "both",
        iterations: repeat + 1,
        direction: repeatType === "reverse" ? "alternate" : "normal",
    };
    if (pseudoElement)
        options.pseudoElement = pseudoElement;
    const animation = element.animate(keyframeOptions, options);
    if (_stats_buffer_mjs__WEBPACK_IMPORTED_MODULE_1__.statsBuffer.value) {
        animation.finished.finally(() => {
            _stats_animation_count_mjs__WEBPACK_IMPORTED_MODULE_0__.activeAnimations.waapi--;
        });
    }
    return animation;
}


//# sourceMappingURL=start-waapi-animation.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/waapi/supports/waapi.mjs"
/*!****************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/waapi/supports/waapi.mjs ***!
  \****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   supportsBrowserAnimation: () => (/* binding */ supportsBrowserAnimation)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/memo.mjs");
/* harmony import */ var _utils_accelerated_values_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/accelerated-values.mjs */ "./node_modules/motion-dom/dist/es/animation/waapi/utils/accelerated-values.mjs");
/* harmony import */ var _utils_is_browser_color_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/is-browser-color.mjs */ "./node_modules/motion-dom/dist/es/animation/waapi/utils/is-browser-color.mjs");




const colorProperties = new Set([
    "color",
    "backgroundColor",
    "outlineColor",
    "fill",
    "stroke",
    "borderColor",
    "borderTopColor",
    "borderRightColor",
    "borderBottomColor",
    "borderLeftColor",
]);
const supportsWaapi = /*@__PURE__*/ (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.memo)(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function supportsBrowserAnimation(options) {
    const { motionValue, name, repeatDelay, repeatType, damping, type, keyframes, } = options;
    const subject = motionValue?.owner?.current;
    /**
     * We use this check instead of isHTMLElement() because we explicitly
     * **don't** want elements in different timing contexts (i.e. popups)
     * to be accelerated, as it's not possible to sync these animations
     * properly with those driven from the main window frameloop.
     */
    if (!(subject instanceof HTMLElement)) {
        return false;
    }
    const { onUpdate, transformTemplate } = motionValue.owner.getProps();
    return (supportsWaapi() &&
        name &&
        /**
         * Force WAAPI for color properties with browser-only color formats
         * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
         */
        (_utils_accelerated_values_mjs__WEBPACK_IMPORTED_MODULE_1__.acceleratedValues.has(name) ||
            (colorProperties.has(name) &&
                (0,_utils_is_browser_color_mjs__WEBPACK_IMPORTED_MODULE_2__.hasBrowserOnlyColors)(keyframes))) &&
        (name !== "transform" || !transformTemplate) &&
        /**
         * If we're outputting values to onUpdate then we can't use WAAPI as there's
         * no way to read the value from WAAPI every frame.
         */
        !onUpdate &&
        !repeatDelay &&
        repeatType !== "mirror" &&
        damping !== 0 &&
        type !== "inertia");
}


//# sourceMappingURL=waapi.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/waapi/utils/accelerated-values.mjs"
/*!**************************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/waapi/utils/accelerated-values.mjs ***!
  \**************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   acceleratedValues: () => (/* binding */ acceleratedValues)
/* harmony export */ });
/**
 * A list of values that can be hardware-accelerated.
 */
const acceleratedValues = new Set([
    "opacity",
    "clipPath",
    "filter",
    "transform",
    // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
    // or until we implement support for linear() easing.
    // "background-color"
]);


//# sourceMappingURL=accelerated-values.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/waapi/utils/apply-generator.mjs"
/*!***********************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/waapi/utils/apply-generator.mjs ***!
  \***********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyGeneratorOptions: () => (/* binding */ applyGeneratorOptions)
/* harmony export */ });
/* harmony import */ var _utils_supports_linear_easing_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/supports/linear-easing.mjs */ "./node_modules/motion-dom/dist/es/utils/supports/linear-easing.mjs");
/* harmony import */ var _generators_utils_is_generator_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../generators/utils/is-generator.mjs */ "./node_modules/motion-dom/dist/es/animation/generators/utils/is-generator.mjs");



function applyGeneratorOptions({ type, ...options }) {
    if ((0,_generators_utils_is_generator_mjs__WEBPACK_IMPORTED_MODULE_1__.isGenerator)(type) && (0,_utils_supports_linear_easing_mjs__WEBPACK_IMPORTED_MODULE_0__.supportsLinearEasing)()) {
        return type.applyToOptions(options);
    }
    else {
        options.duration ?? (options.duration = 300);
        options.ease ?? (options.ease = "easeOut");
    }
    return options;
}


//# sourceMappingURL=apply-generator.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/waapi/utils/is-browser-color.mjs"
/*!************************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/waapi/utils/is-browser-color.mjs ***!
  \************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hasBrowserOnlyColors: () => (/* binding */ hasBrowserOnlyColors)
/* harmony export */ });
const browserColorFunctions = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function hasBrowserOnlyColors(keyframes) {
    for (let i = 0; i < keyframes.length; i++) {
        if (typeof keyframes[i] === "string" &&
            browserColorFunctions.test(keyframes[i])) {
            return true;
        }
    }
    return false;
}


//# sourceMappingURL=is-browser-color.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/waapi/utils/linear.mjs"
/*!**************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/waapi/utils/linear.mjs ***!
  \**************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateLinearEasing: () => (/* binding */ generateLinearEasing)
/* harmony export */ });
const generateLinearEasing = (easing, duration, // as milliseconds
resolution = 10 // as milliseconds
) => {
    let points = "";
    const numPoints = Math.max(Math.round(duration / resolution), 2);
    for (let i = 0; i < numPoints; i++) {
        points += Math.round(easing(i / (numPoints - 1)) * 10000) / 10000 + ", ";
    }
    return `linear(${points.substring(0, points.length - 2)})`;
};


//# sourceMappingURL=linear.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/animation/waapi/utils/unsupported-easing.mjs"
/*!**************************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/waapi/utils/unsupported-easing.mjs ***!
  \**************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   replaceStringEasing: () => (/* binding */ replaceStringEasing)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/easing/anticipate.mjs");
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/easing/back.mjs");
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/easing/circ.mjs");


const unsupportedEasingFunctions = {
    anticipate: motion_utils__WEBPACK_IMPORTED_MODULE_0__.anticipate,
    backInOut: motion_utils__WEBPACK_IMPORTED_MODULE_1__.backInOut,
    circInOut: motion_utils__WEBPACK_IMPORTED_MODULE_2__.circInOut,
};
function isUnsupportedEase(key) {
    return key in unsupportedEasingFunctions;
}
function replaceStringEasing(transition) {
    if (typeof transition.ease === "string" &&
        isUnsupportedEase(transition.ease)) {
        transition.ease = unsupportedEasingFunctions[transition.ease];
    }
}


//# sourceMappingURL=unsupported-easing.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/frameloop/batcher.mjs"
/*!***************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/frameloop/batcher.mjs ***!
  \***************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createRenderBatcher: () => (/* binding */ createRenderBatcher)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/global-config.mjs");
/* harmony import */ var _order_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./order.mjs */ "./node_modules/motion-dom/dist/es/frameloop/order.mjs");
/* harmony import */ var _render_step_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render-step.mjs */ "./node_modules/motion-dom/dist/es/frameloop/render-step.mjs");




const maxElapsed = 40;
function createRenderBatcher(scheduleNextBatch, allowKeepAlive) {
    let runNextFrame = false;
    let useDefaultElapsed = true;
    const state = {
        delta: 0.0,
        timestamp: 0.0,
        isProcessing: false,
    };
    const flagRunNextFrame = () => (runNextFrame = true);
    const steps = _order_mjs__WEBPACK_IMPORTED_MODULE_1__.stepsOrder.reduce((acc, key) => {
        acc[key] = (0,_render_step_mjs__WEBPACK_IMPORTED_MODULE_2__.createRenderStep)(flagRunNextFrame, allowKeepAlive ? key : undefined);
        return acc;
    }, {});
    const { setup, read, resolveKeyframes, preUpdate, update, preRender, render, postRender, } = steps;
    const processBatch = () => {
        const useManualTiming = motion_utils__WEBPACK_IMPORTED_MODULE_0__.MotionGlobalConfig.useManualTiming;
        const timestamp = useManualTiming
            ? state.timestamp
            : performance.now();
        runNextFrame = false;
        if (!useManualTiming) {
            state.delta = useDefaultElapsed
                ? 1000 / 60
                : Math.max(Math.min(timestamp - state.timestamp, maxElapsed), 1);
        }
        state.timestamp = timestamp;
        state.isProcessing = true;
        // Unrolled render loop for better per-frame performance
        setup.process(state);
        read.process(state);
        resolveKeyframes.process(state);
        preUpdate.process(state);
        update.process(state);
        preRender.process(state);
        render.process(state);
        postRender.process(state);
        state.isProcessing = false;
        if (runNextFrame && allowKeepAlive) {
            useDefaultElapsed = false;
            scheduleNextBatch(processBatch);
        }
    };
    const wake = () => {
        runNextFrame = true;
        useDefaultElapsed = true;
        if (!state.isProcessing) {
            scheduleNextBatch(processBatch);
        }
    };
    const schedule = _order_mjs__WEBPACK_IMPORTED_MODULE_1__.stepsOrder.reduce((acc, key) => {
        const step = steps[key];
        acc[key] = (process, keepAlive = false, immediate = false) => {
            if (!runNextFrame)
                wake();
            return step.schedule(process, keepAlive, immediate);
        };
        return acc;
    }, {});
    const cancel = (process) => {
        for (let i = 0; i < _order_mjs__WEBPACK_IMPORTED_MODULE_1__.stepsOrder.length; i++) {
            steps[_order_mjs__WEBPACK_IMPORTED_MODULE_1__.stepsOrder[i]].cancel(process);
        }
    };
    return { schedule, cancel, state, steps };
}


//# sourceMappingURL=batcher.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/frameloop/frame.mjs"
/*!*************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/frameloop/frame.mjs ***!
  \*************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cancelFrame: () => (/* binding */ cancelFrame),
/* harmony export */   frame: () => (/* binding */ frame),
/* harmony export */   frameData: () => (/* binding */ frameData),
/* harmony export */   frameSteps: () => (/* binding */ frameSteps)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/noop.mjs");
/* harmony import */ var _batcher_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./batcher.mjs */ "./node_modules/motion-dom/dist/es/frameloop/batcher.mjs");



const { schedule: frame, cancel: cancelFrame, state: frameData, steps: frameSteps, } = /* @__PURE__ */ (0,_batcher_mjs__WEBPACK_IMPORTED_MODULE_1__.createRenderBatcher)(typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : motion_utils__WEBPACK_IMPORTED_MODULE_0__.noop, true);


//# sourceMappingURL=frame.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/frameloop/microtask.mjs"
/*!*****************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/frameloop/microtask.mjs ***!
  \*****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cancelMicrotask: () => (/* binding */ cancelMicrotask),
/* harmony export */   microtask: () => (/* binding */ microtask)
/* harmony export */ });
/* harmony import */ var _batcher_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./batcher.mjs */ "./node_modules/motion-dom/dist/es/frameloop/batcher.mjs");


const { schedule: microtask, cancel: cancelMicrotask } = 
/* @__PURE__ */ (0,_batcher_mjs__WEBPACK_IMPORTED_MODULE_0__.createRenderBatcher)(queueMicrotask, false);


//# sourceMappingURL=microtask.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/frameloop/order.mjs"
/*!*************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/frameloop/order.mjs ***!
  \*************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   stepsOrder: () => (/* binding */ stepsOrder)
/* harmony export */ });
const stepsOrder = [
    "setup", // Compute
    "read", // Read
    "resolveKeyframes", // Write/Read/Write/Read
    "preUpdate", // Compute
    "update", // Compute
    "preRender", // Compute
    "render", // Write
    "postRender", // Compute
];


//# sourceMappingURL=order.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/frameloop/render-step.mjs"
/*!*******************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/frameloop/render-step.mjs ***!
  \*******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createRenderStep: () => (/* binding */ createRenderStep)
/* harmony export */ });
/* harmony import */ var _stats_buffer_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../stats/buffer.mjs */ "./node_modules/motion-dom/dist/es/stats/buffer.mjs");


function createRenderStep(runNextFrame, stepName) {
    /**
     * We create and reuse two queues, one to queue jobs for the current frame
     * and one for the next. We reuse to avoid triggering GC after x frames.
     */
    let thisFrame = new Set();
    let nextFrame = new Set();
    /**
     * Track whether we're currently processing jobs in this step. This way
     * we can decide whether to schedule new jobs for this frame or next.
     */
    let isProcessing = false;
    let flushNextFrame = false;
    /**
     * A set of processes which were marked keepAlive when scheduled.
     */
    const toKeepAlive = new WeakSet();
    let latestFrameData = {
        delta: 0.0,
        timestamp: 0.0,
        isProcessing: false,
    };
    let numCalls = 0;
    function triggerCallback(callback) {
        if (toKeepAlive.has(callback)) {
            step.schedule(callback);
            runNextFrame();
        }
        numCalls++;
        callback(latestFrameData);
    }
    const step = {
        /**
         * Schedule a process to run on the next frame.
         */
        schedule: (callback, keepAlive = false, immediate = false) => {
            const addToCurrentFrame = immediate && isProcessing;
            const queue = addToCurrentFrame ? thisFrame : nextFrame;
            if (keepAlive)
                toKeepAlive.add(callback);
            queue.add(callback);
            return callback;
        },
        /**
         * Cancel the provided callback from running on the next frame.
         */
        cancel: (callback) => {
            nextFrame.delete(callback);
            toKeepAlive.delete(callback);
        },
        /**
         * Execute all schedule callbacks.
         */
        process: (frameData) => {
            latestFrameData = frameData;
            /**
             * If we're already processing we've probably been triggered by a flushSync
             * inside an existing process. Instead of executing, mark flushNextFrame
             * as true and ensure we flush the following frame at the end of this one.
             */
            if (isProcessing) {
                flushNextFrame = true;
                return;
            }
            isProcessing = true;
            // Swap this frame and the next to avoid GC
            const prevFrame = thisFrame;
            thisFrame = nextFrame;
            nextFrame = prevFrame;
            // Execute this frame
            thisFrame.forEach(triggerCallback);
            /**
             * If we're recording stats then
             */
            if (stepName && _stats_buffer_mjs__WEBPACK_IMPORTED_MODULE_0__.statsBuffer.value) {
                _stats_buffer_mjs__WEBPACK_IMPORTED_MODULE_0__.statsBuffer.value.frameloop[stepName].push(numCalls);
            }
            numCalls = 0;
            // Clear the frame so no callbacks remain. This is to avoid
            // memory leaks should this render step not run for a while.
            thisFrame.clear();
            isProcessing = false;
            if (flushNextFrame) {
                flushNextFrame = false;
                step.process(frameData);
            }
        },
    };
    return step;
}


//# sourceMappingURL=render-step.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/frameloop/sync-time.mjs"
/*!*****************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/frameloop/sync-time.mjs ***!
  \*****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   time: () => (/* binding */ time)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/global-config.mjs");
/* harmony import */ var _frame_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./frame.mjs */ "./node_modules/motion-dom/dist/es/frameloop/frame.mjs");



let now;
function clearTime() {
    now = undefined;
}
/**
 * An eventloop-synchronous alternative to performance.now().
 *
 * Ensures that time measurements remain consistent within a synchronous context.
 * Usually calling performance.now() twice within the same synchronous context
 * will return different values which isn't useful for animations when we're usually
 * trying to sync animations to the same frame.
 */
const time = {
    now: () => {
        if (now === undefined) {
            time.set(_frame_mjs__WEBPACK_IMPORTED_MODULE_1__.frameData.isProcessing || motion_utils__WEBPACK_IMPORTED_MODULE_0__.MotionGlobalConfig.useManualTiming
                ? _frame_mjs__WEBPACK_IMPORTED_MODULE_1__.frameData.timestamp
                : performance.now());
        }
        return now;
    },
    set: (newTime) => {
        now = newTime;
        queueMicrotask(clearTime);
    },
};


//# sourceMappingURL=sync-time.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/projection/geometry/conversion.mjs"
/*!****************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/projection/geometry/conversion.mjs ***!
  \****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   convertBoundingBoxToBox: () => (/* binding */ convertBoundingBoxToBox),
/* harmony export */   convertBoxToBoundingBox: () => (/* binding */ convertBoxToBoundingBox),
/* harmony export */   transformBoxPoints: () => (/* binding */ transformBoxPoints)
/* harmony export */ });
/**
 * Bounding boxes tend to be defined as top, left, right, bottom. For various operations
 * it's easier to consider each axis individually. This function returns a bounding box
 * as a map of single-axis min/max values.
 */
function convertBoundingBoxToBox({ top, left, right, bottom, }) {
    return {
        x: { min: left, max: right },
        y: { min: top, max: bottom },
    };
}
function convertBoxToBoundingBox({ x, y }) {
    return { top: y.min, right: x.max, bottom: y.max, left: x.min };
}
/**
 * Applies a TransformPoint function to a bounding box. TransformPoint is usually a function
 * provided by Framer to allow measured points to be corrected for device scaling. This is used
 * when measuring DOM elements and DOM event points.
 */
function transformBoxPoints(point, transformPoint) {
    if (!transformPoint)
        return point;
    const topLeft = transformPoint({ x: point.left, y: point.top });
    const bottomRight = transformPoint({ x: point.right, y: point.bottom });
    return {
        top: topLeft.y,
        left: topLeft.x,
        bottom: bottomRight.y,
        right: bottomRight.x,
    };
}


//# sourceMappingURL=conversion.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/projection/geometry/delta-apply.mjs"
/*!*****************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/projection/geometry/delta-apply.mjs ***!
  \*****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyAxisDelta: () => (/* binding */ applyAxisDelta),
/* harmony export */   applyBoxDelta: () => (/* binding */ applyBoxDelta),
/* harmony export */   applyPointDelta: () => (/* binding */ applyPointDelta),
/* harmony export */   applyTreeDeltas: () => (/* binding */ applyTreeDeltas),
/* harmony export */   scalePoint: () => (/* binding */ scalePoint),
/* harmony export */   transformAxis: () => (/* binding */ transformAxis),
/* harmony export */   transformBox: () => (/* binding */ transformBox),
/* harmony export */   translateAxis: () => (/* binding */ translateAxis)
/* harmony export */ });
/* harmony import */ var _utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/mix/number.mjs */ "./node_modules/motion-dom/dist/es/utils/mix/number.mjs");
/* harmony import */ var _utils_has_transform_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/has-transform.mjs */ "./node_modules/motion-dom/dist/es/projection/utils/has-transform.mjs");



/**
 * Scales a point based on a factor and an originPoint
 */
function scalePoint(point, scale, originPoint) {
    const distanceFromOrigin = point - originPoint;
    const scaled = scale * distanceFromOrigin;
    return originPoint + scaled;
}
/**
 * Applies a translate/scale delta to a point
 */
function applyPointDelta(point, translate, scale, originPoint, boxScale) {
    if (boxScale !== undefined) {
        point = scalePoint(point, boxScale, originPoint);
    }
    return scalePoint(point, scale, originPoint) + translate;
}
/**
 * Applies a translate/scale delta to an axis
 */
function applyAxisDelta(axis, translate = 0, scale = 1, originPoint, boxScale) {
    axis.min = applyPointDelta(axis.min, translate, scale, originPoint, boxScale);
    axis.max = applyPointDelta(axis.max, translate, scale, originPoint, boxScale);
}
/**
 * Applies a translate/scale delta to a box
 */
function applyBoxDelta(box, { x, y }) {
    applyAxisDelta(box.x, x.translate, x.scale, x.originPoint);
    applyAxisDelta(box.y, y.translate, y.scale, y.originPoint);
}
const TREE_SCALE_SNAP_MIN = 0.999999999999;
const TREE_SCALE_SNAP_MAX = 1.0000000000001;
/**
 * Apply a tree of deltas to a box. We do this to calculate the effect of all the transforms
 * in a tree upon our box before then calculating how to project it into our desired viewport-relative box
 *
 * This is the final nested loop within updateLayoutDelta for future refactoring
 */
function applyTreeDeltas(box, treeScale, treePath, isSharedTransition = false) {
    const treeLength = treePath.length;
    if (!treeLength)
        return;
    // Reset the treeScale
    treeScale.x = treeScale.y = 1;
    let node;
    let delta;
    for (let i = 0; i < treeLength; i++) {
        node = treePath[i];
        delta = node.projectionDelta;
        /**
         * TODO: Prefer to remove this, but currently we have motion components with
         * display: contents in Framer.
         */
        const { visualElement } = node.options;
        if (visualElement &&
            visualElement.props.style &&
            visualElement.props.style.display === "contents") {
            continue;
        }
        if (isSharedTransition &&
            node.options.layoutScroll &&
            node.scroll &&
            node !== node.root) {
            translateAxis(box.x, -node.scroll.offset.x);
            translateAxis(box.y, -node.scroll.offset.y);
        }
        if (delta) {
            // Incoporate each ancestor's scale into a cumulative treeScale for this component
            treeScale.x *= delta.x.scale;
            treeScale.y *= delta.y.scale;
            // Apply each ancestor's calculated delta into this component's recorded layout box
            applyBoxDelta(box, delta);
        }
        if (isSharedTransition && (0,_utils_has_transform_mjs__WEBPACK_IMPORTED_MODULE_1__.hasTransform)(node.latestValues)) {
            transformBox(box, node.latestValues, node.layout?.layoutBox);
        }
    }
    /**
     * Snap tree scale back to 1 if it's within a non-perceivable threshold.
     * This will help reduce useless scales getting rendered.
     */
    if (treeScale.x < TREE_SCALE_SNAP_MAX &&
        treeScale.x > TREE_SCALE_SNAP_MIN) {
        treeScale.x = 1.0;
    }
    if (treeScale.y < TREE_SCALE_SNAP_MAX &&
        treeScale.y > TREE_SCALE_SNAP_MIN) {
        treeScale.y = 1.0;
    }
}
function translateAxis(axis, distance) {
    axis.min += distance;
    axis.max += distance;
}
/**
 * Apply a transform to an axis from the latest resolved motion values.
 * This function basically acts as a bridge between a flat motion value map
 * and applyAxisDelta
 */
function transformAxis(axis, axisTranslate, axisScale, boxScale, axisOrigin = 0.5) {
    const originPoint = (0,_utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_0__.mixNumber)(axis.min, axis.max, axisOrigin);
    // Apply the axis delta to the final axis
    applyAxisDelta(axis, axisTranslate, axisScale, originPoint, boxScale);
}
function resolveAxisTranslate(value, axis) {
    if (typeof value === "string") {
        return (parseFloat(value) / 100) * (axis.max - axis.min);
    }
    return value;
}
/**
 * Apply a transform to a box from the latest resolved motion values.
 */
function transformBox(box, transform, sourceBox) {
    const resolveBox = sourceBox ?? box;
    transformAxis(box.x, resolveAxisTranslate(transform.x, resolveBox.x), transform.scaleX, transform.scale, transform.originX);
    transformAxis(box.y, resolveAxisTranslate(transform.y, resolveBox.y), transform.scaleY, transform.scale, transform.originY);
}


//# sourceMappingURL=delta-apply.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/projection/geometry/models.mjs"
/*!************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/projection/geometry/models.mjs ***!
  \************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createAxis: () => (/* binding */ createAxis),
/* harmony export */   createAxisDelta: () => (/* binding */ createAxisDelta),
/* harmony export */   createBox: () => (/* binding */ createBox),
/* harmony export */   createDelta: () => (/* binding */ createDelta)
/* harmony export */ });
const createAxisDelta = () => ({
    translate: 0,
    scale: 1,
    origin: 0,
    originPoint: 0,
});
const createDelta = () => ({
    x: createAxisDelta(),
    y: createAxisDelta(),
});
const createAxis = () => ({ min: 0, max: 0 });
const createBox = () => ({
    x: createAxis(),
    y: createAxis(),
});


//# sourceMappingURL=models.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/projection/styles/scale-border-radius.mjs"
/*!***********************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/projection/styles/scale-border-radius.mjs ***!
  \***********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   correctBorderRadius: () => (/* binding */ correctBorderRadius),
/* harmony export */   pixelsToPercent: () => (/* binding */ pixelsToPercent)
/* harmony export */ });
/* harmony import */ var _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../value/types/numbers/units.mjs */ "./node_modules/motion-dom/dist/es/value/types/numbers/units.mjs");


function pixelsToPercent(pixels, axis) {
    if (axis.max === axis.min)
        return 0;
    return (pixels / (axis.max - axis.min)) * 100;
}
/**
 * We always correct borderRadius as a percentage rather than pixels to reduce paints.
 * For example, if you are projecting a box that is 100px wide with a 10px borderRadius
 * into a box that is 200px wide with a 20px borderRadius, that is actually a 10%
 * borderRadius in both states. If we animate between the two in pixels that will trigger
 * a paint each time. If we animate between the two in percentage we'll avoid a paint.
 */
const correctBorderRadius = {
    correct: (latest, node) => {
        if (!node.target)
            return latest;
        /**
         * If latest is a string, if it's a percentage we can return immediately as it's
         * going to be stretched appropriately. Otherwise, if it's a pixel, convert it to a number.
         */
        if (typeof latest === "string") {
            if (_value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px.test(latest)) {
                latest = parseFloat(latest);
            }
            else {
                return latest;
            }
        }
        /**
         * If latest is a number, it's a pixel value. We use the current viewportBox to calculate that
         * pixel value as a percentage of each axis
         */
        const x = pixelsToPercent(latest, node.target.x);
        const y = pixelsToPercent(latest, node.target.y);
        return `${x}% ${y}%`;
    },
};


//# sourceMappingURL=scale-border-radius.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/projection/styles/scale-box-shadow.mjs"
/*!********************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/projection/styles/scale-box-shadow.mjs ***!
  \********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   correctBoxShadow: () => (/* binding */ correctBoxShadow)
/* harmony export */ });
/* harmony import */ var _value_types_complex_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../value/types/complex/index.mjs */ "./node_modules/motion-dom/dist/es/value/types/complex/index.mjs");
/* harmony import */ var _utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/mix/number.mjs */ "./node_modules/motion-dom/dist/es/utils/mix/number.mjs");



const correctBoxShadow = {
    correct: (latest, { treeScale, projectionDelta }) => {
        const original = latest;
        const shadow = _value_types_complex_index_mjs__WEBPACK_IMPORTED_MODULE_0__.complex.parse(latest);
        // TODO: Doesn't support multiple shadows
        if (shadow.length > 5)
            return original;
        const template = _value_types_complex_index_mjs__WEBPACK_IMPORTED_MODULE_0__.complex.createTransformer(latest);
        const offset = typeof shadow[0] !== "number" ? 1 : 0;
        // Calculate the overall context scale
        const xScale = projectionDelta.x.scale * treeScale.x;
        const yScale = projectionDelta.y.scale * treeScale.y;
        shadow[0 + offset] /= xScale;
        shadow[1 + offset] /= yScale;
        /**
         * Ideally we'd correct x and y scales individually, but because blur and
         * spread apply to both we have to take a scale average and apply that instead.
         * We could potentially improve the outcome of this by incorporating the ratio between
         * the two scales.
         */
        const averageScale = (0,_utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_1__.mixNumber)(xScale, yScale, 0.5);
        // Blur
        if (typeof shadow[2 + offset] === "number")
            shadow[2 + offset] /= averageScale;
        // Spread
        if (typeof shadow[3 + offset] === "number")
            shadow[3 + offset] /= averageScale;
        return template(shadow);
    },
};


//# sourceMappingURL=scale-box-shadow.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/projection/styles/scale-correction.mjs"
/*!********************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/projection/styles/scale-correction.mjs ***!
  \********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addScaleCorrector: () => (/* binding */ addScaleCorrector),
/* harmony export */   scaleCorrectors: () => (/* binding */ scaleCorrectors)
/* harmony export */ });
/* harmony import */ var _animation_utils_is_css_variable_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../animation/utils/is-css-variable.mjs */ "./node_modules/motion-dom/dist/es/animation/utils/is-css-variable.mjs");
/* harmony import */ var _scale_border_radius_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scale-border-radius.mjs */ "./node_modules/motion-dom/dist/es/projection/styles/scale-border-radius.mjs");
/* harmony import */ var _scale_box_shadow_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scale-box-shadow.mjs */ "./node_modules/motion-dom/dist/es/projection/styles/scale-box-shadow.mjs");




const scaleCorrectors = {
    borderRadius: {
        ..._scale_border_radius_mjs__WEBPACK_IMPORTED_MODULE_1__.correctBorderRadius,
        applyTo: [
            "borderTopLeftRadius",
            "borderTopRightRadius",
            "borderBottomLeftRadius",
            "borderBottomRightRadius",
        ],
    },
    borderTopLeftRadius: _scale_border_radius_mjs__WEBPACK_IMPORTED_MODULE_1__.correctBorderRadius,
    borderTopRightRadius: _scale_border_radius_mjs__WEBPACK_IMPORTED_MODULE_1__.correctBorderRadius,
    borderBottomLeftRadius: _scale_border_radius_mjs__WEBPACK_IMPORTED_MODULE_1__.correctBorderRadius,
    borderBottomRightRadius: _scale_border_radius_mjs__WEBPACK_IMPORTED_MODULE_1__.correctBorderRadius,
    boxShadow: _scale_box_shadow_mjs__WEBPACK_IMPORTED_MODULE_2__.correctBoxShadow,
};
function addScaleCorrector(correctors) {
    for (const key in correctors) {
        scaleCorrectors[key] = correctors[key];
        if ((0,_animation_utils_is_css_variable_mjs__WEBPACK_IMPORTED_MODULE_0__.isCSSVariableName)(key)) {
            scaleCorrectors[key].isCSSVariable = true;
        }
    }
}


//# sourceMappingURL=scale-correction.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/projection/utils/has-transform.mjs"
/*!****************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/projection/utils/has-transform.mjs ***!
  \****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   has2DTranslate: () => (/* binding */ has2DTranslate),
/* harmony export */   hasScale: () => (/* binding */ hasScale),
/* harmony export */   hasTransform: () => (/* binding */ hasTransform)
/* harmony export */ });
function isIdentityScale(scale) {
    return scale === undefined || scale === 1;
}
function hasScale({ scale, scaleX, scaleY }) {
    return (!isIdentityScale(scale) ||
        !isIdentityScale(scaleX) ||
        !isIdentityScale(scaleY));
}
function hasTransform(values) {
    return (hasScale(values) ||
        has2DTranslate(values) ||
        values.z ||
        values.rotate ||
        values.rotateX ||
        values.rotateY ||
        values.skewX ||
        values.skewY);
}
function has2DTranslate(values) {
    return is2DTranslate(values.x) || is2DTranslate(values.y);
}
function is2DTranslate(value) {
    return value && value !== "0%";
}


//# sourceMappingURL=has-transform.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/projection/utils/measure.mjs"
/*!**********************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/projection/utils/measure.mjs ***!
  \**********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   measurePageBox: () => (/* binding */ measurePageBox),
/* harmony export */   measureViewportBox: () => (/* binding */ measureViewportBox)
/* harmony export */ });
/* harmony import */ var _geometry_conversion_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../geometry/conversion.mjs */ "./node_modules/motion-dom/dist/es/projection/geometry/conversion.mjs");
/* harmony import */ var _geometry_delta_apply_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../geometry/delta-apply.mjs */ "./node_modules/motion-dom/dist/es/projection/geometry/delta-apply.mjs");



function measureViewportBox(instance, transformPoint) {
    return (0,_geometry_conversion_mjs__WEBPACK_IMPORTED_MODULE_0__.convertBoundingBoxToBox)((0,_geometry_conversion_mjs__WEBPACK_IMPORTED_MODULE_0__.transformBoxPoints)(instance.getBoundingClientRect(), transformPoint));
}
function measurePageBox(element, rootProjectionNode, transformPagePoint) {
    const viewportBox = measureViewportBox(element, transformPagePoint);
    const { scroll } = rootProjectionNode;
    if (scroll) {
        (0,_geometry_delta_apply_mjs__WEBPACK_IMPORTED_MODULE_1__.translateAxis)(viewportBox.x, scroll.offset.x);
        (0,_geometry_delta_apply_mjs__WEBPACK_IMPORTED_MODULE_1__.translateAxis)(viewportBox.y, scroll.offset.y);
    }
    return viewportBox;
}


//# sourceMappingURL=measure.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/render/VisualElement.mjs"
/*!******************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/render/VisualElement.mjs ***!
  \******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VisualElement: () => (/* binding */ VisualElement),
/* harmony export */   getFeatureDefinitions: () => (/* binding */ getFeatureDefinitions),
/* harmony export */   setFeatureDefinitions: () => (/* binding */ setFeatureDefinitions)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/is-numerical-string.mjs");
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/is-zero-value-string.mjs");
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/subscription-manager.mjs");
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/time-conversion.mjs");
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/warn-once.mjs");
/* harmony import */ var _animation_keyframes_KeyframesResolver_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../animation/keyframes/KeyframesResolver.mjs */ "./node_modules/motion-dom/dist/es/animation/keyframes/KeyframesResolver.mjs");
/* harmony import */ var _animation_NativeAnimation_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../animation/NativeAnimation.mjs */ "./node_modules/motion-dom/dist/es/animation/NativeAnimation.mjs");
/* harmony import */ var _animation_waapi_utils_accelerated_values_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../animation/waapi/utils/accelerated-values.mjs */ "./node_modules/motion-dom/dist/es/animation/waapi/utils/accelerated-values.mjs");
/* harmony import */ var _frameloop_microtask_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../frameloop/microtask.mjs */ "./node_modules/motion-dom/dist/es/frameloop/microtask.mjs");
/* harmony import */ var _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../frameloop/sync-time.mjs */ "./node_modules/motion-dom/dist/es/frameloop/sync-time.mjs");
/* harmony import */ var _projection_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../projection/geometry/models.mjs */ "./node_modules/motion-dom/dist/es/projection/geometry/models.mjs");
/* harmony import */ var _value_index_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../value/index.mjs */ "./node_modules/motion-dom/dist/es/value/index.mjs");
/* harmony import */ var _value_types_complex_index_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../value/types/complex/index.mjs */ "./node_modules/motion-dom/dist/es/value/types/complex/index.mjs");
/* harmony import */ var _value_types_utils_animatable_none_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../value/types/utils/animatable-none.mjs */ "./node_modules/motion-dom/dist/es/value/types/utils/animatable-none.mjs");
/* harmony import */ var _value_types_utils_find_mjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../value/types/utils/find.mjs */ "./node_modules/motion-dom/dist/es/value/types/utils/find.mjs");
/* harmony import */ var _value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../value/utils/is-motion-value.mjs */ "./node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs");
/* harmony import */ var _store_mjs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./store.mjs */ "./node_modules/motion-dom/dist/es/render/store.mjs");
/* harmony import */ var _utils_is_controlling_variants_mjs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./utils/is-controlling-variants.mjs */ "./node_modules/motion-dom/dist/es/render/utils/is-controlling-variants.mjs");
/* harmony import */ var _utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./utils/keys-transform.mjs */ "./node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs");
/* harmony import */ var _utils_motion_values_mjs__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./utils/motion-values.mjs */ "./node_modules/motion-dom/dist/es/render/utils/motion-values.mjs");
/* harmony import */ var _utils_reduced_motion_index_mjs__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./utils/reduced-motion/index.mjs */ "./node_modules/motion-dom/dist/es/render/utils/reduced-motion/index.mjs");
/* harmony import */ var _utils_resolve_variants_mjs__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./utils/resolve-variants.mjs */ "./node_modules/motion-dom/dist/es/render/utils/resolve-variants.mjs");
/* harmony import */ var _utils_reduced_motion_state_mjs__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./utils/reduced-motion/state.mjs */ "./node_modules/motion-dom/dist/es/render/utils/reduced-motion/state.mjs");
/* harmony import */ var _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../frameloop/frame.mjs */ "./node_modules/motion-dom/dist/es/frameloop/frame.mjs");





















const propEventHandlers = [
    "AnimationStart",
    "AnimationComplete",
    "Update",
    "BeforeLayoutMeasure",
    "LayoutMeasure",
    "LayoutAnimationStart",
    "LayoutAnimationComplete",
];
/**
 * Static feature definitions - can be injected by framework layer
 */
let featureDefinitions = {};
/**
 * Set feature definitions for all VisualElements.
 * This should be called by the framework layer (e.g., framer-motion) during initialization.
 */
function setFeatureDefinitions(definitions) {
    featureDefinitions = definitions;
}
/**
 * Get the current feature definitions
 */
function getFeatureDefinitions() {
    return featureDefinitions;
}
/**
 * A VisualElement is an imperative abstraction around UI elements such as
 * HTMLElement, SVGElement, Three.Object3D etc.
 */
class VisualElement {
    /**
     * This method takes React props and returns found MotionValues. For example, HTML
     * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
     *
     * This isn't an abstract method as it needs calling in the constructor, but it is
     * intended to be one.
     */
    scrapeMotionValuesFromProps(_props, _prevProps, _visualElement) {
        return {};
    }
    constructor({ parent, props, presenceContext, reducedMotionConfig, skipAnimations, blockInitialAnimation, visualState, }, options = {}) {
        /**
         * A reference to the current underlying Instance, e.g. a HTMLElement
         * or Three.Mesh etc.
         */
        this.current = null;
        /**
         * A set containing references to this VisualElement's children.
         */
        this.children = new Set();
        /**
         * Determine what role this visual element should take in the variant tree.
         */
        this.isVariantNode = false;
        this.isControllingVariants = false;
        /**
         * Decides whether this VisualElement should animate in reduced motion
         * mode.
         *
         * TODO: This is currently set on every individual VisualElement but feels
         * like it could be set globally.
         */
        this.shouldReduceMotion = null;
        /**
         * Decides whether animations should be skipped for this VisualElement.
         * Useful for E2E tests and visual regression testing.
         */
        this.shouldSkipAnimations = false;
        /**
         * A map of all motion values attached to this visual element. Motion
         * values are source of truth for any given animated value. A motion
         * value might be provided externally by the component via props.
         */
        this.values = new Map();
        this.KeyframeResolver = _animation_keyframes_KeyframesResolver_mjs__WEBPACK_IMPORTED_MODULE_5__.KeyframeResolver;
        /**
         * Cleanup functions for active features (hover/tap/exit etc)
         */
        this.features = {};
        /**
         * A map of every subscription that binds the provided or generated
         * motion values onChange listeners to this visual element.
         */
        this.valueSubscriptions = new Map();
        /**
         * A reference to the previously-provided motion values as returned
         * from scrapeMotionValuesFromProps. We use the keys in here to determine
         * if any motion values need to be removed after props are updated.
         */
        this.prevMotionValues = {};
        /**
         * Track whether this element has been mounted before, to detect
         * remounts after Suspense unmount/remount cycles.
         */
        this.hasBeenMounted = false;
        /**
         * An object containing a SubscriptionManager for each active event.
         */
        this.events = {};
        /**
         * An object containing an unsubscribe function for each prop event subscription.
         * For example, every "Update" event can have multiple subscribers via
         * VisualElement.on(), but only one of those can be defined via the onUpdate prop.
         */
        this.propEventSubscriptions = {};
        this.notifyUpdate = () => this.notify("Update", this.latestValues);
        this.render = () => {
            if (!this.current)
                return;
            this.triggerBuild();
            this.renderInstance(this.current, this.renderState, this.props.style, this.projection);
        };
        this.renderScheduledAt = 0.0;
        this.scheduleRender = () => {
            const now = _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_9__.time.now();
            if (this.renderScheduledAt < now) {
                this.renderScheduledAt = now;
                _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_23__.frame.render(this.render, false, true);
            }
        };
        const { latestValues, renderState } = visualState;
        this.latestValues = latestValues;
        this.baseTarget = { ...latestValues };
        this.initialValues = props.initial ? { ...latestValues } : {};
        this.renderState = renderState;
        this.parent = parent;
        this.props = props;
        this.presenceContext = presenceContext;
        this.depth = parent ? parent.depth + 1 : 0;
        this.reducedMotionConfig = reducedMotionConfig;
        this.skipAnimationsConfig = skipAnimations;
        this.options = options;
        this.blockInitialAnimation = Boolean(blockInitialAnimation);
        this.isControllingVariants = (0,_utils_is_controlling_variants_mjs__WEBPACK_IMPORTED_MODULE_17__.isControllingVariants)(props);
        this.isVariantNode = (0,_utils_is_controlling_variants_mjs__WEBPACK_IMPORTED_MODULE_17__.isVariantNode)(props);
        if (this.isVariantNode) {
            this.variantChildren = new Set();
        }
        this.manuallyAnimateOnMount = Boolean(parent && parent.current);
        /**
         * Any motion values that are provided to the element when created
         * aren't yet bound to the element, as this would technically be impure.
         * However, we iterate through the motion values and set them to the
         * initial values for this component.
         *
         * TODO: This is impure and we should look at changing this to run on mount.
         * Doing so will break some tests but this isn't necessarily a breaking change,
         * more a reflection of the test.
         */
        const { willChange, ...initialMotionValues } = this.scrapeMotionValuesFromProps(props, {}, this);
        for (const key in initialMotionValues) {
            const value = initialMotionValues[key];
            if (latestValues[key] !== undefined && (0,_value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_15__.isMotionValue)(value)) {
                value.set(latestValues[key]);
            }
        }
    }
    mount(instance) {
        /**
         * If this element has been mounted before (e.g. after a Suspense
         * unmount/remount), reset motion values to their initial state
         * so animations replay correctly from initial → animate.
         */
        if (this.hasBeenMounted) {
            for (const key in this.initialValues) {
                this.values.get(key)?.jump(this.initialValues[key]);
                this.latestValues[key] = this.initialValues[key];
            }
        }
        this.current = instance;
        _store_mjs__WEBPACK_IMPORTED_MODULE_16__.visualElementStore.set(instance, this);
        if (this.projection && !this.projection.instance) {
            this.projection.mount(instance);
        }
        if (this.parent && this.isVariantNode && !this.isControllingVariants) {
            this.removeFromVariantTree = this.parent.addVariantChild(this);
        }
        this.values.forEach((value, key) => this.bindToMotionValue(key, value));
        /**
         * Determine reduced motion preference. Only initialize the matchMedia
         * listener if we actually need the dynamic value (i.e., when config
         * is neither "never" nor "always").
         */
        if (this.reducedMotionConfig === "never") {
            this.shouldReduceMotion = false;
        }
        else if (this.reducedMotionConfig === "always") {
            this.shouldReduceMotion = true;
        }
        else {
            if (!_utils_reduced_motion_state_mjs__WEBPACK_IMPORTED_MODULE_22__.hasReducedMotionListener.current) {
                (0,_utils_reduced_motion_index_mjs__WEBPACK_IMPORTED_MODULE_20__.initPrefersReducedMotion)();
            }
            this.shouldReduceMotion = _utils_reduced_motion_state_mjs__WEBPACK_IMPORTED_MODULE_22__.prefersReducedMotion.current;
        }
        if (true) {
            (0,motion_utils__WEBPACK_IMPORTED_MODULE_4__.warnOnce)(this.shouldReduceMotion !== true, "You have Reduced Motion enabled on your device. Animations may not appear as expected.", "reduced-motion-disabled");
        }
        /**
         * Set whether animations should be skipped based on the config.
         */
        this.shouldSkipAnimations = this.skipAnimationsConfig ?? false;
        this.parent?.addChild(this);
        this.update(this.props, this.presenceContext);
        this.hasBeenMounted = true;
    }
    unmount() {
        this.projection && this.projection.unmount();
        (0,_frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_23__.cancelFrame)(this.notifyUpdate);
        (0,_frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_23__.cancelFrame)(this.render);
        this.valueSubscriptions.forEach((remove) => remove());
        this.valueSubscriptions.clear();
        this.removeFromVariantTree && this.removeFromVariantTree();
        this.parent?.removeChild(this);
        for (const key in this.events) {
            this.events[key].clear();
        }
        for (const key in this.features) {
            const feature = this.features[key];
            if (feature) {
                feature.unmount();
                feature.isMounted = false;
            }
        }
        this.current = null;
    }
    addChild(child) {
        this.children.add(child);
        this.enteringChildren ?? (this.enteringChildren = new Set());
        this.enteringChildren.add(child);
    }
    removeChild(child) {
        this.children.delete(child);
        this.enteringChildren && this.enteringChildren.delete(child);
    }
    bindToMotionValue(key, value) {
        if (this.valueSubscriptions.has(key)) {
            this.valueSubscriptions.get(key)();
        }
        if (value.accelerate &&
            _animation_waapi_utils_accelerated_values_mjs__WEBPACK_IMPORTED_MODULE_7__.acceleratedValues.has(key) &&
            this.current instanceof HTMLElement) {
            const { factory, keyframes, times, ease, duration } = value.accelerate;
            const animation = new _animation_NativeAnimation_mjs__WEBPACK_IMPORTED_MODULE_6__.NativeAnimation({
                element: this.current,
                name: key,
                keyframes,
                times,
                ease,
                duration: (0,motion_utils__WEBPACK_IMPORTED_MODULE_3__.secondsToMilliseconds)(duration),
            });
            const cleanup = factory(animation);
            this.valueSubscriptions.set(key, () => {
                cleanup();
                animation.cancel();
            });
            return;
        }
        const valueIsTransform = _utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_18__.transformProps.has(key);
        if (valueIsTransform && this.onBindTransform) {
            this.onBindTransform();
        }
        const removeOnChange = value.on("change", (latestValue) => {
            this.latestValues[key] = latestValue;
            this.props.onUpdate && _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_23__.frame.preRender(this.notifyUpdate);
            if (valueIsTransform && this.projection) {
                this.projection.isTransformDirty = true;
            }
            this.scheduleRender();
        });
        let removeSyncCheck;
        if (typeof window !== "undefined" &&
            window.MotionCheckAppearSync) {
            removeSyncCheck = window.MotionCheckAppearSync(this, key, value);
        }
        this.valueSubscriptions.set(key, () => {
            removeOnChange();
            if (removeSyncCheck)
                removeSyncCheck();
            if (value.owner)
                value.stop();
        });
    }
    sortNodePosition(other) {
        /**
         * If these nodes aren't even of the same type we can't compare their depth.
         */
        if (!this.current ||
            !this.sortInstanceNodePosition ||
            this.type !== other.type) {
            return 0;
        }
        return this.sortInstanceNodePosition(this.current, other.current);
    }
    updateFeatures() {
        let key = "animation";
        for (key in featureDefinitions) {
            const featureDefinition = featureDefinitions[key];
            if (!featureDefinition)
                continue;
            const { isEnabled, Feature: FeatureConstructor } = featureDefinition;
            /**
             * If this feature is enabled but not active, make a new instance.
             */
            if (!this.features[key] &&
                FeatureConstructor &&
                isEnabled(this.props)) {
                this.features[key] = new FeatureConstructor(this);
            }
            /**
             * If we have a feature, mount or update it.
             */
            if (this.features[key]) {
                const feature = this.features[key];
                if (feature.isMounted) {
                    feature.update();
                }
                else {
                    feature.mount();
                    feature.isMounted = true;
                }
            }
        }
    }
    triggerBuild() {
        this.build(this.renderState, this.latestValues, this.props);
    }
    /**
     * Measure the current viewport box with or without transforms.
     * Only measures axis-aligned boxes, rotate and skew must be manually
     * removed with a re-render to work.
     */
    measureViewportBox() {
        return this.current
            ? this.measureInstanceViewportBox(this.current, this.props)
            : (0,_projection_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_10__.createBox)();
    }
    getStaticValue(key) {
        return this.latestValues[key];
    }
    setStaticValue(key, value) {
        this.latestValues[key] = value;
    }
    /**
     * Update the provided props. Ensure any newly-added motion values are
     * added to our map, old ones removed, and listeners updated.
     */
    update(props, presenceContext) {
        if (props.transformTemplate || this.props.transformTemplate) {
            this.scheduleRender();
        }
        this.prevProps = this.props;
        this.props = props;
        this.prevPresenceContext = this.presenceContext;
        this.presenceContext = presenceContext;
        /**
         * Update prop event handlers ie onAnimationStart, onAnimationComplete
         */
        for (let i = 0; i < propEventHandlers.length; i++) {
            const key = propEventHandlers[i];
            if (this.propEventSubscriptions[key]) {
                this.propEventSubscriptions[key]();
                delete this.propEventSubscriptions[key];
            }
            const listenerName = ("on" + key);
            const listener = props[listenerName];
            if (listener) {
                this.propEventSubscriptions[key] = this.on(key, listener);
            }
        }
        this.prevMotionValues = (0,_utils_motion_values_mjs__WEBPACK_IMPORTED_MODULE_19__.updateMotionValuesFromProps)(this, this.scrapeMotionValuesFromProps(props, this.prevProps || {}, this), this.prevMotionValues);
        if (this.handleChildMotionValue) {
            this.handleChildMotionValue();
        }
    }
    getProps() {
        return this.props;
    }
    /**
     * Returns the variant definition with a given name.
     */
    getVariant(name) {
        return this.props.variants ? this.props.variants[name] : undefined;
    }
    /**
     * Returns the defined default transition on this component.
     */
    getDefaultTransition() {
        return this.props.transition;
    }
    getTransformPagePoint() {
        return this.props.transformPagePoint;
    }
    getClosestVariantNode() {
        return this.isVariantNode
            ? this
            : this.parent
                ? this.parent.getClosestVariantNode()
                : undefined;
    }
    /**
     * Add a child visual element to our set of children.
     */
    addVariantChild(child) {
        const closestVariantNode = this.getClosestVariantNode();
        if (closestVariantNode) {
            closestVariantNode.variantChildren &&
                closestVariantNode.variantChildren.add(child);
            return () => closestVariantNode.variantChildren.delete(child);
        }
    }
    /**
     * Add a motion value and bind it to this visual element.
     */
    addValue(key, value) {
        // Remove existing value if it exists
        const existingValue = this.values.get(key);
        if (value !== existingValue) {
            if (existingValue)
                this.removeValue(key);
            this.bindToMotionValue(key, value);
            this.values.set(key, value);
            this.latestValues[key] = value.get();
        }
    }
    /**
     * Remove a motion value and unbind any active subscriptions.
     */
    removeValue(key) {
        this.values.delete(key);
        const unsubscribe = this.valueSubscriptions.get(key);
        if (unsubscribe) {
            unsubscribe();
            this.valueSubscriptions.delete(key);
        }
        delete this.latestValues[key];
        this.removeValueFromRenderState(key, this.renderState);
    }
    /**
     * Check whether we have a motion value for this key
     */
    hasValue(key) {
        return this.values.has(key);
    }
    getValue(key, defaultValue) {
        if (this.props.values && this.props.values[key]) {
            return this.props.values[key];
        }
        let value = this.values.get(key);
        if (value === undefined && defaultValue !== undefined) {
            value = (0,_value_index_mjs__WEBPACK_IMPORTED_MODULE_11__.motionValue)(defaultValue === null ? undefined : defaultValue, { owner: this });
            this.addValue(key, value);
        }
        return value;
    }
    /**
     * If we're trying to animate to a previously unencountered value,
     * we need to check for it in our state and as a last resort read it
     * directly from the instance (which might have performance implications).
     */
    readValue(key, target) {
        let value = this.latestValues[key] !== undefined || !this.current
            ? this.latestValues[key]
            : this.getBaseTargetFromProps(this.props, key) ??
                this.readValueFromInstance(this.current, key, this.options);
        if (value !== undefined && value !== null) {
            if (typeof value === "string" &&
                ((0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.isNumericalString)(value) || (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__.isZeroValueString)(value))) {
                // If this is a number read as a string, ie "0" or "200", convert it to a number
                value = parseFloat(value);
            }
            else if (!(0,_value_types_utils_find_mjs__WEBPACK_IMPORTED_MODULE_14__.findValueType)(value) && _value_types_complex_index_mjs__WEBPACK_IMPORTED_MODULE_12__.complex.test(target)) {
                value = (0,_value_types_utils_animatable_none_mjs__WEBPACK_IMPORTED_MODULE_13__.getAnimatableNone)(key, target);
            }
            this.setBaseTarget(key, (0,_value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_15__.isMotionValue)(value) ? value.get() : value);
        }
        return (0,_value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_15__.isMotionValue)(value) ? value.get() : value;
    }
    /**
     * Set the base target to later animate back to. This is currently
     * only hydrated on creation and when we first read a value.
     */
    setBaseTarget(key, value) {
        this.baseTarget[key] = value;
    }
    /**
     * Find the base target for a value thats been removed from all animation
     * props.
     */
    getBaseTarget(key) {
        const { initial } = this.props;
        let valueFromInitial;
        if (typeof initial === "string" || typeof initial === "object") {
            const variant = (0,_utils_resolve_variants_mjs__WEBPACK_IMPORTED_MODULE_21__.resolveVariantFromProps)(this.props, initial, this.presenceContext?.custom);
            if (variant) {
                valueFromInitial = variant[key];
            }
        }
        /**
         * If this value still exists in the current initial variant, read that.
         */
        if (initial && valueFromInitial !== undefined) {
            return valueFromInitial;
        }
        /**
         * Alternatively, if this VisualElement config has defined a getBaseTarget
         * so we can read the value from an alternative source, try that.
         */
        const target = this.getBaseTargetFromProps(this.props, key);
        if (target !== undefined && !(0,_value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_15__.isMotionValue)(target))
            return target;
        /**
         * If the value was initially defined on initial, but it doesn't any more,
         * return undefined. Otherwise return the value as initially read from the DOM.
         */
        return this.initialValues[key] !== undefined &&
            valueFromInitial === undefined
            ? undefined
            : this.baseTarget[key];
    }
    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = new motion_utils__WEBPACK_IMPORTED_MODULE_2__.SubscriptionManager();
        }
        return this.events[eventName].add(callback);
    }
    notify(eventName, ...args) {
        if (this.events[eventName]) {
            this.events[eventName].notify(...args);
        }
    }
    scheduleRenderMicrotask() {
        _frameloop_microtask_mjs__WEBPACK_IMPORTED_MODULE_8__.microtask.render(this.render);
    }
}


//# sourceMappingURL=VisualElement.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/render/dom/DOMVisualElement.mjs"
/*!*************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/render/dom/DOMVisualElement.mjs ***!
  \*************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DOMVisualElement: () => (/* binding */ DOMVisualElement)
/* harmony export */ });
/* harmony import */ var _value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../value/utils/is-motion-value.mjs */ "./node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs");
/* harmony import */ var _animation_keyframes_DOMKeyframesResolver_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../animation/keyframes/DOMKeyframesResolver.mjs */ "./node_modules/motion-dom/dist/es/animation/keyframes/DOMKeyframesResolver.mjs");
/* harmony import */ var _VisualElement_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../VisualElement.mjs */ "./node_modules/motion-dom/dist/es/render/VisualElement.mjs");




class DOMVisualElement extends _VisualElement_mjs__WEBPACK_IMPORTED_MODULE_2__.VisualElement {
    constructor() {
        super(...arguments);
        this.KeyframeResolver = _animation_keyframes_DOMKeyframesResolver_mjs__WEBPACK_IMPORTED_MODULE_1__.DOMKeyframesResolver;
    }
    sortInstanceNodePosition(a, b) {
        /**
         * compareDocumentPosition returns a bitmask, by using the bitwise &
         * we're returning true if 2 in that bitmask is set to true. 2 is set
         * to true if b preceeds a.
         */
        return a.compareDocumentPosition(b) & 2 ? 1 : -1;
    }
    getBaseTargetFromProps(props, key) {
        const style = props.style;
        return style ? style[key] : undefined;
    }
    removeValueFromRenderState(key, { vars, style }) {
        delete vars[key];
        delete style[key];
    }
    handleChildMotionValue() {
        if (this.childSubscription) {
            this.childSubscription();
            delete this.childSubscription;
        }
        const { children } = this.props;
        if ((0,_value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_0__.isMotionValue)(children)) {
            this.childSubscription = children.on("change", (latest) => {
                if (this.current) {
                    this.current.textContent = `${latest}`;
                }
            });
        }
    }
}


//# sourceMappingURL=DOMVisualElement.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/render/dom/is-css-var.mjs"
/*!*******************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/render/dom/is-css-var.mjs ***!
  \*******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isCSSVar: () => (/* binding */ isCSSVar)
/* harmony export */ });
const isCSSVar = (name) => name.startsWith("--");


//# sourceMappingURL=is-css-var.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/render/dom/parse-transform.mjs"
/*!************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/render/dom/parse-transform.mjs ***!
  \************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultTransformValue: () => (/* binding */ defaultTransformValue),
/* harmony export */   parseValueFromTransform: () => (/* binding */ parseValueFromTransform),
/* harmony export */   readTransformValue: () => (/* binding */ readTransformValue)
/* harmony export */ });
const radToDeg = (rad) => (rad * 180) / Math.PI;
const rotate = (v) => {
    const angle = radToDeg(Math.atan2(v[1], v[0]));
    return rebaseAngle(angle);
};
const matrix2dParsers = {
    x: 4,
    y: 5,
    translateX: 4,
    translateY: 5,
    scaleX: 0,
    scaleY: 3,
    scale: (v) => (Math.abs(v[0]) + Math.abs(v[3])) / 2,
    rotate,
    rotateZ: rotate,
    skewX: (v) => radToDeg(Math.atan(v[1])),
    skewY: (v) => radToDeg(Math.atan(v[2])),
    skew: (v) => (Math.abs(v[1]) + Math.abs(v[2])) / 2,
};
const rebaseAngle = (angle) => {
    angle = angle % 360;
    if (angle < 0)
        angle += 360;
    return angle;
};
const rotateZ = rotate;
const scaleX = (v) => Math.sqrt(v[0] * v[0] + v[1] * v[1]);
const scaleY = (v) => Math.sqrt(v[4] * v[4] + v[5] * v[5]);
const matrix3dParsers = {
    x: 12,
    y: 13,
    z: 14,
    translateX: 12,
    translateY: 13,
    translateZ: 14,
    scaleX,
    scaleY,
    scale: (v) => (scaleX(v) + scaleY(v)) / 2,
    rotateX: (v) => rebaseAngle(radToDeg(Math.atan2(v[6], v[5]))),
    rotateY: (v) => rebaseAngle(radToDeg(Math.atan2(-v[2], v[0]))),
    rotateZ,
    rotate: rotateZ,
    skewX: (v) => radToDeg(Math.atan(v[4])),
    skewY: (v) => radToDeg(Math.atan(v[1])),
    skew: (v) => (Math.abs(v[1]) + Math.abs(v[4])) / 2,
};
function defaultTransformValue(name) {
    return name.includes("scale") ? 1 : 0;
}
function parseValueFromTransform(transform, name) {
    if (!transform || transform === "none") {
        return defaultTransformValue(name);
    }
    const matrix3dMatch = transform.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
    let parsers;
    let match;
    if (matrix3dMatch) {
        parsers = matrix3dParsers;
        match = matrix3dMatch;
    }
    else {
        const matrix2dMatch = transform.match(/^matrix\(([-\d.e\s,]+)\)$/u);
        parsers = matrix2dParsers;
        match = matrix2dMatch;
    }
    if (!match) {
        return defaultTransformValue(name);
    }
    const valueParser = parsers[name];
    const values = match[1].split(",").map(convertTransformToNumber);
    return typeof valueParser === "function"
        ? valueParser(values)
        : values[valueParser];
}
const readTransformValue = (instance, name) => {
    const { transform = "none" } = getComputedStyle(instance);
    return parseValueFromTransform(transform, name);
};
function convertTransformToNumber(value) {
    return parseFloat(value.trim());
}


//# sourceMappingURL=parse-transform.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/render/dom/style-set.mjs"
/*!******************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/render/dom/style-set.mjs ***!
  \******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setStyle: () => (/* binding */ setStyle)
/* harmony export */ });
/* harmony import */ var _is_css_var_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is-css-var.mjs */ "./node_modules/motion-dom/dist/es/render/dom/is-css-var.mjs");


function setStyle(element, name, value) {
    (0,_is_css_var_mjs__WEBPACK_IMPORTED_MODULE_0__.isCSSVar)(name)
        ? element.style.setProperty(name, value)
        : (element.style[name] = value);
}


//# sourceMappingURL=style-set.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/render/dom/utils/camel-to-dash.mjs"
/*!****************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/render/dom/utils/camel-to-dash.mjs ***!
  \****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   camelToDash: () => (/* binding */ camelToDash)
/* harmony export */ });
function camelToDash(str) {
    return str.replace(/([A-Z])/g, (match) => `-${match.toLowerCase()}`);
}


//# sourceMappingURL=camel-to-dash.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/render/html/HTMLVisualElement.mjs"
/*!***************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/render/html/HTMLVisualElement.mjs ***!
  \***************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HTMLVisualElement: () => (/* binding */ HTMLVisualElement),
/* harmony export */   getComputedStyle: () => (/* binding */ getComputedStyle)
/* harmony export */ });
/* harmony import */ var _animation_utils_is_css_variable_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../animation/utils/is-css-variable.mjs */ "./node_modules/motion-dom/dist/es/animation/utils/is-css-variable.mjs");
/* harmony import */ var _utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/keys-transform.mjs */ "./node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs");
/* harmony import */ var _dom_parse_transform_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dom/parse-transform.mjs */ "./node_modules/motion-dom/dist/es/render/dom/parse-transform.mjs");
/* harmony import */ var _projection_utils_measure_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../projection/utils/measure.mjs */ "./node_modules/motion-dom/dist/es/projection/utils/measure.mjs");
/* harmony import */ var _dom_DOMVisualElement_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dom/DOMVisualElement.mjs */ "./node_modules/motion-dom/dist/es/render/dom/DOMVisualElement.mjs");
/* harmony import */ var _utils_build_styles_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/build-styles.mjs */ "./node_modules/motion-dom/dist/es/render/html/utils/build-styles.mjs");
/* harmony import */ var _utils_render_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/render.mjs */ "./node_modules/motion-dom/dist/es/render/html/utils/render.mjs");
/* harmony import */ var _utils_scrape_motion_values_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/scrape-motion-values.mjs */ "./node_modules/motion-dom/dist/es/render/html/utils/scrape-motion-values.mjs");









function getComputedStyle(element) {
    return window.getComputedStyle(element);
}
class HTMLVisualElement extends _dom_DOMVisualElement_mjs__WEBPACK_IMPORTED_MODULE_4__.DOMVisualElement {
    constructor() {
        super(...arguments);
        this.type = "html";
        this.renderInstance = _utils_render_mjs__WEBPACK_IMPORTED_MODULE_6__.renderHTML;
    }
    readValueFromInstance(instance, key) {
        if (_utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_1__.transformProps.has(key)) {
            return this.projection?.isProjecting
                ? (0,_dom_parse_transform_mjs__WEBPACK_IMPORTED_MODULE_2__.defaultTransformValue)(key)
                : (0,_dom_parse_transform_mjs__WEBPACK_IMPORTED_MODULE_2__.readTransformValue)(instance, key);
        }
        else {
            const computedStyle = getComputedStyle(instance);
            const value = ((0,_animation_utils_is_css_variable_mjs__WEBPACK_IMPORTED_MODULE_0__.isCSSVariableName)(key)
                ? computedStyle.getPropertyValue(key)
                : computedStyle[key]) || 0;
            return typeof value === "string" ? value.trim() : value;
        }
    }
    measureInstanceViewportBox(instance, { transformPagePoint }) {
        return (0,_projection_utils_measure_mjs__WEBPACK_IMPORTED_MODULE_3__.measureViewportBox)(instance, transformPagePoint);
    }
    build(renderState, latestValues, props) {
        (0,_utils_build_styles_mjs__WEBPACK_IMPORTED_MODULE_5__.buildHTMLStyles)(renderState, latestValues, props.transformTemplate);
    }
    scrapeMotionValuesFromProps(props, prevProps, visualElement) {
        return (0,_utils_scrape_motion_values_mjs__WEBPACK_IMPORTED_MODULE_7__.scrapeMotionValuesFromProps)(props, prevProps, visualElement);
    }
}


//# sourceMappingURL=HTMLVisualElement.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/render/html/utils/build-styles.mjs"
/*!****************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/render/html/utils/build-styles.mjs ***!
  \****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildHTMLStyles: () => (/* binding */ buildHTMLStyles)
/* harmony export */ });
/* harmony import */ var _value_types_utils_get_as_type_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../value/types/utils/get-as-type.mjs */ "./node_modules/motion-dom/dist/es/value/types/utils/get-as-type.mjs");
/* harmony import */ var _value_types_maps_number_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../value/types/maps/number.mjs */ "./node_modules/motion-dom/dist/es/value/types/maps/number.mjs");
/* harmony import */ var _utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/keys-transform.mjs */ "./node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs");
/* harmony import */ var _animation_utils_is_css_variable_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../animation/utils/is-css-variable.mjs */ "./node_modules/motion-dom/dist/es/animation/utils/is-css-variable.mjs");
/* harmony import */ var _build_transform_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./build-transform.mjs */ "./node_modules/motion-dom/dist/es/render/html/utils/build-transform.mjs");






function buildHTMLStyles(state, latestValues, transformTemplate) {
    const { style, vars, transformOrigin } = state;
    // Track whether we encounter any transform or transformOrigin values.
    let hasTransform = false;
    let hasTransformOrigin = false;
    /**
     * Loop over all our latest animated values and decide whether to handle them
     * as a style or CSS variable.
     *
     * Transforms and transform origins are kept separately for further processing.
     */
    for (const key in latestValues) {
        const value = latestValues[key];
        if (_utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_2__.transformProps.has(key)) {
            // If this is a transform, flag to enable further transform processing
            hasTransform = true;
            continue;
        }
        else if ((0,_animation_utils_is_css_variable_mjs__WEBPACK_IMPORTED_MODULE_3__.isCSSVariableName)(key)) {
            vars[key] = value;
            continue;
        }
        else {
            // Convert the value to its default value type, ie 0 -> "0px"
            const valueAsType = (0,_value_types_utils_get_as_type_mjs__WEBPACK_IMPORTED_MODULE_0__.getValueAsType)(value, _value_types_maps_number_mjs__WEBPACK_IMPORTED_MODULE_1__.numberValueTypes[key]);
            if (key.startsWith("origin")) {
                // If this is a transform origin, flag and enable further transform-origin processing
                hasTransformOrigin = true;
                transformOrigin[key] =
                    valueAsType;
            }
            else {
                style[key] = valueAsType;
            }
        }
    }
    if (!latestValues.transform) {
        if (hasTransform || transformTemplate) {
            style.transform = (0,_build_transform_mjs__WEBPACK_IMPORTED_MODULE_4__.buildTransform)(latestValues, state.transform, transformTemplate);
        }
        else if (style.transform) {
            /**
             * If we have previously created a transform but currently don't have any,
             * reset transform style to none.
             */
            style.transform = "none";
        }
    }
    /**
     * Build a transformOrigin style. Uses the same defaults as the browser for
     * undefined origins.
     */
    if (hasTransformOrigin) {
        const { originX = "50%", originY = "50%", originZ = 0, } = transformOrigin;
        style.transformOrigin = `${originX} ${originY} ${originZ}`;
    }
}


//# sourceMappingURL=build-styles.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/render/html/utils/build-transform.mjs"
/*!*******************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/render/html/utils/build-transform.mjs ***!
  \*******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildTransform: () => (/* binding */ buildTransform)
/* harmony export */ });
/* harmony import */ var _value_types_utils_get_as_type_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../value/types/utils/get-as-type.mjs */ "./node_modules/motion-dom/dist/es/value/types/utils/get-as-type.mjs");
/* harmony import */ var _value_types_maps_number_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../value/types/maps/number.mjs */ "./node_modules/motion-dom/dist/es/value/types/maps/number.mjs");
/* harmony import */ var _utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/keys-transform.mjs */ "./node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs");




const translateAlias = {
    x: "translateX",
    y: "translateY",
    z: "translateZ",
    transformPerspective: "perspective",
};
const numTransforms = _utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_2__.transformPropOrder.length;
/**
 * Build a CSS transform style from individual x/y/scale etc properties.
 *
 * This outputs with a default order of transforms/scales/rotations, this can be customised by
 * providing a transformTemplate function.
 */
function buildTransform(latestValues, transform, transformTemplate) {
    // The transform string we're going to build into.
    let transformString = "";
    let transformIsDefault = true;
    /**
     * Loop over all possible transforms in order, adding the ones that
     * are present to the transform string.
     */
    for (let i = 0; i < numTransforms; i++) {
        const key = _utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_2__.transformPropOrder[i];
        const value = latestValues[key];
        if (value === undefined)
            continue;
        let valueIsDefault = true;
        if (typeof value === "number") {
            valueIsDefault = value === (key.startsWith("scale") ? 1 : 0);
        }
        else {
            const parsed = parseFloat(value);
            valueIsDefault = key.startsWith("scale") ? parsed === 1 : parsed === 0;
        }
        if (!valueIsDefault || transformTemplate) {
            const valueAsType = (0,_value_types_utils_get_as_type_mjs__WEBPACK_IMPORTED_MODULE_0__.getValueAsType)(value, _value_types_maps_number_mjs__WEBPACK_IMPORTED_MODULE_1__.numberValueTypes[key]);
            if (!valueIsDefault) {
                transformIsDefault = false;
                const transformName = translateAlias[key] || key;
                transformString += `${transformName}(${valueAsType}) `;
            }
            if (transformTemplate) {
                transform[key] = valueAsType;
            }
        }
    }
    transformString = transformString.trim();
    // If we have a custom `transform` template, pass our transform values and
    // generated transformString to that before returning
    if (transformTemplate) {
        transformString = transformTemplate(transform, transformIsDefault ? "" : transformString);
    }
    else if (transformIsDefault) {
        transformString = "none";
    }
    return transformString;
}


//# sourceMappingURL=build-transform.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/render/html/utils/render.mjs"
/*!**********************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/render/html/utils/render.mjs ***!
  \**********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderHTML: () => (/* binding */ renderHTML)
/* harmony export */ });
function renderHTML(element, { style, vars }, styleProp, projection) {
    const elementStyle = element.style;
    let key;
    for (key in style) {
        // CSSStyleDeclaration has [index: number]: string; in the types, so we use that as key type.
        elementStyle[key] = style[key];
    }
    // Write projection styles directly to element style
    projection?.applyProjectionStyles(elementStyle, styleProp);
    for (key in vars) {
        // Loop over any CSS variables and assign those.
        // They can only be assigned using `setProperty`.
        elementStyle.setProperty(key, vars[key]);
    }
}


//# sourceMappingURL=render.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/render/html/utils/scrape-motion-values.mjs"
/*!************************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/render/html/utils/scrape-motion-values.mjs ***!
  \************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   scrapeMotionValuesFromProps: () => (/* binding */ scrapeMotionValuesFromProps)
/* harmony export */ });
/* harmony import */ var _value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../value/utils/is-motion-value.mjs */ "./node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs");
/* harmony import */ var _utils_is_forced_motion_value_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/is-forced-motion-value.mjs */ "./node_modules/motion-dom/dist/es/render/utils/is-forced-motion-value.mjs");



function scrapeMotionValuesFromProps(props, prevProps, visualElement) {
    const style = props.style;
    const prevStyle = prevProps?.style;
    const newValues = {};
    if (!style)
        return newValues;
    for (const key in style) {
        if ((0,_value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_0__.isMotionValue)(style[key]) ||
            (prevStyle && (0,_value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_0__.isMotionValue)(prevStyle[key])) ||
            (0,_utils_is_forced_motion_value_mjs__WEBPACK_IMPORTED_MODULE_1__.isForcedMotionValue)(key, props) ||
            visualElement?.getValue(key)?.liveStyle !== undefined) {
            newValues[key] = style[key];
        }
    }
    return newValues;
}


//# sourceMappingURL=scrape-motion-values.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/render/object/ObjectVisualElement.mjs"
/*!*******************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/render/object/ObjectVisualElement.mjs ***!
  \*******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ObjectVisualElement: () => (/* binding */ ObjectVisualElement)
/* harmony export */ });
/* harmony import */ var _projection_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../projection/geometry/models.mjs */ "./node_modules/motion-dom/dist/es/projection/geometry/models.mjs");
/* harmony import */ var _VisualElement_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../VisualElement.mjs */ "./node_modules/motion-dom/dist/es/render/VisualElement.mjs");



function isObjectKey(key, object) {
    return key in object;
}
class ObjectVisualElement extends _VisualElement_mjs__WEBPACK_IMPORTED_MODULE_1__.VisualElement {
    constructor() {
        super(...arguments);
        this.type = "object";
    }
    readValueFromInstance(instance, key) {
        if (isObjectKey(key, instance)) {
            const value = instance[key];
            if (typeof value === "string" || typeof value === "number") {
                return value;
            }
        }
        return undefined;
    }
    getBaseTargetFromProps() {
        return undefined;
    }
    removeValueFromRenderState(key, renderState) {
        delete renderState.output[key];
    }
    measureInstanceViewportBox() {
        return (0,_projection_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_0__.createBox)();
    }
    build(renderState, latestValues) {
        Object.assign(renderState.output, latestValues);
    }
    renderInstance(instance, { output }) {
        Object.assign(instance, output);
    }
    sortInstanceNodePosition() {
        return 0;
    }
}


//# sourceMappingURL=ObjectVisualElement.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/render/store.mjs"
/*!**********************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/render/store.mjs ***!
  \**********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visualElementStore: () => (/* binding */ visualElementStore)
/* harmony export */ });
const visualElementStore = new WeakMap();


//# sourceMappingURL=store.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/render/svg/SVGVisualElement.mjs"
/*!*************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/render/svg/SVGVisualElement.mjs ***!
  \*************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SVGVisualElement: () => (/* binding */ SVGVisualElement)
/* harmony export */ });
/* harmony import */ var _utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/keys-transform.mjs */ "./node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs");
/* harmony import */ var _value_types_maps_defaults_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../value/types/maps/defaults.mjs */ "./node_modules/motion-dom/dist/es/value/types/maps/defaults.mjs");
/* harmony import */ var _projection_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../projection/geometry/models.mjs */ "./node_modules/motion-dom/dist/es/projection/geometry/models.mjs");
/* harmony import */ var _dom_DOMVisualElement_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dom/DOMVisualElement.mjs */ "./node_modules/motion-dom/dist/es/render/dom/DOMVisualElement.mjs");
/* harmony import */ var _dom_utils_camel_to_dash_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dom/utils/camel-to-dash.mjs */ "./node_modules/motion-dom/dist/es/render/dom/utils/camel-to-dash.mjs");
/* harmony import */ var _utils_build_attrs_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/build-attrs.mjs */ "./node_modules/motion-dom/dist/es/render/svg/utils/build-attrs.mjs");
/* harmony import */ var _utils_camel_case_attrs_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/camel-case-attrs.mjs */ "./node_modules/motion-dom/dist/es/render/svg/utils/camel-case-attrs.mjs");
/* harmony import */ var _utils_is_svg_tag_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/is-svg-tag.mjs */ "./node_modules/motion-dom/dist/es/render/svg/utils/is-svg-tag.mjs");
/* harmony import */ var _utils_render_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/render.mjs */ "./node_modules/motion-dom/dist/es/render/svg/utils/render.mjs");
/* harmony import */ var _utils_scrape_motion_values_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/scrape-motion-values.mjs */ "./node_modules/motion-dom/dist/es/render/svg/utils/scrape-motion-values.mjs");











class SVGVisualElement extends _dom_DOMVisualElement_mjs__WEBPACK_IMPORTED_MODULE_3__.DOMVisualElement {
    constructor() {
        super(...arguments);
        this.type = "svg";
        this.isSVGTag = false;
        this.measureInstanceViewportBox = _projection_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_2__.createBox;
    }
    getBaseTargetFromProps(props, key) {
        return props[key];
    }
    readValueFromInstance(instance, key) {
        if (_utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_0__.transformProps.has(key)) {
            const defaultType = (0,_value_types_maps_defaults_mjs__WEBPACK_IMPORTED_MODULE_1__.getDefaultValueType)(key);
            return defaultType ? defaultType.default || 0 : 0;
        }
        key = !_utils_camel_case_attrs_mjs__WEBPACK_IMPORTED_MODULE_6__.camelCaseAttributes.has(key) ? (0,_dom_utils_camel_to_dash_mjs__WEBPACK_IMPORTED_MODULE_4__.camelToDash)(key) : key;
        return instance.getAttribute(key);
    }
    scrapeMotionValuesFromProps(props, prevProps, visualElement) {
        return (0,_utils_scrape_motion_values_mjs__WEBPACK_IMPORTED_MODULE_9__.scrapeMotionValuesFromProps)(props, prevProps, visualElement);
    }
    build(renderState, latestValues, props) {
        (0,_utils_build_attrs_mjs__WEBPACK_IMPORTED_MODULE_5__.buildSVGAttrs)(renderState, latestValues, this.isSVGTag, props.transformTemplate, props.style);
    }
    renderInstance(instance, renderState, styleProp, projection) {
        (0,_utils_render_mjs__WEBPACK_IMPORTED_MODULE_8__.renderSVG)(instance, renderState, styleProp, projection);
    }
    mount(instance) {
        this.isSVGTag = (0,_utils_is_svg_tag_mjs__WEBPACK_IMPORTED_MODULE_7__.isSVGTag)(instance.tagName);
        super.mount(instance);
    }
}


//# sourceMappingURL=SVGVisualElement.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/render/svg/utils/build-attrs.mjs"
/*!**************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/render/svg/utils/build-attrs.mjs ***!
  \**************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildSVGAttrs: () => (/* binding */ buildSVGAttrs)
/* harmony export */ });
/* harmony import */ var _html_utils_build_styles_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../html/utils/build-styles.mjs */ "./node_modules/motion-dom/dist/es/render/html/utils/build-styles.mjs");
/* harmony import */ var _path_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./path.mjs */ "./node_modules/motion-dom/dist/es/render/svg/utils/path.mjs");



/**
 * CSS Motion Path properties that should remain as CSS styles on SVG elements.
 */
const cssMotionPathProperties = [
    "offsetDistance",
    "offsetPath",
    "offsetRotate",
    "offsetAnchor",
];
/**
 * Build SVG visual attributes, like cx and style.transform
 */
function buildSVGAttrs(state, { attrX, attrY, attrScale, pathLength, pathSpacing = 1, pathOffset = 0, 
// This is object creation, which we try to avoid per-frame.
...latest }, isSVGTag, transformTemplate, styleProp) {
    (0,_html_utils_build_styles_mjs__WEBPACK_IMPORTED_MODULE_0__.buildHTMLStyles)(state, latest, transformTemplate);
    /**
     * For svg tags we just want to make sure viewBox is animatable and treat all the styles
     * as normal HTML tags.
     */
    if (isSVGTag) {
        if (state.style.viewBox) {
            state.attrs.viewBox = state.style.viewBox;
        }
        return;
    }
    state.attrs = state.style;
    state.style = {};
    const { attrs, style } = state;
    /**
     * However, we apply transforms as CSS transforms.
     * So if we detect a transform, transformOrigin we take it from attrs and copy it into style.
     */
    if (attrs.transform) {
        style.transform = attrs.transform;
        delete attrs.transform;
    }
    if (style.transform || attrs.transformOrigin) {
        style.transformOrigin = attrs.transformOrigin ?? "50% 50%";
        delete attrs.transformOrigin;
    }
    if (style.transform) {
        /**
         * SVG's element transform-origin uses its own median as a reference.
         * Therefore, transformBox becomes a fill-box
         */
        style.transformBox = styleProp?.transformBox ?? "fill-box";
        delete attrs.transformBox;
    }
    for (const key of cssMotionPathProperties) {
        if (attrs[key] !== undefined) {
            style[key] = attrs[key];
            delete attrs[key];
        }
    }
    // Render attrX/attrY/attrScale as attributes
    if (attrX !== undefined)
        attrs.x = attrX;
    if (attrY !== undefined)
        attrs.y = attrY;
    if (attrScale !== undefined)
        attrs.scale = attrScale;
    // Build SVG path if one has been defined
    if (pathLength !== undefined) {
        (0,_path_mjs__WEBPACK_IMPORTED_MODULE_1__.buildSVGPath)(attrs, pathLength, pathSpacing, pathOffset, false);
    }
}


//# sourceMappingURL=build-attrs.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/render/svg/utils/camel-case-attrs.mjs"
/*!*******************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/render/svg/utils/camel-case-attrs.mjs ***!
  \*******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   camelCaseAttributes: () => (/* binding */ camelCaseAttributes)
/* harmony export */ });
/**
 * A set of attribute names that are always read/written as camel case.
 */
const camelCaseAttributes = new Set([
    "baseFrequency",
    "diffuseConstant",
    "kernelMatrix",
    "kernelUnitLength",
    "keySplines",
    "keyTimes",
    "limitingConeAngle",
    "markerHeight",
    "markerWidth",
    "numOctaves",
    "targetX",
    "targetY",
    "surfaceScale",
    "specularConstant",
    "specularExponent",
    "stdDeviation",
    "tableValues",
    "viewBox",
    "gradientTransform",
    "pathLength",
    "startOffset",
    "textLength",
    "lengthAdjust",
]);


//# sourceMappingURL=camel-case-attrs.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/render/svg/utils/is-svg-tag.mjs"
/*!*************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/render/svg/utils/is-svg-tag.mjs ***!
  \*************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isSVGTag: () => (/* binding */ isSVGTag)
/* harmony export */ });
const isSVGTag = (tag) => typeof tag === "string" && tag.toLowerCase() === "svg";


//# sourceMappingURL=is-svg-tag.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/render/svg/utils/path.mjs"
/*!*******************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/render/svg/utils/path.mjs ***!
  \*******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildSVGPath: () => (/* binding */ buildSVGPath)
/* harmony export */ });
const dashKeys = {
    offset: "stroke-dashoffset",
    array: "stroke-dasharray",
};
const camelKeys = {
    offset: "strokeDashoffset",
    array: "strokeDasharray",
};
/**
 * Build SVG path properties. Uses the path's measured length to convert
 * our custom pathLength, pathSpacing and pathOffset into stroke-dashoffset
 * and stroke-dasharray attributes.
 *
 * This function is mutative to reduce per-frame GC.
 *
 * Note: We use unitless values for stroke-dasharray and stroke-dashoffset
 * because Safari incorrectly scales px values when the page is zoomed.
 */
function buildSVGPath(attrs, length, spacing = 1, offset = 0, useDashCase = true) {
    // Normalise path length by setting SVG attribute pathLength to 1
    attrs.pathLength = 1;
    // We use dash case when setting attributes directly to the DOM node and camel case
    // when defining props on a React component.
    const keys = useDashCase ? dashKeys : camelKeys;
    // Build the dash offset (unitless to avoid Safari zoom bug)
    attrs[keys.offset] = `${-offset}`;
    // Build the dash array (unitless to avoid Safari zoom bug)
    attrs[keys.array] = `${length} ${spacing}`;
}


//# sourceMappingURL=path.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/render/svg/utils/render.mjs"
/*!*********************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/render/svg/utils/render.mjs ***!
  \*********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderSVG: () => (/* binding */ renderSVG)
/* harmony export */ });
/* harmony import */ var _dom_utils_camel_to_dash_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../dom/utils/camel-to-dash.mjs */ "./node_modules/motion-dom/dist/es/render/dom/utils/camel-to-dash.mjs");
/* harmony import */ var _html_utils_render_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../html/utils/render.mjs */ "./node_modules/motion-dom/dist/es/render/html/utils/render.mjs");
/* harmony import */ var _camel_case_attrs_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./camel-case-attrs.mjs */ "./node_modules/motion-dom/dist/es/render/svg/utils/camel-case-attrs.mjs");




function renderSVG(element, renderState, _styleProp, projection) {
    (0,_html_utils_render_mjs__WEBPACK_IMPORTED_MODULE_1__.renderHTML)(element, renderState, undefined, projection);
    for (const key in renderState.attrs) {
        element.setAttribute(!_camel_case_attrs_mjs__WEBPACK_IMPORTED_MODULE_2__.camelCaseAttributes.has(key) ? (0,_dom_utils_camel_to_dash_mjs__WEBPACK_IMPORTED_MODULE_0__.camelToDash)(key) : key, renderState.attrs[key]);
    }
}


//# sourceMappingURL=render.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/render/svg/utils/scrape-motion-values.mjs"
/*!***********************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/render/svg/utils/scrape-motion-values.mjs ***!
  \***********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   scrapeMotionValuesFromProps: () => (/* binding */ scrapeMotionValuesFromProps)
/* harmony export */ });
/* harmony import */ var _value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../value/utils/is-motion-value.mjs */ "./node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs");
/* harmony import */ var _utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/keys-transform.mjs */ "./node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs");
/* harmony import */ var _html_utils_scrape_motion_values_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../html/utils/scrape-motion-values.mjs */ "./node_modules/motion-dom/dist/es/render/html/utils/scrape-motion-values.mjs");




function scrapeMotionValuesFromProps(props, prevProps, visualElement) {
    const newValues = (0,_html_utils_scrape_motion_values_mjs__WEBPACK_IMPORTED_MODULE_2__.scrapeMotionValuesFromProps)(props, prevProps, visualElement);
    for (const key in props) {
        if ((0,_value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_0__.isMotionValue)(props[key]) ||
            (0,_value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_0__.isMotionValue)(prevProps[key])) {
            const targetKey = _utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_1__.transformPropOrder.indexOf(key) !== -1
                ? "attr" + key.charAt(0).toUpperCase() + key.substring(1)
                : key;
            newValues[targetKey] = props[key];
        }
    }
    return newValues;
}


//# sourceMappingURL=scrape-motion-values.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/render/utils/is-animation-controls.mjs"
/*!********************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/render/utils/is-animation-controls.mjs ***!
  \********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isAnimationControls: () => (/* binding */ isAnimationControls)
/* harmony export */ });
function isAnimationControls(v) {
    return (v !== null &&
        typeof v === "object" &&
        typeof v.start === "function");
}


//# sourceMappingURL=is-animation-controls.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/render/utils/is-controlling-variants.mjs"
/*!**********************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/render/utils/is-controlling-variants.mjs ***!
  \**********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isControllingVariants: () => (/* binding */ isControllingVariants),
/* harmony export */   isVariantNode: () => (/* binding */ isVariantNode)
/* harmony export */ });
/* harmony import */ var _is_animation_controls_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is-animation-controls.mjs */ "./node_modules/motion-dom/dist/es/render/utils/is-animation-controls.mjs");
/* harmony import */ var _is_variant_label_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./is-variant-label.mjs */ "./node_modules/motion-dom/dist/es/render/utils/is-variant-label.mjs");
/* harmony import */ var _variant_props_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./variant-props.mjs */ "./node_modules/motion-dom/dist/es/render/utils/variant-props.mjs");




function isControllingVariants(props) {
    return ((0,_is_animation_controls_mjs__WEBPACK_IMPORTED_MODULE_0__.isAnimationControls)(props.animate) ||
        _variant_props_mjs__WEBPACK_IMPORTED_MODULE_2__.variantProps.some((name) => (0,_is_variant_label_mjs__WEBPACK_IMPORTED_MODULE_1__.isVariantLabel)(props[name])));
}
function isVariantNode(props) {
    return Boolean(isControllingVariants(props) || props.variants);
}


//# sourceMappingURL=is-controlling-variants.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/render/utils/is-forced-motion-value.mjs"
/*!*********************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/render/utils/is-forced-motion-value.mjs ***!
  \*********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addScaleCorrector: () => (/* reexport safe */ _projection_styles_scale_correction_mjs__WEBPACK_IMPORTED_MODULE_1__.addScaleCorrector),
/* harmony export */   isForcedMotionValue: () => (/* binding */ isForcedMotionValue),
/* harmony export */   scaleCorrectors: () => (/* reexport safe */ _projection_styles_scale_correction_mjs__WEBPACK_IMPORTED_MODULE_1__.scaleCorrectors)
/* harmony export */ });
/* harmony import */ var _keys_transform_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./keys-transform.mjs */ "./node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs");
/* harmony import */ var _projection_styles_scale_correction_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../projection/styles/scale-correction.mjs */ "./node_modules/motion-dom/dist/es/projection/styles/scale-correction.mjs");




function isForcedMotionValue(key, { layout, layoutId }) {
    return (_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_0__.transformProps.has(key) ||
        key.startsWith("origin") ||
        ((layout || layoutId !== undefined) &&
            (!!_projection_styles_scale_correction_mjs__WEBPACK_IMPORTED_MODULE_1__.scaleCorrectors[key] || key === "opacity")));
}


//# sourceMappingURL=is-forced-motion-value.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/render/utils/is-keyframes-target.mjs"
/*!******************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/render/utils/is-keyframes-target.mjs ***!
  \******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isKeyframesTarget: () => (/* binding */ isKeyframesTarget)
/* harmony export */ });
const isKeyframesTarget = (v) => {
    return Array.isArray(v);
};


//# sourceMappingURL=is-keyframes-target.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/render/utils/is-variant-label.mjs"
/*!***************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/render/utils/is-variant-label.mjs ***!
  \***************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isVariantLabel: () => (/* binding */ isVariantLabel)
/* harmony export */ });
/**
 * Decides if the supplied variable is variant label
 */
function isVariantLabel(v) {
    return typeof v === "string" || Array.isArray(v);
}


//# sourceMappingURL=is-variant-label.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/render/utils/keys-position.mjs"
/*!************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/render/utils/keys-position.mjs ***!
  \************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   positionalKeys: () => (/* binding */ positionalKeys)
/* harmony export */ });
/* harmony import */ var _keys_transform_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./keys-transform.mjs */ "./node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs");


const positionalKeys = new Set([
    "width",
    "height",
    "top",
    "left",
    "right",
    "bottom",
    ..._keys_transform_mjs__WEBPACK_IMPORTED_MODULE_0__.transformPropOrder,
]);


//# sourceMappingURL=keys-position.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs"
/*!*************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs ***!
  \*************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   transformPropOrder: () => (/* binding */ transformPropOrder),
/* harmony export */   transformProps: () => (/* binding */ transformProps)
/* harmony export */ });
/**
 * Generate a list of every possible transform key.
 */
const transformPropOrder = [
    "transformPerspective",
    "x",
    "y",
    "z",
    "translateX",
    "translateY",
    "translateZ",
    "scale",
    "scaleX",
    "scaleY",
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "skew",
    "skewX",
    "skewY",
];
/**
 * A quick lookup for transform props.
 */
const transformProps = /*@__PURE__*/ (() => new Set(transformPropOrder))();


//# sourceMappingURL=keys-transform.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/render/utils/motion-values.mjs"
/*!************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/render/utils/motion-values.mjs ***!
  \************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   updateMotionValuesFromProps: () => (/* binding */ updateMotionValuesFromProps)
/* harmony export */ });
/* harmony import */ var _value_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../value/index.mjs */ "./node_modules/motion-dom/dist/es/value/index.mjs");
/* harmony import */ var _value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../value/utils/is-motion-value.mjs */ "./node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs");



/**
 * Updates motion values from props changes.
 * Uses `any` type for element to avoid circular dependencies with VisualElement.
 */
function updateMotionValuesFromProps(element, next, prev) {
    for (const key in next) {
        const nextValue = next[key];
        const prevValue = prev[key];
        if ((0,_value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_1__.isMotionValue)(nextValue)) {
            /**
             * If this is a motion value found in props or style, we want to add it
             * to our visual element's motion value map.
             */
            element.addValue(key, nextValue);
        }
        else if ((0,_value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_1__.isMotionValue)(prevValue)) {
            /**
             * If we're swapping from a motion value to a static value,
             * create a new motion value from that
             */
            element.addValue(key, (0,_value_index_mjs__WEBPACK_IMPORTED_MODULE_0__.motionValue)(nextValue, { owner: element }));
        }
        else if (prevValue !== nextValue) {
            /**
             * If this is a flat value that has changed, update the motion value
             * or create one if it doesn't exist. We only want to do this if we're
             * not handling the value with our animation state.
             */
            if (element.hasValue(key)) {
                const existingValue = element.getValue(key);
                if (existingValue.liveStyle === true) {
                    existingValue.jump(nextValue);
                }
                else if (!existingValue.hasAnimated) {
                    existingValue.set(nextValue);
                }
            }
            else {
                const latestValue = element.getStaticValue(key);
                element.addValue(key, (0,_value_index_mjs__WEBPACK_IMPORTED_MODULE_0__.motionValue)(latestValue !== undefined ? latestValue : nextValue, { owner: element }));
            }
        }
    }
    // Handle removed values
    for (const key in prev) {
        if (next[key] === undefined)
            element.removeValue(key);
    }
    return next;
}


//# sourceMappingURL=motion-values.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/render/utils/reduced-motion/index.mjs"
/*!*******************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/render/utils/reduced-motion/index.mjs ***!
  \*******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hasReducedMotionListener: () => (/* reexport safe */ _state_mjs__WEBPACK_IMPORTED_MODULE_0__.hasReducedMotionListener),
/* harmony export */   initPrefersReducedMotion: () => (/* binding */ initPrefersReducedMotion),
/* harmony export */   prefersReducedMotion: () => (/* reexport safe */ _state_mjs__WEBPACK_IMPORTED_MODULE_0__.prefersReducedMotion)
/* harmony export */ });
/* harmony import */ var _state_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state.mjs */ "./node_modules/motion-dom/dist/es/render/utils/reduced-motion/state.mjs");


const isBrowser = typeof window !== "undefined";
function initPrefersReducedMotion() {
    _state_mjs__WEBPACK_IMPORTED_MODULE_0__.hasReducedMotionListener.current = true;
    if (!isBrowser)
        return;
    if (window.matchMedia) {
        const motionMediaQuery = window.matchMedia("(prefers-reduced-motion)");
        const setReducedMotionPreferences = () => (_state_mjs__WEBPACK_IMPORTED_MODULE_0__.prefersReducedMotion.current = motionMediaQuery.matches);
        motionMediaQuery.addEventListener("change", setReducedMotionPreferences);
        setReducedMotionPreferences();
    }
    else {
        _state_mjs__WEBPACK_IMPORTED_MODULE_0__.prefersReducedMotion.current = false;
    }
}


//# sourceMappingURL=index.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/render/utils/reduced-motion/state.mjs"
/*!*******************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/render/utils/reduced-motion/state.mjs ***!
  \*******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hasReducedMotionListener: () => (/* binding */ hasReducedMotionListener),
/* harmony export */   prefersReducedMotion: () => (/* binding */ prefersReducedMotion)
/* harmony export */ });
// Does this device prefer reduced motion? Returns `null` server-side.
const prefersReducedMotion = { current: null };
const hasReducedMotionListener = { current: false };


//# sourceMappingURL=state.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/render/utils/resolve-dynamic-variants.mjs"
/*!***********************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/render/utils/resolve-dynamic-variants.mjs ***!
  \***********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveVariant: () => (/* binding */ resolveVariant)
/* harmony export */ });
/* harmony import */ var _resolve_variants_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./resolve-variants.mjs */ "./node_modules/motion-dom/dist/es/render/utils/resolve-variants.mjs");


function resolveVariant(visualElement, definition, custom) {
    const props = visualElement.getProps();
    return (0,_resolve_variants_mjs__WEBPACK_IMPORTED_MODULE_0__.resolveVariantFromProps)(props, definition, custom !== undefined ? custom : props.custom, visualElement);
}


//# sourceMappingURL=resolve-dynamic-variants.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/render/utils/resolve-variants.mjs"
/*!***************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/render/utils/resolve-variants.mjs ***!
  \***************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveVariantFromProps: () => (/* binding */ resolveVariantFromProps)
/* harmony export */ });
function getValueState(visualElement) {
    const state = [{}, {}];
    visualElement?.values.forEach((value, key) => {
        state[0][key] = value.get();
        state[1][key] = value.getVelocity();
    });
    return state;
}
function resolveVariantFromProps(props, definition, custom, visualElement) {
    /**
     * If the variant definition is a function, resolve.
     */
    if (typeof definition === "function") {
        const [current, velocity] = getValueState(visualElement);
        definition = definition(custom !== undefined ? custom : props.custom, current, velocity);
    }
    /**
     * If the variant definition is a variant label, or
     * the function returned a variant label, resolve.
     */
    if (typeof definition === "string") {
        definition = props.variants && props.variants[definition];
    }
    /**
     * At this point we've resolved both functions and variant labels,
     * but the resolved variant label might itself have been a function.
     * If so, resolve. This can only have returned a valid target object.
     */
    if (typeof definition === "function") {
        const [current, velocity] = getValueState(visualElement);
        definition = definition(custom !== undefined ? custom : props.custom, current, velocity);
    }
    return definition;
}


//# sourceMappingURL=resolve-variants.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/render/utils/setters.mjs"
/*!******************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/render/utils/setters.mjs ***!
  \******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setTarget: () => (/* binding */ setTarget)
/* harmony export */ });
/* harmony import */ var _value_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../value/index.mjs */ "./node_modules/motion-dom/dist/es/value/index.mjs");
/* harmony import */ var _resolve_dynamic_variants_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resolve-dynamic-variants.mjs */ "./node_modules/motion-dom/dist/es/render/utils/resolve-dynamic-variants.mjs");
/* harmony import */ var _is_keyframes_target_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./is-keyframes-target.mjs */ "./node_modules/motion-dom/dist/es/render/utils/is-keyframes-target.mjs");




/**
 * Set VisualElement's MotionValue, creating a new MotionValue for it if
 * it doesn't exist.
 */
function setMotionValue(visualElement, key, value) {
    if (visualElement.hasValue(key)) {
        visualElement.getValue(key).set(value);
    }
    else {
        visualElement.addValue(key, (0,_value_index_mjs__WEBPACK_IMPORTED_MODULE_0__.motionValue)(value));
    }
}
function resolveFinalValueInKeyframes(v) {
    // TODO maybe throw if v.length - 1 is placeholder token?
    return (0,_is_keyframes_target_mjs__WEBPACK_IMPORTED_MODULE_2__.isKeyframesTarget)(v) ? v[v.length - 1] || 0 : v;
}
function setTarget(visualElement, definition) {
    const resolved = (0,_resolve_dynamic_variants_mjs__WEBPACK_IMPORTED_MODULE_1__.resolveVariant)(visualElement, definition);
    let { transitionEnd = {}, transition = {}, ...target } = resolved || {};
    target = { ...target, ...transitionEnd };
    for (const key in target) {
        const value = resolveFinalValueInKeyframes(target[key]);
        setMotionValue(visualElement, key, value);
    }
}


//# sourceMappingURL=setters.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/render/utils/variant-props.mjs"
/*!************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/render/utils/variant-props.mjs ***!
  \************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   variantPriorityOrder: () => (/* binding */ variantPriorityOrder),
/* harmony export */   variantProps: () => (/* binding */ variantProps)
/* harmony export */ });
const variantPriorityOrder = [
    "animate",
    "whileInView",
    "whileFocus",
    "whileHover",
    "whileTap",
    "whileDrag",
    "exit",
];
const variantProps = ["initial", ...variantPriorityOrder];


//# sourceMappingURL=variant-props.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/stats/animation-count.mjs"
/*!*******************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/stats/animation-count.mjs ***!
  \*******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   activeAnimations: () => (/* binding */ activeAnimations)
/* harmony export */ });
const activeAnimations = {
    layout: 0,
    mainThread: 0,
    waapi: 0,
};


//# sourceMappingURL=animation-count.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/stats/buffer.mjs"
/*!**********************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/stats/buffer.mjs ***!
  \**********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   statsBuffer: () => (/* binding */ statsBuffer)
/* harmony export */ });
const statsBuffer = {
    value: null,
    addProjectionMetrics: null,
};


//# sourceMappingURL=buffer.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/utils/interpolate.mjs"
/*!***************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/utils/interpolate.mjs ***!
  \***************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   interpolate: () => (/* binding */ interpolate)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/clamp.mjs");
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/errors.mjs");
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/global-config.mjs");
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/noop.mjs");
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/pipe.mjs");
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/progress.mjs");
/* harmony import */ var _mix_index_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mix/index.mjs */ "./node_modules/motion-dom/dist/es/utils/mix/index.mjs");



function createMixers(output, ease, customMixer) {
    const mixers = [];
    const mixerFactory = customMixer || motion_utils__WEBPACK_IMPORTED_MODULE_2__.MotionGlobalConfig.mix || _mix_index_mjs__WEBPACK_IMPORTED_MODULE_6__.mix;
    const numMixers = output.length - 1;
    for (let i = 0; i < numMixers; i++) {
        let mixer = mixerFactory(output[i], output[i + 1]);
        if (ease) {
            const easingFunction = Array.isArray(ease) ? ease[i] || motion_utils__WEBPACK_IMPORTED_MODULE_3__.noop : ease;
            mixer = (0,motion_utils__WEBPACK_IMPORTED_MODULE_4__.pipe)(easingFunction, mixer);
        }
        mixers.push(mixer);
    }
    return mixers;
}
/**
 * Create a function that maps from a numerical input array to a generic output array.
 *
 * Accepts:
 *   - Numbers
 *   - Colors (hex, hsl, hsla, rgb, rgba)
 *   - Complex (combinations of one or more numbers or strings)
 *
 * ```jsx
 * const mixColor = interpolate([0, 1], ['#fff', '#000'])
 *
 * mixColor(0.5) // 'rgba(128, 128, 128, 1)'
 * ```
 *
 * TODO Revisit this approach once we've moved to data models for values,
 * probably not needed to pregenerate mixer functions.
 *
 * @public
 */
function interpolate(input, output, { clamp: isClamp = true, ease, mixer } = {}) {
    const inputLength = input.length;
    (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__.invariant)(inputLength === output.length, "Both input and output ranges must be the same length", "range-length");
    /**
     * If we're only provided a single input, we can just make a function
     * that returns the output.
     */
    if (inputLength === 1)
        return () => output[0];
    if (inputLength === 2 && output[0] === output[1])
        return () => output[1];
    const isZeroDeltaRange = input[0] === input[1];
    // If input runs highest -> lowest, reverse both arrays
    if (input[0] > input[inputLength - 1]) {
        input = [...input].reverse();
        output = [...output].reverse();
    }
    const mixers = createMixers(output, ease, mixer);
    const numMixers = mixers.length;
    const interpolator = (v) => {
        if (isZeroDeltaRange && v < input[0])
            return output[0];
        let i = 0;
        if (numMixers > 1) {
            for (; i < input.length - 2; i++) {
                if (v < input[i + 1])
                    break;
            }
        }
        const progressInRange = (0,motion_utils__WEBPACK_IMPORTED_MODULE_5__.progress)(input[i], input[i + 1], v);
        return mixers[i](progressInRange);
    };
    return isClamp
        ? (v) => interpolator((0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.clamp)(input[0], input[inputLength - 1], v))
        : interpolator;
}


//# sourceMappingURL=interpolate.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/utils/is-svg-element.mjs"
/*!******************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/utils/is-svg-element.mjs ***!
  \******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isSVGElement: () => (/* binding */ isSVGElement)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/is-object.mjs");


/**
 * Checks if an element is an SVG element in a way
 * that works across iframes
 */
function isSVGElement(element) {
    return (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.isObject)(element) && "ownerSVGElement" in element;
}


//# sourceMappingURL=is-svg-element.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/utils/is-svg-svg-element.mjs"
/*!**********************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/utils/is-svg-svg-element.mjs ***!
  \**********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isSVGSVGElement: () => (/* binding */ isSVGSVGElement)
/* harmony export */ });
/* harmony import */ var _is_svg_element_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is-svg-element.mjs */ "./node_modules/motion-dom/dist/es/utils/is-svg-element.mjs");


/**
 * Checks if an element is specifically an SVGSVGElement (the root SVG element)
 * in a way that works across iframes
 */
function isSVGSVGElement(element) {
    return (0,_is_svg_element_mjs__WEBPACK_IMPORTED_MODULE_0__.isSVGElement)(element) && element.tagName === "svg";
}


//# sourceMappingURL=is-svg-svg-element.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/utils/mix/color.mjs"
/*!*************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/utils/mix/color.mjs ***!
  \*************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mixColor: () => (/* binding */ mixColor),
/* harmony export */   mixLinearColor: () => (/* binding */ mixLinearColor)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/errors.mjs");
/* harmony import */ var _value_types_color_hex_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../value/types/color/hex.mjs */ "./node_modules/motion-dom/dist/es/value/types/color/hex.mjs");
/* harmony import */ var _value_types_color_hsla_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../value/types/color/hsla.mjs */ "./node_modules/motion-dom/dist/es/value/types/color/hsla.mjs");
/* harmony import */ var _value_types_color_hsla_to_rgba_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../value/types/color/hsla-to-rgba.mjs */ "./node_modules/motion-dom/dist/es/value/types/color/hsla-to-rgba.mjs");
/* harmony import */ var _value_types_color_rgba_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../value/types/color/rgba.mjs */ "./node_modules/motion-dom/dist/es/value/types/color/rgba.mjs");
/* harmony import */ var _immediate_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./immediate.mjs */ "./node_modules/motion-dom/dist/es/utils/mix/immediate.mjs");
/* harmony import */ var _number_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./number.mjs */ "./node_modules/motion-dom/dist/es/utils/mix/number.mjs");








// Linear color space blending
// Explained https://www.youtube.com/watch?v=LKnqECcg6Gw
// Demonstrated http://codepen.io/osublake/pen/xGVVaN
const mixLinearColor = (from, to, v) => {
    const fromExpo = from * from;
    const expo = v * (to * to - fromExpo) + fromExpo;
    return expo < 0 ? 0 : Math.sqrt(expo);
};
const colorTypes = [_value_types_color_hex_mjs__WEBPACK_IMPORTED_MODULE_1__.hex, _value_types_color_rgba_mjs__WEBPACK_IMPORTED_MODULE_4__.rgba, _value_types_color_hsla_mjs__WEBPACK_IMPORTED_MODULE_2__.hsla];
const getColorType = (v) => colorTypes.find((type) => type.test(v));
function asRGBA(color) {
    const type = getColorType(color);
    (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.warning)(Boolean(type), `'${color}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable");
    if (!Boolean(type))
        return false;
    let model = type.parse(color);
    if (type === _value_types_color_hsla_mjs__WEBPACK_IMPORTED_MODULE_2__.hsla) {
        // TODO Remove this cast - needed since Motion's stricter typing
        model = (0,_value_types_color_hsla_to_rgba_mjs__WEBPACK_IMPORTED_MODULE_3__.hslaToRgba)(model);
    }
    return model;
}
const mixColor = (from, to) => {
    const fromRGBA = asRGBA(from);
    const toRGBA = asRGBA(to);
    if (!fromRGBA || !toRGBA) {
        return (0,_immediate_mjs__WEBPACK_IMPORTED_MODULE_5__.mixImmediate)(from, to);
    }
    const blended = { ...fromRGBA };
    return (v) => {
        blended.red = mixLinearColor(fromRGBA.red, toRGBA.red, v);
        blended.green = mixLinearColor(fromRGBA.green, toRGBA.green, v);
        blended.blue = mixLinearColor(fromRGBA.blue, toRGBA.blue, v);
        blended.alpha = (0,_number_mjs__WEBPACK_IMPORTED_MODULE_6__.mixNumber)(fromRGBA.alpha, toRGBA.alpha, v);
        return _value_types_color_rgba_mjs__WEBPACK_IMPORTED_MODULE_4__.rgba.transform(blended);
    };
};


//# sourceMappingURL=color.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/utils/mix/complex.mjs"
/*!***************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/utils/mix/complex.mjs ***!
  \***************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getMixer: () => (/* binding */ getMixer),
/* harmony export */   mixArray: () => (/* binding */ mixArray),
/* harmony export */   mixComplex: () => (/* binding */ mixComplex),
/* harmony export */   mixObject: () => (/* binding */ mixObject)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/errors.mjs");
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/pipe.mjs");
/* harmony import */ var _animation_utils_is_css_variable_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../animation/utils/is-css-variable.mjs */ "./node_modules/motion-dom/dist/es/animation/utils/is-css-variable.mjs");
/* harmony import */ var _value_types_color_index_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../value/types/color/index.mjs */ "./node_modules/motion-dom/dist/es/value/types/color/index.mjs");
/* harmony import */ var _value_types_complex_index_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../value/types/complex/index.mjs */ "./node_modules/motion-dom/dist/es/value/types/complex/index.mjs");
/* harmony import */ var _color_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./color.mjs */ "./node_modules/motion-dom/dist/es/utils/mix/color.mjs");
/* harmony import */ var _immediate_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./immediate.mjs */ "./node_modules/motion-dom/dist/es/utils/mix/immediate.mjs");
/* harmony import */ var _number_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./number.mjs */ "./node_modules/motion-dom/dist/es/utils/mix/number.mjs");
/* harmony import */ var _visibility_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./visibility.mjs */ "./node_modules/motion-dom/dist/es/utils/mix/visibility.mjs");









function mixNumber(a, b) {
    return (p) => (0,_number_mjs__WEBPACK_IMPORTED_MODULE_7__.mixNumber)(a, b, p);
}
function getMixer(a) {
    if (typeof a === "number") {
        return mixNumber;
    }
    else if (typeof a === "string") {
        return (0,_animation_utils_is_css_variable_mjs__WEBPACK_IMPORTED_MODULE_2__.isCSSVariableToken)(a)
            ? _immediate_mjs__WEBPACK_IMPORTED_MODULE_6__.mixImmediate
            : _value_types_color_index_mjs__WEBPACK_IMPORTED_MODULE_3__.color.test(a)
                ? _color_mjs__WEBPACK_IMPORTED_MODULE_5__.mixColor
                : mixComplex;
    }
    else if (Array.isArray(a)) {
        return mixArray;
    }
    else if (typeof a === "object") {
        return _value_types_color_index_mjs__WEBPACK_IMPORTED_MODULE_3__.color.test(a) ? _color_mjs__WEBPACK_IMPORTED_MODULE_5__.mixColor : mixObject;
    }
    return _immediate_mjs__WEBPACK_IMPORTED_MODULE_6__.mixImmediate;
}
function mixArray(a, b) {
    const output = [...a];
    const numValues = output.length;
    const blendValue = a.map((v, i) => getMixer(v)(v, b[i]));
    return (p) => {
        for (let i = 0; i < numValues; i++) {
            output[i] = blendValue[i](p);
        }
        return output;
    };
}
function mixObject(a, b) {
    const output = { ...a, ...b };
    const blendValue = {};
    for (const key in output) {
        if (a[key] !== undefined && b[key] !== undefined) {
            blendValue[key] = getMixer(a[key])(a[key], b[key]);
        }
    }
    return (v) => {
        for (const key in blendValue) {
            output[key] = blendValue[key](v);
        }
        return output;
    };
}
function matchOrder(origin, target) {
    const orderedOrigin = [];
    const pointers = { color: 0, var: 0, number: 0 };
    for (let i = 0; i < target.values.length; i++) {
        const type = target.types[i];
        const originIndex = origin.indexes[type][pointers[type]];
        const originValue = origin.values[originIndex] ?? 0;
        orderedOrigin[i] = originValue;
        pointers[type]++;
    }
    return orderedOrigin;
}
const mixComplex = (origin, target) => {
    const template = _value_types_complex_index_mjs__WEBPACK_IMPORTED_MODULE_4__.complex.createTransformer(target);
    const originStats = (0,_value_types_complex_index_mjs__WEBPACK_IMPORTED_MODULE_4__.analyseComplexValue)(origin);
    const targetStats = (0,_value_types_complex_index_mjs__WEBPACK_IMPORTED_MODULE_4__.analyseComplexValue)(target);
    const canInterpolate = originStats.indexes.var.length === targetStats.indexes.var.length &&
        originStats.indexes.color.length === targetStats.indexes.color.length &&
        originStats.indexes.number.length >= targetStats.indexes.number.length;
    if (canInterpolate) {
        if ((_visibility_mjs__WEBPACK_IMPORTED_MODULE_8__.invisibleValues.has(origin) &&
            !targetStats.values.length) ||
            (_visibility_mjs__WEBPACK_IMPORTED_MODULE_8__.invisibleValues.has(target) &&
                !originStats.values.length)) {
            return (0,_visibility_mjs__WEBPACK_IMPORTED_MODULE_8__.mixVisibility)(origin, target);
        }
        return (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__.pipe)(mixArray(matchOrder(originStats, targetStats), targetStats.values), template);
    }
    else {
        (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.warning)(true, `Complex values '${origin}' and '${target}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different");
        return (0,_immediate_mjs__WEBPACK_IMPORTED_MODULE_6__.mixImmediate)(origin, target);
    }
};


//# sourceMappingURL=complex.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/utils/mix/immediate.mjs"
/*!*****************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/utils/mix/immediate.mjs ***!
  \*****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mixImmediate: () => (/* binding */ mixImmediate)
/* harmony export */ });
function mixImmediate(a, b) {
    return (p) => (p > 0 ? b : a);
}


//# sourceMappingURL=immediate.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/utils/mix/index.mjs"
/*!*************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/utils/mix/index.mjs ***!
  \*************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mix: () => (/* binding */ mix)
/* harmony export */ });
/* harmony import */ var _complex_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./complex.mjs */ "./node_modules/motion-dom/dist/es/utils/mix/complex.mjs");
/* harmony import */ var _number_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./number.mjs */ "./node_modules/motion-dom/dist/es/utils/mix/number.mjs");



function mix(from, to, p) {
    if (typeof from === "number" &&
        typeof to === "number" &&
        typeof p === "number") {
        return (0,_number_mjs__WEBPACK_IMPORTED_MODULE_1__.mixNumber)(from, to, p);
    }
    const mixer = (0,_complex_mjs__WEBPACK_IMPORTED_MODULE_0__.getMixer)(from);
    return mixer(from, to);
}


//# sourceMappingURL=index.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/utils/mix/number.mjs"
/*!**************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/utils/mix/number.mjs ***!
  \**************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mixNumber: () => (/* binding */ mixNumber)
/* harmony export */ });
/*
  Value in range from progress

  Given a lower limit and an upper limit, we return the value within
  that range as expressed by progress (usually a number from 0 to 1)

  So progress = 0.5 would change

  from -------- to

  to

  from ---- to

  E.g. from = 10, to = 20, progress = 0.5 => 15

  @param [number]: Lower limit of range
  @param [number]: Upper limit of range
  @param [number]: The progress between lower and upper limits expressed 0-1
  @return [number]: Value as calculated from progress within range (not limited within range)
*/
const mixNumber = (from, to, progress) => {
    return from + (to - from) * progress;
};


//# sourceMappingURL=number.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/utils/mix/visibility.mjs"
/*!******************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/utils/mix/visibility.mjs ***!
  \******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   invisibleValues: () => (/* binding */ invisibleValues),
/* harmony export */   mixVisibility: () => (/* binding */ mixVisibility)
/* harmony export */ });
const invisibleValues = new Set(["none", "hidden"]);
/**
 * Returns a function that, when provided a progress value between 0 and 1,
 * will return the "none" or "hidden" string only when the progress is that of
 * the origin or target.
 */
function mixVisibility(origin, target) {
    if (invisibleValues.has(origin)) {
        return (p) => (p <= 0 ? origin : target);
    }
    else {
        return (p) => (p >= 1 ? target : origin);
    }
}


//# sourceMappingURL=visibility.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/utils/resolve-elements.mjs"
/*!********************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/utils/resolve-elements.mjs ***!
  \********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveElements: () => (/* binding */ resolveElements)
/* harmony export */ });
function resolveElements(elementOrSelector, scope, selectorCache) {
    if (elementOrSelector == null) {
        return [];
    }
    if (elementOrSelector instanceof EventTarget) {
        return [elementOrSelector];
    }
    else if (typeof elementOrSelector === "string") {
        let root = document;
        if (scope) {
            root = scope.current;
        }
        const elements = selectorCache?.[elementOrSelector] ??
            root.querySelectorAll(elementOrSelector);
        return elements ? Array.from(elements) : [];
    }
    return Array.from(elementOrSelector).filter((element) => element != null);
}


//# sourceMappingURL=resolve-elements.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/utils/supports/flags.mjs"
/*!******************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/utils/supports/flags.mjs ***!
  \******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   supportsFlags: () => (/* binding */ supportsFlags)
/* harmony export */ });
/**
 * Add the ability for test suites to manually set support flags
 * to better test more environments.
 */
const supportsFlags = {};


//# sourceMappingURL=flags.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/utils/supports/linear-easing.mjs"
/*!**************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/utils/supports/linear-easing.mjs ***!
  \**************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   supportsLinearEasing: () => (/* binding */ supportsLinearEasing)
/* harmony export */ });
/* harmony import */ var _memo_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./memo.mjs */ "./node_modules/motion-dom/dist/es/utils/supports/memo.mjs");


const supportsLinearEasing = /*@__PURE__*/ (0,_memo_mjs__WEBPACK_IMPORTED_MODULE_0__.memoSupports)(() => {
    try {
        document
            .createElement("div")
            .animate({ opacity: 0 }, { easing: "linear(0, 1)" });
    }
    catch (e) {
        return false;
    }
    return true;
}, "linearEasing");


//# sourceMappingURL=linear-easing.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/utils/supports/memo.mjs"
/*!*****************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/utils/supports/memo.mjs ***!
  \*****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   memoSupports: () => (/* binding */ memoSupports)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/memo.mjs");
/* harmony import */ var _flags_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./flags.mjs */ "./node_modules/motion-dom/dist/es/utils/supports/flags.mjs");



function memoSupports(callback, supportsFlag) {
    const memoized = (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.memo)(callback);
    return () => _flags_mjs__WEBPACK_IMPORTED_MODULE_1__.supportsFlags[supportsFlag] ?? memoized();
}


//# sourceMappingURL=memo.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/utils/supports/scroll-timeline.mjs"
/*!****************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/utils/supports/scroll-timeline.mjs ***!
  \****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   supportsScrollTimeline: () => (/* binding */ supportsScrollTimeline),
/* harmony export */   supportsViewTimeline: () => (/* binding */ supportsViewTimeline)
/* harmony export */ });
/* harmony import */ var _memo_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./memo.mjs */ "./node_modules/motion-dom/dist/es/utils/supports/memo.mjs");


const supportsScrollTimeline = /* @__PURE__ */ (0,_memo_mjs__WEBPACK_IMPORTED_MODULE_0__.memoSupports)(() => window.ScrollTimeline !== undefined, "scrollTimeline");
const supportsViewTimeline = /* @__PURE__ */ (0,_memo_mjs__WEBPACK_IMPORTED_MODULE_0__.memoSupports)(() => window.ViewTimeline !== undefined, "viewTimeline");


//# sourceMappingURL=scroll-timeline.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/value/index.mjs"
/*!*********************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/value/index.mjs ***!
  \*********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MotionValue: () => (/* binding */ MotionValue),
/* harmony export */   collectMotionValues: () => (/* binding */ collectMotionValues),
/* harmony export */   motionValue: () => (/* binding */ motionValue)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/subscription-manager.mjs");
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/velocity-per-second.mjs");
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/warn-once.mjs");
/* harmony import */ var _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../frameloop/sync-time.mjs */ "./node_modules/motion-dom/dist/es/frameloop/sync-time.mjs");
/* harmony import */ var _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../frameloop/frame.mjs */ "./node_modules/motion-dom/dist/es/frameloop/frame.mjs");




/**
 * Maximum time between the value of two frames, beyond which we
 * assume the velocity has since been 0.
 */
const MAX_VELOCITY_DELTA = 30;
const isFloat = (value) => {
    return !isNaN(parseFloat(value));
};
const collectMotionValues = {
    current: undefined,
};
/**
 * `MotionValue` is used to track the state and velocity of motion values.
 *
 * @public
 */
class MotionValue {
    /**
     * @param init - The initiating value
     * @param config - Optional configuration options
     *
     * -  `transformer`: A function to transform incoming values with.
     */
    constructor(init, options = {}) {
        /**
         * Tracks whether this value can output a velocity. Currently this is only true
         * if the value is numerical, but we might be able to widen the scope here and support
         * other value types.
         *
         * @internal
         */
        this.canTrackVelocity = null;
        /**
         * An object containing a SubscriptionManager for each active event.
         */
        this.events = {};
        this.updateAndNotify = (v) => {
            const currentTime = _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_3__.time.now();
            /**
             * If we're updating the value during another frame or eventloop
             * than the previous frame, then the we set the previous frame value
             * to current.
             */
            if (this.updatedAt !== currentTime) {
                this.setPrevFrameValue();
            }
            this.prev = this.current;
            this.setCurrent(v);
            // Update update subscribers
            if (this.current !== this.prev) {
                this.events.change?.notify(this.current);
                if (this.dependents) {
                    for (const dependent of this.dependents) {
                        dependent.dirty();
                    }
                }
            }
        };
        this.hasAnimated = false;
        this.setCurrent(init);
        this.owner = options.owner;
    }
    setCurrent(current) {
        this.current = current;
        this.updatedAt = _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_3__.time.now();
        if (this.canTrackVelocity === null && current !== undefined) {
            this.canTrackVelocity = isFloat(this.current);
        }
    }
    setPrevFrameValue(prevFrameValue = this.current) {
        this.prevFrameValue = prevFrameValue;
        this.prevUpdatedAt = this.updatedAt;
    }
    /**
     * Adds a function that will be notified when the `MotionValue` is updated.
     *
     * It returns a function that, when called, will cancel the subscription.
     *
     * When calling `onChange` inside a React component, it should be wrapped with the
     * `useEffect` hook. As it returns an unsubscribe function, this should be returned
     * from the `useEffect` function to ensure you don't add duplicate subscribers..
     *
     * ```jsx
     * export const MyComponent = () => {
     *   const x = useMotionValue(0)
     *   const y = useMotionValue(0)
     *   const opacity = useMotionValue(1)
     *
     *   useEffect(() => {
     *     function updateOpacity() {
     *       const maxXY = Math.max(x.get(), y.get())
     *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
     *       opacity.set(newOpacity)
     *     }
     *
     *     const unsubscribeX = x.on("change", updateOpacity)
     *     const unsubscribeY = y.on("change", updateOpacity)
     *
     *     return () => {
     *       unsubscribeX()
     *       unsubscribeY()
     *     }
     *   }, [])
     *
     *   return <motion.div style={{ x }} />
     * }
     * ```
     *
     * @param subscriber - A function that receives the latest value.
     * @returns A function that, when called, will cancel this subscription.
     *
     * @deprecated
     */
    onChange(subscription) {
        if (true) {
            (0,motion_utils__WEBPACK_IMPORTED_MODULE_2__.warnOnce)(false, `value.onChange(callback) is deprecated. Switch to value.on("change", callback).`);
        }
        return this.on("change", subscription);
    }
    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = new motion_utils__WEBPACK_IMPORTED_MODULE_0__.SubscriptionManager();
        }
        const unsubscribe = this.events[eventName].add(callback);
        if (eventName === "change") {
            return () => {
                unsubscribe();
                /**
                 * If we have no more change listeners by the start
                 * of the next frame, stop active animations.
                 */
                _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_4__.frame.read(() => {
                    if (!this.events.change.getSize()) {
                        this.stop();
                    }
                });
            };
        }
        return unsubscribe;
    }
    clearListeners() {
        for (const eventManagers in this.events) {
            this.events[eventManagers].clear();
        }
    }
    /**
     * Attaches a passive effect to the `MotionValue`.
     */
    attach(passiveEffect, stopPassiveEffect) {
        this.passiveEffect = passiveEffect;
        this.stopPassiveEffect = stopPassiveEffect;
    }
    /**
     * Sets the state of the `MotionValue`.
     *
     * @remarks
     *
     * ```jsx
     * const x = useMotionValue(0)
     * x.set(10)
     * ```
     *
     * @param latest - Latest value to set.
     * @param render - Whether to notify render subscribers. Defaults to `true`
     *
     * @public
     */
    set(v) {
        if (!this.passiveEffect) {
            this.updateAndNotify(v);
        }
        else {
            this.passiveEffect(v, this.updateAndNotify);
        }
    }
    setWithVelocity(prev, current, delta) {
        this.set(current);
        this.prev = undefined;
        this.prevFrameValue = prev;
        this.prevUpdatedAt = this.updatedAt - delta;
    }
    /**
     * Set the state of the `MotionValue`, stopping any active animations,
     * effects, and resets velocity to `0`.
     */
    jump(v, endAnimation = true) {
        this.updateAndNotify(v);
        this.prev = v;
        this.prevUpdatedAt = this.prevFrameValue = undefined;
        endAnimation && this.stop();
        if (this.stopPassiveEffect)
            this.stopPassiveEffect();
    }
    dirty() {
        this.events.change?.notify(this.current);
    }
    addDependent(dependent) {
        if (!this.dependents) {
            this.dependents = new Set();
        }
        this.dependents.add(dependent);
    }
    removeDependent(dependent) {
        if (this.dependents) {
            this.dependents.delete(dependent);
        }
    }
    /**
     * Returns the latest state of `MotionValue`
     *
     * @returns - The latest state of `MotionValue`
     *
     * @public
     */
    get() {
        if (collectMotionValues.current) {
            collectMotionValues.current.push(this);
        }
        return this.current;
    }
    /**
     * @public
     */
    getPrevious() {
        return this.prev;
    }
    /**
     * Returns the latest velocity of `MotionValue`
     *
     * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
     *
     * @public
     */
    getVelocity() {
        const currentTime = _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_3__.time.now();
        if (!this.canTrackVelocity ||
            this.prevFrameValue === undefined ||
            currentTime - this.updatedAt > MAX_VELOCITY_DELTA) {
            return 0;
        }
        const delta = Math.min(this.updatedAt - this.prevUpdatedAt, MAX_VELOCITY_DELTA);
        // Casts because of parseFloat's poor typing
        return (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__.velocityPerSecond)(parseFloat(this.current) -
            parseFloat(this.prevFrameValue), delta);
    }
    /**
     * Registers a new animation to control this `MotionValue`. Only one
     * animation can drive a `MotionValue` at one time.
     *
     * ```jsx
     * value.start()
     * ```
     *
     * @param animation - A function that starts the provided animation
     */
    start(startAnimation) {
        this.stop();
        return new Promise((resolve) => {
            this.hasAnimated = true;
            this.animation = startAnimation(resolve);
            if (this.events.animationStart) {
                this.events.animationStart.notify();
            }
        }).then(() => {
            if (this.events.animationComplete) {
                this.events.animationComplete.notify();
            }
            this.clearAnimation();
        });
    }
    /**
     * Stop the currently active animation.
     *
     * @public
     */
    stop() {
        if (this.animation) {
            this.animation.stop();
            if (this.events.animationCancel) {
                this.events.animationCancel.notify();
            }
        }
        this.clearAnimation();
    }
    /**
     * Returns `true` if this value is currently animating.
     *
     * @public
     */
    isAnimating() {
        return !!this.animation;
    }
    clearAnimation() {
        delete this.animation;
    }
    /**
     * Destroy and clean up subscribers to this `MotionValue`.
     *
     * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
     * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
     * created a `MotionValue` via the `motionValue` function.
     *
     * @public
     */
    destroy() {
        this.dependents?.clear();
        this.events.destroy?.notify();
        this.clearListeners();
        this.stop();
        if (this.stopPassiveEffect) {
            this.stopPassiveEffect();
        }
    }
}
function motionValue(init, options) {
    return new MotionValue(init, options);
}


//# sourceMappingURL=index.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/value/types/auto.mjs"
/*!**************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/value/types/auto.mjs ***!
  \**************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   auto: () => (/* binding */ auto)
/* harmony export */ });
/**
 * ValueType for "auto"
 */
const auto = {
    test: (v) => v === "auto",
    parse: (v) => v,
};


//# sourceMappingURL=auto.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/value/types/color/hex.mjs"
/*!*******************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/value/types/color/hex.mjs ***!
  \*******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hex: () => (/* binding */ hex)
/* harmony export */ });
/* harmony import */ var _rgba_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rgba.mjs */ "./node_modules/motion-dom/dist/es/value/types/color/rgba.mjs");
/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.mjs */ "./node_modules/motion-dom/dist/es/value/types/color/utils.mjs");



function parseHex(v) {
    let r = "";
    let g = "";
    let b = "";
    let a = "";
    // If we have 6 characters, ie #FF0000
    if (v.length > 5) {
        r = v.substring(1, 3);
        g = v.substring(3, 5);
        b = v.substring(5, 7);
        a = v.substring(7, 9);
        // Or we have 3 characters, ie #F00
    }
    else {
        r = v.substring(1, 2);
        g = v.substring(2, 3);
        b = v.substring(3, 4);
        a = v.substring(4, 5);
        r += r;
        g += g;
        b += b;
        a += a;
    }
    return {
        red: parseInt(r, 16),
        green: parseInt(g, 16),
        blue: parseInt(b, 16),
        alpha: a ? parseInt(a, 16) / 255 : 1,
    };
}
const hex = {
    test: /*@__PURE__*/ (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.isColorString)("#"),
    parse: parseHex,
    transform: _rgba_mjs__WEBPACK_IMPORTED_MODULE_0__.rgba.transform,
};


//# sourceMappingURL=hex.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/value/types/color/hsla-to-rgba.mjs"
/*!****************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/value/types/color/hsla-to-rgba.mjs ***!
  \****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hslaToRgba: () => (/* binding */ hslaToRgba)
/* harmony export */ });
// Adapted from https://gist.github.com/mjackson/5311256
function hueToRgb(p, q, t) {
    if (t < 0)
        t += 1;
    if (t > 1)
        t -= 1;
    if (t < 1 / 6)
        return p + (q - p) * 6 * t;
    if (t < 1 / 2)
        return q;
    if (t < 2 / 3)
        return p + (q - p) * (2 / 3 - t) * 6;
    return p;
}
function hslaToRgba({ hue, saturation, lightness, alpha }) {
    hue /= 360;
    saturation /= 100;
    lightness /= 100;
    let red = 0;
    let green = 0;
    let blue = 0;
    if (!saturation) {
        red = green = blue = lightness;
    }
    else {
        const q = lightness < 0.5
            ? lightness * (1 + saturation)
            : lightness + saturation - lightness * saturation;
        const p = 2 * lightness - q;
        red = hueToRgb(p, q, hue + 1 / 3);
        green = hueToRgb(p, q, hue);
        blue = hueToRgb(p, q, hue - 1 / 3);
    }
    return {
        red: Math.round(red * 255),
        green: Math.round(green * 255),
        blue: Math.round(blue * 255),
        alpha,
    };
}


//# sourceMappingURL=hsla-to-rgba.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/value/types/color/hsla.mjs"
/*!********************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/value/types/color/hsla.mjs ***!
  \********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hsla: () => (/* binding */ hsla)
/* harmony export */ });
/* harmony import */ var _numbers_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../numbers/index.mjs */ "./node_modules/motion-dom/dist/es/value/types/numbers/index.mjs");
/* harmony import */ var _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../numbers/units.mjs */ "./node_modules/motion-dom/dist/es/value/types/numbers/units.mjs");
/* harmony import */ var _utils_sanitize_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/sanitize.mjs */ "./node_modules/motion-dom/dist/es/value/types/utils/sanitize.mjs");
/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils.mjs */ "./node_modules/motion-dom/dist/es/value/types/color/utils.mjs");





const hsla = {
    test: /*@__PURE__*/ (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_3__.isColorString)("hsl", "hue"),
    parse: /*@__PURE__*/ (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_3__.splitColor)("hue", "saturation", "lightness"),
    transform: ({ hue, saturation, lightness, alpha: alpha$1 = 1 }) => {
        return ("hsla(" +
            Math.round(hue) +
            ", " +
            _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__.percent.transform((0,_utils_sanitize_mjs__WEBPACK_IMPORTED_MODULE_2__.sanitize)(saturation)) +
            ", " +
            _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__.percent.transform((0,_utils_sanitize_mjs__WEBPACK_IMPORTED_MODULE_2__.sanitize)(lightness)) +
            ", " +
            (0,_utils_sanitize_mjs__WEBPACK_IMPORTED_MODULE_2__.sanitize)(_numbers_index_mjs__WEBPACK_IMPORTED_MODULE_0__.alpha.transform(alpha$1)) +
            ")");
    },
};


//# sourceMappingURL=hsla.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/value/types/color/index.mjs"
/*!*********************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/value/types/color/index.mjs ***!
  \*********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   color: () => (/* binding */ color)
/* harmony export */ });
/* harmony import */ var _hex_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hex.mjs */ "./node_modules/motion-dom/dist/es/value/types/color/hex.mjs");
/* harmony import */ var _hsla_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hsla.mjs */ "./node_modules/motion-dom/dist/es/value/types/color/hsla.mjs");
/* harmony import */ var _rgba_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rgba.mjs */ "./node_modules/motion-dom/dist/es/value/types/color/rgba.mjs");




const color = {
    test: (v) => _rgba_mjs__WEBPACK_IMPORTED_MODULE_2__.rgba.test(v) || _hex_mjs__WEBPACK_IMPORTED_MODULE_0__.hex.test(v) || _hsla_mjs__WEBPACK_IMPORTED_MODULE_1__.hsla.test(v),
    parse: (v) => {
        if (_rgba_mjs__WEBPACK_IMPORTED_MODULE_2__.rgba.test(v)) {
            return _rgba_mjs__WEBPACK_IMPORTED_MODULE_2__.rgba.parse(v);
        }
        else if (_hsla_mjs__WEBPACK_IMPORTED_MODULE_1__.hsla.test(v)) {
            return _hsla_mjs__WEBPACK_IMPORTED_MODULE_1__.hsla.parse(v);
        }
        else {
            return _hex_mjs__WEBPACK_IMPORTED_MODULE_0__.hex.parse(v);
        }
    },
    transform: (v) => {
        return typeof v === "string"
            ? v
            : v.hasOwnProperty("red")
                ? _rgba_mjs__WEBPACK_IMPORTED_MODULE_2__.rgba.transform(v)
                : _hsla_mjs__WEBPACK_IMPORTED_MODULE_1__.hsla.transform(v);
    },
    getAnimatableNone: (v) => {
        const parsed = color.parse(v);
        parsed.alpha = 0;
        return color.transform(parsed);
    },
};


//# sourceMappingURL=index.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/value/types/color/rgba.mjs"
/*!********************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/value/types/color/rgba.mjs ***!
  \********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   rgbUnit: () => (/* binding */ rgbUnit),
/* harmony export */   rgba: () => (/* binding */ rgba)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/clamp.mjs");
/* harmony import */ var _numbers_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../numbers/index.mjs */ "./node_modules/motion-dom/dist/es/value/types/numbers/index.mjs");
/* harmony import */ var _utils_sanitize_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/sanitize.mjs */ "./node_modules/motion-dom/dist/es/value/types/utils/sanitize.mjs");
/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils.mjs */ "./node_modules/motion-dom/dist/es/value/types/color/utils.mjs");





const clampRgbUnit = (v) => (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.clamp)(0, 255, v);
const rgbUnit = {
    ..._numbers_index_mjs__WEBPACK_IMPORTED_MODULE_1__.number,
    transform: (v) => Math.round(clampRgbUnit(v)),
};
const rgba = {
    test: /*@__PURE__*/ (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_3__.isColorString)("rgb", "red"),
    parse: /*@__PURE__*/ (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_3__.splitColor)("red", "green", "blue"),
    transform: ({ red, green, blue, alpha: alpha$1 = 1 }) => "rgba(" +
        rgbUnit.transform(red) +
        ", " +
        rgbUnit.transform(green) +
        ", " +
        rgbUnit.transform(blue) +
        ", " +
        (0,_utils_sanitize_mjs__WEBPACK_IMPORTED_MODULE_2__.sanitize)(_numbers_index_mjs__WEBPACK_IMPORTED_MODULE_1__.alpha.transform(alpha$1)) +
        ")",
};


//# sourceMappingURL=rgba.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/value/types/color/utils.mjs"
/*!*********************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/value/types/color/utils.mjs ***!
  \*********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isColorString: () => (/* binding */ isColorString),
/* harmony export */   splitColor: () => (/* binding */ splitColor)
/* harmony export */ });
/* harmony import */ var _utils_float_regex_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/float-regex.mjs */ "./node_modules/motion-dom/dist/es/value/types/utils/float-regex.mjs");
/* harmony import */ var _utils_is_nullish_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/is-nullish.mjs */ "./node_modules/motion-dom/dist/es/value/types/utils/is-nullish.mjs");
/* harmony import */ var _utils_single_color_regex_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/single-color-regex.mjs */ "./node_modules/motion-dom/dist/es/value/types/utils/single-color-regex.mjs");




/**
 * Returns true if the provided string is a color, ie rgba(0,0,0,0) or #000,
 * but false if a number or multiple colors
 */
const isColorString = (type, testProp) => (v) => {
    return Boolean((typeof v === "string" &&
        _utils_single_color_regex_mjs__WEBPACK_IMPORTED_MODULE_2__.singleColorRegex.test(v) &&
        v.startsWith(type)) ||
        (testProp &&
            !(0,_utils_is_nullish_mjs__WEBPACK_IMPORTED_MODULE_1__.isNullish)(v) &&
            Object.prototype.hasOwnProperty.call(v, testProp)));
};
const splitColor = (aName, bName, cName) => (v) => {
    if (typeof v !== "string")
        return v;
    const [a, b, c, alpha] = v.match(_utils_float_regex_mjs__WEBPACK_IMPORTED_MODULE_0__.floatRegex);
    return {
        [aName]: parseFloat(a),
        [bName]: parseFloat(b),
        [cName]: parseFloat(c),
        alpha: alpha !== undefined ? parseFloat(alpha) : 1,
    };
};


//# sourceMappingURL=utils.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/value/types/complex/filter.mjs"
/*!************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/value/types/complex/filter.mjs ***!
  \************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   filter: () => (/* binding */ filter)
/* harmony export */ });
/* harmony import */ var _index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.mjs */ "./node_modules/motion-dom/dist/es/value/types/complex/index.mjs");
/* harmony import */ var _utils_float_regex_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/float-regex.mjs */ "./node_modules/motion-dom/dist/es/value/types/utils/float-regex.mjs");



/**
 * Properties that should default to 1 or 100%
 */
const maxDefaults = new Set(["brightness", "contrast", "saturate", "opacity"]);
function applyDefaultFilter(v) {
    const [name, value] = v.slice(0, -1).split("(");
    if (name === "drop-shadow")
        return v;
    const [number] = value.match(_utils_float_regex_mjs__WEBPACK_IMPORTED_MODULE_1__.floatRegex) || [];
    if (!number)
        return v;
    const unit = value.replace(number, "");
    let defaultValue = maxDefaults.has(name) ? 1 : 0;
    if (number !== value)
        defaultValue *= 100;
    return name + "(" + defaultValue + unit + ")";
}
const functionRegex = /\b([a-z-]*)\(.*?\)/gu;
const filter = {
    ..._index_mjs__WEBPACK_IMPORTED_MODULE_0__.complex,
    getAnimatableNone: (v) => {
        const functions = v.match(functionRegex);
        return functions ? functions.map(applyDefaultFilter).join(" ") : v;
    },
};


//# sourceMappingURL=filter.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/value/types/complex/index.mjs"
/*!***********************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/value/types/complex/index.mjs ***!
  \***********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   analyseComplexValue: () => (/* binding */ analyseComplexValue),
/* harmony export */   complex: () => (/* binding */ complex)
/* harmony export */ });
/* harmony import */ var _color_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../color/index.mjs */ "./node_modules/motion-dom/dist/es/value/types/color/index.mjs");
/* harmony import */ var _utils_color_regex_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/color-regex.mjs */ "./node_modules/motion-dom/dist/es/value/types/utils/color-regex.mjs");
/* harmony import */ var _utils_float_regex_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/float-regex.mjs */ "./node_modules/motion-dom/dist/es/value/types/utils/float-regex.mjs");
/* harmony import */ var _utils_sanitize_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/sanitize.mjs */ "./node_modules/motion-dom/dist/es/value/types/utils/sanitize.mjs");





function test(v) {
    return (isNaN(v) &&
        typeof v === "string" &&
        (v.match(_utils_float_regex_mjs__WEBPACK_IMPORTED_MODULE_2__.floatRegex)?.length || 0) +
            (v.match(_utils_color_regex_mjs__WEBPACK_IMPORTED_MODULE_1__.colorRegex)?.length || 0) >
            0);
}
const NUMBER_TOKEN = "number";
const COLOR_TOKEN = "color";
const VAR_TOKEN = "var";
const VAR_FUNCTION_TOKEN = "var(";
const SPLIT_TOKEN = "${}";
// this regex consists of the `singleCssVariableRegex|rgbHSLValueRegex|digitRegex`
const complexRegex = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function analyseComplexValue(value) {
    const originalValue = value.toString();
    const values = [];
    const indexes = {
        color: [],
        number: [],
        var: [],
    };
    const types = [];
    let i = 0;
    const tokenised = originalValue.replace(complexRegex, (parsedValue) => {
        if (_color_index_mjs__WEBPACK_IMPORTED_MODULE_0__.color.test(parsedValue)) {
            indexes.color.push(i);
            types.push(COLOR_TOKEN);
            values.push(_color_index_mjs__WEBPACK_IMPORTED_MODULE_0__.color.parse(parsedValue));
        }
        else if (parsedValue.startsWith(VAR_FUNCTION_TOKEN)) {
            indexes.var.push(i);
            types.push(VAR_TOKEN);
            values.push(parsedValue);
        }
        else {
            indexes.number.push(i);
            types.push(NUMBER_TOKEN);
            values.push(parseFloat(parsedValue));
        }
        ++i;
        return SPLIT_TOKEN;
    });
    const split = tokenised.split(SPLIT_TOKEN);
    return { values, split, indexes, types };
}
function parseComplexValue(v) {
    return analyseComplexValue(v).values;
}
function buildTransformer({ split, types }) {
    const numSections = split.length;
    return (v) => {
        let output = "";
        for (let i = 0; i < numSections; i++) {
            output += split[i];
            if (v[i] !== undefined) {
                const type = types[i];
                if (type === NUMBER_TOKEN) {
                    output += (0,_utils_sanitize_mjs__WEBPACK_IMPORTED_MODULE_3__.sanitize)(v[i]);
                }
                else if (type === COLOR_TOKEN) {
                    output += _color_index_mjs__WEBPACK_IMPORTED_MODULE_0__.color.transform(v[i]);
                }
                else {
                    output += v[i];
                }
            }
        }
        return output;
    };
}
function createTransformer(source) {
    return buildTransformer(analyseComplexValue(source));
}
const convertNumbersToZero = (v) => typeof v === "number" ? 0 : _color_index_mjs__WEBPACK_IMPORTED_MODULE_0__.color.test(v) ? _color_index_mjs__WEBPACK_IMPORTED_MODULE_0__.color.getAnimatableNone(v) : v;
/**
 * Convert a parsed value to its zero equivalent, but preserve numbers
 * that act as divisors in CSS calc() expressions.
 *
 * analyseComplexValue extracts numbers from CSS strings and puts the
 * surrounding text into a `split` template array. For example:
 *   "calc(var(--gap) / 5)"  →  values: [var(--gap), 5]
 *                               split:  ["calc(", " / ", ")"]
 *
 * When building a zero-equivalent for animation, naively zeroing all
 * numbers turns the divisor into 0 → "calc(var(--gap) / 0)" → NaN.
 * We detect this by checking whether the text preceding a number
 * (split[i]) ends with "/" — the CSS calc division operator.
 */
const convertToZero = (value, splitBefore) => {
    if (typeof value === "number") {
        return splitBefore?.trim().endsWith("/") ? value : 0;
    }
    return convertNumbersToZero(value);
};
function getAnimatableNone(v) {
    const info = analyseComplexValue(v);
    const transformer = buildTransformer(info);
    return transformer(info.values.map((value, i) => convertToZero(value, info.split[i])));
}
const complex = {
    test,
    parse: parseComplexValue,
    createTransformer,
    getAnimatableNone,
};


//# sourceMappingURL=index.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/value/types/complex/mask.mjs"
/*!**********************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/value/types/complex/mask.mjs ***!
  \**********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mask: () => (/* binding */ mask)
/* harmony export */ });
/* harmony import */ var _index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.mjs */ "./node_modules/motion-dom/dist/es/value/types/complex/index.mjs");


const mask = {
    ..._index_mjs__WEBPACK_IMPORTED_MODULE_0__.complex,
    getAnimatableNone: (v) => {
        const parsed = _index_mjs__WEBPACK_IMPORTED_MODULE_0__.complex.parse(v);
        const transformer = _index_mjs__WEBPACK_IMPORTED_MODULE_0__.complex.createTransformer(v);
        return transformer(parsed.map((v) => typeof v === "number" ? 0 : typeof v === "object" ? { ...v, alpha: 1 } : v));
    },
};


//# sourceMappingURL=mask.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/value/types/dimensions.mjs"
/*!********************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/value/types/dimensions.mjs ***!
  \********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dimensionValueTypes: () => (/* binding */ dimensionValueTypes),
/* harmony export */   findDimensionValueType: () => (/* binding */ findDimensionValueType)
/* harmony export */ });
/* harmony import */ var _auto_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auto.mjs */ "./node_modules/motion-dom/dist/es/value/types/auto.mjs");
/* harmony import */ var _numbers_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./numbers/index.mjs */ "./node_modules/motion-dom/dist/es/value/types/numbers/index.mjs");
/* harmony import */ var _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./numbers/units.mjs */ "./node_modules/motion-dom/dist/es/value/types/numbers/units.mjs");
/* harmony import */ var _test_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./test.mjs */ "./node_modules/motion-dom/dist/es/value/types/test.mjs");





/**
 * A list of value types commonly used for dimensions
 */
const dimensionValueTypes = [_numbers_index_mjs__WEBPACK_IMPORTED_MODULE_1__.number, _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px, _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.percent, _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.degrees, _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.vw, _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.vh, _auto_mjs__WEBPACK_IMPORTED_MODULE_0__.auto];
/**
 * Tests a dimensional value against the list of dimension ValueTypes
 */
const findDimensionValueType = (v) => dimensionValueTypes.find((0,_test_mjs__WEBPACK_IMPORTED_MODULE_3__.testValueType)(v));


//# sourceMappingURL=dimensions.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/value/types/int.mjs"
/*!*************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/value/types/int.mjs ***!
  \*************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   int: () => (/* binding */ int)
/* harmony export */ });
/* harmony import */ var _numbers_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./numbers/index.mjs */ "./node_modules/motion-dom/dist/es/value/types/numbers/index.mjs");


const int = {
    ..._numbers_index_mjs__WEBPACK_IMPORTED_MODULE_0__.number,
    transform: Math.round,
};


//# sourceMappingURL=int.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/value/types/maps/defaults.mjs"
/*!***********************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/value/types/maps/defaults.mjs ***!
  \***********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultValueTypes: () => (/* binding */ defaultValueTypes),
/* harmony export */   getDefaultValueType: () => (/* binding */ getDefaultValueType)
/* harmony export */ });
/* harmony import */ var _color_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../color/index.mjs */ "./node_modules/motion-dom/dist/es/value/types/color/index.mjs");
/* harmony import */ var _complex_filter_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../complex/filter.mjs */ "./node_modules/motion-dom/dist/es/value/types/complex/filter.mjs");
/* harmony import */ var _complex_mask_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../complex/mask.mjs */ "./node_modules/motion-dom/dist/es/value/types/complex/mask.mjs");
/* harmony import */ var _number_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./number.mjs */ "./node_modules/motion-dom/dist/es/value/types/maps/number.mjs");





/**
 * A map of default value types for common values
 */
const defaultValueTypes = {
    ..._number_mjs__WEBPACK_IMPORTED_MODULE_3__.numberValueTypes,
    // Color props
    color: _color_index_mjs__WEBPACK_IMPORTED_MODULE_0__.color,
    backgroundColor: _color_index_mjs__WEBPACK_IMPORTED_MODULE_0__.color,
    outlineColor: _color_index_mjs__WEBPACK_IMPORTED_MODULE_0__.color,
    fill: _color_index_mjs__WEBPACK_IMPORTED_MODULE_0__.color,
    stroke: _color_index_mjs__WEBPACK_IMPORTED_MODULE_0__.color,
    // Border props
    borderColor: _color_index_mjs__WEBPACK_IMPORTED_MODULE_0__.color,
    borderTopColor: _color_index_mjs__WEBPACK_IMPORTED_MODULE_0__.color,
    borderRightColor: _color_index_mjs__WEBPACK_IMPORTED_MODULE_0__.color,
    borderBottomColor: _color_index_mjs__WEBPACK_IMPORTED_MODULE_0__.color,
    borderLeftColor: _color_index_mjs__WEBPACK_IMPORTED_MODULE_0__.color,
    filter: _complex_filter_mjs__WEBPACK_IMPORTED_MODULE_1__.filter,
    WebkitFilter: _complex_filter_mjs__WEBPACK_IMPORTED_MODULE_1__.filter,
    mask: _complex_mask_mjs__WEBPACK_IMPORTED_MODULE_2__.mask,
    WebkitMask: _complex_mask_mjs__WEBPACK_IMPORTED_MODULE_2__.mask,
};
/**
 * Gets the default ValueType for the provided value key
 */
const getDefaultValueType = (key) => defaultValueTypes[key];


//# sourceMappingURL=defaults.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/value/types/maps/number.mjs"
/*!*********************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/value/types/maps/number.mjs ***!
  \*********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   numberValueTypes: () => (/* binding */ numberValueTypes)
/* harmony export */ });
/* harmony import */ var _int_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../int.mjs */ "./node_modules/motion-dom/dist/es/value/types/int.mjs");
/* harmony import */ var _numbers_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../numbers/index.mjs */ "./node_modules/motion-dom/dist/es/value/types/numbers/index.mjs");
/* harmony import */ var _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../numbers/units.mjs */ "./node_modules/motion-dom/dist/es/value/types/numbers/units.mjs");
/* harmony import */ var _transform_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./transform.mjs */ "./node_modules/motion-dom/dist/es/value/types/maps/transform.mjs");





const numberValueTypes = {
    // Border props
    borderWidth: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    borderTopWidth: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    borderRightWidth: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    borderBottomWidth: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    borderLeftWidth: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    borderRadius: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    borderTopLeftRadius: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    borderTopRightRadius: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    borderBottomRightRadius: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    borderBottomLeftRadius: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    // Positioning props
    width: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    maxWidth: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    height: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    maxHeight: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    top: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    right: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    bottom: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    left: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    inset: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    insetBlock: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    insetBlockStart: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    insetBlockEnd: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    insetInline: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    insetInlineStart: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    insetInlineEnd: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    // Spacing props
    padding: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    paddingTop: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    paddingRight: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    paddingBottom: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    paddingLeft: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    paddingBlock: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    paddingBlockStart: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    paddingBlockEnd: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    paddingInline: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    paddingInlineStart: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    paddingInlineEnd: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    margin: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    marginTop: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    marginRight: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    marginBottom: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    marginLeft: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    marginBlock: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    marginBlockStart: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    marginBlockEnd: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    marginInline: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    marginInlineStart: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    marginInlineEnd: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    // Typography
    fontSize: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    // Misc
    backgroundPositionX: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    backgroundPositionY: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_2__.px,
    ..._transform_mjs__WEBPACK_IMPORTED_MODULE_3__.transformValueTypes,
    zIndex: _int_mjs__WEBPACK_IMPORTED_MODULE_0__.int,
    // SVG
    fillOpacity: _numbers_index_mjs__WEBPACK_IMPORTED_MODULE_1__.alpha,
    strokeOpacity: _numbers_index_mjs__WEBPACK_IMPORTED_MODULE_1__.alpha,
    numOctaves: _int_mjs__WEBPACK_IMPORTED_MODULE_0__.int,
};


//# sourceMappingURL=number.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/value/types/maps/transform.mjs"
/*!************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/value/types/maps/transform.mjs ***!
  \************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   transformValueTypes: () => (/* binding */ transformValueTypes)
/* harmony export */ });
/* harmony import */ var _numbers_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../numbers/index.mjs */ "./node_modules/motion-dom/dist/es/value/types/numbers/index.mjs");
/* harmony import */ var _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../numbers/units.mjs */ "./node_modules/motion-dom/dist/es/value/types/numbers/units.mjs");



const transformValueTypes = {
    rotate: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__.degrees,
    rotateX: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__.degrees,
    rotateY: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__.degrees,
    rotateZ: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__.degrees,
    scale: _numbers_index_mjs__WEBPACK_IMPORTED_MODULE_0__.scale,
    scaleX: _numbers_index_mjs__WEBPACK_IMPORTED_MODULE_0__.scale,
    scaleY: _numbers_index_mjs__WEBPACK_IMPORTED_MODULE_0__.scale,
    scaleZ: _numbers_index_mjs__WEBPACK_IMPORTED_MODULE_0__.scale,
    skew: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__.degrees,
    skewX: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__.degrees,
    skewY: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__.degrees,
    distance: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__.px,
    translateX: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__.px,
    translateY: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__.px,
    translateZ: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__.px,
    x: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__.px,
    y: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__.px,
    z: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__.px,
    perspective: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__.px,
    transformPerspective: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__.px,
    opacity: _numbers_index_mjs__WEBPACK_IMPORTED_MODULE_0__.alpha,
    originX: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__.progressPercentage,
    originY: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__.progressPercentage,
    originZ: _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__.px,
};


//# sourceMappingURL=transform.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/value/types/numbers/index.mjs"
/*!***********************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/value/types/numbers/index.mjs ***!
  \***********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   alpha: () => (/* binding */ alpha),
/* harmony export */   number: () => (/* binding */ number),
/* harmony export */   scale: () => (/* binding */ scale)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/clamp.mjs");


const number = {
    test: (v) => typeof v === "number",
    parse: parseFloat,
    transform: (v) => v,
};
const alpha = {
    ...number,
    transform: (v) => (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.clamp)(0, 1, v),
};
const scale = {
    ...number,
    default: 1,
};


//# sourceMappingURL=index.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/value/types/numbers/units.mjs"
/*!***********************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/value/types/numbers/units.mjs ***!
  \***********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   degrees: () => (/* binding */ degrees),
/* harmony export */   percent: () => (/* binding */ percent),
/* harmony export */   progressPercentage: () => (/* binding */ progressPercentage),
/* harmony export */   px: () => (/* binding */ px),
/* harmony export */   vh: () => (/* binding */ vh),
/* harmony export */   vw: () => (/* binding */ vw)
/* harmony export */ });
/*#__NO_SIDE_EFFECTS__*/
const createUnitType = (unit) => ({
    test: (v) => typeof v === "string" && v.endsWith(unit) && v.split(" ").length === 1,
    parse: parseFloat,
    transform: (v) => `${v}${unit}`,
});
const degrees = /*@__PURE__*/ createUnitType("deg");
const percent = /*@__PURE__*/ createUnitType("%");
const px = /*@__PURE__*/ createUnitType("px");
const vh = /*@__PURE__*/ createUnitType("vh");
const vw = /*@__PURE__*/ createUnitType("vw");
const progressPercentage = /*@__PURE__*/ (() => ({
    ...percent,
    parse: (v) => percent.parse(v) / 100,
    transform: (v) => percent.transform(v * 100),
}))();


//# sourceMappingURL=units.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/value/types/test.mjs"
/*!**************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/value/types/test.mjs ***!
  \**************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   testValueType: () => (/* binding */ testValueType)
/* harmony export */ });
/**
 * Tests a provided value against a ValueType
 */
const testValueType = (v) => (type) => type.test(v);


//# sourceMappingURL=test.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/value/types/utils/animatable-none.mjs"
/*!*******************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/value/types/utils/animatable-none.mjs ***!
  \*******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getAnimatableNone: () => (/* binding */ getAnimatableNone)
/* harmony export */ });
/* harmony import */ var _complex_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../complex/index.mjs */ "./node_modules/motion-dom/dist/es/value/types/complex/index.mjs");
/* harmony import */ var _complex_filter_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../complex/filter.mjs */ "./node_modules/motion-dom/dist/es/value/types/complex/filter.mjs");
/* harmony import */ var _complex_mask_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../complex/mask.mjs */ "./node_modules/motion-dom/dist/es/value/types/complex/mask.mjs");
/* harmony import */ var _maps_defaults_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../maps/defaults.mjs */ "./node_modules/motion-dom/dist/es/value/types/maps/defaults.mjs");





const customTypes = /*@__PURE__*/ new Set([_complex_filter_mjs__WEBPACK_IMPORTED_MODULE_1__.filter, _complex_mask_mjs__WEBPACK_IMPORTED_MODULE_2__.mask]);
function getAnimatableNone(key, value) {
    let defaultValueType = (0,_maps_defaults_mjs__WEBPACK_IMPORTED_MODULE_3__.getDefaultValueType)(key);
    if (!customTypes.has(defaultValueType))
        defaultValueType = _complex_index_mjs__WEBPACK_IMPORTED_MODULE_0__.complex;
    // If value is not recognised as animatable, ie "none", create an animatable version origin based on the target
    return defaultValueType.getAnimatableNone
        ? defaultValueType.getAnimatableNone(value)
        : undefined;
}


//# sourceMappingURL=animatable-none.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/value/types/utils/color-regex.mjs"
/*!***************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/value/types/utils/color-regex.mjs ***!
  \***************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   colorRegex: () => (/* binding */ colorRegex)
/* harmony export */ });
const colorRegex = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;


//# sourceMappingURL=color-regex.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/value/types/utils/find.mjs"
/*!********************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/value/types/utils/find.mjs ***!
  \********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   findValueType: () => (/* binding */ findValueType)
/* harmony export */ });
/* harmony import */ var _color_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../color/index.mjs */ "./node_modules/motion-dom/dist/es/value/types/color/index.mjs");
/* harmony import */ var _complex_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../complex/index.mjs */ "./node_modules/motion-dom/dist/es/value/types/complex/index.mjs");
/* harmony import */ var _dimensions_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dimensions.mjs */ "./node_modules/motion-dom/dist/es/value/types/dimensions.mjs");
/* harmony import */ var _test_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../test.mjs */ "./node_modules/motion-dom/dist/es/value/types/test.mjs");





/**
 * A list of all ValueTypes
 */
const valueTypes = [..._dimensions_mjs__WEBPACK_IMPORTED_MODULE_2__.dimensionValueTypes, _color_index_mjs__WEBPACK_IMPORTED_MODULE_0__.color, _complex_index_mjs__WEBPACK_IMPORTED_MODULE_1__.complex];
/**
 * Tests a value against the list of ValueTypes
 */
const findValueType = (v) => valueTypes.find((0,_test_mjs__WEBPACK_IMPORTED_MODULE_3__.testValueType)(v));


//# sourceMappingURL=find.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/value/types/utils/float-regex.mjs"
/*!***************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/value/types/utils/float-regex.mjs ***!
  \***************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   floatRegex: () => (/* binding */ floatRegex)
/* harmony export */ });
const floatRegex = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;


//# sourceMappingURL=float-regex.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/value/types/utils/get-as-type.mjs"
/*!***************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/value/types/utils/get-as-type.mjs ***!
  \***************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getValueAsType: () => (/* binding */ getValueAsType)
/* harmony export */ });
/**
 * Provided a value and a ValueType, returns the value as that value type.
 */
const getValueAsType = (value, type) => {
    return type && typeof value === "number"
        ? type.transform(value)
        : value;
};


//# sourceMappingURL=get-as-type.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/value/types/utils/is-nullish.mjs"
/*!**************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/value/types/utils/is-nullish.mjs ***!
  \**************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isNullish: () => (/* binding */ isNullish)
/* harmony export */ });
function isNullish(v) {
    return v == null;
}


//# sourceMappingURL=is-nullish.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/value/types/utils/sanitize.mjs"
/*!************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/value/types/utils/sanitize.mjs ***!
  \************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   sanitize: () => (/* binding */ sanitize)
/* harmony export */ });
// If this number is a decimal, make it just five decimal places
// to avoid exponents
const sanitize = (v) => Math.round(v * 100000) / 100000;


//# sourceMappingURL=sanitize.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/value/types/utils/single-color-regex.mjs"
/*!**********************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/value/types/utils/single-color-regex.mjs ***!
  \**********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   singleColorRegex: () => (/* binding */ singleColorRegex)
/* harmony export */ });
const singleColorRegex = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu;


//# sourceMappingURL=single-color-regex.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs"
/*!*************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs ***!
  \*************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isMotionValue: () => (/* binding */ isMotionValue)
/* harmony export */ });
const isMotionValue = (value) => Boolean(value && value.getVelocity);


//# sourceMappingURL=is-motion-value.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/value/will-change/add-will-change.mjs"
/*!*******************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/value/will-change/add-will-change.mjs ***!
  \*******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addValueToWillChange: () => (/* binding */ addValueToWillChange)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/global-config.mjs");
/* harmony import */ var _is_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./is.mjs */ "./node_modules/motion-dom/dist/es/value/will-change/is.mjs");



function addValueToWillChange(visualElement, key) {
    const willChange = visualElement.getValue("willChange");
    /**
     * It could be that a user has set willChange to a regular MotionValue,
     * in which case we can't add the value to it.
     */
    if ((0,_is_mjs__WEBPACK_IMPORTED_MODULE_1__.isWillChangeMotionValue)(willChange)) {
        return willChange.add(key);
    }
    else if (!willChange && motion_utils__WEBPACK_IMPORTED_MODULE_0__.MotionGlobalConfig.WillChange) {
        const newWillChange = new motion_utils__WEBPACK_IMPORTED_MODULE_0__.MotionGlobalConfig.WillChange("auto");
        visualElement.addValue("willChange", newWillChange);
        newWillChange.add(key);
    }
}


//# sourceMappingURL=add-will-change.mjs.map


/***/ },

/***/ "./node_modules/motion-dom/dist/es/value/will-change/is.mjs"
/*!******************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/value/will-change/is.mjs ***!
  \******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isWillChangeMotionValue: () => (/* binding */ isWillChangeMotionValue)
/* harmony export */ });
/* harmony import */ var _utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/is-motion-value.mjs */ "./node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs");


function isWillChangeMotionValue(value) {
    return Boolean((0,_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_0__.isMotionValue)(value) && value.add);
}


//# sourceMappingURL=is.mjs.map


/***/ },

/***/ "./node_modules/motion-utils/dist/es/array.mjs"
/*!*****************************************************!*\
  !*** ./node_modules/motion-utils/dist/es/array.mjs ***!
  \*****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addUniqueItem: () => (/* binding */ addUniqueItem),
/* harmony export */   moveItem: () => (/* binding */ moveItem),
/* harmony export */   removeItem: () => (/* binding */ removeItem)
/* harmony export */ });
function addUniqueItem(arr, item) {
    if (arr.indexOf(item) === -1)
        arr.push(item);
}
function removeItem(arr, item) {
    const index = arr.indexOf(item);
    if (index > -1)
        arr.splice(index, 1);
}
// Adapted from array-move
function moveItem([...arr], fromIndex, toIndex) {
    const startIndex = fromIndex < 0 ? arr.length + fromIndex : fromIndex;
    if (startIndex >= 0 && startIndex < arr.length) {
        const endIndex = toIndex < 0 ? arr.length + toIndex : toIndex;
        const [item] = arr.splice(fromIndex, 1);
        arr.splice(endIndex, 0, item);
    }
    return arr;
}


//# sourceMappingURL=array.mjs.map


/***/ },

/***/ "./node_modules/motion-utils/dist/es/clamp.mjs"
/*!*****************************************************!*\
  !*** ./node_modules/motion-utils/dist/es/clamp.mjs ***!
  \*****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clamp: () => (/* binding */ clamp)
/* harmony export */ });
const clamp = (min, max, v) => {
    if (v > max)
        return max;
    if (v < min)
        return min;
    return v;
};


//# sourceMappingURL=clamp.mjs.map


/***/ },

/***/ "./node_modules/motion-utils/dist/es/easing/anticipate.mjs"
/*!*****************************************************************!*\
  !*** ./node_modules/motion-utils/dist/es/easing/anticipate.mjs ***!
  \*****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   anticipate: () => (/* binding */ anticipate)
/* harmony export */ });
/* harmony import */ var _back_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./back.mjs */ "./node_modules/motion-utils/dist/es/easing/back.mjs");


const anticipate = (p) => p >= 1
    ? 1
    : (p *= 2) < 1
        ? 0.5 * (0,_back_mjs__WEBPACK_IMPORTED_MODULE_0__.backIn)(p)
        : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));


//# sourceMappingURL=anticipate.mjs.map


/***/ },

/***/ "./node_modules/motion-utils/dist/es/easing/back.mjs"
/*!***********************************************************!*\
  !*** ./node_modules/motion-utils/dist/es/easing/back.mjs ***!
  \***********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   backIn: () => (/* binding */ backIn),
/* harmony export */   backInOut: () => (/* binding */ backInOut),
/* harmony export */   backOut: () => (/* binding */ backOut)
/* harmony export */ });
/* harmony import */ var _cubic_bezier_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cubic-bezier.mjs */ "./node_modules/motion-utils/dist/es/easing/cubic-bezier.mjs");
/* harmony import */ var _modifiers_mirror_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/mirror.mjs */ "./node_modules/motion-utils/dist/es/easing/modifiers/mirror.mjs");
/* harmony import */ var _modifiers_reverse_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modifiers/reverse.mjs */ "./node_modules/motion-utils/dist/es/easing/modifiers/reverse.mjs");




const backOut = /*@__PURE__*/ (0,_cubic_bezier_mjs__WEBPACK_IMPORTED_MODULE_0__.cubicBezier)(0.33, 1.53, 0.69, 0.99);
const backIn = /*@__PURE__*/ (0,_modifiers_reverse_mjs__WEBPACK_IMPORTED_MODULE_2__.reverseEasing)(backOut);
const backInOut = /*@__PURE__*/ (0,_modifiers_mirror_mjs__WEBPACK_IMPORTED_MODULE_1__.mirrorEasing)(backIn);


//# sourceMappingURL=back.mjs.map


/***/ },

/***/ "./node_modules/motion-utils/dist/es/easing/circ.mjs"
/*!***********************************************************!*\
  !*** ./node_modules/motion-utils/dist/es/easing/circ.mjs ***!
  \***********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   circIn: () => (/* binding */ circIn),
/* harmony export */   circInOut: () => (/* binding */ circInOut),
/* harmony export */   circOut: () => (/* binding */ circOut)
/* harmony export */ });
/* harmony import */ var _modifiers_mirror_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modifiers/mirror.mjs */ "./node_modules/motion-utils/dist/es/easing/modifiers/mirror.mjs");
/* harmony import */ var _modifiers_reverse_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/reverse.mjs */ "./node_modules/motion-utils/dist/es/easing/modifiers/reverse.mjs");



const circIn = (p) => 1 - Math.sin(Math.acos(p));
const circOut = (0,_modifiers_reverse_mjs__WEBPACK_IMPORTED_MODULE_1__.reverseEasing)(circIn);
const circInOut = (0,_modifiers_mirror_mjs__WEBPACK_IMPORTED_MODULE_0__.mirrorEasing)(circIn);


//# sourceMappingURL=circ.mjs.map


/***/ },

/***/ "./node_modules/motion-utils/dist/es/easing/cubic-bezier.mjs"
/*!*******************************************************************!*\
  !*** ./node_modules/motion-utils/dist/es/easing/cubic-bezier.mjs ***!
  \*******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cubicBezier: () => (/* binding */ cubicBezier)
/* harmony export */ });
/* harmony import */ var _noop_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../noop.mjs */ "./node_modules/motion-utils/dist/es/noop.mjs");


/*
  Bezier function generator
  This has been modified from Gaëtan Renaudeau's BezierEasing
  https://github.com/gre/bezier-easing/blob/master/src/index.js
  https://github.com/gre/bezier-easing/blob/master/LICENSE
  
  I've removed the newtonRaphsonIterate algo because in benchmarking it
  wasn't noticeably faster than binarySubdivision, indeed removing it
  usually improved times, depending on the curve.
  I also removed the lookup table, as for the added bundle size and loop we're
  only cutting ~4 or so subdivision iterations. I bumped the max iterations up
  to 12 to compensate and this still tended to be faster for no perceivable
  loss in accuracy.
  Usage
    const easeOut = cubicBezier(.17,.67,.83,.67);
    const x = easeOut(0.5); // returns 0.627...
*/
// Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
const calcBezier = (t, a1, a2) => (((1.0 - 3.0 * a2 + 3.0 * a1) * t + (3.0 * a2 - 6.0 * a1)) * t + 3.0 * a1) *
    t;
const subdivisionPrecision = 0.0000001;
const subdivisionMaxIterations = 12;
function binarySubdivide(x, lowerBound, upperBound, mX1, mX2) {
    let currentX;
    let currentT;
    let i = 0;
    do {
        currentT = lowerBound + (upperBound - lowerBound) / 2.0;
        currentX = calcBezier(currentT, mX1, mX2) - x;
        if (currentX > 0.0) {
            upperBound = currentT;
        }
        else {
            lowerBound = currentT;
        }
    } while (Math.abs(currentX) > subdivisionPrecision &&
        ++i < subdivisionMaxIterations);
    return currentT;
}
function cubicBezier(mX1, mY1, mX2, mY2) {
    // If this is a linear gradient, return linear easing
    if (mX1 === mY1 && mX2 === mY2)
        return _noop_mjs__WEBPACK_IMPORTED_MODULE_0__.noop;
    const getTForX = (aX) => binarySubdivide(aX, 0, 1, mX1, mX2);
    // If animation is at start/end, return t without easing
    return (t) => t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
}


//# sourceMappingURL=cubic-bezier.mjs.map


/***/ },

/***/ "./node_modules/motion-utils/dist/es/easing/ease.mjs"
/*!***********************************************************!*\
  !*** ./node_modules/motion-utils/dist/es/easing/ease.mjs ***!
  \***********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   easeIn: () => (/* binding */ easeIn),
/* harmony export */   easeInOut: () => (/* binding */ easeInOut),
/* harmony export */   easeOut: () => (/* binding */ easeOut)
/* harmony export */ });
/* harmony import */ var _cubic_bezier_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cubic-bezier.mjs */ "./node_modules/motion-utils/dist/es/easing/cubic-bezier.mjs");


const easeIn = /*@__PURE__*/ (0,_cubic_bezier_mjs__WEBPACK_IMPORTED_MODULE_0__.cubicBezier)(0.42, 0, 1, 1);
const easeOut = /*@__PURE__*/ (0,_cubic_bezier_mjs__WEBPACK_IMPORTED_MODULE_0__.cubicBezier)(0, 0, 0.58, 1);
const easeInOut = /*@__PURE__*/ (0,_cubic_bezier_mjs__WEBPACK_IMPORTED_MODULE_0__.cubicBezier)(0.42, 0, 0.58, 1);


//# sourceMappingURL=ease.mjs.map


/***/ },

/***/ "./node_modules/motion-utils/dist/es/easing/modifiers/mirror.mjs"
/*!***********************************************************************!*\
  !*** ./node_modules/motion-utils/dist/es/easing/modifiers/mirror.mjs ***!
  \***********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mirrorEasing: () => (/* binding */ mirrorEasing)
/* harmony export */ });
// Accepts an easing function and returns a new one that outputs mirrored values for
// the second half of the animation. Turns easeIn into easeInOut.
const mirrorEasing = (easing) => (p) => p <= 0.5 ? easing(2 * p) / 2 : (2 - easing(2 * (1 - p))) / 2;


//# sourceMappingURL=mirror.mjs.map


/***/ },

/***/ "./node_modules/motion-utils/dist/es/easing/modifiers/reverse.mjs"
/*!************************************************************************!*\
  !*** ./node_modules/motion-utils/dist/es/easing/modifiers/reverse.mjs ***!
  \************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   reverseEasing: () => (/* binding */ reverseEasing)
/* harmony export */ });
// Accepts an easing function and returns a new one that outputs reversed values.
// Turns easeIn into easeOut.
const reverseEasing = (easing) => (p) => 1 - easing(1 - p);


//# sourceMappingURL=reverse.mjs.map


/***/ },

/***/ "./node_modules/motion-utils/dist/es/easing/utils/get-easing-for-segment.mjs"
/*!***********************************************************************************!*\
  !*** ./node_modules/motion-utils/dist/es/easing/utils/get-easing-for-segment.mjs ***!
  \***********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getEasingForSegment: () => (/* binding */ getEasingForSegment)
/* harmony export */ });
/* harmony import */ var _wrap_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../wrap.mjs */ "./node_modules/motion-utils/dist/es/wrap.mjs");
/* harmony import */ var _is_easing_array_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./is-easing-array.mjs */ "./node_modules/motion-utils/dist/es/easing/utils/is-easing-array.mjs");



function getEasingForSegment(easing, i) {
    return (0,_is_easing_array_mjs__WEBPACK_IMPORTED_MODULE_1__.isEasingArray)(easing) ? easing[(0,_wrap_mjs__WEBPACK_IMPORTED_MODULE_0__.wrap)(0, easing.length, i)] : easing;
}


//# sourceMappingURL=get-easing-for-segment.mjs.map


/***/ },

/***/ "./node_modules/motion-utils/dist/es/easing/utils/is-bezier-definition.mjs"
/*!*********************************************************************************!*\
  !*** ./node_modules/motion-utils/dist/es/easing/utils/is-bezier-definition.mjs ***!
  \*********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isBezierDefinition: () => (/* binding */ isBezierDefinition)
/* harmony export */ });
const isBezierDefinition = (easing) => Array.isArray(easing) && typeof easing[0] === "number";


//# sourceMappingURL=is-bezier-definition.mjs.map


/***/ },

/***/ "./node_modules/motion-utils/dist/es/easing/utils/is-easing-array.mjs"
/*!****************************************************************************!*\
  !*** ./node_modules/motion-utils/dist/es/easing/utils/is-easing-array.mjs ***!
  \****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isEasingArray: () => (/* binding */ isEasingArray)
/* harmony export */ });
const isEasingArray = (ease) => {
    return Array.isArray(ease) && typeof ease[0] !== "number";
};


//# sourceMappingURL=is-easing-array.mjs.map


/***/ },

/***/ "./node_modules/motion-utils/dist/es/easing/utils/map.mjs"
/*!****************************************************************!*\
  !*** ./node_modules/motion-utils/dist/es/easing/utils/map.mjs ***!
  \****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   easingDefinitionToFunction: () => (/* binding */ easingDefinitionToFunction)
/* harmony export */ });
/* harmony import */ var _errors_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../errors.mjs */ "./node_modules/motion-utils/dist/es/errors.mjs");
/* harmony import */ var _noop_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../noop.mjs */ "./node_modules/motion-utils/dist/es/noop.mjs");
/* harmony import */ var _anticipate_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../anticipate.mjs */ "./node_modules/motion-utils/dist/es/easing/anticipate.mjs");
/* harmony import */ var _back_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../back.mjs */ "./node_modules/motion-utils/dist/es/easing/back.mjs");
/* harmony import */ var _circ_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../circ.mjs */ "./node_modules/motion-utils/dist/es/easing/circ.mjs");
/* harmony import */ var _cubic_bezier_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../cubic-bezier.mjs */ "./node_modules/motion-utils/dist/es/easing/cubic-bezier.mjs");
/* harmony import */ var _ease_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../ease.mjs */ "./node_modules/motion-utils/dist/es/easing/ease.mjs");
/* harmony import */ var _is_bezier_definition_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./is-bezier-definition.mjs */ "./node_modules/motion-utils/dist/es/easing/utils/is-bezier-definition.mjs");









const easingLookup = {
    linear: _noop_mjs__WEBPACK_IMPORTED_MODULE_1__.noop,
    easeIn: _ease_mjs__WEBPACK_IMPORTED_MODULE_6__.easeIn,
    easeInOut: _ease_mjs__WEBPACK_IMPORTED_MODULE_6__.easeInOut,
    easeOut: _ease_mjs__WEBPACK_IMPORTED_MODULE_6__.easeOut,
    circIn: _circ_mjs__WEBPACK_IMPORTED_MODULE_4__.circIn,
    circInOut: _circ_mjs__WEBPACK_IMPORTED_MODULE_4__.circInOut,
    circOut: _circ_mjs__WEBPACK_IMPORTED_MODULE_4__.circOut,
    backIn: _back_mjs__WEBPACK_IMPORTED_MODULE_3__.backIn,
    backInOut: _back_mjs__WEBPACK_IMPORTED_MODULE_3__.backInOut,
    backOut: _back_mjs__WEBPACK_IMPORTED_MODULE_3__.backOut,
    anticipate: _anticipate_mjs__WEBPACK_IMPORTED_MODULE_2__.anticipate,
};
const isValidEasing = (easing) => {
    return typeof easing === "string";
};
const easingDefinitionToFunction = (definition) => {
    if ((0,_is_bezier_definition_mjs__WEBPACK_IMPORTED_MODULE_7__.isBezierDefinition)(definition)) {
        // If cubic bezier definition, create bezier curve
        (0,_errors_mjs__WEBPACK_IMPORTED_MODULE_0__.invariant)(definition.length === 4, `Cubic bezier arrays must contain four numerical values.`, "cubic-bezier-length");
        const [x1, y1, x2, y2] = definition;
        return (0,_cubic_bezier_mjs__WEBPACK_IMPORTED_MODULE_5__.cubicBezier)(x1, y1, x2, y2);
    }
    else if (isValidEasing(definition)) {
        // Else lookup from table
        (0,_errors_mjs__WEBPACK_IMPORTED_MODULE_0__.invariant)(easingLookup[definition] !== undefined, `Invalid easing type '${definition}'`, "invalid-easing-type");
        return easingLookup[definition];
    }
    return definition;
};


//# sourceMappingURL=map.mjs.map


/***/ },

/***/ "./node_modules/motion-utils/dist/es/errors.mjs"
/*!******************************************************!*\
  !*** ./node_modules/motion-utils/dist/es/errors.mjs ***!
  \******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   invariant: () => (/* binding */ invariant),
/* harmony export */   warning: () => (/* binding */ warning)
/* harmony export */ });
/* harmony import */ var _format_error_message_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./format-error-message.mjs */ "./node_modules/motion-utils/dist/es/format-error-message.mjs");


let warning = () => { };
let invariant = () => { };
if (typeof process !== "undefined" &&
    "development" !== "production") {
    warning = (check, message, errorCode) => {
        if (!check && typeof console !== "undefined") {
            console.warn((0,_format_error_message_mjs__WEBPACK_IMPORTED_MODULE_0__.formatErrorMessage)(message, errorCode));
        }
    };
    invariant = (check, message, errorCode) => {
        if (!check) {
            throw new Error((0,_format_error_message_mjs__WEBPACK_IMPORTED_MODULE_0__.formatErrorMessage)(message, errorCode));
        }
    };
}


//# sourceMappingURL=errors.mjs.map


/***/ },

/***/ "./node_modules/motion-utils/dist/es/format-error-message.mjs"
/*!********************************************************************!*\
  !*** ./node_modules/motion-utils/dist/es/format-error-message.mjs ***!
  \********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatErrorMessage: () => (/* binding */ formatErrorMessage)
/* harmony export */ });
function formatErrorMessage(message, errorCode) {
    return errorCode
        ? `${message}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${errorCode}`
        : message;
}


//# sourceMappingURL=format-error-message.mjs.map


/***/ },

/***/ "./node_modules/motion-utils/dist/es/global-config.mjs"
/*!*************************************************************!*\
  !*** ./node_modules/motion-utils/dist/es/global-config.mjs ***!
  \*************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MotionGlobalConfig: () => (/* binding */ MotionGlobalConfig)
/* harmony export */ });
const MotionGlobalConfig = {};


//# sourceMappingURL=global-config.mjs.map


/***/ },

/***/ "./node_modules/motion-utils/dist/es/is-numerical-string.mjs"
/*!*******************************************************************!*\
  !*** ./node_modules/motion-utils/dist/es/is-numerical-string.mjs ***!
  \*******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isNumericalString: () => (/* binding */ isNumericalString)
/* harmony export */ });
/**
 * Check if value is a numerical string, ie a string that is purely a number eg "100" or "-100.1"
 */
const isNumericalString = (v) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(v);


//# sourceMappingURL=is-numerical-string.mjs.map


/***/ },

/***/ "./node_modules/motion-utils/dist/es/is-object.mjs"
/*!*********************************************************!*\
  !*** ./node_modules/motion-utils/dist/es/is-object.mjs ***!
  \*********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isObject: () => (/* binding */ isObject)
/* harmony export */ });
function isObject(value) {
    return typeof value === "object" && value !== null;
}


//# sourceMappingURL=is-object.mjs.map


/***/ },

/***/ "./node_modules/motion-utils/dist/es/is-zero-value-string.mjs"
/*!********************************************************************!*\
  !*** ./node_modules/motion-utils/dist/es/is-zero-value-string.mjs ***!
  \********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isZeroValueString: () => (/* binding */ isZeroValueString)
/* harmony export */ });
/**
 * Check if the value is a zero value string like "0px" or "0%"
 */
const isZeroValueString = (v) => /^0[^.\s]+$/u.test(v);


//# sourceMappingURL=is-zero-value-string.mjs.map


/***/ },

/***/ "./node_modules/motion-utils/dist/es/memo.mjs"
/*!****************************************************!*\
  !*** ./node_modules/motion-utils/dist/es/memo.mjs ***!
  \****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   memo: () => (/* binding */ memo)
/* harmony export */ });
/*#__NO_SIDE_EFFECTS__*/
function memo(callback) {
    let result;
    return () => {
        if (result === undefined)
            result = callback();
        return result;
    };
}


//# sourceMappingURL=memo.mjs.map


/***/ },

/***/ "./node_modules/motion-utils/dist/es/noop.mjs"
/*!****************************************************!*\
  !*** ./node_modules/motion-utils/dist/es/noop.mjs ***!
  \****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   noop: () => (/* binding */ noop)
/* harmony export */ });
/*#__NO_SIDE_EFFECTS__*/
const noop = (any) => any;


//# sourceMappingURL=noop.mjs.map


/***/ },

/***/ "./node_modules/motion-utils/dist/es/pipe.mjs"
/*!****************************************************!*\
  !*** ./node_modules/motion-utils/dist/es/pipe.mjs ***!
  \****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   pipe: () => (/* binding */ pipe)
/* harmony export */ });
/**
 * Pipe
 * Compose other transformers to run linearily
 * pipe(min(20), max(40))
 * @param  {...functions} transformers
 * @return {function}
 */
const combineFunctions = (a, b) => (v) => b(a(v));
const pipe = (...transformers) => transformers.reduce(combineFunctions);


//# sourceMappingURL=pipe.mjs.map


/***/ },

/***/ "./node_modules/motion-utils/dist/es/progress.mjs"
/*!********************************************************!*\
  !*** ./node_modules/motion-utils/dist/es/progress.mjs ***!
  \********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   progress: () => (/* binding */ progress)
/* harmony export */ });
/*
  Progress within given range

  Given a lower limit and an upper limit, we return the progress
  (expressed as a number 0-1) represented by the given value, and
  limit that progress to within 0-1.

  @param [number]: Lower limit
  @param [number]: Upper limit
  @param [number]: Value to find progress within given range
  @return [number]: Progress of value within range as expressed 0-1
*/
/*#__NO_SIDE_EFFECTS__*/
const progress = (from, to, value) => {
    const toFromDifference = to - from;
    return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
};


//# sourceMappingURL=progress.mjs.map


/***/ },

/***/ "./node_modules/motion-utils/dist/es/subscription-manager.mjs"
/*!********************************************************************!*\
  !*** ./node_modules/motion-utils/dist/es/subscription-manager.mjs ***!
  \********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SubscriptionManager: () => (/* binding */ SubscriptionManager)
/* harmony export */ });
/* harmony import */ var _array_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./array.mjs */ "./node_modules/motion-utils/dist/es/array.mjs");


class SubscriptionManager {
    constructor() {
        this.subscriptions = [];
    }
    add(handler) {
        (0,_array_mjs__WEBPACK_IMPORTED_MODULE_0__.addUniqueItem)(this.subscriptions, handler);
        return () => (0,_array_mjs__WEBPACK_IMPORTED_MODULE_0__.removeItem)(this.subscriptions, handler);
    }
    notify(a, b, c) {
        const numSubscriptions = this.subscriptions.length;
        if (!numSubscriptions)
            return;
        if (numSubscriptions === 1) {
            /**
             * If there's only a single handler we can just call it without invoking a loop.
             */
            this.subscriptions[0](a, b, c);
        }
        else {
            for (let i = 0; i < numSubscriptions; i++) {
                /**
                 * Check whether the handler exists before firing as it's possible
                 * the subscriptions were modified during this loop running.
                 */
                const handler = this.subscriptions[i];
                handler && handler(a, b, c);
            }
        }
    }
    getSize() {
        return this.subscriptions.length;
    }
    clear() {
        this.subscriptions.length = 0;
    }
}


//# sourceMappingURL=subscription-manager.mjs.map


/***/ },

/***/ "./node_modules/motion-utils/dist/es/time-conversion.mjs"
/*!***************************************************************!*\
  !*** ./node_modules/motion-utils/dist/es/time-conversion.mjs ***!
  \***************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   millisecondsToSeconds: () => (/* binding */ millisecondsToSeconds),
/* harmony export */   secondsToMilliseconds: () => (/* binding */ secondsToMilliseconds)
/* harmony export */ });
/**
 * Converts seconds to milliseconds
 *
 * @param seconds - Time in seconds.
 * @return milliseconds - Converted time in milliseconds.
 */
/*#__NO_SIDE_EFFECTS__*/
const secondsToMilliseconds = (seconds) => seconds * 1000;
/*#__NO_SIDE_EFFECTS__*/
const millisecondsToSeconds = (milliseconds) => milliseconds / 1000;


//# sourceMappingURL=time-conversion.mjs.map


/***/ },

/***/ "./node_modules/motion-utils/dist/es/velocity-per-second.mjs"
/*!*******************************************************************!*\
  !*** ./node_modules/motion-utils/dist/es/velocity-per-second.mjs ***!
  \*******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   velocityPerSecond: () => (/* binding */ velocityPerSecond)
/* harmony export */ });
/*
  Convert velocity into velocity per second

  @param [number]: Unit per frame
  @param [number]: Frame duration in ms
*/
function velocityPerSecond(velocity, frameDuration) {
    return frameDuration ? velocity * (1000 / frameDuration) : 0;
}


//# sourceMappingURL=velocity-per-second.mjs.map


/***/ },

/***/ "./node_modules/motion-utils/dist/es/warn-once.mjs"
/*!*********************************************************!*\
  !*** ./node_modules/motion-utils/dist/es/warn-once.mjs ***!
  \*********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hasWarned: () => (/* binding */ hasWarned),
/* harmony export */   warnOnce: () => (/* binding */ warnOnce)
/* harmony export */ });
/* harmony import */ var _format_error_message_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./format-error-message.mjs */ "./node_modules/motion-utils/dist/es/format-error-message.mjs");


const warned = new Set();
function hasWarned(message) {
    return warned.has(message);
}
function warnOnce(condition, message, errorCode) {
    if (condition || warned.has(message))
        return;
    console.warn((0,_format_error_message_mjs__WEBPACK_IMPORTED_MODULE_0__.formatErrorMessage)(message, errorCode));
    warned.add(message);
}


//# sourceMappingURL=warn-once.mjs.map


/***/ },

/***/ "./node_modules/motion-utils/dist/es/wrap.mjs"
/*!****************************************************!*\
  !*** ./node_modules/motion-utils/dist/es/wrap.mjs ***!
  \****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   wrap: () => (/* binding */ wrap)
/* harmony export */ });
const wrap = (min, max, v) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};


//# sourceMappingURL=wrap.mjs.map


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
/*!*******************************************!*\
  !*** ./src/blocks/call-to-action/view.js ***!
  \*******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var motion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion */ "./node_modules/framer-motion/dist/es/animation/animate/index.mjs");
/* harmony import */ var motion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! motion */ "./node_modules/framer-motion/dist/es/render/dom/viewport/index.mjs");


// 1. Animate the SVG Container (Rotate and Scale)
(0,motion__WEBPACK_IMPORTED_MODULE_1__.inView)("[data-motion='svg-container']", ({
  target
}) => {
  (0,motion__WEBPACK_IMPORTED_MODULE_0__.animate)(target, {
    rotate: [-5, 0],
    scale: [0.9, 1],
    opacity: [0, 0.1]
  }, {
    duration: 1.5,
    easing: "ease-out"
  });
});

// 2. Animate the Paths (Draw effect)
(0,motion__WEBPACK_IMPORTED_MODULE_1__.inView)("[data-motion='path-anim']", entry => {
  // entry is the IntersectionObserverEntry object
  const target = entry.target;

  // Safety check: Ensure the target exists and has the dataset
  if (!target || !target.dataset) return;

  // Get the delay from data-motion-delay
  const delay = parseFloat(target.dataset.motionDelay) || 0;

  // IMPORTANT: Ensure this is a path/circle/rect/polyline
  if (typeof target.getTotalLength !== "function") {
    console.error("Target is not a drawable SVG element:", target);
    return;
  }
  const length = target.getTotalLength();

  // Set initial state
  target.style.strokeDasharray = length;
  target.style.strokeDashoffset = length;

  // Trigger animation
  (0,motion__WEBPACK_IMPORTED_MODULE_0__.animate)(target, {
    strokeDashoffset: 0
  }, {
    duration: 2,
    delay: delay,
    easing: "ease-in-out"
  });

  // Optional: return a cleanup function so it only animates once
  return () => {
    // This ensures the animation doesn't "reset" if the user scrolls away/back
  };
});
})();

/******/ })()
;
//# sourceMappingURL=view.js.map