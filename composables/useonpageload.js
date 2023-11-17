export const useOnPageLoad = (onLoaded) => {
    useNuxtApp().hook('app:mounted', (comp) => {
        console.log(comp);
        onLoaded()
    })
}