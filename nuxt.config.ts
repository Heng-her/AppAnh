// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxt/eslint', '@nuxt/fonts'],
  devServer:{
    port: 3005,
    host: '0.0.0.0'
  },
  ssr: false, // Client-side only
  // target: 'static',
  app: {
    baseURL: '/Heng_Data/', // Must match your GitHub repo name
  },
})