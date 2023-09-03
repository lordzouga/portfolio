// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    pages: true,
  devtools: { enabled: false },
  modules: ['@nuxthq/ui', /*'@nuxtjs/google-fonts'*/],
  app: {
    head: {
        link: [
            { rel: "preconnect", href: "https://rsms.me/" },
            /* { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: ""},*/
            { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" }
        ]
    }
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
