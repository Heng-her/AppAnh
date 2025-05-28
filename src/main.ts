import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import 'primevue/resources/themes/saga-blue/theme.css'; // Or any other theme
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import Button from 'primevue/button';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component("Button", Button);
app.mount("#app");
