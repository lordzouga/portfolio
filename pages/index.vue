<template>
    <div class="index-container flex flex-col">

        <Head>
            <Title>Home</Title>
            <Meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        </Head>

        <div class="flex top-buttons">
            <UButton class="ml-auto" color="gray" icon="i-logos-spotify-icon" size="xs" to="/music"> Music </UButton>
            <UButton color="gray" icon="i-uil-github" class="ml-4" size="xs"> View on Github </UButton>
        </div>
        <div class="flex flex-col mt-8 name-row">
            <span class="font-light text-2xl tracking-wide dark:text-slate-200 text-neutral-800">Zouga Gerald</span>
            <span class="text-neutral-400 flex mt-1">
                <UButton variant="link" icon="i-devicon-twitter" size="xs" target="_blank" to="https://twitter.com/iamzouga"
                    color="gray" :padded="false">Twitter</UButton>
                <UButton to="mailto:ozojiechikelu@gmail.com" icon="i-logos-google-gmail" size="xs" variant="link"
                    :padded="false" color="gray" class="ml-4">Gmail</UButton>
                <UButton to="https://github.com/lordzouga" icon="i-uil-github" size="xs" variant="link" :padded="false"
                    class="ml-4" color="gray" target="_blank">Github</UButton>
            </span>
        </div>

        <div class="mt-2 tracking-wide text-sm dark:text-neutral-200 text-neutral-600 description-row ">
            Hello 👋🏾, I am a fullstack software developer. Whenever I can, I try to build something useful.
            I particularly enjoy i/O related projects.
            I love good UIs and efficient software. I also love listening to
            <NuxtLink to="/music" class="text-orange-400">music</NuxtLink> and gaming.
        </div>

        <div class="mt-8 flex flex-col technologies-row">
            <span class="font-medium text-sm dark:text-neutral-400 text-neutral-500 tracking-wide">Technologies</span>
            <div>
                <span v-for="tech in technologies"
                    class="pl-1 first:pl-0 tracking-wide text-sm text-neutral-700 dark:text-slate-200">
                    <UIcon :name="tech.icon" class="h-3 w-3 dark:text-neutral-300 text-neutral-500 mr-[-2px]"></UIcon> {{
                        tech.tech }}
                </span>

            </div>
            <span class="text-xs text-neutral-500 dark:text-neutral-400 line-through">Docker, Bash, C/C++</span>
        </div>

        <div class="mt-8 flex flex-col featured-row ">
            <span class="dark:text-neutral-400 text-neutral-500 text-sm font-medium tracking-wide">Featured Projects</span>

            <div class="overflow-scroll lg:overflow-visible scroll-smooth no-scrollbar flex">
                <Featuredlist />
            </div>

        </div>

        <div class="mt-8 other-projects-row">
            <span class="dark:text-neutral-400 text-neutral-500 text-sm font-medium tracking-wide">Other Projects</span>
            <div class="flex flex-col mt-1">
                <div class="flex flex-col tracking-wide mt-4 first:mt-0" v-for="other in otherProjects">
                    <span class="font-bold text-sm dark:text-neutral-100 text-neutral-700">{{ other.title }}</span>
                    <span class=" text-sm dark:text-neutral-300 text-neutral-600">{{ other.description }}</span>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    pageTransition: {
        name: "roll",
        appear: true,
        mode: "out-in",
        onEnter: (el, done) => {
            let target = [".top-buttons", ".name-row", ".description-row", ".technologies-row", ".featured-row", ".other-projects-row"];
            useNuxtApp().$gsap.timeline().from(target,
                {
                    duration: 0.2,
                    opacity: 0,
                    y: 40,
                    delay: 0,
                    ease: "power3.easeOut",
                    stagger: 0.1,
                    onComplete: done
                });
        },
        onLeave: (el, done) => {
            let target = ".index-container";
            useNuxtApp().$gsap.timeline().to(target,
                {
                    duration: 0.2,
                    opacity: 0,
                    y: 40,
                    ease: "power3.easeIn",
                    stagger: 0.05,
                    onComplete: done
                });
        }
    }
});

const technologies = ref([
    { tech: "Python,", icon: "i-teenyicons-python-outline" },
    { tech: "Vue,", icon: "i-ri-vuejs-line" },
    { tech: "Android/Java,", icon: "i-basil-android-outline" },
    { tech: "Flutter", icon: "i-tabler-brand-flutter" }
])

const otherProjects = [
    {
        title: "LinksForGram",
        description: "An android app that lets users click links in instagram posts"
    },
    {
        title: "FilterProxyServer",
        description: "A Server in python "
    }
]

onMounted(() => {
    useNuxtApp().$gsap.fromTo(".card", {
        opacity: 0,
        y: "30%",
    },
        {
            duration: 0.4,
            opacity: 1,
            y: 0,
            delay: 0,
            ease: "power.easeOut",
            stagger: 0.2,
        });
});

</script>

<style>
.no-scrollbar::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}
</style>
