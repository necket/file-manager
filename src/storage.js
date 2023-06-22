import os from 'os';

const homedir = os.homedir();

class Storage {
  constructor() {
    this._currentDirectory = homedir;
  }

  get currentDirectory() {
    return this._currentDirectory;
  }

  set currentDirectory(path) {
    this._currentDirectory = path;
  }
}

export const storage = new Storage();