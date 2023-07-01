import { app, BrowserWindow, Menu, Tray, session } from 'electron'
import path from 'node:path'

process.env.RESOURCE = path.join(__dirname, '../resource')
process.env.PUBLIC = app.isPackaged ? process.env.RESOURCE : path.join(process.env.RESOURCE, '../../public')

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
    await win.loadFile(path.join(process.env.RESOURCE as string, 'index.html'))
  }
}

// 托盘菜单
function contextMenu() {
  let tray: Tray | null
  tray = new Tray(path.join(process.env.PUBLIC as string, '1.png'))
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
}

// Vue开发工具
async function loadDevtools() {
  if (VITE_DEV_SERVER_URL) {
    await session.defaultSession.loadExtension(path.resolve(__dirname, '../../devtools'))
  }
}

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('ready', async () => {
  loadDevtools()
  createWindow()
  contextMenu()
})
