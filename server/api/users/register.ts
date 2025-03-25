import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, email, password } = body;

  const usersData = await useStorage().getItem("users.json");
  const users = typeof usersData === 'object' && usersData !== null ? usersData as { users: any[] } : { users: [] };

  if (users.users.some((u: any) => u.email === email)) {
    return { success: false, message: "Email already exists" };
  }

  const password_hash = await bcrypt.hash(password, 10);
  const newUser = {
    id: Date.now().toString(),
    username,
    email,
    password_hash,
    created_at: new Date().toISOString(),
  };

  users.users.push(newUser);
  await useStorage().setItem("users.json", users);

  return { success: true, message: "User registered successfully" };
});
