import { app, BrowserWindow} from 'electron';
import is from 'electron-is';
import { join } from 'path';
import log from 'electron-log';
import * as application from './services/application';
import * as window from './services/window';
import * as menu from './services/menu';
import * as print from './services/print'
import * as config from './configs/config';
const io =require   ('socket.io-client')

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
  print.init();

 const namespace= "/yakumi-oud-beijerland"

  const socket =io(is.production()?`http://136.144.214.133:5001${namespace}`:`http://127.0.0.1:5001${namespace}`)
  socket.on(`${namespace}/print`, (data) => {
    console.log(data.data);
    if(print.printStatusGet()){
      print.print(data.data)
    }
  });

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

// Register to global, so renderer can access these with remote.getGlobal
global.services = {
  application,
  window,
  print
};
global.configs = {
  config,
};
