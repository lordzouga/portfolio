<template>
    <div class="card project-card mt-4 first:mt-0 lg:mt-0 overflow-hidden rounded-lg
     ring-1 ring-slate-900/5 flex-col flex p-4 lg:flex-[0.3] bg-gradient-to-b from-neutral-950/80 to-neutral-950/10
    shadow-[0_0_1px_1px_rgba(0,0,0,0.14)] min-h-[200px] cursor-pointer hover:outline-orange-600 hover:outline peer" 
    :style="`background-color: ${ color }; --bg-var: url('/img/${ background }');`" 
   >
      <span class=" text-sm text-neutral-100 tracking-wide font-semibold " >
          {{ title }} <span class="hover:animate-ping">
            <UBadge class="ml-1" color="orange" size="xs" :variant='"subtle"'  >{{ group }}</UBadge></span>
      </span>
      
      <span class="text-neutral-400 text-xs tracking-wide font-medium"> {{ description }} </span>

      <div class="mt-auto flex">
        <UIcon name="i-tabler-device-gamepad-2" class="self-end"></UIcon>
        <span class="text-xs ml-auto text-neutral-400 font-medium"> vue </span>
      </div>
      
    </div>
  </template>

<script setup>
    defineProps(["title", "description", "background", "color", "group"]);
</script>

<style>
    .project-card {
        position: relative;
    }

    .project-card:before {
        content: ' ';
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0.05;
        background-image: var(--bg-var);
        background-repeat: repeat space;
        background-position: 50% 0;
        background-size: cover;
    }


</style>

