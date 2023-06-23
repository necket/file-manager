import { writeFile } from 'fs/promises';
import { storage } from "../../storage.js";
import { throwOperationError } from '../../utils.js';

export const add = async ([filename]) => {
  if (!filename) throwOperationError('filename not provided');
  await writeFile(storage.resolvePath(filename), '', { flag: 'wx' });
}