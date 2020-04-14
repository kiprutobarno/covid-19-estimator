import morgan from 'morgan';
import path from 'path';
import fs from 'fs';

const logPath = path.join(__dirname, './logs/', 'log.txt');
const logFile = fs.createWriteStream(logPath, { flags: 'a', encoding: 'utf8' });
const logFormat = ':method\t:url\t:status\t:response-time';

if (fs.existsSync(logPath)) {
} else {
  fs.mkdirSync(path.dirname(logPath));
  logFile;
  console.log('log file created');
}

const logger = morgan(
  logFormat,
  {
    stream: {
      write(message) {
        const finalIndex = message.length - 1;
        const lastTabIndex = message.lastIndexOf('\t');
        const str = message.substring(lastTabIndex + 1, finalIndex);
        let time = Math.ceil(parseFloat(str));
        if (time < 10) {
          time = `0${time.toString()}`;
        } else {
          time = time.toString();
        }
        const msg = `${message.substring(0, lastTabIndex + 1)}${time}ms\n`;
        logFile.write(msg);
      }
    }
  }
  //   (tokens, req, res) =>
  //     [
  //       tokens.method(req, res),
  //       tokens.url(req, res),
  //       tokens.status(req, res),
  //       parseInt(tokens['response-time'](req, res).toString()) < 10
  //         ? `0${parseInt(tokens['response-time'](req, res).toString())}ms`
  //         : `${parseInt(tokens['response-time'](req, res).toString())}ms`
  //     ].join('\t\t'),
  //   {
  //     stream: logFile
  //   }
);

export default logger;
