import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  sendMsgToMain: (message: string) => {
    ipcRenderer.send('start-ahk', message)
  },
  receivMsgFromMain: (callback: (arg0: any) => void) => {
    ipcRenderer.on('end-ahk', (event, message) => {
      callback(message)
    })
  }
})
