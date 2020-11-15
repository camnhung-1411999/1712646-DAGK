import server from './app';
import Database from './utils/db';
const data = new Database();
server.listen(Number(process.env.PORT || 3001), '0.0.0.0', 
() => {
  console.log(`Express started.\nListening on port 3001`);
});
