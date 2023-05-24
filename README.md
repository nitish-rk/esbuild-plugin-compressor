# esbuild-plugin-compressor

Simple esbuild plugin for compressing files. Supports gzip and brotli.

## Installation

```shell
npm install esbuild-plugin-compressor
```

## Usage

Import the `compressor` plugin and add it to the `plugins` array in the esbuild build options.

```js
import * as esbuild from 'esbuild';
import { compressor } from 'esbuild-plugin-compressor';

esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outfile: 'dist/index.js',
  plugins: [
    compressor({
      fileTypes: ['js', 'css'],
      compressType: 'brotli',
    }),
  ],
});
```

## Options

The `compressor` plugin accepts an options object with the following properties:

- `fileTypes` (optional): An array of file extensions to include for compression. If not provided, no files will be compressed.
- `compressType` (optional): The compression type to use. Valid values: `'brotli'`, `'gzip'`. Default: `'gzip'`.
- `deleteOrigin` (optional): Indicates whether to delete the original file after compression. Default: `false`.
- `outdir` (optional): The output directory for the compressed files. If not specified, the compressed files will be written to the same directory as the original files.

## Examples

### Gzip compression

```js
const options = {
  fileTypes: ['.js', '.css'],
  compressType: 'gzip',
  deleteOrigin: false,
  outdir: 'dist',
};

// Add the compressor plugin to the esbuild configuration
const buildOptions = {
  entryPoints: ['src/index.js'],
  bundle: true,
  outfile: 'dist/index.js',
  plugins: [compressor(options)],
};

esbuild.build(buildOptions).catch(err => {
  console.error(err);
  process.exit(1);
});
```

### Brotli compression

```js
const options = {
  fileTypes: ['.js', '.css'],
  compressType: 'brotli',
  deleteOrigin: false,
  outdir: 'dist',
};

// Add the compressor plugin to the esbuild configuration
const buildOptions = {
  entryPoints: ['src/index.js'],
  bundle: true,
  outfile: 'dist/index.js',
  plugins: [compressor(options)],
};

esbuild.build(buildOptions).catch(err => {
  console.error(err);
  process.exit(1);
});
```

## License

This project is licensed under the MIT License.
