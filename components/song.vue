
<template>
    <div class="flex pt-4 pb-4 border-b border-neutral-600/30 group-hover: hover:bg-neutral-700 cursor-pointer 
    lg:-mx-4 lg:px-4 lg:rounded-md group" @click="isOpen = true" :key="song.artist">
        <span class="flex flex-col tracking-wide">
            <span class="font-medium text-sm text-neutral-200/90 group-hover:text-white group-hover:underline ">
                {{ song.title }} </span>
            <span class="text-xs text-neutral-300 mt-1">{{ song.artist }}</span>
        </span>

        <span class="ml-auto self-center text-neutral-400 text-sm tracking-wider">{{ song.duration }}</span>

        <USlideover v-model="isOpen" :key="song.title">
            <div class="h-full bg-[url('/img/statik_art.jpeg')] bg-cover bg-center">
                <div class="h-full bg-gradient-to-b from-neutral-950 from-5% via-transparent via-10% 
                  to-black to-70% p-8 flex flex-col">
                    <span class="text-white"> foo </span>
                    <span class="justify-center mt-auto">
                        <span>
                            {{ song.title }}
                        </span>
                    </span>
                </div>
            </div>
        </USlideover>
    </div>
</template>

<script setup>
const props = defineProps(["song"]);

const isOpen = ref(false);
</script>

<style>
.slider {
    position: relative;
}

.slider:before {
    content: ' ';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
    background-image: url('/img/statik_art.jpeg');
    background-repeat: repeat space;
    background-position: 50% 0;
    background-size: cover;
}
</style>
