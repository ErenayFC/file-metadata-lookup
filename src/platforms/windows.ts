import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';

const execFileP = promisify(execFile);

const parseWindowsMetadata = (data: string) => {
    const lines = data.split('\n');
    const returnValue: Record<string, any> = {};
    lines.forEach(line => {
        const [key, value] = line.split(':');
        if (key && value) {
            const formattedKey = key.trim().replace(/\s+/g, '_').toLowerCase();
            returnValue[formattedKey] = value.trim();
        }
    });
    return returnValue;
};

export const getWindowsMetadata = async (filePath: string) => {
    const absolutePath = path.resolve(filePath);
    const { stdout } = await execFileP('powershell', [
        '-Command',
        `Get-ItemProperty "${absolutePath}" | Format-List`,
    ]);
    return parseWindowsMetadata(stdout.trim());
};
