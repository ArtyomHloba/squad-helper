const fs = require('fs');
const path = require('path');
const schedule = require('node-schedule');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const logFormat = printf(({ message, level, timestamp, stack }) => {
  return JSON.stringify({
    message,
    time: new Date(timestamp).getTime(),
    code: levelToCode(level),
    stackTrace: stack || {},
  });
});

const levelOrder = ['debug', 'info', 'warn', 'error'];
const levelToCode = level => {
  const index = levelOrder.indexOf(level);
  // DEBUG=100, INFO=200, WARN=300, ERROR=400
  return index !== -1 ? (index + 1) * 100 : 500;
};

const logsDir = path.join(__dirname, 'logs');

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Налаштування логера
const logger = createLogger({
  format: combine(timestamp(), logFormat),
  transports: [
    new transports.File({
      filename: path.join(logsDir, 'errors.log'),
      level: 'error',
    }),
  ],
});

const logFilePath = path.join(logsDir, 'errors.log');

function processLogFile () {
  fs.access(logFilePath, fs.constants.F_OK, accessErr => {
    if (accessErr) {
      console.log('Log file does not exist. Creating a new empty file.');
      fs.writeFile(logFilePath, '', writeErr => {
        if (writeErr) console.error('Error creating the log file:', writeErr);
      });
      return;
    }

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
            time: json.time,
          });
        } catch (e) {
          console.error('Error processing line:', e.message);
        }
      });

      const timestamp = new Date().toISOString().split('T')[0];
      const newFileName = path.join(logsDir, `errors_${timestamp}.log`);

      fs.writeFile(
        newFileName,
        JSON.stringify(transformedData, null, 2),
        writeErr => {
          if (writeErr) {
            console.error('Error writing to the new file:', writeErr);
            return;
          }

          console.log('Data successfully written to file:', newFileName);

          fs.truncate(logFilePath, 0, truncateErr => {
            if (truncateErr) {
              console.error('Error clearing the original file:', truncateErr);
            } else {
              console.log('Original file cleared:', logFilePath);
            }
          });
        }
      );
    });
  });
}

schedule.scheduleJob('23 21 * * *', () => {
  processLogFile();
});

module.exports = logger;
