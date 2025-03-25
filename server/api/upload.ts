import { defineEventHandler, readMultipartFormData } from "h3";
import { promises as fs } from "fs";
import path from "path";

export default defineEventHandler(async (event) => {
  try {
    const formData = await readMultipartFormData(event);
    if (!formData) return { success: false, message: "No file uploaded" };

    const file = formData.find((f) => f.name === "file");
    const filename = formData.find((f) => f.name === "filename")?.data.toString();

    if (!file || !filename) return { success: false, message: "Invalid data" };

    const filePath = path.resolve("public/assets", `${filename}.jpg`);
    await fs.writeFile(filePath, file.data);

    return { success: true, message: "File uploaded successfully", filename };
  } catch (error) {
    return { success: false, message: "Error uploading file", error };
  }
});
