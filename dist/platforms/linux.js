"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLinuxMetadata = void 0;
const node_child_process_1 = require("node:child_process");
const node_util_1 = require("node:util");
const execFileP = (0, node_util_1.promisify)(node_child_process_1.execFile);
const parseLinuxStat = (data) => {
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
const getLinuxMetadata = async (filePath) => {
    const { stdout } = await execFileP('stat', ['-c', '%n\n%z\n%F\n%s\n%U\n%G\n%a', filePath]);
    return parseLinuxStat(stdout.trim());
};
exports.getLinuxMetadata = getLinuxMetadata;
