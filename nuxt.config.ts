// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ["~/assets/css/main.scss"],
  modules: ['@nuxthub/core'],
  runtimeConfig: {
    session: {
      name: 'auth_token',
      password: process.env.NUXT_SESSION_PASSWORD || '',
      maxAge: 30 * 24 * 60 * 60,
      cookie: {
        sameSite: 'lax'
      }
    }
  }
})