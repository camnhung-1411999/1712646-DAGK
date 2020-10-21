import app from './app';

import Database from './utils/db';
const data = new Database();
app.listen(3001, () => {
  console.log(`Express started.\nListening on port 3001`);
});
