import { Plugin } from 'esbuild';
import { Buffer } from 'node:buffer';

/**
 * Options object for the `compressor` plugin.
 * @property {string[]} fileTypes - Array of file extensions to include for compression. If not provided or empty, no file will be compressed.
 * @property {string} compressType - Compression type. Valid values: "brotli", "gzip". Defaults to "gzip".
 * @property {boolean} deleteOrigin - Indicates whether to delete the original file after compression.
 * @property {string} outdir - Output directory for the compressed files. If not specified, the compressed files will be written to the same directory as the original files.
 */
interface CompressorOptions {
  fileTypes?: string[];
  compressType?: 'brotli' | 'gzip';
  deleteOrigin?: boolean;
  outdir?: string;
}

/**
 * Compresses the given content using the given compression type. Defaults to gzip compression.
 * @param {string} content - The content to compress.
 * @param {string} compressType - The compression type. Valid values: "brotli", "br", "gzip", "gz".
 * @returns {Promise<Buffer>} - The compressed content as a Buffer.
 */
declare function compressContent(
  content: string,
  compressType?: string
): Promise<Buffer>;

/**
 * Esbuild plugin to compress files. Supports brotli and gzip compression.
 * @param {CompressorOptions} options - The options object for the compressor plugin.
 * @returns {Plugin} - The esbuild plugin.
 */
declare function compressor(options?: CompressorOptions): Plugin;

export { compressContent, compressor };
