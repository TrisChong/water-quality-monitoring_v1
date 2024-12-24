import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logFile = path.join(__dirname, '../../logs/server.log');

// Ensure logs directory exists
if (!fs.existsSync(path.dirname(logFile))) {
  fs.mkdirSync(path.dirname(logFile), { recursive: true });
}

const writeToLog = (message) => {
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp}: ${message}\n`;
  fs.appendFileSync(logFile, logMessage);
};

export const log = {
  info: (msg) => {
    console.log(chalk.blue('ℹ'), msg);
    writeToLog(`INFO: ${msg}`);
  },
  success: (msg) => {
    console.log(chalk.green('✓'), msg);
    writeToLog(`SUCCESS: ${msg}`);
  },
  warn: (msg) => {
    console.log(chalk.yellow('⚠'), msg);
    writeToLog(`WARNING: ${msg}`);
  },
  error: (msg) => {
    console.log(chalk.red('✗'), msg);
    writeToLog(`ERROR: ${msg}`);
  },
  divider: () => {
    console.log(chalk.gray('─'.repeat(50)));
    writeToLog('─'.repeat(50));
  }
};