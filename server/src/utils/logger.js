const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  const stackTrace = stack
    ? stack
        .split('\n')
        .map(line => line.trim())
        .filter(line => line)
    : {};

  return JSON.stringify({
    message,
    time: new Date(timestamp).getTime(),
    code: level.toUpperCase(),
    stackTrace,
  });
});

const logger = createLogger({
  format: combine(timestamp(), format.errors({ stack: true }), logFormat),
  transports: [new transports.File({ filename: 'errors.log', level: 'error' })],
});

module.exports = logger;
