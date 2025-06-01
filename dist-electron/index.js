import { app as e, BrowserWindow as n } from "electron";
import i from "path";
import { fileURLToPath as r } from "url";
const l = i.dirname(r(import.meta.url));
function t() {
  const o = new n({
    width: 800,
    height: 600,
    webPreferences: {
      preload: i.join(l, "../preload/index.js"),
      contextIsolation: !0,
      // Recommended for security
      nodeIntegration: !1
      // Recommended for security
    }
  });
  process.env.NODE_ENV === "development" ? (o.loadURL("http://localhost:3000"), o.webContents.openDevTools()) : o.loadFile("dist/index.html");
}
e.whenReady().then(() => {
  t(), e.on("activate", () => {
    n.getAllWindows().length === 0 && t();
  });
});
e.on("window-all-closed", () => {
  process.platform !== "darwin" && e.quit();
});
