<template>
    <div class="flex flex-col items-center lg:items-center cursor-pointer
        transition-transform hover:-translate-y-1 duration-[250ms] group active:scale-75" @click="isOpen = true">
        <UAvatar class="artist-avatar" :src="avatar" size="2xl" :alt="name" />
        <span class="mt-2 text-xs group-hover:text-white group-hover:underline text-neutral-200/80 tracking-wide">
            {{ name }}</span>

        <USlideover v-model="isOpen">
            <div class="h-full w-full ">
                <div class="h-full bg-gradient-to-b from-neutral-950/80 from-[1%] via-transparent via-10% 
                  to-black to-60% lg:p-8 p-4 flex flex-col">
                    <div>
                        <UButton class="close-button" square="" variant="solid" color="gray"
                            icon="i-heroicons-x-mark-20-solid" @click="isOpen = false" />
                    </div>

                    <span class="text-center text-xl mt-4 font-semibold">{{ name }}</span>
                    <span class="text-center"> {{ artist.popularity }}</span>
                </div>

            </div>
        </USlideover>
    </div>
</template>

<script setup>
const props = defineProps(["artist"])

/** @type { SpotifyApi.SingleArtistResponse } */
const artist = props.artist;


const name = artist.name;
const avatar = artist.images[2].url;

const isOpen = ref(false);
</script>

<style>
.artist-container {
    transition: transform 0.2s ease-in-out;
}

.artist-container:hover {
    transform: translateY(-2px) scale(1.05);
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