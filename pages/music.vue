<template>
    <div class="flex flex-col mt-10">
        <div class="flex flex-col lg:flex-row"><!--Artists and Albums-->
            <div class="flex flex-col pb-4 lg:pb-0 lg:flex-[0.4] lg:border-b-0 border-b border-neutral-600/30 artists-cont">
                <!--Artists-->
                <span class="flex">
                    <u-icon name="i-tabler-palette" class="h-4 w-4 text-blue-500 self-center"></u-icon>
                    <span class="font-semibold text-xs text-neutral-400 tracking-wider ml-2">
                        Favorite Artists</span>
                </span>

                <transition name="show-loaded" mode="out-in" @enter="onArtistEnter">
                    <span v-if="dataLoaded" class="flex mt-4" key="artists"> <!--Artist List-->
                        <artist class="artist ml-8 first:ml-0" v-for="artist in artists" :artist="artist" />
                    </span>
                    <u-skeleton v-else class="mt-4 h-24 w-full" key="artist-skeleton" :ui="{ rounded: 'rounded-md' }" />
                </transition>
            </div>

            <div class="flex flex-col lg:ml-auto mt-8 lg:mt-0 lg:pb-0 lg:border-b-0 pb-4 border-b 
            border-neutral-600/30 lg:flex-[0.4] albums-cont">
                <!--Albums-->
                <span class="flex">
                    <u-icon name="i-tabler-album" class="h-4 w-4 text-pink-500 self-center"></u-icon>
                    <span class="font-semibold text-neutral-400 text-xs tracking-wider ml-2">Favorite Albums</span>
                </span>

                <transition name="show-loaded" mode="out-in" @enter="onAlbumEnter">
                    <span v-if="dataLoaded" class="flex mt-4" key="albums"> <!--Album list-->
                        <album class="album ml-8 first:ml-0" v-for="album in albums" :album="album" />
                    </span>
                    <u-skeleton v-else class="mt-4 h-24 w-full" key="albums-skeleton" :ui="{ rounded: 'rounded-md' }" />
                </transition>
            </div>
        </div>

        <div class="flex mt-8 flex-col lg:flex-row"><!--Favorite Playlists-->
            <div class="flex flex-col flex-[0.4] workout-cont"><!--Workout Section-->
                <span class="flex">
                    <u-icon name="i-tabler-stretching" class="h-4 w-4 text-purple-500 self-center font-bold"></u-icon>
                    <span class="font-semibold text-neutral-400 text-xs tracking-wider ml-2">Workout Playlist</span>
                </span>

                <span v-if="dataLoaded" class="flex flex-col mt-2 lg:overflow-y-scroll lg:max-h-[40%]">
                    <!--Workout Playlist-->
                    <song class="first:mt-0" v-for="track in workoutTracks" :key="track.id" :track="track" />
                </span>
                <span v-else class="flex flex-col mt-8">
                    <u-skeleton v-for="i in ['', '', '', '']" class="h-12 w-full mt-8 first:mt-0" />
                </span>
            </div>

            <div class="flex flex-col flex-[0.4] mt-8 lg:mt-0 lg:ml-auto liked-cont"><!--Liked Section-->
                <span class="flex">
                    <u-icon name="i-tabler-heart" class="h-4 w-4 text-orange-500 self-center font-bold"></u-icon>
                    <span class="font-semibold text-neutral-400 text-xs tracking-wider ml-2">Liked Songs</span>
                </span>

                <span v-if="dataLoaded" class="flex flex-col mt-2"> <!--Liked Songs-->
                    <song class="first:mt-0" v-for="track in likedTracks" :key="track.id" :track="track" />
                </span>

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

const setupSpotify = async () => {
    /* retrieve generated access token */
    const { data: { access } } = useNuxtApp().payload;

    spotify = new SpotifyWebApi();
    spotify.setAccessToken(access.token.access_token);
}

const loadLikedTracks = async () => {
    const { body: { items } } = await spotify.getMyTopTracks({
        time_range: "medium_term",
        limit: 10,
        offset: 5
    });

    // console.log(items);
    likedTracks.value = items;
}

const loadWorkoutTracks = async () => {
    const { body: { items } } = await spotify.getPlaylistTracks("5i3fEXuXIrNg9uV1D9eo5w");

    workoutTracks.value = items.map((t) => t.track);
}

onMounted(async () => {
    showDataAnim();

    await setupSpotify(); // should always be called first

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
/*.show-loaded-enter-active {
    transition: opacity 0.4s ease-in;
}

.show-loaded-leave-active {}

.show-loaded-enter-from,
.show-loaded-leave-to {
    opacity: 0.4;
}*/
</style>