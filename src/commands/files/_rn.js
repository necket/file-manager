import fs from 'fs/promises';
import { storage } from '../../storage.js';
import { isFileExist, throwOperationError } from '../../utils.js';

export const rn = async ([srcPath, distPath]) => {
  if (!srcPath || !distPath) throwOperationError('invalid arguments');
  const resolvedSrcPath = storage.resolvePath(srcPath);
  const resolvedDistPath = storage.resolvePath(distPath);

  const isDistFileExist = await isFileExist(resolvedDistPath);
  if (isDistFileExist) throwOperationError(`file already exist ${resolvedDistPath}`);

  await fs.rename(resolvedSrcPath, resolvedDistPath);
}