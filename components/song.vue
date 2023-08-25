
<template>
    <div class="flex pt-4 pb-4 border-b border-neutral-600/30 group-hover: hover:bg-neutral-700 cursor-pointer 
    lg:-mx-4 lg:px-4 lg:rounded-md group" @click="isOpen = true" :key="song.artist">
        <span class="flex flex-col tracking-wide">
            <span class="font-medium text-sm text-neutral-200/90 group-hover:text-white group-hover:underline ">
                {{ song.title }} </span>
            <span class="text-xs text-neutral-300 mt-1">{{ song.artist }}</span>
        </span>

        <span class="ml-auto self-center text-neutral-400 text-sm tracking-wider">{{ song.duration }}</span>

        <USlideover v-model="isOpen" :key="song.title" class="font-inter">
            <div class="h-full bg-[url('/img/statik_art.jpeg')] bg-cover bg-center">
                <div class="h-full bg-gradient-to-b from-neutral-950/80 from-[8%] via-transparent via-10% 
                  to-black to-60% p-8 flex flex-col">
                    <div>
                        <UButton class="" square="" variant="solid" color="gray" icon="i-heroicons-x-mark-20-solid"
                            @click="isOpen = false" />
                    </div>

                    <div class="h-[60%] bg-transparent"></div> <!--Do this to have better control over the spacing-->

                    <div class="flex flex-col"><!--Song Details-->
                        <span class="text-xl text-neutral-200 tracking-wide font-semibold">
                            {{ song.title }}
                        </span>
                        <span class="text-base text-neutral-400 tracking-wide font-medium">
                            {{ song.artist }}
                        </span>
                        <span class="text-sm text-neutral-500 tracking-wide font-medium mt-[0.175em]">
                            Ultraviolence
                        </span>
                    </div>

                    <div class="flex flex-col  mt-8"><!-- Play Button -->
                        <UIcon class="text-orange-500 h-8 w-8 self-center" name="i-basil-play-solid" />

                        <UButton class="mt-4 self-center focus:ring-0 focus-visible:ring-0" size="xs" color="gray"
                            :padded="false" icon="i-teenyicons-spotify-outline" variant="link">
                            Open in Spotify
                        </UButton>
                    </div>

                    <span class="mt-auto text-neutral-500 text-xs font-light"> listened to 245 times </span>
                </div>
            </div>
        </USlideover>
    </div>
</template>

<script setup>
const props = defineProps(["song"]);

const isOpen = ref(false);
</script>
