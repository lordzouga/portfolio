// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    pages: true,
  devtools: { enabled: true },
  modules: ['@nuxthq/ui', '@nuxtjs/google-fonts'],
  ui: {
    icons: 'all'
  },
  googleFonts: {
    families: {
        Inter: [100, 200, 300, 400, 500, 600, 700]
    }
  }
})
