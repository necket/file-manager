import readline from 'readline';

import { storage } from './storage.js';
import { COMMANDS } from './commands.js';
import { parseUserInput } from './utils.js';
import { nwd, files } from './commands/index.js';
import { throwOperationError } from './utils.js';
 
export class App {
  constructor(args) {
    this._username = args.username;
  }

  onCommand = async (command, args) => {
    switch (command) {
      case COMMANDS.EXIT:
        return this.onExit();
      case COMMANDS.UP:
        return nwd.up();
      case COMMANDS.CHANGE_DIR:
        return nwd.cd(args);
      case COMMANDS.LIST:
        return nwd.ls();
      case COMMANDS.READ:
        return files.cat(args);
      case COMMANDS.ADD:
        return files.add(args);
      case COMMANDS.RENAME:
        return files.rn(args);
      case COMMANDS.COPY:
        return files.cp(args);
      case COMMANDS.DELETE:
        return files.rm(args);
      default:
        throwOperationError(`unknown command ${command}`)
    }
  }

  onInput = async (userInput) => {
    const { command, args } = parseUserInput(userInput);

    if (command) {
      try {
        await this.onCommand(command, args);
        this.showCurrentDirectory();
      } catch(error) {
        console.log(error.message);
      }
    }
  }

  onExit = () => {
    console.log(`\nThank you for using File Manager, ${this._username}, goodbye!\n`)
    process.exit();
  }

  showCurrentDirectory = () => {
    console.log(`\nYou are currently in ${storage.currentDirectory}\n`)
  }

  showGreeting = () => {
    console.log(`Welcome to the File Manager, ${this._username}!`)
  }

  init = () => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.showGreeting();
    this.showCurrentDirectory();

    rl.on('line', this.onInput);
    rl.on('SIGINT', this.onExit);
  }
}