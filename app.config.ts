export default defineAppConfig({
    ui: {
        primary: "orange",
        gray: "neutral",
        container: {
            padding: 'px-4 sm:px-6 lg:px-60 pb-8 pt-4 lg:pt-8',
        },
        card: {
            header: {
                padding: "p-4",
                //background: "bg-neutral-600"
            },
            body: {
                padding: "p-4",
                //background: "bg-neutral-600"
            }
        },
        skeleton: {
            background: "bg-gray-200 dark:bg-gray-800"
        },
        button: {
            color: {
                gray: {
                    solid: "dark:shadow-[0_0_1px_1px_rgba(0,0,0,0.14)] dark:ring-1 dark:ring-inset ring-gray-300 dark:ring-gray-700 text-gray-900 dark:text-white bg-white hover:bg-gray-50 disabled:bg-white dark:bg-neutral-700 dark:hover:bg-gray-800/50 dark:disabled:bg-gray-900 focus-visible:ring-2 focus-visible:ring-primary"
                }
            }
        },
        notifications: {
            position: "lg:top-0 bottom-0 top-auto lg:bottom-auto"
        }
    }
})