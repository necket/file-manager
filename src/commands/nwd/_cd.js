import path from 'path';
import { storage } from '../../storage.js';
import { isDirExist } from '../../utils.js';
import { throwOperationError } from '../../errors.js';

export const cd = async ([dirPath]) => {
  if (!dirPath) {
    return throwOperationError(`Path wasn't provided`);
  } 

  const resolvedPath = path.resolve(storage.currentDirectory, dirPath);
  const isValidDir = await isDirExist(resolvedPath);

  if (isValidDir) {
    storage.currentDirectory = resolvedPath;
  } else {
    return throwOperationError(`Invalid path given`);
  }
}