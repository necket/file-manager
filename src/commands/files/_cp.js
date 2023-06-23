import { createReadStream, createWriteStream } from 'fs';
import { join, basename } from 'path';
import { pipeline } from 'stream/promises';
import { storage } from "../../storage.js";
import { isFileExist, isDirExist, throwOperationError } from '../../utils.js';

export const cp = async ([srcPath, distDir]) => {
  if (!srcPath || !distDir) throwOperationError('invalid arguments');

  const resolvedSrcPath = storage.resolvePath(srcPath);
  const resolvedDistDir = storage.resolvePath(distDir);

  const isDistDirExist = await isDirExist(resolvedDistDir);
  if (!isDistDirExist) throwOperationError(`dist directory doesn't exists: ${resolvedDistDir}`);

  const fileName = basename(resolvedSrcPath);
  const resolvedDistPath = join(resolvedDistDir, fileName);

  const isDistFileExist = await isFileExist(resolvedDistPath);
  if (isDistFileExist) throwOperationError(`file already exists: ${resolvedDistPath}`);

  const rs = createReadStream(resolvedSrcPath);
  const ws = createWriteStream(resolvedDistPath);

  await pipeline(rs, ws);
};