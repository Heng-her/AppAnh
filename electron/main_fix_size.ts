import { app, BrowserWindow } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { existsSync } from 'node:fs'

// Get the directory name in ES module scope
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Safe path handling with fallbacks
const DIST = path.resolve(__dirname, '../dist')
const PUBLIC = app.isPackaged ? DIST : path.resolve(DIST, '../public')

let win: BrowserWindow | null
const preload = path.join(__dirname, './preload.js')
const url = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
  // Safe icon path with fallback
  let iconPath: string | undefined
  const possibleIconPath = path.join(PUBLIC, 'favicon.ico')
  if (existsSync(possibleIconPath)) {
    iconPath = possibleIconPath
  }

  win = new BrowserWindow({
    icon: iconPath,
    width: 1200,
    height: 800,
    show: false, // Don't show until ready-to-show
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      preload,
    },
  })

  // Show window when ready to prevent visual flash
  win.once('ready-to-show', () => {
    win?.show()
  })

  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date()).toLocaleString())
  })

  // Load the app
  if (url) {
    // Development mode with Vite server
    win.loadURL(url)
    win.webContents.openDevTools()
  } else {
    // Production mode - load from file system
    const indexHtmlPath = path.join(DIST, 'index.html')
    if (existsSync(indexHtmlPath)) {
      win.loadFile(indexHtmlPath)
    } else {
      console.error(`Index.html not found at: ${indexHtmlPath}`)
      app.quit()
    }
  }
}

app.on('window-all-closed', () => {
  // On macOS, keep app running even when all windows are closed
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS, re-create window when dock icon is clicked
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// Create window when app is ready
app.whenReady().then(createWindow)

// Handle app quitting
app.on('before-quit', () => {
  console.log('App is quitting...')
})