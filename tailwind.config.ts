import type { Config } from 'tailwindcss'

export default <Partial<Config>> <unknown>{
    content: [
        'docs/content/**/*.md'
    ],
    theme: {
        fontFamily: {
            inter: ['"Inter"', { fontFeatureSettings: '"cv11", "ss01"' } ],
            body: ['"Inter"']
        }
    }
}
