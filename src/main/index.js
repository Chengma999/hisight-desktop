import { app, BrowserWindow } from 'electron';
import is from 'electron-is';
import { join } from 'path';
import log from 'electron-log';
import * as application from './services/application';
import {sendStatusToWindow} from './services/application';
import * as window from './services/window';
import * as menu from './services/menu';
import * as print from './services/print';
import * as socketServices from './services/socket';
import * as config from './configs/config';
const { autoUpdater } = require('electron-updater');
const io = require('socket.io-client');

log.transports.file.level = 'info';

log.info('(main/index) >>>>>>>>>>>>>>>>>>');
log.info('(main/index) app start');
log.info(`(main/index) log file at ${log.findLogPath()}`);

if (is.dev()) {
  require('electron-debug')(); // eslint-disable-line global-require
}

app.on('ready', () => {
  log.info('(main/index) app ready');
  application.init();
  menu.init();

  // 加载 devtools extension
  if (is.dev()) {
    BrowserWindow.addDevToolsExtension(
      join($dirname, '../../extensions/redux-devtools/2.11.1_0'),
    );
    BrowserWindow.addDevToolsExtension(
      join($dirname, '../../extensions/react-developer-tools/0.15.4_0'),
    );
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (window.getCount() === 0) {
    application.init();
  }
});

app.on('quit', () => {
  log.info('(main/index) app quit');
  log.info('(main/index) <<<<<<<<<<<<<<<<<<<');
});
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
app.on('ready', function () {
  autoUpdater.checkForUpdatesAndNotify();
});

// Register to global, so renderer can access these with remote.getGlobal
global.services = {
  application,
  window,
  print,
  socketServices,
};
global.configs = {
  config,
};
