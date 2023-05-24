import { compressContent } from './utils/compress-content.mjs';
import { readFile, unlink } from 'fs/promises';
import { outputFile } from 'fs-extra';
import { join } from 'node:path';

/**
 * Esbuild plugin to compress files after build. Supports gzip and brotli compression.
 * @type {import('./index.d.ts').compressor}
 */
export const compressor = options => ({
  name: 'compressor-plugin',
  setup(build) {
    build.initialOptions.metafile = true;
    console.log(build.initialOptions.outputFiles);
    build.onEnd(async result => {
      const outputs = result.metafile.outputs;
      const outputExt =
        options?.compressType?.toLowerCase() === 'brotli' ? '.br' : '.gz';
      const outdir = options?.outdir || build.initialOptions.outdir;

      //process css and js files
      for (const file in outputs) {
        const fileType = file.substring(file.lastIndexOf('.') + 1);

        if (options?.fileTypes?.includes(fileType)) {
          const fileName = file.split('/').at(-1);
          const content = await readFile(file, 'utf8');
          const compressedContent = await compressContent(content, outputExt);
          const compressedFileName = `${fileName}${outputExt}`;
          const compressedFilePath = join(outdir, compressedFileName);

          // Save the gzipped file to the directory
          await outputFile(compressedFilePath, compressedContent);

          // delete the original file
          if (options?.deleteOrigin) {
            await unlink(file);
          }
        }
      }
    });
  },
});
