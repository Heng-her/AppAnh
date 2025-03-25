export const useAuthUser = () => {
    return useState<{ id: string; role: 'user' | 'admin' | null }>('authUser', () => ({
      id: '',
      role: null
    }));
  };
  