"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processMarkdown = void 0;
/* eslint-disable no-continue */
const path_1 = require("path");
const markdown_it_1 = __importDefault(require("markdown-it"));
const core_1 = require("@lollygag/core");
function processMarkdown(content, options, data) {
    return (0, markdown_it_1.default)(options || {}).render(content || '', data);
}
exports.processMarkdown = processMarkdown;
function markdown(options) {
    return function markdownWorker(files, lollygag) {
        if (!files)
            return;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const targetExtnames = [
                ...['.md', '.html'],
                ...((options === null || options === void 0 ? void 0 : options.targetExtnames) || []),
            ];
            if (!targetExtnames.includes((0, path_1.extname)(file.path))) {
                continue;
            }
            if ((options === null || options === void 0 ? void 0 : options.newExtname) !== false) {
                file.path = (0, core_1.changeExtname)(file.path, (options === null || options === void 0 ? void 0 : options.newExtname) || '.html');
            }
            const data = Object.assign(Object.assign({}, lollygag._config), file);
            const mdOptions = Object.assign({ html: true }, options === null || options === void 0 ? void 0 : options.markdownOptions);
            file.content = processMarkdown(file.content || '', mdOptions, data);
        }
    };
}
exports.default = markdown;
