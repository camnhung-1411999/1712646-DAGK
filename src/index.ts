import app from './app';
// import config from './config';
// import { migrateDB } from './components/migration';

import Database from './utils/db';
const data = new Database();
app.listen(3001, () => {
  console.log(`Express started.\nListening on port 3001`);
});
