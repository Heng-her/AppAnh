import path from "path";
import fs from "fs-extra";
import { exec, ChildProcess } from "child_process";
import { v4 as uuidv4 } from "uuid";
import { IpcMain } from "electron";

const activeDownloads: Map<string, ChildProcess> = new Map();

export function registerYouTubeIpc(ipcMain: IpcMain) {
  ipcMain.handle("download-youtube", async (_event, _id: string, url: string, folderPath: string) => {
    try {
      const ytDlpPath = path.resolve(__dirname, "../bin/yt-dlp.exe");
      const ffmpegPath = path.resolve(__dirname, "../bin/ffmpeg.exe");

      if (!url || typeof url !== "string") {
        throw new Error("URL must be a non-empty string");
      }

      const match = url.match(/@([\w.-]+)/);
      if (!match) throw new Error("Invalid YouTube URL format. Expected '@username' in URL.");

      const username = match[1].replace(/\.+$/, "");
      const target = path.join(folderPath, username);

      await fs.ensureDir(target);

      if (!fs.existsSync(ytDlpPath)) throw new Error("yt-dlp.exe not found in application directory");
      if (!fs.existsSync(ffmpegPath)) throw new Error("ffmpeg.exe not found in application directory");

      const cmd = `"${ytDlpPath}" "${url}" --yes-playlist --ffmpeg-location "${ffmpegPath}" -f "bv*[ext=mp4][height<=2160]+ba[ext=m4a]/bestvideo+bestaudio/best" --merge-output-format mp4 -o "${target}\\%(title)s.%(ext)s"`;
      const processId = uuidv4();

      return new Promise((resolve, reject) => {
        const proc = exec(
          cmd,
          { cwd: path.dirname(ffmpegPath), maxBuffer: 1024 * 1024 * 10 },
          (error, stdout, stderr) => {
            activeDownloads.delete(processId);

            if (error) {
              const errorMsg = stderr || error.message;
              console.error(`YouTube download error (${processId}):`, errorMsg);
              reject(new Error(`Download failed: ${errorMsg}`));
            } else {
              console.log(`YouTube download completed (${processId}):`, stdout);
              resolve({
                success: true,
                message: `✅ YouTube videos saved to: ${target}`,
                path: target,
                details: stdout,
              });
            }
          }
        );

        activeDownloads.set(processId, proc);

        const timeout = setTimeout(() => {
          if (proc.exitCode === null) {
            proc.kill();
            reject(new Error("Download timed out after 30 minutes"));
          }
        }, 30 * 60 * 1000);

        proc.on("exit", () => clearTimeout(timeout));
      });
    } catch (error) {
      console.error("Error in YouTube download handler:", error);
      throw error;
    }
  });

  ipcMain.handle("stop-download-youtube", (_event, id: string) => {
    if (!activeDownloads.has(id)) {
      return { success: false, message: `⚠ No active download for ID: ${id}` };
    }

    try {
      activeDownloads.get(id)?.kill("SIGTERM");
      activeDownloads.delete(id);
      return { success: true, message: `⛔ Download ${id} stopped.` };
    } catch (error: any) {
      console.error("Error stopping YouTube download:", error);
      return { success: false, message: `❌ Failed to stop download: ${error.message}` };
    }
  });

  ipcMain.handle("download-shorts", async (_event, url: string, folderPath: string) => {
    try {
      const ytDlpPath = path.resolve(__dirname, "../bin/yt-dlp.exe");
      const ffmpegPath = path.resolve(__dirname, "../bin/ffmpeg.exe");

      const match = url.match(/@([\w.-]+)/);
      if (!match) throw new Error("Invalid YouTube URL format. Expected '@username' in URL.");

      const username = match[1].replace(/\.+$/, "");
      const target = path.join(folderPath, username);
      await fs.ensureDir(target);

      const cmd = `"${ytDlpPath}" "${url}" --yes-playlist --ffmpeg-location "${ffmpegPath}" -f "bv*[ext=mp4]+ba[ext=m4a]/bestvideo+bestaudio/best" --merge-output-format mp4 -o "${target}\\%(title)s.%(ext)s"`;

      return new Promise((resolve, reject) => {
        exec(
          cmd,
          { cwd: path.dirname(ffmpegPath), maxBuffer: 1024 * 1024 * 10 },
          (error, stdout, stderr) => {
            if (error) reject(new Error(stderr || error.message));
            else {
              resolve({
                success: true,
                message: `✅ YouTube Shorts saved to: ${target}`,
                path: target,
                details: stdout,
              });
            }
          }
        );
      });
    } catch (error) {
      console.error("Error in YouTube Shorts download handler:", error);
      throw error;
    }
  });
}
