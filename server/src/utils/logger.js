const fs = require('fs');
const path = require('path');
const schedule = require('node-schedule');
const { createLogger, format, transports, config } = require('winston');
const { combine, timestamp, printf } = format;

const levelOrder = ['debug', 'info', 'warn', 'error'];
const levelToCode = level => {
  const index = levelOrder.indexOf(level);
  // DEBUG=100, INFO=200, WARN=300, ERROR=400
  return index !== -1 ? (index + 1) * 100 : 500;
};

const logFormat = printf(({ level, message, timestamp }) => {
  return JSON.stringify({
    message,
    time: new Date(timestamp).getTime(),
    code: levelToCode(level),
  });
});

const logger = createLogger({
  levels: config.npm.levels,
  format: combine(timestamp(), logFormat),
  transports: [new transports.File({ filename: 'errors.log', level: 'error' })],
});

const logFilePath = path.join(__dirname, 'errors.log');

function processLogFile () {
  fs.readFile(logFilePath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }

    if (!data.trim()) {
      console.log('The file is empty. No processing needed.');
      return;
    }

    const lines = data.trim().split('\n');
    const transformedData = [];

    lines.forEach(line => {
      try {
        const json = JSON.parse(line);
        transformedData.push({
          message: json.message,
          code: json.code,
          time: new Date(json.time).getTime(),
        });
      } catch (e) {
        console.error('Error processing line:', e.message);
      }
    });

    const timestamp = new Date().toISOString().split('T')[0];
    const newFileName = path.join(__dirname, `errors_${timestamp}.log`);

    fs.writeFile(newFileName, JSON.stringify(transformedData, null, 2), err => {
      if (err) {
        console.error('Error writing to the new file:', err);
        return;
      }

      console.log('Data successfully written to file:', newFileName);

      fs.truncate(logFilePath, 0, err => {
        if (err) console.error('Error clearing the original file:', err);
        else console.log('Original file cleared:', logFilePath);
      });
    });
  });
}

schedule.scheduleJob('59 23 * * *', () => {
  processLogFile();
});

module.exports = logger;
