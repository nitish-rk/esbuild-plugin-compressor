import { gzip, brotliCompress } from 'node:zlib';

/**
 * @type {import('../index.d.ts').compressContent}
 */
export async function compressContent(content, compressType = 'gzip') {
  let compressionMethod;
  switch (compressType.toLowerCase()) {
    case 'brotli':
    case 'br':
      compressionMethod = brotliCompress;
      break;
    case 'gzip':
    case 'gz':
      compressionMethod = gzip;
      break;
    default:
      compressionMethod = gzip;
  }

  return new Promise((resolve, reject) => {
    compressionMethod(content, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}
