import { promises as fs } from "fs";
import { defineEventHandler, readBody } from "h3";

const filePath = "public/json/users.json";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    await fs.writeFile(filePath, JSON.stringify(body, null, 2));
    return { success: true, message: "Users updated successfully." };
  } catch (error) {
    return { success: false, message: "Error updating users.", error };
  }
});