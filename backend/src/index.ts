import logger from './logger';
import dotenv from "dotenv";
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});
import app from './app';

const port = app.get('port');
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
);
