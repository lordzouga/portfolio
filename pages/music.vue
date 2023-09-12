<template>
    <div class="flex flex-col mt-10 lg:overflow-y-clip lg:max-h-[calc(100vh-2.5rem-120px)]">
        <div class="flex flex-col lg:flex-row"><!--Artists and Albums-->
            <div class="flex flex-col pb-4 lg:pb-0 lg:flex-[0.4] lg:border-b-0 border-b border-neutral-600/30 artists-cont">
                <!--Artists-->
                <span class="flex">
                    <!--<u-icon name="i-tabler-palette" class="h-4 w-4 text-neutral-500 self-center"></u-icon>-->
                    <span class="font-semibold text-neutral-200 text-base  tracking-wide">
                        Favorite Artists</span>
                </span>

                <transition name="show-loaded" mode="out-in" @enter="onArtistEnter">
                    <span v-if="dataLoaded" class="flex mt-4" key="artists"> <!--Artist List-->
                        <artist class="artist ml-8 first:ml-0" v-for="artist in favArtists" :artist="artist" />
                    </span>
                    <u-skeleton v-else class="mt-4 h-24 w-full" key="artist-skeleton" :ui="{ rounded: 'rounded-md' }" />
                </transition>
            </div>

            <div class="flex flex-col lg:ml-auto mt-8 lg:mt-0 lg:pb-0 lg:border-b-0 pb-4 border-b 
            border-neutral-600/30 lg:flex-[0.4] albums-cont">
                <!--Albums-->
                <span class="flex">
                    <!--<u-icon name="i-tabler-album" class="h-4 w-4 text-neutral-500 self-center"></u-icon>-->
                    <span class="font-semibold text-neutral-200 text-base tracking-wide">Favorite Albums</span>
                </span>

                <transition name="show-loaded" mode="out-in" @enter="onAlbumEnter">
                    <span v-if="dataLoaded" class="flex mt-4" key="albums"> <!--Album list-->
                        <album class="album ml-8 first:ml-0" v-for="album in favAlbums" :album="album" />
                    </span>
                    <u-skeleton v-else class="mt-4 h-24 w-full" key="albums-skeleton" :ui="{ rounded: 'rounded-md' }" />
                </transition>
            </div>
        </div>

        <div class="flex lg:mt-8 mt-4 flex-col lg:flex-row "><!--Favorite Playlists-->
            <UTabs class="lg:hidden" :items="tabData">
                <template #default="{ item, selected }" class="-mx-4">
                    <div class="flex items-center gap-2 relative truncate">
                        <span> {{ item.label }}</span>
                        <u-badge v-if="item.key === 'workout'" color="gray" variant="soft" size="xs" class="ml-auto">{{
                            workoutTracks.length }}</u-badge>
                        <u-badge v-else-if="item.key === 'liked'" color="gray" variant="soft" size="xs" class="ml-auto">{{
                            likedTracks.length }}</u-badge>

                        <span v-if="selected"
                            class="absolute -right-4 w-2 h-2 rounded-full bg-primary-500 dark:bg-primary-400" />
                    </div>
                </template>

                <template #item="{ item }">

                    <div v-if="item.key === 'workout'">
                        <div class="flex mb-2">
                            <UButton class="focus:ring-0 focus-visible:ring-0" size="xs" color="gray" :padded="false"
                                icon="i-la-spotify" variant="link" :ui="{ font: 'font-normal' }">
                                Open in Spotify
                            </UButton>

                            <span class="flex items-center ml-4 text-neutral-400">
                                <UIcon name="i-gridicons-time" class="h-4 w-4"></UIcon>
                                <span class="text-xs font-normal ml-1">{{ workoutPlaylistDuration }} </span>
                            </span>

                        </div>
                        <Songlist :songs="workoutTracks" />
                    </div>
                    <div v-else-if="item.key === 'liked'">
                        <div class="flex mb-2">
                            <UButton class="focus:ring-0 focus-visible:ring-0" size="xs" color="gray" :padded="false"
                                icon="i-la-spotify" variant="link" :ui="{ font: 'font-normal' }">
                                Open in Spotify
                            </UButton>

                            <span class="flex items-center ml-4 text-neutral-400">
                                <UIcon name="i-gridicons-time" class="h-4 w-4"></UIcon>
                                <span class="text-xs font-normal ml-1">{{ likedPlaylistDuration }} </span>
                            </span>

                        </div>
                        <Songlist :songs="likedTracks" />
                    </div>
                </template>
            </UTabs>

            <div class="lg:flex flex-col flex-[0.4] workout-cont hidden "><!--Workout Section-->
                <span class="flex">
                    <!--<u-icon name="i-tabler-stretching" class="h-4 w-4 text-neutral-500 self-center font-bold"></u-icon>-->
                    <span class="font-semibold text-neutral-200 text-base tracking-wide self-center">Workout
                        Playlist</span>
                    <u-badge color="gray" variant="soft" size="xs" class="ml-auto">{{ workoutTracks.length }}
                        Songs</u-badge>
                </span>

                <div class="flex mt-1">
                    <UButton class="focus:ring-0 focus-visible:ring-0" size="2xs" color="gray" :padded="false"
                        icon="i-la-spotify" variant="link" :ui="{ font: 'font-normal' }">
                        Open in Spotify
                    </UButton>

                    <span class="flex ml-4 items-center text-neutral-400">
                        <UIcon name="i-gridicons-time" class="h-4 w-4 text-neutral-500"></UIcon>
                        <span class="text-xs font-light ml-1">{{ workoutPlaylistDuration }} </span>
                    </span>
                </div>

                <div v-if="dataLoaded"
                    class="lg:overflow-y-scroll max-h-[65%] no-scrollbar mt-4 lg:mt-14 flex flex-1 lg:absolute px-4 -mx-4 playlist">
                    <!--Workout Playlist-->
                    <Songlist :songs="workoutTracks"></Songlist>
                </div>

                <span v-else class="flex flex-col mt-8">
                    <u-skeleton v-for="i in ['', '', '', '']" class="h-12 w-full mt-8 first:mt-0" />
                </span>
            </div>

            <div class="lg:flex hidden flex-col flex-[0.4] mt-8 lg:mt-0 lg:ml-auto liked-cont">
                <!--Liked Section-->
                <span class="flex">
                    <!--<u-icon name="i-tabler-heart" class="h-4 w-4 text-neutral-500 self-center font-bold"></u-icon>-->
                    <span class="font-semibold text-neutral-200 text-base tracking-wide self-center">Liked Songs</span>
                    <u-badge color="gray" variant="soft" size="xs" class="ml-auto">{{ likedTracks.length }}
                        Songs</u-badge>
                </span>

                <div class="flex mt-1">
                    <UButton class="focus:ring-0 focus-visible:ring-0" size="2xs" color="gray" :padded="false"
                        icon="i-la-spotify" variant="link" :ui="{ font: 'font-normal' }">
                        Open in Spotify
                    </UButton>

                    <span class="flex ml-4 items-center text-neutral-400">
                        <UIcon name="i-gridicons-time" class="h-4 w-4"></UIcon>
                        <span class="text-xs font-light ml-1">{{ workoutPlaylistDuration }} </span>
                    </span>
                </div>

                <div v-if="dataLoaded"
                    class="lg:overflow-y-scroll max-h-[65%] w-full no-scrollbar mt-4 px-4 -mx-4 flex playlist">
                    <!--Liked Playlist-->
                    <Songlist :songs="likedTracks"></Songlist>
                </div>

                <span v-else class="flex flex-col mt-8">
                    <u-skeleton v-for="i in ['', '', '', '']" class="h-12 w-full mt-8 first:mt-0" />
                </span>
            </div>

        </div>
    </div>
</template>

<script setup>
import SpotifyWebApi from 'spotify-web-api-node';

/* generate access token server-side */
const { refresh } = await useFetch('/api/access', {
    key: "access",
    server: true
});

const _onEnter = (target) => {
    useNuxtApp().$gsap.fromTo(target, {
        opacity: 0,
        y: "20%",
    },
        {
            duration: 0.2,
            opacity: 1,
            y: 0,
            delay: 0,
            ease: "power.easeOut",
            stagger: 0.1,
        });
}

const onArtistEnter = () => {
    // _onEnter(".artist");
}

const onAlbumEnter = () => {
    // _onEnter(".album");
}

const showDataAnim = () => {
    _onEnter([".artists-cont", ".albums-cont", ".workout-cont", ".liked-cont"])
}

/** @type {SpotifyWebApi} */
var spotify = null;

var likedTracks = ref([]);
var workoutTracks = ref([]);
var favArtists = ref([]);
var favAlbums = ref([]);
const workoutPlaylistDuration = ref("");
const likedPlaylistDuration = ref("");

const tabData = [
    {
        key: 'workout',
        label: 'Workout Songs',
    },
    {
        key: 'liked',
        label: 'Liked Songs',
    }
]

const setupSpotify = async () => {
    /* retrieve generated access token */
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
    likedTracks.value = items;

    let totalDuration = 0;
    items.map(({ duration_ms }) => totalDuration += duration_ms);

    likedPlaylistDuration.value = formatDuration(totalDuration);
}

const loadWorkoutTracks = async () => {
    let workoutPlaylist = "5i3fEXuXIrNg9uV1D9eo5w";

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

const loadFavAlbums = async () => {
    const { body: { items } } = await spotify.getMyTopTracks({
        time_range: "long_term",
        limit: 3
    });

    favAlbums.value = items.map(({ album }) => album);
}

onMounted(async () => {
    showDataAnim();

    await setupSpotify(); // should always be called first

    await loadFavArtists();
    await loadFavAlbums();

    await loadLikedTracks();
    await loadWorkoutTracks();
});

const dataLoaded = ref(true);

const loadTracks = () => {
    setTimeout(() => {
        dataLoaded.value = true;
    }, 3 * 1000)
}

const artists = [
    {
        name: "Deca",
        avatar: "/img/deca_avatar.jpeg"
    },
    {
        name: "Black Thought",
        avatar: ""
    },
    {
        name: "Coldplay",
        avatar: ""
    },
    /*{
        name: "Lana Del Rey",
        avatar: ""
    }*/
]

const albums = [
    {
        title: "The Way Through",
        art: "/img/deca_avatar.jpeg"
    },
    {
        title: "A Rush of Blood To the Head",
        art: "/img/deca_avatar.jpeg"
    },
    {
        title: "Streams of Thought",
        art: "/img/deca_avatar.jpeg"
    },
    /*{
        title: "Ultraviolence",
        art: "/img/deca_avatar.jpeg"
    }*/
]

const workoutSongs = [
    {
        title: "Yeah Yeah Yeah",
        artist: "Jax Jones",
        duration: "4:53",
        art: "/img/statik_art.jpeg",
        ident: "tforumn"
    },
    {
        title: "Tsunami",
        artist: "DVBBS, Borgeous",
        duration: "3:57",
        art: "/img/statik_art.jpeg",
        ident: "ferbsak"
    },
    {
        title: "Wake Up",
        artist: "No wyld",
        duration: "3:50",
        art: "/img/statik_art.jpeg",
        ident: "giuymr"
    },
    {
        title: "Upside Down",
        artist: "Paloma Faith",
        duration: "3:09",
        art: "/img/statik_art.jpeg",
        ident: "domisdf"
    }
]

const likedSongs = [
    {
        title: "Yeah Yeah Yeah",
        artist: "Jax Jones",
        duration: "4:53",
        art: "/img/statik_art.jpeg",
        ident: "peroom"
    },
    {
        title: "Tsunami",
        artist: "DVBBS, Borgeous",
        duration: "3:57",
        art: "/img/statik_art.jpeg",
        ident: "oewpioenn"
    },
    {
        title: "Wake Up",
        artist: "No wyld",
        duration: "3:50",
        art: "/img/statik_art.jpeg",
        ident: "pbbisbb"
    },
    {
        title: "Upside Down",
        artist: "Paloma Faith",
        duration: "3:09",
        art: "/img/statik_art.jpeg",
        ident: "inewibib"
    }
]

onMounted(() => {
    // loginToSpotify();
    loadTracks();
});

</script>

<style>
.no-scrollbar::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}

.playlist {
    width: calc(100% + 32px);
}
</style>