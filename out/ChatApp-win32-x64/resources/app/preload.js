const path = require('path');
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('path', {
    join: (...args) => path.join(...args)
})