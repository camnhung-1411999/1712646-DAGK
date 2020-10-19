require('dotenv').config();

const Util = {
  mongo: {
    host: process.env.MONGODB_HOST || '',
    user: process.env.MONGODB_USER || 'root',
    pass: process.env.MONGODB_PASS || 'root',
    port: process.env.MONGODB_PORT || '27017',
    db: process.env.MONGODB_DB || 'User',
  },
  AppPort: process.env.APP_PORT || 50051,
  cache: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(`${process.env.REDIS_PORT || 6379}`, 10),
    password: process.env.REDIS_PASSWORD || undefined,
  },
};

if (!Util.mongo.host) {
  console.log('No mongo connection string. Set MONGODB_URI enviroment variable.');
  process.exit(1);
}

export default Util;
