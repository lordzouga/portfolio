<template>
    <div class="flex pt-4 pb-4 border border-r-transparent border-t-transparent border-l-transparent border-neutral-600/30 
    group-hover: cursor-pointer
    hover:bg-gradient-to-b hover:from-neutral-500/10 hover:to-neutral-600/20 hover:border hover:border-neutral-800/40 transition-all
    -mx-4 px-4 lg:rounded-md group" @click="isOpen = true" @mouseenter="showArt" @mouseleave="reverseShowArt">

        <img src="/img/statik_art.jpeg"
            class="h-8 w-8 self-center hidden rounded-md mr-4 shadow-[0_0_1px_1px_rgba(0,0,0,0.14)]"
            :class="[`${song.ident}-art`]" />

        <span class="flex flex-col tracking-wide " :class="[`${song.ident}-details`]">
            <span class="font-medium text-sm text-neutral-200/90 group-hover:text-white ">
                {{ song.title }} </span>
            <span class="text-xs text-neutral-300 mt-1">{{ song.artist }}</span>
        </span>

        <span class="ml-auto self-center text-neutral-400 text-sm tracking-wider">{{ song.duration }}</span>

        <USlideover v-model="isOpen" :key="song.title" class="font-inter">
            <div class="h-full bg-[url('/img/statik_art.jpeg')] bg-cover bg-center player-root">
                <div class="h-full bg-gradient-to-b from-neutral-950/80 from-[8%] via-transparent via-10% 
                  to-black to-60% p-8 flex flex-col">
                    <div>
                        <UButton class="close-button" square="" variant="solid" color="gray"
                            icon="i-heroicons-x-mark-20-solid" @click="isOpen = false" />
                    </div>

                    <div class="h-[60%] bg-transparent"></div> <!--Do this to have better control over the spacing-->
                    <div class="flex flex-col player-details"><!--Song Details-->
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

                    <div class="flex flex-col mt-8 play-button"><!-- Play Button -->
                        <UIcon class="text-orange-500 h-8 w-8 self-center " name="i-basil-play-solid" />

                        <UButton class="mt-4 self-center focus:ring-0 focus-visible:ring-0" size="xs" color="gray"
                            :padded="false" icon="i-teenyicons-spotify-outline" variant="link">
                            Open in Spotify
                        </UButton>
                    </div>

                    <span class="mt-auto text-neutral-500 text-xs font-light played-stat"> listened to 245 times </span>
                </div>
            </div>
        </USlideover>
    </div>
</template>

<script setup>

const props = defineProps(["song"]);
const isOpen = ref(false);

const animComp = () => {
    useNuxtApp().$gsap.timeline()
        .from(".player-root", { duration: 0.4, y: "10%", opacity: 0, delay: 0.2, ease: 'sine' })
        .from(".close-button", { scale: 0.5, opacity: 0, duration: 0.3, ease: "back" }, 0.5)
        .from(".player-details", { y: "20%", duration: 0.2, opacity: 0, ease: "sine" }, 0.3)
        .from(".play-button", { scale: 0.2, opacity: 0, duration: 0.5, ease: "back.out" }, 0.4)
        .from(".played-stat", { opacity: 0, duration: 0.2, ease: "power2.ease" }, 0.2);
}

var foo = null;

const showArt = () => {
    foo = useNuxtApp().$gsap.timeline()
        .to(`.${props.song.ident}-details`, { duration: 0.2, x: 48, ease: "power2.ease" })
        .set(`.${props.song.ident}-art`, { display: 'flex' })
        .set(`.${props.song.ident}-details`, { x: 0 })
        .fromTo(`.${props.song.ident}-art`, { scale: 0.5, }, { scale: 1, duration: 0.2, ease: "back.out" });
}

const reverseShowArt = () => {
    if (foo != null) {
        foo.reverse(0);
    }
}

watch(isOpen, (newVal, oldVal) => {
    if (newVal) { // if slider is open
        nextTick(() => animComp())
    }
})
</script>
