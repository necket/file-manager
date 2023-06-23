import fs from 'fs/promises';

export const getUserName = (args) => {
  const usernameArg = args.slice(2).find((arg) => arg.includes('--username='));
  const username = usernameArg ? usernameArg.split('=')[1] : 'Unknown User';
  return username;
}

export const parseUserInput = (userInput) => {
  const [command, ...args] = userInput.split(' ').filter(Boolean);

  return {
    command: command ?? null,
    args
  }
}

export const isDirExist = async (path) => {
  try {
    const stats = await fs.stat(path);
    return stats.isDirectory();
  } catch (error) {
    return false;
  }
};

export const isFileExist = async (path) => {
  try {
    const stats = await fs.stat(path);
    return stats.isFile();
  } catch (error) {
    return false;
  }
};

export const throwOperationError = (message = '') => {
  throw new Error(`Operation failed: ${message}\n`);
}