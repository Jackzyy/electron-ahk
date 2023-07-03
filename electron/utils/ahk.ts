import { spawn } from 'child_process'
import path from 'node:path'

export function start() {
  spawn(path.join(process.env.PUBLIC as string, '/AutoHotkey64.exe'))
}
