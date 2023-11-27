<template>
    <div class="card first:mt-0 lg:mt-0 rounded-lg relative flex
     ring-1 ring-slate-900/5 flex-[0.333] shadow-[0_0_1px_1px_rgba(0,0,0,0.14)]
    min-h-[200px] max-h-[200px] cursor-pointer hover:ring-2 hover:ring-orange-600 group" @mouseenter="spreadIcons()"
        @mouseleave="reverseSpread()">
        <div class="w-full h-full absolute bg-neutral-700 rounded-lg"></div>
        <div class="w-full h-full absolute rounded-lg" :class="color"></div>
        <img :src="`/img/${background}`" class=" rounded-lg opacity-20" />

        <div class="flex flex-col p-4 w-full h-full absolute dark:bg-gradient-to-b bg-gradient-to-b from-neutral-950/60
      dark:from-neutral-950/80 to-neutral-800/10 dark:to-neutral-950/10 rounded-lg">
            <span class=" text-sm dark:text-neutral-100 text-neutral-200 tracking-wide font-semibold ">
                {{ title }} <span class="">
                    <UBadge :ui="{
                        variant: {
                            soft: 'bg-{color}-400 bg-opacity-10 text-{color}-400'
                        }
                    }" class="ml-1 " color="orange" size="xs" :variant='"soft"'>{{ group }}</UBadge>
                </span>
            </span>

            <span class="dark:text-neutral-400 text-neutral-300/80 text-xs tracking-wide font-medium mt-1">
                {{ description }}
            </span>

            <div class="mt-auto flex">
                <UIcon name="i-tabler-device-gamepad-2 text-sm" class="self-end dark:text-neutral-700 text-neutral-300">
                </UIcon>
                <span class="text-sm ml-auto dark:text-neutral-400 text-neutral-300 mb-0 flex lg:foo" :class=visibility>
                    <UIcon v-for="icon in tech_icons" :name="icon" class="ml-1 first:ml-0" :class="[iconsClass]"></UIcon>
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
import tailwindConfig from '~/tailwind.config';
import resolveConfig from 'tailwindcss/resolveConfig';

const props = defineProps(["title", "description", "background", "color", "group", "tech_icons"]);
const iconsClass = `tech-icon-${props.title.toLowerCase().replace(" ", "-")}`;
const visibility = ref("visible lg:invisible");

const getActiveBreakpoint = () => {
    const { theme: { screens } } = resolveConfig(tailwindConfig);

    /* Sort the breakpoints based on their dimensions in descending order */
    const sorted = Object.entries(screens).sort((x, y) => parseInt(y[1]) - parseInt(x[1]));

    /* Find the first instance where the current width is higher or equal to a breakpoint */
    const bp = sorted.find((s) => window.innerWidth >= parseInt(s[1]));

    /* if no breakpoint is found, it is a mobile screen */
    if (!bp) return "mb"
    else return bp[0]
}

var tween = null;
const spreadIcons = () => {
    if (getActiveBreakpoint() === "mb") return;

    tween = useNuxtApp().$gsap.fromTo(".lg\\:invisible ." + iconsClass, {
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
                visibility.value = "visible lg:visible";
            },
            onReverseComplete: () => {
                visibility.value = "visible lg:invisible"
            }
        }
    );
}

const reverseSpread = () => {
    if (getActiveBreakpoint() === "mb") return;
    if (tween != null) tween.reverse();
}
//onMounted(() => spreadIcons())
</script>

<style></style>

