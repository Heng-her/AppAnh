import { IpcMain, ipcMain } from "electron";
import { spawn } from "node:child_process";
import path from "node:path";
// import os from "node:os";

export function registerTikTokIpc(ipc: IpcMain) {
  ipc.handle("tiktok:download-profile", async (_event, profileUrl: string, folder: string) => {
    return new Promise((resolve, reject) => {
      const exePath = path.join(__dirname, "../bin/yt-dlp.exe");
      const ffmpegPath = path.join(__dirname, "../bin/ffmpeg.exe");

      // yt-dlp command args
      const args = [
        profileUrl,
        "-o", path.join(folder, "%(uploader)s_%(id)s.%(ext)s"),
        "--ffmpeg-location", ffmpegPath,
        "--merge-output-format", "mp4",
        "--remux-video", "mp4",
        "--no-playlist", // download one by one if needed
        "--write-thumbnail",
        "--add-metadata",
        "--embed-thumbnail",
        "-f", "bv+ba/b" // best video+audio
      ];

      const proc = spawn(exePath, args, { stdio: ["ignore", "pipe", "pipe"] });

      let output = "";
      proc.stdout.on("data", (data) => {
        output += data.toString();
      });
      proc.stderr.on("data", (data) => {
        output += data.toString();
      });

      proc.on("close", (code) => {
        if (code === 0) {
          resolve({ success: true, message: "Download complete", log: output });
        } else {
          reject({ success: false, message: "Download failed", log: output });
        }
      });
    });
  });
}
