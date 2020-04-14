import path from 'path';
import { getTimeInMilliseconds, saveToFile } from './helpers';

const logger = (request, response, next) => {
  const { method, url } = request;
  const { statusCode } = response;
  const startTime = process.hrtime();
  const timeInMS = getTimeInMilliseconds(startTime).toLocaleString();
  const message = `${method}\t\t${url}\t\t${statusCode}\t\t${Math.floor(
    timeInMS
  )
    .toString()
    .padStart(2, '00')}ms`;
  const fPath = path.join(__dirname, 'logs.txt');

  saveToFile(message, fPath);
  next();
};

export default logger;
