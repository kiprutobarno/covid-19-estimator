import path from 'path';
import { getTime, save } from './helpers';

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Object} next
 * @description request logger object
 */
const logger = (req, res, next) => {
  const { method, url } = req;
  const { statusCode } = res;
  const startTime = process.hrtime();
  const timeTaken = getTime(startTime).toLocaleString();
  const message = `${method}\t\t${url}\t\t${statusCode}\t\t${Math.floor(
    timeTaken
  )
    .toString()
    .padStart(2, '00')}ms`;
  const fPath = path.join(__dirname, 'logs.txt');
  save(message, fPath);
  next();
};

export default logger;
