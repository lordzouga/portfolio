<template>
    <div class="flex pt-4 pb-4 border-b border-neutral-600/30 group-hover: hover:bg-neutral-700 cursor-pointer 
    lg:-mx-4 lg:px-4 lg:rounded-md group">
        <span class="flex flex-col tracking-wide">
            <span class="font-medium text-sm text-neutral-200/90 group-hover:text-white group-hover:underline">
                {{ song.title }}</span>
            <span class="text-xs text-neutral-300 mt-1">{{ song.artist }}</span>
        </span>
        <span class="ml-auto self-center text-neutral-400 text-sm tracking-wider">{{ song.duration }}</span>
    </div>
</template>

<script setup>
defineProps(["song"])
</script>
