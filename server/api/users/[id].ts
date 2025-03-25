interface User {
    id: string;
    // Add other properties of the user here
  }
  
  interface UsersData {
    users: User[];
  }
export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;
    const users = (await useStorage().getItem('users.json') as UsersData) || { users: [] };
    const user = users.users.find((u) => u.id === id);
  
    return user ? { success: true, user } : { success: false, message: "User not found" };
  });
  