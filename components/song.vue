<template>
    <div class="flex pt-4 pb-4 border-b border-neutral-600/30">
        <span class="flex flex-col tracking-wide">
            <span class="font-medium text-sm text-neutral-200/90">{{ song.title }}</span>
            <span class="text-xs text-neutral-300 mt-1">{{ song.artist }}</span>
        </span>
        <span class="ml-auto self-center text-neutral-400 text-sm tracking-wider">{{ song.duration }}</span>
    </div>
</template>

<script setup>
defineProps(["song"])
</script>