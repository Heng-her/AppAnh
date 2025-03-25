import { useRouter, useRoute } from 'vue-router';

const route = useRoute();
const router = useRouter();

if (route.path === '/hinana') {
  router.push('/');
}