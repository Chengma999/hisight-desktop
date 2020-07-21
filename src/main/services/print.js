import {
  create,
  getLobbyPath,
  getKitchenPath,
  getOmzetBonPath,
} from './window';
import is from 'electron-is';
const Store = require('electron-store');
const queryString = require('query-string');
const path = require('path');
const data = { age: 12, healthy: true };
const store = new Store({ watch: true });

let workerWindow = null;
let workerKitchenWindow = null;
let omzetBonWindow = null;

let isPrinting = false;
let printArr = [];

module.exports = {
  init: () => {
    workerWindow = create({
      height: 600,
      width: 800,
      webPreferences: {
        nodeIntegration: true,
      },
    });
    workerKitchenWindow = create({
      height: 600,
      width: 800,
      webPreferences: {
        nodeIntegration: true,
      },
    });
    omzetBonWindow = create({
      height: 600,
      width: 800,
      webPreferences: {
        nodeIntegration: true,
      },
    });

    workerWindow.on('closed', () => {
      workerWindow = null;
    });

    workerKitchenWindow.on('closed', () => {
      workerKitchenWindow = null;
    });
    omzetBonWindow.on('closed', () => {
      omzetBonWindow = null;
    });
    // workerWindow.hide();
    // workerKitchenWindow.hide();
    // omzetBonWindow.hide();
  },
  print: async (order, isLooping) => {
    if (isPrinting && !isLooping) {
      printArr.push(order);
      return;
    }

    isPrinting = true;

    await workerWindow.loadURL(
      getLobbyPath() + '?data=' + JSON.stringify(order),
    );

    const options = {
      silent: true,
      // deviceName: workerWindow.webContents.getPrinters()[5].name,
      deviceName: store.get('printer')
        ? store.get('printer').balie
        : workerWindow.webContents.getPrinters()[0],
      margins: {
        marginType: 'custom',
        top: '20px',
        bottom: '40px',
        left: '5px',
        right: '7px',
      },
    };
    workerWindow.webContents.print(options, (success, errorType) => {
      if (!success) console.log(errorType);
      //if success, go further with kitchen printing
      const workerKitchPrint = async () => {
        await workerKitchenWindow.loadURL(
          getKitchenPath() + '?data=' + JSON.stringify(order),
        );

        const options = {
          silent: true,
          // deviceName: workerKitchenWindow.webContents.getPrinters()[5].name,
          deviceName: store.get('printer')
            ? store.get('printer').keuken
            : workerWindow.webContents.getPrinters()[0],
          margins: {
            marginType: 'custom',
            top: '20px',
            bottom: '20px',
            left: '5px',
            right: '7px',
          },
        };
        workerKitchenWindow.webContents.print(options, (success, errorType) => {
          if (!success) console.log(errorType);
          if (is.dev()) {
            workerKitchenWindow.webContents.openDevTools();
          }
          module.exports.checkPrintArr()
        });
      };
      if (is.dev()) {
        workerWindow.webContents.openDevTools();
      }
      if (!order.cus_orderId) {
        module.exports.checkPrintArr()
        return
      }
      if (success && order.cus_orderId) {
        workerKitchPrint();
      }
    });
  },
  printKitchen: async (order) => {
    await workerKitchenWindow.loadURL(
      getKitchenPath() + '?data=' + JSON.stringify(order),
    );

    const options = {
      silent: true,
      // deviceName: workerKitchenWindow.webContents.getPrinters()[5].name,
      deviceName: store.get('printer')
        ? store.get('printer').keuken
        : workerWindow.webContents.getPrinters()[0],
      margins: {
        marginType: 'custom',
        top: '10px',
        bottom: '40px',
        left: '0px',
        right: '0px',
      },
    };
    workerKitchenWindow.webContents.print(options, (success, errorType) => {
      if (!success) console.log(errorType);
      // workerKitchenWindow.close()
    });
    if (is.dev()) {
      workerKitchenWindow.webContents.openDevTools();
    }
  },
  omzetbonPrint: async (chosenDate) => {
    const originURL = getOmzetBonPath() + '?data=' + JSON.stringify(chosenDate);

    await omzetBonWindow.loadURL(originURL);

    const options = {
      silent: true,
      // deviceName: omzetBonWindow.webContents.getPrinters()[5].name,
      deviceName: store.get('printer')
        ? store.get('printer').balie
        : omzetBonWindow.webContents.getPrinters()[0],
      margins: {
        marginType: 'custom',
        top: '20px',
        bottom: '40px',
        left: '5px',
        right: '7px',
      },
    };
    omzetBonWindow.webContents.print(options, (success, errorType) => {
      if (!success) console.log(errorType);
      //if success, go further with kitchen printing
    });
    if (is.dev()) {
      omzetBonWindow.webContents.openDevTools();
    }
  },
  checkPrintArr: () => {
    if (printArr.length > 0) {
      const nextOrder = printArr.shift();
      console.log(nextOrder);
      module.exports.print(nextOrder, true);
      return;
    }
    if (printArr.length === 0) {
      isPrinting = false;
    }
  },
  getPrinters: () => {
    return workerWindow.webContents.getPrinters();
  },
  printStatusSet: (status) => {
    store.set('printStatus', status);
  },
  printStatusGet: () => {
    return store.get('printStatus');
  },
  printerSet: (baliePrinterName, keukenPrinterName) => {
    store.set('printer', {
      balie: baliePrinterName,
      keuken: keukenPrinterName,
    });
  },
  printerGet: () => {
    return store.get('printer');
  },
};
