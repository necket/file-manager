import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream/promises';
import { join, basename } from 'path';
import { storage } from "../../storage.js";
import { isFileExist, isDirExist, throwOperationError } from '../../utils.js';

export const compress = async (args) => {
  if (!srcPath || !distPath) throwOperationError('invalid arguments');
  const resolvedSrcPath = storage.resolvePath(srcPath);
  const resolvedDistDir = storage.resolvePath(distDir);
  const srcFilename = basename(resolvedSrcPath);
  console.log(srcFilename);
  const distFilename = `${srcFilename}.gz`

}

// export const decompress = async (args) => {
//   const decompressStream = createBrotliDecompress();
//   await _transfrom(args, decompressStream, { isCompress: false });
// }

// async function _transfrom([srcPath, distDir], transformStream, { isCompress }) {
//   if (!srcPath || !distPath) throwOperationError('invalid arguments');
//   const resolvedSrcPath = storage.resolvePath(srcPath);
//   const resolvedDistDir = storage.resolvePath(distDir);

//   // const isDistDirExist = await isDirExist(resolvedDistDir);
//   // if (!isDistDirExist) throwOperationError(`dist directory doesn't exists: ${resolvedDistDir}`);

//   const basename = basename(resolvedSrcPath);
//   console.log(isCompress);
//   const resolvedFileName = isCompress ? `${basename}.gz` : basename
//   const resolvedDistPath = join(resolvedDistDir, resolvedFileName);
  
//   // const isDistFileExist = await isFileExist(resolvedDistPath);
//   // if (isDistFileExist) throwOperationError(`file already exist ${resolvedDistPath}`);

//   console.log(resolvedDistPath)

//   // const rs = createReadStream(resolvedSrcPath);
//   // const ws = createWriteStream(resolvedDistPath);

//   // await pipeline(rs, transformStream, ws);
// }