<template>
    <div class="flex flex-col max-w-[84px] rounded cursor-pointer hover:underline 
         transition-transform hover:-translate-y-1 duration-[250ms]">
        <img :src="album.art"
            class="hover:outline outline-orange-500 h-16 w-16 rounded bg-gradient-to-b from-neutral-950/80 to-neutral-950/10 " />
        <span class="text-xs mt-2 dark:text-neutral-200/80 tracking-wide">{{ album.title }}</span>
    </div>
</template>

<script setup>
defineProps(["album"])
</script>