import path from 'path';
import { storage } from '../../storage.js';
import { isDirExist, throwOperationError } from '../../utils.js';

export const cd = async ([dirPath]) => {
  if (!dirPath) throwOperationError(`Path wasn't provided`);

  const resolvedPath = storage.resolvePath(dirPath);
  const isValidDir = await isDirExist(resolvedPath);

  if (isValidDir) {
    storage.currentDirectory = resolvedPath;
  } else {
    throwOperationError(`Directory with name ${dirPath} doesn't exist`);
  }
}