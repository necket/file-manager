import path from 'path';
import { storage } from '../../storage.js';

export const up = () => {
  const resolvedPath = path.resolve(storage.currentDirectory, '..');
  storage.currentDirectory = resolvedPath;
}