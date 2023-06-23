import { createReadStream, createWriteStream } from 'fs';
import { createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream/promises';
import { join, basename } from 'path';
import { storage } from '../../storage.js';
import { isFileExist, throwOperationError, getFileExtension } from '../../utils.js';

export const decompress = async ([srcPath, distDir]) => {
  if (!srcPath || !distDir) throwOperationError('invalid arguments');
  const resolvedSrcPath = storage.resolvePath(srcPath);
  const resolvedDistDir = storage.resolvePath(distDir);
  const srcFilename = basename(resolvedSrcPath);

  if (getFileExtension(srcFilename) !== 'gz') {
    throwOperationError(`invalid file extention`);
  }

  const distFilename = srcFilename.replace('.gz', '');
  const resolvedDistPath = join(resolvedDistDir, distFilename);

  const isSrcFileExist = await isFileExist(resolvedSrcPath);
  if (!isSrcFileExist) throwOperationError(`file doesn't exist ${resolvedSrcPath}`);

  const decompressStream = createBrotliDecompress();
  const readStream = createReadStream(resolvedSrcPath);
  const writeStream = createWriteStream(resolvedDistPath, { flags: 'wx' });

  await pipeline(readStream, decompressStream, writeStream);
}