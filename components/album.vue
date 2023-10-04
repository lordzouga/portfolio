<template>
    <div @click="isOpen = true" class="flex flex-col max-w-[84px] rounded-md cursor-pointer 
         transition-transform hover:-translate-y-1 duration-[250ms] hover:text-white group active:scale-75">
        <div class="h-16 w-16 rounded bg-center bg-contain
                shadow-[0_0_1px_1px_rgba(0,0,0,0.14)] ring-1 ring-slate-900/5  album-root"
            :style="`--bg-var: url('${art}');`">
            <div class="rounded h-full w-full bg-gradient-to-b from-neutral-500/40 via-30% to-black/20"></div>
        </div>
        <span class="text-xs mt-2 group-hover:text-white group-hover:underline text-neutral-200/80 tracking-wide">
            {{ title }}</span>

        <Overslide v-model="isOpen" @open="onSliderOpened">
            <div>
                <div>
                    <UButton class="close-button" square="" variant="solid" color="gray" icon="i-heroicons-x-mark-20-solid"
                        @click="isOpen = false" />
                </div>
            </div>
        </Overslide>
    </div>
</template>

<script setup>
const props = defineProps(["album"]);

/** @type { SpotifyApi.AlbumObjectFull } */
const album = props.album;

const art = album.images[2].url;
const title = album.name;

const isOpen = ref(false);

const onSliderOpened = () => {
    console.log("opened ");
}
</script>

<style>
.album-root {
    background-image: var(--bg-var);
}
</style>