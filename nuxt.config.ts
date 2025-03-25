// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [],
  css: ['~/assets/css/main.scss'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  ssr: false,

  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key'
  },

  compatibilityDate: '2025-03-25'
})