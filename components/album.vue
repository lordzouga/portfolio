<template>
    <div class="flex flex-col max-w-[84px] rounded ">
        <img :src="album.art" class="h-16 w-16 rounded bg-gradient-to-b from-neutral-950/80 to-neutral-950/10 " />
        <span class="text-xs mt-2 text-neutral-200 tracking-wide">{{ album.title }}</span>
    </div>
</template>

<script setup>
defineProps(["album"])
</script>