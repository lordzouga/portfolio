<template>
    <div class="flex flex-col items-center lg:items-center cursor-pointer
        transition-transform hover:-translate-y-1 duration-[250ms] group active:scale-75" @click="isOpen = true">
        <UAvatar class="artist-avatar" :src="avatar" size="2xl" :alt="name" />
        <span class="mt-2 text-xs group-hover:text-white group-hover:underline text-neutral-200/80 tracking-wide">
            {{ name }}</span>

        <USlideover v-model="isOpen">
            <div class="h-full w-full font-inter artist-page-root" :style="`--bg-var: url('${artistPhoto}');`">
                <div class="h-full bg-gradient-to-b from-neutral-900/70 from-[1%] via-neutral-950/70 via-10% 
                  to-black to-90% lg:p-8 p-4 flex flex-col">
                    <div>
                        <UButton class="close-button" square="" variant="solid" color="gray"
                            icon="i-heroicons-x-mark-20-solid" @click="isOpen = false" />
                    </div>

                    <span class="text-center text-2xl mt-4 font-semibold text-neutral-300">{{ name }}</span>
                    <span class="text-center"> {{ artist.popularity }}</span>

                    <div class="flex justify-between mt-8">
                        <img :src="albumArts[0]" class="w-[30%] rounded-lg" />
                        <img :src="albumArts[1]" class="w-[30%] rounded-lg" />
                        <img :src="albumArts[2]" class="w-[30%] rounded-lg" />
                    </div>

                    <div class="flex flex-col mt-8">
                        <span class="text-sm text-neutral-400 font-medium">Popular Songs</span>

                        <div class="mt-4 flex flex-col">
                            <div class="first:mt-0 flex p-2 items-center -mx-2 border-b border-b-neutral-700/20"
                                v-for="track in topTracks">
                                <img class="h-8 w-8 rounded-md mr-4" :src="track.album.images[2].url" />
                                <span class="text-neutral-200 text-sm font-medium">{{ track.name }}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </USlideover>
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

/** @type { SpotifyApi.TrackObjectFull[] } */
const topTracks = ref([]);

const artistPhoto = artist.images[0].url;

const { loadArtistAlbums, loadArtistTopTracks } = useSpotify();

loadArtistAlbums(artist.id).then((items) => {
    /** @type { SpotifyApi.AlbumObjectSimplified[] } */
    let albums = items;

    albumArts.value = albums.map(({ images }) => images[1].url);
});

loadArtistTopTracks(artist.id).then((tracks) => {
    topTracks.value.push(...tracks);
});


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
    filter: blur(0.8);
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