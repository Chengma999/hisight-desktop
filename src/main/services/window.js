import is from 'electron-is';
import { join, resolve } from 'path';
import { app,BrowserWindow } from 'electron';

let count = 0;

export function create(opts) {
  count += 1;
  let win = new BrowserWindow(opts);
  win.on('close', () => {
    count -= 1;
    win = null;
    app.quit()
  });
  return win;
}

export function getCount() {
  return count;
}

export function getPath() {
  let path = `file://${join($dirname, '..', 'pages')}/main.html`;
  if (is.dev()) {
    path = `http://127.0.0.1:3000/main-dev.html`;
  }
  return path;
}
export function getLobbyPath() {
  let path = `file://${join($dirname, '..', 'pages')}/lobby.html`;
  if (is.dev()) {
    path = 'http://127.0.0.1:3000/lobby-dev.html';
  }
  return path;
}
export function getKitchenPath() {
  let path = `file://${join($dirname, '..', 'pages')}/kitchen.html`;
  if (is.dev()) {
    path = 'http://127.0.0.1:3000/kitchen-dev.html';
  }
  return path;
}
export function getOmzetBonPath() {
  let path = `file://${join($dirname, '..', 'pages')}/omzetbon.html`;
  if (is.dev()) {
    path = 'http://127.0.0.1:3000/omzetbon-dev.html';
  }
  return path;
}
