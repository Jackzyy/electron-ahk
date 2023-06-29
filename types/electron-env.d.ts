/// <reference types="vite-plugin-electron/electron-env" />

declare namespace NodeJS {
  interface ProcessEnv {
    // 静态资源地址
    RESOURCE: string
    // 根目录PUBLIC
    PUBLIC: string
  }
}
