<template>
    <span class="flex flex-col w-full flex-1 ">
        <song class="first:mt-0" v-for="track in songs" :key="track.id" :track="track" />
    </span>
</template>
<script setup>
const props = defineProps(["songs"])

///** @type { Array<SpotifyApi.TrackObjectFull> } */
//const songs = props.songs;

</script>