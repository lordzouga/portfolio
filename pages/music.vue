<template>
    <div class="flex flex-col">
        <div class="flex mt-8"><!--Artists and Albums-->
            <div class="flex flex-col"><!--Artists-->
                <span class="flex">
                    <u-icon name="i-tabler-palette" class="h-4 w-4 text-blue-500 self-center"></u-icon>
                    <span class="font-semibold text-xs text-neutral-400 tracking-wider ml-2">
                        Favorite Artists</span>
                </span>

                <!--<hr class="mt-2 mb-4 border-neutral-600/0 border">-->

                <span class="flex mt-4"><!--Artist List-->
                    <artist class="ml-8 first:ml-0" v-for="artist in artists" :artist="artist" />
                </span>
            </div>

            <div class="flex flex-col ml-auto"><!--Albums-->
                <span class="flex">
                    <u-icon name="i-tabler-album" class="h-4 w-4 text-pink-500 self-center"></u-icon>
                    <span class="font-semibold text-neutral-400 text-xs tracking-wider ml-2">Favorite Albums</span>
                </span>


                <!--<hr class="mt-2 mb-4 border-neutral-600/0 border">-->
                <span class="flex mt-4"> <!--Album list-->
                    <album class="ml-8 first:ml-0" v-for="album in albums" :album="album" />
                </span>
            </div>
        </div>

        <div class="flex mt-8"><!--Favorite Playlists-->
            <div class="flex flex-col flex-[0.4]"><!--Workout Section-->
                <span class="flex">
                    <u-icon name="i-tabler-stretching" class="h-4 w-4 text-purple-500 self-center font-bold"></u-icon>
                    <span class="font-semibold text-neutral-400 text-xs tracking-wider ml-2">Workout Playlist</span>
                </span>
                <!--<hr class="mt-2 mb-4 border-neutral-600/0 border">-->

                <span class="flex flex-col mt-2"> <!--Workout Playlist-->
                    <song class="first:mt-0" v-for="song in workoutSongs" :song="song" />
                </span>
            </div>

            <div class="flex flex-col flex-[0.4] ml-auto"><!--Liked Section-->
                <span class="flex">
                    <u-icon name="i-tabler-heart" class="h-4 w-4 text-orange-500 self-center font-bold"></u-icon>
                    <span class="font-semibold text-neutral-400 text-xs tracking-wider ml-2">Liked Songs</span>
                </span>
                <!--<hr class="mt-2 mb-4 border-neutral-600/0 border">-->

                <span class="flex flex-col mt-2"> <!--Liked Songs-->
                    <song class="first:mt-0" v-for="song in workoutSongs" :song="song" />
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

const loginToSpotify = async () => {
    /* retrieve generated access token */
    const { data: { access } } = useNuxtApp().payload;

    let spotify = new SpotifyWebApi();
    spotify.setAccessToken(access.token.access_token);

    const me = await spotify.getMe();
    console.log(me.body);

    const tracks = await spotify.getMyTopTracks({
        time_range: 'medium_term',
        limit: 10,
        offset: 5
    });

    console.log(tracks);
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
    }
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
    }
]

const workoutSongs = [
    {
        title: "Yeah Yeah Yeah",
        artist: "Jax Jones",
        duration: "4:53"
    },
    {
        title: "Tsunami",
        artist: "DVBBS, Borgeous",
        duration: "3:57"
    },
    {
        title: "Wake Up",
        artist: "No wyld",
        duration: "3:50"
    },
    {
        title: "Upside Down",
        artist: "Paloma Faith",
        duration: "3:09"
    }
]

const likedSongs = [

]


onMounted(() => {
    loginToSpotify();
});

</script>