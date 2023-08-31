<template>
    <div class="flex flex-col max-w-[84px] rounded cursor-pointer 
         transition-transform hover:-translate-y-1 duration-[250ms] hover:text-white group active:scale-75">

        <div class="h-16 w-16 rounded bg-center bg-contain
                shadow-[0_0_1px_1px_rgba(0,0,0,0.14)] ring-1 ring-slate-900/5  album-root"
            :style="`--bg-var: url('${album.art}');`">
            <div class="rounded h-full w-full bg-gradient-to-b from-neutral-500/40 via-30% to-black/20"></div>
        </div>
        <span class="text-xs mt-2 group-hover:text-white group-hover:underline text-neutral-200/80 tracking-wide">
            {{ album.title }}</span>
    </div>
</template>

<script setup>
defineProps(["album"])
</script>

<style>
.album-root {
    background-image: var(--bg-var);
}
</style>