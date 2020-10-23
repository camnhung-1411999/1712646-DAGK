import app from './app';
import Database from './utils/db';
const data = new Database();
app.listen(Number(process.env.PORT || 3001), '0.0.0.0', 
() => {
  console.log(`Express started.\nListening on port 3001`);
});
