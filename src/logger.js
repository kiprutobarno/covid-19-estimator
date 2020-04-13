import morgan from 'morgan';
import path from 'path';
import fs from 'fs';

const logPath = path.join(__dirname, './logs/', 'log.txt');
const logFile = fs.createWriteStream(logPath, { flags: 'a' });

if (fs.existsSync(logPath)) {
} else {
  fs.mkdirSync(path.dirname(logPath));
  logFile;
  console.log('log file created');
}

const logger = morgan(
  (tokens, req, res) =>
    [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      parseInt(tokens['response-time'](req, res).toString()) < 10
        ? `0${parseInt(tokens['response-time'](req, res).toString())}ms`
        : `${parseInt(tokens['response-time'](req, res).toString())}ms`
    ].join('\t\t'),
  {
    stream: logFile
  }
);

export default logger;
