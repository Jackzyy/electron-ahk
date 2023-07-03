/// <reference types="vite-plugin-electron/electron-env" />

declare namespace NodeJS {
  interface ProcessEnv {
    // 根目录
    ROOT: string
    // 静态资源地址
    RESOURCE: string
    // 根目录PUBLIC
    PUBLIC: string
  }
}

export interface IElectronAPI {
  [x: string]: any
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
