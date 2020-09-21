const io = require('socket.io-client');
import is from 'electron-is';
import * as print from './print';

export function socket(namespace,restaurantType) {
  const socket = io(
    is.production()
      ? `http://136.144.214.133:5001${namespace}`
      : `http://127.0.0.1:5001${namespace}`,
  );
  socket.on(`${namespace}/print`, (data) => {
    console.log(data.data);
    const isLooping =false
    if (print.printStatusGet()) {
      print.print(data.data,isLooping,restaurantType);
    }
  });
}
