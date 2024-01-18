<template>
    <section>
        <h1 class="text-3xl font-medium text-neutral-100 ">
            <slot />
        </h1>
        <div class=" rounded-lg ring-1 ring-neutral-800/80 mainimage" v-if="showImage">
            <slot name="mainimage"></slot>
        </div>
        <span class="inline-block mt-4 font-semibold text-2xl text-neutral-400/40" v-if="showSuperlabel">
            <slot name="superlabel"></slot>
        </span>
        <div class="mt-4 font-medium text-xl text-neutral-300/60">
            <slot name="label"> </slot>
        </div>
        <span class="mt-1 inline-block text-sm xl:text-base tracking-wide text-neutral-100">
            <slot name="description"></slot>
        </span>
    </section>
</template>

<script setup>
const slots = useSlots();
const showImage = slots.mainimage;
const showSuperlabel = slots.superlabel;

// console.log(showImage);


</script>
    
<style>
.mainimage img {
    @apply rounded-lg mt-8 shadow-md;
}
</style>