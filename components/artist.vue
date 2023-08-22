<template>
    <div class="flex flex-col items-center lg:items-center cursor-pointer
        transition-transform hover:-translate-y-1 duration-[250ms] group">
        <UAvatar class="artist-avatar group-hover:outline outline-orange-500" :src="artist.avatar" size="2xl"
            :alt="artist.name" />
        <span class="mt-2 text-xs group-hover:text-white text-neutral-200/80 tracking-wide"> {{ artist.name }}</span>
    </div>
</template>

<script setup>
defineProps(["artist"])
</script>

<style>
.artist-container {
    transition: transform 0.2s ease-in-out;
}

.artist-container:hover {
    transform: translateY(-2px) scale(1.05);
}

@keyframes zoom {
    0% {
        transform: scale(1.0);
    }

    100% {
        transform: scale(1.1);
    }

}
</style>