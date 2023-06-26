import { createReadStream } from 'fs';
import crypto from 'crypto';
import { storage } from '../../storage.js';
import { throwOperationError } from '../../utils.js';

export const calculateHash = async ([pathToFile]) => {
  if (!pathToFile) throwOperationError(`path not provided`);
  const resolvedPath = storage.resolvePath(pathToFile);

  await new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');
    const readableStream = createReadStream(resolvedPath);

    readableStream.on('data', (chunk) => {
      hash.update(chunk);
    });

    readableStream.on('end', () => {
      const fileHash = hash.digest('hex');
      console.log(`Hash of ${pathToFile}: ${fileHash}`);
      resolve(fileHash);
    });

    readableStream.on('error', reject);
  })
}