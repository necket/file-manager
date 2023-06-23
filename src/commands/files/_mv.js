import { cp } from './_cp.js';
import { rm } from './_rm.js';

export const mv = async (args) => {
  await cp(args);
  await rm(args);
}