import { app, BrowserWindow } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";

// Get the directory name in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// The built directory structure
const DIST = (process.env.DIST = path.join(__dirname, "../dist"));
const PUBLIC = (process.env.PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public"));

let win: BrowserWindow | null;
const preload = app.isPackaged
  ? path.join(__dirname, "./preload.js") // compiled
  : path.join(__dirname, "../preload.ts"); // dev

const url = process.env["VITE_DEV_SERVER_URL"];

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(PUBLIC, "favicon.ico"),
    webPreferences: {
      contextIsolation: true, // required when using contextBridge
      nodeIntegration: false, // safer
      preload,
    },
  });

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (url) {
    win.loadURL(url);
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(DIST, "index.html"));
  }
}

app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin") app.quit();
});

app.whenReady().then(createWindow);

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
