import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  selectFolder: () => ipcRenderer.invoke("select-folder"),
  downloadTikTokProfile: (url: string, folder: string) =>
    ipcRenderer.invoke("tiktok:download-profile", url, folder),
});

// Type definitions for exposed API
declare global {
  interface Window {
    electronAPI: {
      selectFolder: () => Promise<string | null>;
      downloadTikTokProfile: (url: string, folder: string) => Promise<any>;
    };
  }
}