import { create, getPath } from './window';
import  {join } from 'path'
export function init() {
  const win = create(
    { width: 800,
      height: 600,
      icon:join($dirname,"../assets/logo.png"),
      webPreferences: {
        nodeIntegration: true
  }
});
  win.loadURL(getPath());
  console.log(join($dirname,"../assets/logo.png"))
}
