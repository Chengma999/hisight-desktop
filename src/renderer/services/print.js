const {remote} = require("electron")
export const print =remote.getGlobal("services").print.print
export const printInit =remote.getGlobal("services").print.init
export const omzetbonPrint =remote.getGlobal("services").print.omzetbonPrint
export const printKitchen =remote.getGlobal("services").print.printKitchen
export const getPrinters =remote.getGlobal("services").print.getPrinters
export const printerSet =remote.getGlobal("services").print.printerSet
export const printerGet =remote.getGlobal("services").print.printerGet
export const printStatusSet =remote.getGlobal("services").print.printStatusSet
export const printStatusGet =remote.getGlobal("services").print.printStatusGet
export const accountGet =remote.getGlobal("services").print.accountGet
export const accountSet =remote.getGlobal("services").print.accountSet
