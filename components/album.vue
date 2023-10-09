<template>
    <div @click="isOpen = true" class="flex flex-col max-w-[84px] rounded-md cursor-pointer 
         transition-transform hover:-translate-y-1 duration-[250ms] hover:text-white group active:scale-75">
        <div class="h-16 w-16 rounded bg-center bg-contain
                shadow-[0_0_1px_1px_rgba(0,0,0,0.14)] ring-1 ring-slate-900/5  album-root"
            :style="`--bg-var: url('${art}');`">
            <div class="rounded h-full w-full bg-gradient-to-b from-neutral-500/40 via-30% to-black/20"></div>
        </div>
        <span class="text-xs mt-2 group-hover:text-white group-hover:underline text-neutral-200/80 tracking-wide">
            {{ album.name }}</span>

        <Overslide v-model="isOpen" @open="onSliderOpened" :ui="{
            transition: { enter: 'transform transition ease duration-100' }
        }">
            <div class="h-full w-full font-inter artist-page-root">
                <img class="absolute h-full w-full blur-xl overflow-hidden" :src="album.images[1].url" />

                <div
                    class="absolute h-full lg:p-8 p-4 flex flex-col bg-neutral-900/30 no-scrollbar overflow-y-scroll scroll-smooth">
                    <div class="fixed">
                        <UButton class="close-button" square="" variant="solid" color="gray"
                            icon="i-heroicons-x-mark-20-solid" @click="isOpen = false" />
                    </div>

                    <div class="mt-10 self-center album-title flex flex-col text-center">
                        <span class="text-xl font-semibold text-neutral-300"> {{ album.name }}</span>
                        <span class="text-neutral-400 font-medium">{{ album.artists[0].name }}</span>
                    </div>

                    <img class="shadow-xl rounded-xl self-center w-[80%] mt-4 album-art" :src="album.images[0].url" />

                    <div class="mt-8 flex flex-col track-list">
                        <span class="font-semibold text-sm text-neutral-400">Tracks
                            <UBadge color="gray" variant="soft" size="xs" class="ml-2">{{ tracks.length }}</UBadge>
                        </span>

                        <div class="flex flex-col mt-2">
                            <div class="px-4 -mx-4 cursor-pointer" v-for="track in tracks">
                                <div class="mt-4 mb-4 text-sm text-neutral-200 font-medium flex">{{ track.name }}
                                    <span class="ml-2 text-xs text-neutral-400 self-center"> {{
                                        getDuration(track.duration_ms) }}
                                    </span>
                                </div>
                                <hr class="border-neutral-400/10">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Overslide>
    </div>
</template>

<script setup>
const props = defineProps(["album"]);

/** @type { SpotifyApi.AlbumObjectSimplified } */
const album = props.album;

console.log(album);

/** @type { SpotifyApi.TrackObjectSimplified[] } */
const tracks = ref([]);
const art = album.images[2].url;
const isOpen = ref(false);

const getDuration = (duration) => {
    return new Date(duration).toLocaleTimeString([], {
        minute: "numeric",
        second: "2-digit"
    });
}

const { loadAlbumTracks } = useSpotify();

loadAlbumTracks(album.id).then((items) => {
    tracks.value = items
});

const onSliderOpened = () => {
    useNuxtApp().$gsap.timeline()
        .from(".album-art", { duration: 0.3, delay: 0.12, y: "10%", opacity: 0, ease: "power.Out2" })
        .from(".album-title", { duration: 0.2, delay: 0.15, x: "10%", opacity: 0 }, 0.1)
        .from(".track-list", { duration: 0.2, delay: 0.1, y: "5%", opacity: 0, ease: "out" }, 0.2)
}
</script>

<style>
.album-root {
    background-image: var(--bg-var);
}

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
</style>