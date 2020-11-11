import { create, getPath } from './window';
const log = require('electron-log');
import { join } from 'path';
let win;
export function init() {
  win = create({
    width: 800,
    height: 600,
    icon: join($dirname, '../assets/hisight-logo.png'),
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.loadURL(getPath());
  console.log(join($dirname, '../assets/logo.png'));
}
export function sendStatusToWindow(text) {
  log.info(text);
  win.webContents.send('message', text);
}
