"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWindowsMetadata = void 0;
const node_child_process_1 = require("node:child_process");
const node_util_1 = require("node:util");
const node_path_1 = __importDefault(require("node:path"));
const execFileP = (0, node_util_1.promisify)(node_child_process_1.execFile);
const parseWindowsMetadata = (data) => {
    const lines = data.split('\n');
    const returnValue = {};
    lines.forEach(line => {
        const [key, value] = line.split(':');
        if (key && value) {
            const formattedKey = key.trim().replace(/\s+/g, '_').toLowerCase();
            returnValue[formattedKey] = value.trim();
        }
    });
    return returnValue;
};
const getWindowsMetadata = async (filePath) => {
    const absolutePath = node_path_1.default.resolve(filePath);
    const { stdout } = await execFileP('powershell', [
        '-Command',
        `Get-ItemProperty "${absolutePath}" | Format-List`,
    ]);
    return parseWindowsMetadata(stdout.trim());
};
exports.getWindowsMetadata = getWindowsMetadata;
