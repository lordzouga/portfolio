<template>
    <div class="flex flex-col items-center lg:items-center cursor-pointer
        transition-transform hover:-translate-y-1 duration-[250ms] group active:scale-75" @click="isOpen = true">
        <UAvatar class="artist-avatar" :src="avatar" size="2xl" :alt="name" />
        <span class="mt-2 text-xs group-hover:text-white group-hover:underline text-neutral-200/80 tracking-wide">
            {{ name }}</span>

        <Overslide v-model="isOpen" @open="onSliderOpenAnimate" :ui="{
            overlay: {
                background: 'bg-gray-200/75 dark:bg-gray-800/75 blur',
                transition: { enter: 'ease-linear duration-100' }
            },
            transition: { enter: 'transform transition ease-in-out duration-100' }
        }">
            <div class="h-full w-full font-inter artist-page-root" :style="`--bg-var: url('${artistPhoto}');`">
                <div class="h-full bg-gradient-to-b from-neutral-900/70 from-[0%] via-neutral-400/50 via-10% 
                  to-black to-90% lg:p-8 p-4 flex flex-col">
                    <div>
                        <UButton class="close-button" square="" variant="solid" color="gray"
                            icon="i-heroicons-x-mark-20-solid" @click="isOpen = false" />
                    </div>

                    <div class="artist-name text-center text-2xl mt-4 font-semibold text-neutral-300">{{ name }}</div>
                    <Popularity class="popularity text-center justify-center mt-2" :popularity="artist.popularity" />

                    <div class="flex justify-between mt-8">
                        <img v-for="albumArt in albumArts" :src="albumArt"
                            class="album-art w-[30%] rounded-lg hover:shadow-xl hover:outline outline-orange-500 shadow-md ring-1 ring-slate-900/5 cursor-pointer" />
                    </div>

                    <div class="flex flex-col mt-8 popular-songs">
                        <span class="text-sm text-neutral-400 font-medium">Popular Songs</span>

                        <div class="mt-4 flex flex-col">
                            <div class="first:mt-0 flex p-2 items-center -mx-2 border-b border-b-neutral-700/20"
                                v-for="  track   in   topTracks  ">
                                <img class="h-8 w-8 rounded-md mr-4" :src="track.album.images[2].url" />
                                <span class="text-neutral-200 text-sm font-medium">{{ track.name }}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </Overslide>
    </div>
</template>

<script setup>
const props = defineProps(["artist"])

/** @type { SpotifyApi.SingleArtistResponse } */
const artist = props.artist;
const albumArts = ref([]);

const name = artist.name;
const avatar = artist.images[2].url;
const isOpen = ref(false);
const albumPreviewLimit = 3;

/** @type { SpotifyApi.TrackObjectFull[] } */
const topTracks = ref([]);

const artistPhoto = artist.images[0].url;

const { loadArtistAlbums, loadArtistTopTracks } = useSpotify();

/* sequence of animation to be played when slider is opened */
const onSliderOpenAnimate = () => {
    useNuxtApp().$gsap.timeline()
        .from([".artist-name", ".popularity"], { duration: 0.2, delay: 0.05, stagger: 0.2, x: "20%", opacity: 0, ease: "back" })
        .from(".album-art", { duration: 0.4, stagger: 0.1, delay: 0.05, y: "10%", opacity: 0 }, 0.1)
        .from(".popular-songs", { duration: 0.2, delay: 0.1, y: "10%", opacity: 0 }, 0.1)
}

loadArtistAlbums(artist.id).then((items) => {
    /** @type { SpotifyApi.AlbumObjectSimplified[] } */
    let albums = items;

    albumArts.value = albums.slice(0, albumPreviewLimit).map(({ images }) => images[1].url);
});


loadArtistTopTracks(artist.id).then((tracks) => {
    topTracks.value.push(...tracks);
});

/* watch(isOpen, (_new, old) => {
    // run the animation only when the slider is opened
    if (_new) nextTick(() => onSliderOpenAnimate());
})*/



</script>

<style>
.artist-container {
    transition: transform 0.2s ease-in-out;
}

.artist-container:hover {
    transform: translateY(-2px) scale(1.05);
}

.artist-page-root {
    background-image: var(--bg-var);
}

@keyframes zoom {
    0% {
        transform: scale(1.0);
    }

    100% {
        transform: scale(1.1);
    }

}
</style>