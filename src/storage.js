import os from 'os';
import path from 'path';

const homedir = os.homedir();

class Storage {
  constructor() {
    this._currentDirectory = '/Users/necket/Desktop/course/assignments/file-manager/'//homedir;
  }

  get currentDirectory() {
    return this._currentDirectory;
  }

  set currentDirectory(path) {
    this._currentDirectory = path;
  }

  resolvePath(rawPath) {
    return path.resolve(this._currentDirectory, rawPath);
  }
}

export const storage = new Storage();