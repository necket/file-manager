import fs from 'fs/promises';
import { storage } from '../../storage.js';
import { isFileExist, isDirExist } from '../../utils.js';

export const ls = async () => {
  const { currentDirectory } = storage;
  const directoryContents = await fs.readdir(currentDirectory);

  const dirs = [];
  const files = [];

  for (let i = 0; i < directoryContents.length; i++) {
    const file = directoryContents[i];
    const pathToFile = storage.resolvePath(file);
    const isFile = await isFileExist(pathToFile);

    if (isFile) {
      files.push({ name: file, type: 'file' });
    } else {
      const isDir = await isDirExist(pathToFile);
      if (isDir) dirs.push({ name: file, type: 'directory' });
    }
  }

  dirs.sort();
  files.sort();

  console.table([...dirs, ...files]);
}