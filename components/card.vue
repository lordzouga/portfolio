<template>
    <div class="card project-card mt-4 first:mt-0 lg:mt-0 overflow-hidden rounded-lg
     ring-1 ring-slate-900/5 flex-col flex p-4 lg:flex-[0.3] bg-gradient-to-b from-neutral-950/80 to-neutral-950/10
    shadow-[0_0_1px_1px_rgba(0,0,0,0.14)] min-h-[200px] cursor-pointer hover:outline-orange-600 hover:outline peer"
        :style="`background-color: ${color}; --bg-var: url('/img/${background}');`" @mouseenter="spreadIcons()"
        @mouseleave="reverseSpread()">
        <span class=" text-sm text-neutral-100 tracking-wide font-semibold ">
            {{ title }} <span class="hover:animate-ping">
                <UBadge class="ml-1" color="orange" size="xs" :variant='"subtle"'>{{ group }}</UBadge>
            </span>
        </span>

        <span class="text-neutral-400 text-xs tracking-wide font-medium"> {{ description }} </span>

        <div class="mt-auto flex">
            <UIcon name="i-tabler-device-gamepad-2 text-sm" class="self-end "></UIcon>
            <span class="text-sm ml-auto text-neutral-400 mb-0 flex" :class=visibility>
                <UIcon v-for="icon in tech_icons" :name="icon" :class="[iconsClass]"></UIcon>
            </span>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(["title", "description", "background", "color", "group", "tech_icons"]);
const iconsClass = `tech-icon-${props.title.toLowerCase().replace(" ", "-")}`;
const visibility = ref("invisible");

var tween = null;
const spreadIcons = () => {
    tween = useNuxtApp().$gsap.fromTo("." + iconsClass, {
        opacity: 0,
        x: "-30%",
    },
        {
            duration: 0.3,
            visibility: "visible",
            opacity: 1,
            x: 0,
            delay: 0,
            ease: "power.easeOut",
            stagger: 0.2,
            onComplete: () => {
                visibility.value = "visible";
            },
            onReverseComplete: () => {
                visibility.value = "invisible"
            }
        }
    );
}

const reverseSpread = () => {
    tween.reverse();
}



    //onMounted(() => spreadIcons())
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

