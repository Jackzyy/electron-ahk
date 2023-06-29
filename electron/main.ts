import { app, BrowserWindow } from 'electron'
import path from 'node:path'

process.env.RESOURCE = path.join(__dirname, '../resource')
process.env.PUBLIC = app.isPackaged ? process.env.RESOURCE : path.join(process.env.RESOURCE, '../public')

let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.PUBLIC as string, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(process.env.RESOURCE as string, 'index.html'))
  }
}

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.whenReady().then(createWindow)
