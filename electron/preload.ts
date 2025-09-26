import { contextBridge } from 'electron'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('electronAPI', {

})

// Add type definitions for the exposed API
declare global {
  interface Window {
    electronAPI: {
      onMessage: (callback: any) => void
      sendMessage: (message: string) => void
    }
  }
}