import type { Config } from 'tailwindcss'

export default <Partial<Config>> <unknown>{
    content: [
        'docs/content/**/*.md'
    ],
    theme: {
        fontFamily: {
            inter: ['"Inter"'],
            body: ['"Inter"']
        }
    }
}
