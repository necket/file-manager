import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { storage } from "../../storage.js";
import { isFileExist, throwOperationError } from '../../utils.js';

export const cp = async ([srcPath, distPath]) => {
  if (!srcPath || !distPath) throwOperationError('invalid arguments');
  const resolvedSrcPath = storage.resolvePath(srcPath);
  const resolvedDistPath = storage.resolvePath(distPath);
  
  const isDistFileExist = await isFileExist(resolvedDistPath);
  console.log(resolvedDistPath)
  if (isDistFileExist) throwOperationError(`file already exist ${resolvedDistPath}`);

  const rs = createReadStream(resolvedSrcPath);
  const ws = createWriteStream(resolvedDistPath);

  await pipeline(rs, ws);
}