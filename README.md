# File Metadata Lookup

`File Metadata Lookup` is a cross-platform utility to retrieve file metadata using native system tools on macOS, Linux, and Windows. It is written in TypeScript and provides an easy-to-use API for retrieving metadata in different environments.

## Features

- Retrieves file metadata using native tools:
  - `mdls` on macOS
  - `stat` on Linux
  - `Get-ItemProperty` on Windows (PowerShell)
- Modular structure for easy extension.
- TypeScript support.

## Installation

```bash
npm install file-metadata-lookup
```

## Usage

```typescript
import { fileMetadata } from 'file-metadata-lookup';

(async () => {
  const metadata = await fileMetadata('test.txt');
  console.log(metadata);
})();
```

## License

[MIT](LICENSE)
