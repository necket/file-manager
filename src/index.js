import { App } from './app.js';
import { getUserName } from './utils.js';

const username = getUserName(process.argv);
const app = new App({ username });

app.init();