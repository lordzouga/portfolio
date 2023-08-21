<template>
    <div class="flex flex-col items-center lg:items-center">
        <UAvatar :src="artist.avatar" size="2xl" :alt="artist.name"></UAvatar>
        <span class="mt-2 text-xs text-neutral-200/80 tracking-wide"> {{ artist.name }}</span>
    </div>
</template>

<script setup>
defineProps(["artist"])
</script>