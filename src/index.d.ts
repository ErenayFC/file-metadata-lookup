/**
 * Platform-specific metadata for a file
 */
interface FileMetadata {
    [key: string]: string | number | boolean | Date | undefined;
}

/**
 * Retrieves metadata for a file based on the current operating system.
 * 
 * @param filePath - The path to the file (absolute or relative to the caller's directory)
 * @throws {Error} If the file does not exist
 * @throws {Error} If the platform is not supported (currently supports macOS, Linux, and Windows)
 * @returns Promise<FileMetadata> Platform-specific metadata for the file
 * 
 * @example
 * ```typescript
 * import { fileMetadata } from 'file-metadata-lookup';
 * 
 * // Get metadata for a file
 * const metadata = await fileMetadata('./example.txt');
 * ```
 */
export function fileMetadata(filePath: string): Promise<FileMetadata>;

/**
 * Platform-specific metadata functions
 * These are internal functions, not meant to be used directly
 */
export declare namespace PlatformMetadata {
    function getMacOSMetadata(filePath: string): Promise<FileMetadata>;
    function getLinuxMetadata(filePath: string): Promise<FileMetadata>;
    function getWindowsMetadata(filePath: string): Promise<FileMetadata>;
}

export default fileMetadata;