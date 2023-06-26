import fs from 'fs/promises';
import { storage } from "../../storage.js";
import { throwOperationError } from '../../utils.js';

export const rm = async ([filePath]) => {
  if (!filePath) throwOperationError(`path wasn't provided`);
  await fs.rm(storage.resolvePath(filePath));
}