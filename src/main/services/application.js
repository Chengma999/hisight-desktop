import { create, getPath } from './window';
import { join } from 'path';
const { autoUpdater } = require('electron-updater');
export function init() {
  const win = create({
    width: 800,
    height: 600,
    icon: join($dirname, '../assets/logo.png'),
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.loadURL(getPath());
  console.log(join($dirname, '../assets/logo.png'));

  function sendStatusToWindow(text) {
    log.info(text);
    win.webContents.send('message', text);
  }
  autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('Checking for update...');
  });
  autoUpdater.on('update-available', (info) => {
    sendStatusToWindow('Update available.');
  });
  autoUpdater.on('update-not-available', (info) => {
    sendStatusToWindow('Update not available.');
  });
  autoUpdater.on('error', (err) => {
    sendStatusToWindow('Error in auto-updater. ' + err);
  });
  autoUpdater.on('download-progress', (progressObj) => {
    let log_message = 'Download speed: ' + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    log_message =
      log_message +
      ' (' +
      progressObj.transferred +
      '/' +
      progressObj.total +
      ')';
    sendStatusToWindow(log_message);
  });
  autoUpdater.on('update-downloaded', (info) => {
    sendStatusToWindow('Update downloaded');
  });
}
