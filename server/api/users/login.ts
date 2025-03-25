import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

interface User {
  email: string;
  password_hash: string;
  // Add other properties of the user here
}

interface UsersData {
  users: User[];
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;

  // Cast the result to the expected type
  const users = (await useStorage().getItem("users.json") as UsersData) || { users: [] };

  const user = users.users.find((u) => u.email === email);

  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return { success: false, message: "Invalid credentials" };
  }

  const token = uuidv4();
  setCookie(event, "auth_token", token, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24, // 1 day
  });

  return { success: true, message: "Login successful" };
});