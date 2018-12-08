import { exec } from 'child_process';
import process from 'os';
//import sys from 'sys';

import db from '../db';

function getCommandLine(): string {
  switch (process.platform()) {
    case 'aix': return 'xdg-open';
    case 'darwin': return 'open';
    case 'freebsd': return 'xdg-open';
    case 'linux': return 'xdg-open';
    case 'openbsd': return 'xdg-open';
    case 'sunos': return 'xdg-open';
    case 'win32': return 'start';
    default: return 'xdg-open';
  }
}

export const open: Function = function (): void {
  exec(`${getCommandLine()} ${db.FILE_PATH}`);
}
