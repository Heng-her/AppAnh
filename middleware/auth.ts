export default defineNuxtRouteMiddleware((to) => {
  const authUser = useState<{ id: string; role: 'user' | 'admin' | null }>('authUser');

  // Redirect if the user is not logged in
  if (!authUser.value || !authUser.value.id) {
    return navigateTo('/login');
  }

  // Restrict admin routes
  if (to.path.startsWith('/admin') && authUser.value.role !== 'admin') {
    return navigateTo('/403'); // Redirect non-admins to forbidden page
  }
});
