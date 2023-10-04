import { ipcRenderer } from 'electron'

// export function start() {
//   spawn(path.join(process.env.PUBLIC as string, '/AutoHotkey64.exe'))
// }

export default {
  register: {
    ahk_start: (message: string) => {
      ipcRenderer.send('ahk_start', message)
    }
  },
  listen: {
    ahk_start: (event, message) => {
      console.log(`Received message from renderer: ${message}`)
      // const res = start()
      // event.sender.send('end-ahk', res)
    }
  }
}
