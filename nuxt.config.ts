// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    pages: true,
  devtools: { enabled: false },
  modules: ['@nuxt/ui', '@pinia/nuxt' /*'@nuxtjs/google-fonts'*/, "@nuxt/content"],
  pinia: {
    autoImports: [
        'defineStore',
        ['defineStore', 'definePiniaStore'],
        'storeToRefs'
    ]
  },
  content: {
    documentDriven: true
  },
  components: {
    global: true,
    dirs: ['~/components']
  },
  app: {
    head: {
        link: [
            { rel: "preconnect", href: "https://rsms.me/" },
            /* { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: ""},*/
            { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" }
        ]
    },
  },
  ui: {
    icons: 'all'
  },
  /* googleFonts: {
    families: {
        Inter: [100, 200, 300, 400, 500, 600, 700]
    }
  }*/
})