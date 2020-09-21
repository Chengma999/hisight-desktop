const {remote} = require("electron")
export const socket =remote.getGlobal("services").socketServices.socket
