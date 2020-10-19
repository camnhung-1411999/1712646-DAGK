import mongoose from 'mongoose';
import utils from './utils';
import logger from './log';

class Database {
  private connection: any;

  public uri: string;

  constructor() {
    // this.uri = `nongodb://{utils.mongo.user} + ':' + utils.mongo.pass + '@' + utils.mongo.host + ':' + utils.mongo.port + '/' + utils.mongo.db;
    this.uri = `mongodb://${utils.mongo.user}:${utils.mongo.pass}@${utils.mongo.host}:${utils.mongo.port}/${utils.mongo.db}`;
    this.onConnection();
  }

  public onConnection(): void {
    this.connection = mongoose.connection;

    this.connection.on('connected', () => {
      logger.info('Mongo Connection Established');
    });

    this.connection.on('reconnected', () => {
      logger.info('Mongo Connection Reestablished');
    });

    this.connection.on('disconnected', () => {
      logger.info('Mongo Connection Disconnected');
      logger.info('Trying to reconnect to Mongo...');
      setTimeout(() => {
        mongoose.connect(this.uri, {
          keepAlive: true,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          socketTimeoutMS: 3000,
          connectTimeoutMS: 3000,
          useCreateIndex: true,
          useFindAndModify: false,
          authSource: 'admin',
        });
      }, 3000);
    });
    this.connection.on('close', () => {
      logger.info('Mongo Connection Closed');
    });

    this.connection.on('error', (error: Error) => {
      logger.info(`Mongo Connection Error${error}`);
    });

    const run = async () => {
      await mongoose.connect(this.uri, {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        authSource: 'admin',
      });
    };

    run().catch((error) => logger.error(error));
  }
}

export default Database;
