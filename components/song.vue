<template>
    <div class="flex pt-4 pb-4 border border-r-transparent border-t-transparent border-l-transparent border-neutral-600/20 
    cursor-pointer active:scale-90
    hover:bg-gradient-to-b hover:from-neutral-500/10 hover:to-neutral-600/20 
    hover:border hover:border-neutral-800/40 transition-all
    -mx-4 px-4 lg:rounded-md group" @click="isOpen = true" @mouseenter="showArt" @mouseleave="reverseShowArt">
        <img :src="thumbArt" class="h-10 w-10 self-center hidden rounded-md mr-4 shadow-[0_0_1px_1px_rgba(0,0,0,0.14)]"
            :class="[`${song.ident}-art`]" />

        <span class="flex flex-col tracking-wide " :class="[`${song.ident}-details`]">
            <span class="font-medium text-sm text-neutral-200/90 group-hover:text-orange-500 ">
                {{ song.title }} </span>
            <span class="text-xs text-neutral-400 mt-1">{{ song.artist }}</span>
        </span>

        <span class="ml-auto self-center text-neutral-400/70 text-sm tracking-wider">{{ song.duration }}</span>

        <Overslide v-model="isOpen" @open="animComp" :ui="{
            overlay: {
                transition: { enter: 'ease-linear duration-100' }
            },
            transition: { enter: 'transform transition ease-in-out duration-100' }
        }" :key="song.ident" class="font-inter">
            <div class="h-full bg-cover bg-center player-root" :style="`--bg-var: url('${fullArt}');`">
                <div class="h-full bg-gradient-to-b from-neutral-950/80 from-[1%] via-transparent via-10% 
                  to-black to-60% lg:p-8 p-4 flex flex-col">
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
                            {{ artistsFull }}
                        </span>
                        <span class="text-sm text-neutral-500 tracking-wide font-medium mt-[0.175em]">
                            {{ albumTitle }}
                        </span>
                    </div>

                    <div class="flex flex-col mt-8 play-button"><!-- Play Button -->
                        <UIcon class="text-orange-500 h-8 w-8 self-center " name="i-basil-play-solid" />

                        <UButton class="mt-4 self-center focus:ring-0 focus-visible:ring-0" size="xs" color="gray"
                            :padded="false" icon="i-teenyicons-spotify-outline" variant="link"
                            :to="track.external_urls.spotify" target="_blank">
                            Open in Spotify
                        </UButton>
                    </div>

                    <span class="mt-auto text-neutral-500 text-xs font-light played-stat"> listened to 245 times </span>
                </div>
            </div>
        </Overslide>
    </div>
</template>

<script setup>

/** @type {{ track: SpotifyApi.SingleTrackResponse }} */
const { track } = defineProps(["track"]);

const isOpen = ref(false);

// console.log(track)

const title = track.name;
const ident = track.id.toLowerCase().replace(/[0-9]/g, '');

/* show that the track was made by more than on artist */
let extraCount = track.artists.length - 1;
let artist = "";

if (extraCount) {
    artist = `${track.artists[0].name} +${extraCount}`
} else {
    artist = track.artists[0].name
}

const artistsFull = track.artists.map(({ name }) => name).join(", ");

const duration = new Date(track.duration_ms).toLocaleTimeString([], {
    minute: "numeric",
    second: "2-digit"
});

const thumbArt = track.album.images[2].url;
const fullArt = track.album.images[0].url;

const albumTitle = track.album.name;

const song = { title, ident, artist, duration };

const animComp = () => {
    useNuxtApp().$gsap.timeline()
        //.from(".player-root", { duration: 0.2, opacity: 0, delay: 0.05, ease: 'sine' }, 0.1)
        .from(".close-button", { scale: 0.5, opacity: 0, duration: 0.3, ease: "back" }, 0.5)
        .from(".player-details", { y: "20%", duration: 0.2, opacity: 0, ease: "sine" }, 0.3)
        .from(".play-button", { scale: 0.2, opacity: 0, duration: 0.3, ease: "back.out" }, 0.4)
        .from(".played-stat", { opacity: 0, duration: 0.2, ease: "power2.ease" }, 0.2);
}

var artAnimTimeline = null;

/* We want the album art to be shown on hover but it should remain hidden otherwise */
const newArtAnim = () => {
    artAnimTimeline = useNuxtApp().$gsap.timeline()
        .to(`.${song.ident}-details`, { duration: 0.2, x: 56, ease: "power2.ease" })
        .set(`.${song.ident}-art`, { display: 'flex' })
        .set(`.${song.ident}-details`, { x: 0 })
        .fromTo(`.${song.ident}-art`, { scale: 0.5, opacity: 0.5 },
            { scale: 1, opacity: 1, duration: 0.4, ease: "back.out" });
}

/* sync animation states between an already playing animation and the start of a new one */
const showArt = () => {
    if (artAnimTimeline != null && artAnimTimeline.progress() > 0 && artAnimTimeline.progress() < 1) { // if the animation is still running, reverse it
        if (artAnimTimeline.reversed()) artAnimTimeline.play();
        else artAnimTimeline.reverse();
    } else {
        newArtAnim();
    }
}

const reverseShowArt = () => {
    if (artAnimTimeline != null && !artAnimTimeline.reversed()) {
        artAnimTimeline.reverse();
    }
}

</script>

<style>
.player-root {
    background-image: var(--bg-var);
}
</style>