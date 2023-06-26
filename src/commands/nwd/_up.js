import path from 'path';
import { storage } from '../../storage.js';

export const up = () => {
  const resolvedPath = storage.resolvePath('..');
  storage.currentDirectory = resolvedPath;
}