import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileP = promisify(execFile);

const parseLinuxStat = (data: string) => {
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

export const getLinuxMetadata = async (filePath: string) => {
    const { stdout } = await execFileP('stat', ['-c', '%n\n%z\n%F\n%s\n%U\n%G\n%a', filePath]);
    return parseLinuxStat(stdout.trim());
};
