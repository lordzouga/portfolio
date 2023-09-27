import SpotifyWebApi from 'spotify-web-api-node';

/* generate access token server-side 
const { refresh } = await useFetch('/api/access', {
    key: "access",
    server: true
});*/

export const useSpotify = defineStore('spotify', () => {
    const likedTracks = ref([]);
    const workoutTracks = ref([]);
    const favArtists = ref([]);
    const favAlbums = ref([]);

    const workoutPlaylistDuration = ref("");
    const likedPlaylistDuration = ref("");

    /** @type {SpotifyWebApi} */
    let spotify = null;
    
    async function loadSpotifyData() {
        await setupSpotify();

        loadLikedTracks();
        loadWorkoutTracks();
        loadFavArtists();
        loadFavAlbums();
    }

    /* Make the access token available to be use in subsequent api calls */
    async function setupSpotify () {
        /* retrieve server side generated access token */
        const { data: { access } } = useNuxtApp().payload;
        
        spotify = new SpotifyWebApi();
        spotify.setAccessToken(access.token.access_token);
    }

    const formatDuration = (duration) => {
        // clever time formatting https://stackoverflow.com/a/72218615/3256367
        // do not want to install moment.
        let durationStr = new Date(0, 0, 0, 0, 0, 0, duration).toLocaleTimeString([], {
            hour: "numeric",
            minute: "numeric",
            hourCycle: "h24"
        });
    
        let temp = durationStr.split(":");
    
        return `${parseInt(temp[0])}h ${parseInt(temp[1])}m`;
    }
    
    const loadLikedTracks = async () => {
        const { body: { items } } = await spotify.getMyTopTracks({
            time_range: "medium_term",
            limit: 30,
            offset: 0
        });
    
        // console.log(items);
        likedTracks.value.push(...items);
    
        let totalDuration = 0;
        items.map(({ duration_ms }) => totalDuration += duration_ms);
    
        likedPlaylistDuration.value = formatDuration(totalDuration);
    }
    
    const loadWorkoutTracks = async () => {
        let workoutPlaylist = "5i3fEXuXIrNg9uV1D9eo5w";
    
        const { body: { items } } = await spotify.getPlaylistTracks(workoutPlaylist);
    
        // const playlistDetails = await spotify.getPlaylist(workoutPlaylist);
    
        workoutTracks.value.push(...items.map((t) => t.track));
    
        let totalDuration = 0;
        items.map(({ track }) => totalDuration += track.duration_ms);
    
        workoutPlaylistDuration.value = formatDuration(totalDuration);
    }
    
    const loadFavArtists = async () => {
        const { body: { items } } = await spotify.getMyTopArtists({
            time_range: "long_term",
            limit: 3,
            offset: 1
        });
    
        favArtists.value.push(...items);
    }

    /* returns the list of albums an artist has based on provided ID */
    const loadArtistAlbums = async (id) => {
        const { body: { items }} = await spotify.getArtistAlbums(id, {
            album_type: 'album',
            country: 'GB',
            limit: 5
        });
        
        return items;
    }

    const loadArtistTopTracks = async (id) => {
        const { body: { tracks } } = await spotify.getArtistTopTracks(id, 'GB');

        // we need only 5 tracks
        return tracks.slice(0, 5);
    }
    
    const loadFavAlbums = async () => {
        const { body: { items } } = await spotify.getMyTopTracks({
            time_range: "long_term",
            limit: 3
        });
    
        favAlbums.value.push(...items.map(({ album }) => album));
    }
    
    return { likedTracks, workoutTracks, favArtists, favAlbums, workoutPlaylistDuration,
        likedPlaylistDuration, loadSpotifyData, loadArtistAlbums, loadArtistTopTracks }
})