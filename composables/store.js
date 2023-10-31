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
    const searchedTracks = ref([]);

    const topTracksPreviewLimit = 5;
    const recommendationPlaylist = "3nqABqdRzstzBp0HAUaKRF";

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
        // const { data: { access } } = useNuxtApp().payload;
        
        spotify = new SpotifyWebApi();
        spotify.setAccessToken(useState('token').value);
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

        spotify.getUserPlaylists("lordzouga").then((res) => {
            console.log(res);
        })

    
        // console.log(items);
        likedTracks.value = items;
    
        let totalDuration = 0;
        items.map(({ duration_ms }) => totalDuration += duration_ms);
    
        likedPlaylistDuration.value = formatDuration(totalDuration);
    }
    
    const loadWorkoutTracks = async () => {
        let workoutPlaylist = "5i3fEXuXIrNg9uV1D9eo5w";
        
        spotify.getPlaylist(workoutPlaylist).then((res) => {
            console.log(res);
        });

        const { body: { items } } = await spotify.getPlaylistTracks(workoutPlaylist);
    
        // const playlistDetails = await spotify.getPlaylist(workoutPlaylist);
    
        workoutTracks.value = items.map((t) => t.track);
    
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
    
        favArtists.value = items;
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
        return tracks.slice(0, topTracksPreviewLimit);
    }
    
    const loadFavAlbums = async () => {
        const { body: { items } } = await spotify.getMyTopTracks({
            time_range: "long_term",
            limit: 10
        });
        
        // we don't want singles
        let albums = items.filter(({ album }) => album.album_type === "ALBUM").slice(0, 3);
        
        favAlbums.value = albums.map(( { album } ) => album);
    }
    
    const loadAlbumTracks = async (id) => {
        const { body: { items } } = await spotify.getAlbumTracks(id);

        return items;
    }

    async function searchTracks(query) {
        // search for tracks

        const { body: { tracks } } = await spotify.searchTracks(query, {
            limit: 3
        });

        searchedTracks.value = tracks.items;
    }
    
    /** saves a recommended track to the playlist 
     * @param { SpotifyApi.TrackObjectFull } track */
    async function saveTrack(track) {
        let snap_id = "";
        
        try {
            const { body: { snapshot_id } } = await spotify.addTracksToPlaylist(recommendationPlaylist,  [track.uri]);
            snap_id = snapshot_id;
        } catch (error) {
            snap_id = "error";
        }
        
        return snap_id;
    }


    async function getRandomLikedTrack(){
        const likedPlaylistLength = 1000;
        const randomTrack = [];

        let randomIndex = Math.floor(Math.random() * likedPlaylistLength);
        
        try {
            const { body: { items } } = await spotify.getMySavedTracks({
                offset: randomIndex,
                limit: 1
            });

            randomTrack.push(...items);
        } catch (error) {
            console.log(error);
        }
        
        return randomTrack;
    }

    return { likedTracks, workoutTracks, favArtists, favAlbums, workoutPlaylistDuration, searchedTracks,
        likedPlaylistDuration, loadSpotifyData, loadArtistAlbums, loadArtistTopTracks, loadAlbumTracks, 
        searchTracks, saveTrack, getRandomLikedTrack }
});