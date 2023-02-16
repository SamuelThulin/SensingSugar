/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./node_modules/@next/font/google/target.css?{\"path\":\"src/theme/index.ts\",\"import\":\"Syne_Mono\",\"arguments\":[{\"subsets\":[\"latin\"],\"weight\":\"400\",\"style\":\"normal\",\"display\":\"block\"}],\"variableName\":\"syneMono\"}":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@next/font/google/target.css?{"path":"src/theme/index.ts","import":"Syne_Mono","arguments":[{"subsets":["latin"],"weight":"400","style":"normal","display":"block"}],"variableName":"syneMono"} ***!
  \**********************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

eval("// Exports\nmodule.exports = {\n\t\"style\": {\"fontFamily\":\"'__Syne_Mono_8e3791', '__Syne_Mono_Fallback_8e3791'\",\"fontWeight\":400,\"fontStyle\":\"normal\"},\n\t\"className\": \"__className_8e3791\"\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvQG5leHQvZm9udC9nb29nbGUvdGFyZ2V0LmNzcz97XCJwYXRoXCI6XCJzcmMvdGhlbWUvaW5kZXgudHNcIixcImltcG9ydFwiOlwiU3luZV9Nb25vXCIsXCJhcmd1bWVudHNcIjpbe1wic3Vic2V0c1wiOltcImxhdGluXCJdLFwid2VpZ2h0XCI6XCI0MDBcIixcInN0eWxlXCI6XCJub3JtYWxcIixcImRpc3BsYXlcIjpcImJsb2NrXCJ9XSxcInZhcmlhYmxlTmFtZVwiOlwic3luZU1vbm9cIn0uanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBLFdBQVcseUdBQXlHO0FBQ3BIO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXh0anMvLi9ub2RlX21vZHVsZXMvQG5leHQvZm9udC9nb29nbGUvdGFyZ2V0LmNzcz8wYzZiIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEV4cG9ydHNcbm1vZHVsZS5leHBvcnRzID0ge1xuXHRcInN0eWxlXCI6IHtcImZvbnRGYW1pbHlcIjpcIidfX1N5bmVfTW9ub184ZTM3OTEnLCAnX19TeW5lX01vbm9fRmFsbGJhY2tfOGUzNzkxJ1wiLFwiZm9udFdlaWdodFwiOjQwMCxcImZvbnRTdHlsZVwiOlwibm9ybWFsXCJ9LFxuXHRcImNsYXNzTmFtZVwiOiBcIl9fY2xhc3NOYW1lXzhlMzc5MVwiXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/@next/font/google/target.css?{\"path\":\"src/theme/index.ts\",\"import\":\"Syne_Mono\",\"arguments\":[{\"subsets\":[\"latin\"],\"weight\":\"400\",\"style\":\"normal\",\"display\":\"block\"}],\"variableName\":\"syneMono\"}\n");

/***/ }),

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/react */ \"@emotion/react\");\n/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _mui_material_CssBaseline__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material/CssBaseline */ \"@mui/material/CssBaseline\");\n/* harmony import */ var _mui_material_CssBaseline__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material_CssBaseline__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material/styles */ \"@mui/material/styles\");\n/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material_styles__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/head */ \"next/head\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _src_theme__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../src/theme */ \"./src/theme/index.ts\");\n/* harmony import */ var _src_theme_createEmotionCache__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../src/theme/createEmotionCache */ \"./src/theme/createEmotionCache.ts\");\n/* harmony import */ var next_i18next__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! next-i18next */ \"next-i18next\");\n/* harmony import */ var next_i18next__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_i18next__WEBPACK_IMPORTED_MODULE_7__);\n\n\n\n\n\n\n\n\n// import nextI18NextConfig from '../next-i18next.config.js'\n// Client-side cache, shared for the whole session of the user in the browser.\nconst clientSideEmotionCache = (0,_src_theme_createEmotionCache__WEBPACK_IMPORTED_MODULE_6__[\"default\"])();\nconst MyApp = (props)=>{\n    const { Component , emotionCache =clientSideEmotionCache , pageProps  } = props;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_emotion_react__WEBPACK_IMPORTED_MODULE_1__.CacheProvider, {\n        value: emotionCache,\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_4___default()), {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                    name: \"viewport\",\n                    content: \"initial-scale=1, width=device-width\"\n                }, void 0, false, {\n                    fileName: \"/Users/lucaju/locahost/SensingSugar/pages/_app.tsx\",\n                    lineNumber: 25,\n                    columnNumber: 5\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/Users/lucaju/locahost/SensingSugar/pages/_app.tsx\",\n                lineNumber: 24,\n                columnNumber: 4\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material_styles__WEBPACK_IMPORTED_MODULE_3__.ThemeProvider, {\n                theme: (0,_src_theme__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(true),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((_mui_material_CssBaseline__WEBPACK_IMPORTED_MODULE_2___default()), {}, void 0, false, {\n                        fileName: \"/Users/lucaju/locahost/SensingSugar/pages/_app.tsx\",\n                        lineNumber: 28,\n                        columnNumber: 5\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                        ...pageProps\n                    }, void 0, false, {\n                        fileName: \"/Users/lucaju/locahost/SensingSugar/pages/_app.tsx\",\n                        lineNumber: 29,\n                        columnNumber: 5\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/lucaju/locahost/SensingSugar/pages/_app.tsx\",\n                lineNumber: 27,\n                columnNumber: 4\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/lucaju/locahost/SensingSugar/pages/_app.tsx\",\n        lineNumber: 23,\n        columnNumber: 3\n    }, undefined);\n};\n// https://github.com/i18next/next-i18next#unserialisable-configs\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_i18next__WEBPACK_IMPORTED_MODULE_7__.appWithTranslation)(MyApp /*, nextI18NextConfig */ ));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQTZEO0FBQ1Q7QUFDQztBQUN4QjtBQUNJO0FBQ2dDO0FBRWY7QUFFbEQsNERBQTREO0FBRTVELDhFQUE4RTtBQUM5RSxNQUFNTyx5QkFBeUJGLHlFQUFrQkE7QUFNakQsTUFBTUcsUUFBUSxDQUFDQyxRQUFzQjtJQUNwQyxNQUFNLEVBQUVDLFVBQVMsRUFBRUMsY0FBZUosdUJBQXNCLEVBQUVLLFVBQVMsRUFBRSxHQUFHSDtJQUV4RSxxQkFDQyw4REFBQ1QseURBQWFBO1FBQUNhLE9BQU9GOzswQkFDckIsOERBQUNSLGtEQUFJQTswQkFDSiw0RUFBQ1c7b0JBQUtDLE1BQUs7b0JBQVdDLFNBQVE7Ozs7Ozs7Ozs7OzBCQUUvQiw4REFBQ2QsK0RBQWFBO2dCQUFDRSxPQUFPQSxzREFBS0EsQ0FBQyxJQUFJOztrQ0FDL0IsOERBQUNILGtFQUFXQTs7Ozs7a0NBQ1osOERBQUNTO3dCQUFXLEdBQUdFLFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUk1QjtBQUVBLGlFQUFpRTtBQUNqRSxpRUFBZU4sZ0VBQWtCQSxDQUFDRSxNQUFNLHNCQUFzQixNQUFJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV4dGpzLy4vcGFnZXMvX2FwcC50c3g/MmZiZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDYWNoZVByb3ZpZGVyLCBFbW90aW9uQ2FjaGUgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgQ3NzQmFzZWxpbmUgZnJvbSAnQG11aS9tYXRlcmlhbC9Dc3NCYXNlbGluZSc7XG5pbXBvcnQgeyBUaGVtZVByb3ZpZGVyIH0gZnJvbSAnQG11aS9tYXRlcmlhbC9zdHlsZXMnO1xuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJztcbmltcG9ydCB0aGVtZSBmcm9tICcuLi9zcmMvdGhlbWUnO1xuaW1wb3J0IGNyZWF0ZUVtb3Rpb25DYWNoZSBmcm9tICcuLi9zcmMvdGhlbWUvY3JlYXRlRW1vdGlvbkNhY2hlJztcblxuaW1wb3J0IHsgYXBwV2l0aFRyYW5zbGF0aW9uIH0gZnJvbSAnbmV4dC1pMThuZXh0JztcbmltcG9ydCB0eXBlIHsgQXBwUHJvcHMgfSBmcm9tICduZXh0L2FwcCc7XG4vLyBpbXBvcnQgbmV4dEkxOE5leHRDb25maWcgZnJvbSAnLi4vbmV4dC1pMThuZXh0LmNvbmZpZy5qcydcblxuLy8gQ2xpZW50LXNpZGUgY2FjaGUsIHNoYXJlZCBmb3IgdGhlIHdob2xlIHNlc3Npb24gb2YgdGhlIHVzZXIgaW4gdGhlIGJyb3dzZXIuXG5jb25zdCBjbGllbnRTaWRlRW1vdGlvbkNhY2hlID0gY3JlYXRlRW1vdGlvbkNhY2hlKCk7XG5cbmludGVyZmFjZSBNeUFwcFByb3BzIGV4dGVuZHMgQXBwUHJvcHMge1xuXHRlbW90aW9uQ2FjaGU6IEVtb3Rpb25DYWNoZTtcbn1cblxuY29uc3QgTXlBcHAgPSAocHJvcHM6IE15QXBwUHJvcHMpID0+IHtcblx0Y29uc3QgeyBDb21wb25lbnQsIGVtb3Rpb25DYWNoZSA9IGNsaWVudFNpZGVFbW90aW9uQ2FjaGUsIHBhZ2VQcm9wcyB9ID0gcHJvcHM7XG5cblx0cmV0dXJuIChcblx0XHQ8Q2FjaGVQcm92aWRlciB2YWx1ZT17ZW1vdGlvbkNhY2hlfT5cblx0XHRcdDxIZWFkPlxuXHRcdFx0XHQ8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwiaW5pdGlhbC1zY2FsZT0xLCB3aWR0aD1kZXZpY2Utd2lkdGhcIiAvPlxuXHRcdFx0PC9IZWFkPlxuXHRcdFx0PFRoZW1lUHJvdmlkZXIgdGhlbWU9e3RoZW1lKHRydWUpfT5cblx0XHRcdFx0PENzc0Jhc2VsaW5lIC8+XG5cdFx0XHRcdDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cblx0XHRcdDwvVGhlbWVQcm92aWRlcj5cblx0XHQ8L0NhY2hlUHJvdmlkZXI+XG5cdCk7XG59O1xuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vaTE4bmV4dC9uZXh0LWkxOG5leHQjdW5zZXJpYWxpc2FibGUtY29uZmlnc1xuZXhwb3J0IGRlZmF1bHQgYXBwV2l0aFRyYW5zbGF0aW9uKE15QXBwIC8qLCBuZXh0STE4TmV4dENvbmZpZyAqLyk7XG4iXSwibmFtZXMiOlsiQ2FjaGVQcm92aWRlciIsIkNzc0Jhc2VsaW5lIiwiVGhlbWVQcm92aWRlciIsIkhlYWQiLCJ0aGVtZSIsImNyZWF0ZUVtb3Rpb25DYWNoZSIsImFwcFdpdGhUcmFuc2xhdGlvbiIsImNsaWVudFNpZGVFbW90aW9uQ2FjaGUiLCJNeUFwcCIsInByb3BzIiwiQ29tcG9uZW50IiwiZW1vdGlvbkNhY2hlIiwicGFnZVByb3BzIiwidmFsdWUiLCJtZXRhIiwibmFtZSIsImNvbnRlbnQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "./src/theme/createEmotionCache.ts":
/*!*****************************************!*\
  !*** ./src/theme/createEmotionCache.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ createEmotionCache)\n/* harmony export */ });\n/* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/cache */ \"@emotion/cache\");\n/* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_cache__WEBPACK_IMPORTED_MODULE_0__);\n\nconst isBrowser = typeof document !== \"undefined\";\n// On the client side, Create a meta tag at the top of the <head> and set it as insertionPoint.\n// This assures that MUI styles are loaded first.\n// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.\nfunction createEmotionCache() {\n    let insertionPoint;\n    if (isBrowser) {\n        const emotionInsertionPoint = document.querySelector('meta[name=\"emotion-insertion-point\"]');\n        insertionPoint = emotionInsertionPoint ?? undefined;\n    }\n    return _emotion_cache__WEBPACK_IMPORTED_MODULE_0___default()({\n        key: \"mui-style\",\n        insertionPoint\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdGhlbWUvY3JlYXRlRW1vdGlvbkNhY2hlLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUF5QztBQUV6QyxNQUFNQyxZQUFZLE9BQU9DLGFBQWE7QUFFdEMsK0ZBQStGO0FBQy9GLGlEQUFpRDtBQUNqRCxxR0FBcUc7QUFDdEYsU0FBU0MscUJBQXFCO0lBQzVDLElBQUlDO0lBRUosSUFBSUgsV0FBVztRQUNkLE1BQU1JLHdCQUF3QkgsU0FBU0ksYUFBYSxDQUFDO1FBQ3JERixpQkFBaUJDLHlCQUF5QkU7SUFDM0MsQ0FBQztJQUVELE9BQU9QLHFEQUFXQSxDQUFDO1FBQUVRLEtBQUs7UUFBYUo7SUFBZTtBQUN2RCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV4dGpzLy4vc3JjL3RoZW1lL2NyZWF0ZUVtb3Rpb25DYWNoZS50cz80OWY5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjcmVhdGVDYWNoZSBmcm9tICdAZW1vdGlvbi9jYWNoZSc7XG5cbmNvbnN0IGlzQnJvd3NlciA9IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCc7XG5cbi8vIE9uIHRoZSBjbGllbnQgc2lkZSwgQ3JlYXRlIGEgbWV0YSB0YWcgYXQgdGhlIHRvcCBvZiB0aGUgPGhlYWQ+IGFuZCBzZXQgaXQgYXMgaW5zZXJ0aW9uUG9pbnQuXG4vLyBUaGlzIGFzc3VyZXMgdGhhdCBNVUkgc3R5bGVzIGFyZSBsb2FkZWQgZmlyc3QuXG4vLyBJdCBhbGxvd3MgZGV2ZWxvcGVycyB0byBlYXNpbHkgb3ZlcnJpZGUgTVVJIHN0eWxlcyB3aXRoIG90aGVyIHN0eWxpbmcgc29sdXRpb25zLCBsaWtlIENTUyBtb2R1bGVzLlxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlRW1vdGlvbkNhY2hlKCkge1xuXHRsZXQgaW5zZXJ0aW9uUG9pbnQ6IEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkO1xuXG5cdGlmIChpc0Jyb3dzZXIpIHtcblx0XHRjb25zdCBlbW90aW9uSW5zZXJ0aW9uUG9pbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9XCJlbW90aW9uLWluc2VydGlvbi1wb2ludFwiXScpIGFzIEhUTUxFbGVtZW50O1xuXHRcdGluc2VydGlvblBvaW50ID0gZW1vdGlvbkluc2VydGlvblBvaW50ID8/IHVuZGVmaW5lZDtcblx0fVxuXG5cdHJldHVybiBjcmVhdGVDYWNoZSh7IGtleTogJ211aS1zdHlsZScsIGluc2VydGlvblBvaW50IH0pO1xufVxuIl0sIm5hbWVzIjpbImNyZWF0ZUNhY2hlIiwiaXNCcm93c2VyIiwiZG9jdW1lbnQiLCJjcmVhdGVFbW90aW9uQ2FjaGUiLCJpbnNlcnRpb25Qb2ludCIsImVtb3Rpb25JbnNlcnRpb25Qb2ludCIsInF1ZXJ5U2VsZWN0b3IiLCJ1bmRlZmluZWQiLCJrZXkiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/theme/createEmotionCache.ts\n");

/***/ }),

/***/ "./src/theme/index.ts":
/*!****************************!*\
  !*** ./src/theme/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _next_font_google_target_css_path_src_theme_index_ts_import_Syne_Mono_arguments_subsets_latin_weight_400_style_normal_display_block_variableName_syneMono___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @next/font/google/target.css?{\"path\":\"src/theme/index.ts\",\"import\":\"Syne_Mono\",\"arguments\":[{\"subsets\":[\"latin\"],\"weight\":\"400\",\"style\":\"normal\",\"display\":\"block\"}],\"variableName\":\"syneMono\"} */ \"./node_modules/@next/font/google/target.css?{\\\"path\\\":\\\"src/theme/index.ts\\\",\\\"import\\\":\\\"Syne_Mono\\\",\\\"arguments\\\":[{\\\"subsets\\\":[\\\"latin\\\"],\\\"weight\\\":\\\"400\\\",\\\"style\\\":\\\"normal\\\",\\\"display\\\":\\\"block\\\"}],\\\"variableName\\\":\\\"syneMono\\\"}\");\n/* harmony import */ var _next_font_google_target_css_path_src_theme_index_ts_import_Syne_Mono_arguments_subsets_latin_weight_400_style_normal_display_block_variableName_syneMono___WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_next_font_google_target_css_path_src_theme_index_ts_import_Syne_Mono_arguments_subsets_latin_weight_400_style_normal_display_block_variableName_syneMono___WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mui/material */ \"@mui/material\");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_0__);\n\n\nconst theme = (darkMode)=>(0,_mui_material__WEBPACK_IMPORTED_MODULE_0__.createTheme)({\n        palette: {\n            mode: darkMode ? \"dark\" : \"light\",\n            primary: {\n                main: _mui_material__WEBPACK_IMPORTED_MODULE_0__.colors.deepOrange[500]\n            },\n            secondary: {\n                main: _mui_material__WEBPACK_IMPORTED_MODULE_0__.colors.amber[400]\n            }\n        },\n        typography: {\n            fontFamily: `${(_next_font_google_target_css_path_src_theme_index_ts_import_Syne_Mono_arguments_subsets_latin_weight_400_style_normal_display_block_variableName_syneMono___WEBPACK_IMPORTED_MODULE_1___default().style.fontFamily)}, Helvetica, Arial, sans-serif`\n        },\n        components: {\n            MuiCssBaseline: {\n                styleOverrides: `\n        @font-face {\n          font-family: '${(_next_font_google_target_css_path_src_theme_index_ts_import_Syne_Mono_arguments_subsets_latin_weight_400_style_normal_display_block_variableName_syneMono___WEBPACK_IMPORTED_MODULE_1___default().style.fontFamily)}';\n          font-style: ${(_next_font_google_target_css_path_src_theme_index_ts_import_Syne_Mono_arguments_subsets_latin_weight_400_style_normal_display_block_variableName_syneMono___WEBPACK_IMPORTED_MODULE_1___default().style.fontStyle)};\n          font-weight: ${(_next_font_google_target_css_path_src_theme_index_ts_import_Syne_Mono_arguments_subsets_latin_weight_400_style_normal_display_block_variableName_syneMono___WEBPACK_IMPORTED_MODULE_1___default().style.fontWeight)};\n          src: \"local('Syne Mono'), local('Syne Mono'), url(${(_next_font_google_target_css_path_src_theme_index_ts_import_Syne_Mono_arguments_subsets_latin_weight_400_style_normal_display_block_variableName_syneMono___WEBPACK_IMPORTED_MODULE_1___default())})\";\n        }\n      `\n            }\n        }\n    });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (theme);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdGhlbWUvaW5kZXgudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFHTUE7QUFIOEM7QUFLcEQsTUFBTUcsUUFBUSxDQUFDQyxXQUNkRiwwREFBV0EsQ0FBQztRQUNYRyxTQUFTO1lBQ1JDLE1BQU1GLFdBQVcsU0FBUyxPQUFPO1lBQ2pDRyxTQUFTO2dCQUNSQyxNQUFNUCxpRUFBc0I7WUFDN0I7WUFDQVMsV0FBVztnQkFDVkYsTUFBTVAsNERBQWlCO1lBQ3hCO1FBQ0Q7UUFDQVcsWUFBWTtZQUNYQyxZQUFZLENBQUMsRUFBRWIsb05BQXlCLENBQUMsOEJBQThCLENBQUM7UUFDekU7UUFDQWUsWUFBWTtZQUNYQyxnQkFBZ0I7Z0JBQ2ZDLGdCQUFnQixDQUFDOzt3QkFFRyxFQUFFakIsb05BQXlCLENBQUM7c0JBQzlCLEVBQUVBLG1OQUF3QixDQUFDO3VCQUMxQixFQUFFQSxvTkFBeUIsQ0FBQzs0REFDUyxFQUFFQSxtTUFBUUEsQ0FBQzs7TUFFakUsQ0FBQztZQUNKO1FBQ0Q7SUFDRDtBQUVELGlFQUFlRyxLQUFLQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV4dGpzLy4vc3JjL3RoZW1lL2luZGV4LnRzP2NjYjMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29sb3JzLCBjcmVhdGVUaGVtZSB9IGZyb20gJ0BtdWkvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgU3luZV9Nb25vIH0gZnJvbSAnQG5leHQvZm9udC9nb29nbGUnO1xuXG5jb25zdCBzeW5lTW9ubyA9IFN5bmVfTW9ubyh7IHN1YnNldHM6IFsnbGF0aW4nXSwgd2VpZ2h0OiAnNDAwJywgc3R5bGU6ICdub3JtYWwnLCBkaXNwbGF5OiAnYmxvY2snIH0pO1xuXG5jb25zdCB0aGVtZSA9IChkYXJrTW9kZT86IGJvb2xlYW4pID0+XG5cdGNyZWF0ZVRoZW1lKHtcblx0XHRwYWxldHRlOiB7XG5cdFx0XHRtb2RlOiBkYXJrTW9kZSA/ICdkYXJrJyA6ICdsaWdodCcsXG5cdFx0XHRwcmltYXJ5OiB7XG5cdFx0XHRcdG1haW46IGNvbG9ycy5kZWVwT3JhbmdlWzUwMF0sXG5cdFx0XHR9LFxuXHRcdFx0c2Vjb25kYXJ5OiB7XG5cdFx0XHRcdG1haW46IGNvbG9ycy5hbWJlcls0MDBdLFxuXHRcdFx0fSxcblx0XHR9LFxuXHRcdHR5cG9ncmFwaHk6IHtcblx0XHRcdGZvbnRGYW1pbHk6IGAke3N5bmVNb25vLnN0eWxlLmZvbnRGYW1pbHl9LCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmYCxcblx0XHR9LFxuXHRcdGNvbXBvbmVudHM6IHtcblx0XHRcdE11aUNzc0Jhc2VsaW5lOiB7XG5cdFx0XHRcdHN0eWxlT3ZlcnJpZGVzOiBgXG4gICAgICAgIEBmb250LWZhY2Uge1xuICAgICAgICAgIGZvbnQtZmFtaWx5OiAnJHtzeW5lTW9uby5zdHlsZS5mb250RmFtaWx5fSc7XG4gICAgICAgICAgZm9udC1zdHlsZTogJHtzeW5lTW9uby5zdHlsZS5mb250U3R5bGV9O1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiAke3N5bmVNb25vLnN0eWxlLmZvbnRXZWlnaHR9O1xuICAgICAgICAgIHNyYzogXCJsb2NhbCgnU3luZSBNb25vJyksIGxvY2FsKCdTeW5lIE1vbm8nKSwgdXJsKCR7c3luZU1vbm99KVwiO1xuICAgICAgICB9XG4gICAgICBgLFxuXHRcdFx0fSxcblx0XHR9LFxuXHR9KTtcblxuZXhwb3J0IGRlZmF1bHQgdGhlbWU7XG4iXSwibmFtZXMiOlsic3luZU1vbm8iLCJjb2xvcnMiLCJjcmVhdGVUaGVtZSIsInRoZW1lIiwiZGFya01vZGUiLCJwYWxldHRlIiwibW9kZSIsInByaW1hcnkiLCJtYWluIiwiZGVlcE9yYW5nZSIsInNlY29uZGFyeSIsImFtYmVyIiwidHlwb2dyYXBoeSIsImZvbnRGYW1pbHkiLCJzdHlsZSIsImNvbXBvbmVudHMiLCJNdWlDc3NCYXNlbGluZSIsInN0eWxlT3ZlcnJpZGVzIiwiZm9udFN0eWxlIiwiZm9udFdlaWdodCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/theme/index.ts\n");

/***/ }),

/***/ "@emotion/cache":
/*!*********************************!*\
  !*** external "@emotion/cache" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@emotion/cache");

/***/ }),

/***/ "@emotion/react":
/*!*********************************!*\
  !*** external "@emotion/react" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@emotion/react");

/***/ }),

/***/ "@mui/material":
/*!********************************!*\
  !*** external "@mui/material" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material");

/***/ }),

/***/ "@mui/material/CssBaseline":
/*!********************************************!*\
  !*** external "@mui/material/CssBaseline" ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/CssBaseline");

/***/ }),

/***/ "@mui/material/styles":
/*!***************************************!*\
  !*** external "@mui/material/styles" ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/styles");

/***/ }),

/***/ "next-i18next":
/*!*******************************!*\
  !*** external "next-i18next" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("next-i18next");

/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.tsx"));
module.exports = __webpack_exports__;

})();