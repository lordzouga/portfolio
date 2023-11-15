import vercelKVDriver from 'unstorage/drivers/vercel-kv';

export default defineNitroPlugin(() => {
  const storage = useStorage()

  // Dynamically pass in credentials from runtime configuration, or other sources
  const driver = vercelKVDriver({
        url: process.env.KV_REST_API_URL,
        token: process.env.KV_REST_API_TOKEN,
        base: "access",
        env: "KV"
        /* other redis connector options */
    })

  // Mount driver
  storage.mount('vercel', driver)
})
