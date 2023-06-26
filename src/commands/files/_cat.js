import { createReadStream } from 'fs';
import { storage } from "../../storage.js";
import { throwOperationError } from '../../utils.js';

export const cat = async ([pathToFile]) => {
  if (!pathToFile) throwOperationError(`path wasn't provided`);
  const resolvedPath = storage.resolvePath(pathToFile);
  const rs = createReadStream(resolvedPath);
  rs.pipe(process.stdout);

  return new Promise((resolve, reject) => {
    rs.on('end', resolve);
    rs.on('error', reject);
  })
}