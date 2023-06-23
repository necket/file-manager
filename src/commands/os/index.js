import os from 'node:os';
import { throwOperationError } from '../../utils.js';

const getEOL = () => {
  console.log(`Default End-Of-Line (EOL): ${JSON.stringify(os.EOL)}`);
}

const getCPUs = () => {
  const cpus = os.cpus();
  const cpusInfo = cpus.map((cpu) => ({
    'Model': cpu.model,
    'Clock Rate': `${cpu.speed / 1000} GHz`
  }));

  console.log(`Number of CPUs: ${cpus.length}`);
  console.table(cpusInfo);
}

const getHomedir = () => {
  const homedir = os.homedir();
  console.log(`Homedir: ${homedir}`);
}

const getUsername = () => {
  const userInfo = os.userInfo();
  console.log(`System Username: ${userInfo.username}`)
}

const getArch = () => {
  const arch = os.arch();
  console.log(`Architecture: ${arch}`);
}

const operations = {
  '--EOL': getEOL,
  '--cpus': getCPUs,
  '--homedir': getHomedir,
  '--username': getUsername,
  '--architecture': getArch,
}

const flags = Object.keys(operations);

export const osInfo = (args) => {
  const isInvalid = args.length > flags.length || args.some((arg) => flags.indexOf(arg) < 0);
  if (isInvalid) throwOperationError('Invalid input');

  args.forEach((flag) => {
    operations[flag].call();
  });
}