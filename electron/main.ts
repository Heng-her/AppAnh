import { app, BrowserWindow, ipcMain, dialog } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs/promises";

// Import IPC modules (converted to TS)
import { registerYouTubeIpc } from "../resources/.icp/youtube";
import { registerTikTokIpc } from "../resources/.icp/tiktok";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dist + public paths
const DIST = path.join(__dirname, "../dist");
const PUBLIC = app.isPackaged ? DIST : path.join(DIST, "../public");

// let win: BrowserWindow | null = null;

const preload = path.join(__dirname, "./preload.js");


const url = process.env["VITE_DEV_SERVER_URL"];

// Store all open windows
const windows = new Set<BrowserWindow>();

function createWindow(filePath = "index.html") {
  const win = new BrowserWindow({
    width: 900,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    icon: path.join(PUBLIC, "favicon.ico"),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload,
    },

    show: false,
  });

  // Show when ready
  win.once("ready-to-show", () => win.show());

  win.on("closed", () => windows.delete(win));

  // Load content
  if (url && filePath === "index.html") {
    win.loadURL(url).catch(console.error);
    win.webContents.openDevTools();
  } else {
    const fullPath = path.join(DIST, filePath);
    win.loadFile(fullPath).catch((err) => {
      console.error(`Failed to load ${fullPath}:`, err);
      dialog.showErrorBox("Load Error", `Failed to load ${fullPath}`);
    });
  }

  windows.add(win);
  return win;
}

app.whenReady().then(() => {
  const mainWindow = createWindow();

  // ✅ Register IPC handlers
  registerYouTubeIpc(ipcMain);
  registerTikTokIpc(ipcMain);
  // registerInstagramIpc(ipcMain);
  // registerFacebookIpc(ipcMain);

  // Open new download window (like old cjs)
  ipcMain.on("open-new-download", () => {
    const newWindow = createWindow("download_tiktok.html");
    const bounds = mainWindow.getBounds();
    newWindow.setBounds({
      x: bounds.x + 30,
      y: bounds.y + 30,
      width: 800,
      height: 600,
    });
  });

  // Close current window
  ipcMain.on("close-current-window", (event) => {
    const window = BrowserWindow.fromWebContents(event.sender);
    window?.close();
  });

  // Folder selector with write validation
  ipcMain.handle("select-folder", async () => {
    const result = await dialog.showOpenDialog({
      properties: ["openDirectory", "createDirectory"],
      title: "Select Download Folder",
    });

    if (result.canceled) return null;

    const folderPath = result.filePaths[0];
    try {
      await fs.access(folderPath, fs.constants.W_OK);
      return folderPath;
    } catch {
      throw new Error(`No write permission for folder: ${folderPath}`);
    }
  });
});

// Quit when all windows are closed
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
