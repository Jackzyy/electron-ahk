import { contextBridge, ipcMain } from 'electron'
import ahk from './ahk'

function ipcMainModuleOn(listen: {}) {
  const keys = Object.keys(listen)
  for (let i = 0; i < keys.length; i++) {
    ipcMain.on(keys[i], listen[keys[i]])
  }
}

export function register() {
  contextBridge.exposeInMainWorld('electronAPI', {
    ...ahk.register
  })
}

export function listen() {
  ipcMainModuleOn(ahk.listen)
}
