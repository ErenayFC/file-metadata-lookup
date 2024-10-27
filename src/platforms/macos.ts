import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import plist from 'plist';

const execFileP = promisify(execFile);

const parsePlist = (data: string) => {
    if (!data) {
        return {};
    }
    const object = plist.parse(data);
    const returnValue: Record<string, any> = {};
    for (let [key, value] of Object.entries(object)) {
        key = key.replace(/^kMDItem/, '').replace(/_/g, '');
        key = key.startsWith('FS') ? key.replace(/^FS/, 'fs') : key[0].toLowerCase() + key.slice(1);
        returnValue[key] = value;
    }
    return returnValue;
};

export const getMacOSMetadata = async (filePath: string) => {
    const { stdout } = await execFileP('mdls', ['-plist', '-', filePath]);
    return parsePlist(stdout.trim());
};
