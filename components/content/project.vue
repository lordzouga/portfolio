<template>
    <section class="section">
        <h1 class=" text-2xl lg:text-3xl font-medium dark:text-neutral-100 text-neutral-800 ">
            <slot />
        </h1>
        <div class=" rounded-lg ring-1 ring-neutral-800/80 image" v-if="showImage">
            <slot name="mainimage"></slot>
        </div>
        <span class="inline-block mt-4 font-semibold text-2xl dark:text-neutral-400/40 text-neutral-500"
            v-if="showSuperlabel">
            <slot name="superlabel"></slot>
        </span>
        <div class="mt-4 lg:mt-8 font-medium text-xl dark:text-neutral-300/60 text-neutral-600/70">
            <slot name="label"> </slot>
        </div>
        <div class=" rounded-lg ring-1 ring-neutral-800/80 image" v-if="showSubImage">
            <slot name="subimage"></slot>
        </div>
        <span class="mt-4 inline-block text-sm xl:text-base tracking-wide dark:text-neutral-100 text-neutral-800">
            <slot name="description"></slot>
        </span>
    </section>
</template>

<script setup>
const slots = useSlots();
const showImage = slots.mainimage;
const showSuperlabel = slots.superlabel;
const showSubImage = slots.subimage;

// console.log(showImage);


</script>
    
<style>
.image img {
    @apply rounded-lg mt-4 lg:mt-8 shadow-md;
}
</style>