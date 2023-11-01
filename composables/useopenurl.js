export const useOpenUrl = async (url) => {
    await navigateTo(url, {
        open: {
            target: '_blank'
        }
    });
}