interface User {
  id: string;
}
interface UsersData {
  users: User[];
}

export default defineEventHandler(async (event) => {
  const authToken = getCookie(event, "auth_token");
  if (!authToken) return { success: false, message: "Not authenticated" };

  const users = ((await useStorage().getItem("users.json")) as UsersData) || {
    users: [],
  };
  const user = users.users.find((u: any) => u.id === authToken);

  return user
    ? { success: true, user }
    : { success: false, message: "User not found" };
});
