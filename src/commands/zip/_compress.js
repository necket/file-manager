import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress } from 'zlib';
import { pipeline } from 'stream/promises';
import { join, basename } from 'path';
import { storage } from "../../storage.js";
import { isFileExist, throwOperationError } from '../../utils.js';

export const compress = async ([srcPath, distDir]) => {
  if (!srcPath || !distDir) throwOperationError('invalid arguments');
  const resolvedSrcPath = storage.resolvePath(srcPath);
  const resolvedDistDir = storage.resolvePath(distDir);
  const srcFilename = basename(resolvedSrcPath);
  const distFilename = `${srcFilename}.gz`;
  const resolvedDistPath = join(resolvedDistDir, distFilename);

  const isSrcFileExist = await isFileExist(resolvedSrcPath);
  if (!isSrcFileExist) throwOperationError(`file doesn't exist ${resolvedSrcPath}`);

  const compressStream = createBrotliCompress();
  const readStream = createReadStream(resolvedSrcPath);
  const writeStream = createWriteStream(resolvedDistPath, { flags: 'wx' });

  await pipeline(readStream, compressStream, writeStream);
}