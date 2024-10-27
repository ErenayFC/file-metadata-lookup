"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMacOSMetadata = void 0;
const node_child_process_1 = require("node:child_process");
const node_util_1 = require("node:util");
const plist_1 = __importDefault(require("plist"));
const execFileP = (0, node_util_1.promisify)(node_child_process_1.execFile);
const parsePlist = (data) => {
    if (!data) {
        return {};
    }
    const object = plist_1.default.parse(data);
    const returnValue = {};
    for (let [key, value] of Object.entries(object)) {
        key = key.replace(/^kMDItem/, '').replace(/_/g, '');
        key = key.startsWith('FS') ? key.replace(/^FS/, 'fs') : key[0].toLowerCase() + key.slice(1);
        returnValue[key] = value;
    }
    return returnValue;
};
const getMacOSMetadata = async (filePath) => {
    const { stdout } = await execFileP('mdls', ['-plist', '-', filePath]);
    return parsePlist(stdout.trim());
};
exports.getMacOSMetadata = getMacOSMetadata;
