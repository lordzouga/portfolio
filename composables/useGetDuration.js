export const useGetDuration = (duration) => {
    return new Date(duration).toLocaleTimeString([], {
        minute: "numeric",
        second: "2-digit"
    });
}