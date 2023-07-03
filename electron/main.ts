import { app, BrowserWindow, Menu, Tray, nativeImage, ipcMain } from 'electron'
import path from 'node:path'

import { start } from './utils/ahk'

process.env.ROOT = path.join(app.isPackaged ? path.dirname(app.getPath('exe')) : app.getAppPath())
process.env.PUBLIC = path.join(process.env.ROOT, app.isPackaged ? './resources/static' : './public')

let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

// 主窗口
async function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  if (VITE_DEV_SERVER_URL) {
    await win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    await win.loadFile(path.join(__dirname, '../resource/index.html'))
  }
}

// 托盘菜单
function contextMenu() {
  const tray = new Tray(path.join(process.env.PUBLIC as string, './icon.ico'))

  const contextMenu = Menu.buildFromTemplate([
    {
      label: '退出',
      click: () => app.quit()
    }
  ])
  tray.setToolTip('取色宏-测试版')
  tray.setContextMenu(contextMenu)
}

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('ready', async () => {
  createWindow()
  contextMenu()
})

ipcMain.on('start-ahk', (event, message) => {
  console.log(`Received message from renderer: ${message}`)
  const res = start()

  event.sender.send('end-ahk', res)
})
