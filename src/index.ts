const os = require('node:os');
const path = require('node:path');
const callsite = require('callsite');

const { getMacOSMetadata } = require('./platforms/macos');
const { getLinuxMetadata } = require('./platforms/linux');
const { getWindowsMetadata } = require('./platforms/windows');

const getCallerDirectory = () => {
    const stack = callsite();
    const caller = stack[2];
    
    if (!caller) {
        return process.cwd();
    }

    return path.dirname(caller.getFileName());
};

async function fileMetadata(filePath: string) {
    const platform = os.platform();
    const callerDir = getCallerDirectory();
    const absoluteFilePath = path.resolve(callerDir, filePath);

    if (platform === 'darwin') {
        return await getMacOSMetadata(absoluteFilePath);
    } else if (platform === 'linux') {
        return await getLinuxMetadata(absoluteFilePath);
    } else if (platform === 'win32') {
        return await getWindowsMetadata(absoluteFilePath);
    } else {
        throw new Error(`Unsupported platform: ${platform}`);
    }
}

module.exports = { fileMetadata };