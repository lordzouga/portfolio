export const useOnPageLoad = (onLoaded) => {
    useNuxtApp().hook('page:transition:finish', (comp) => {
        onLoaded()
    });
}