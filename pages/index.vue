<template>
    <div class="index-container ">

        <Head>
            <Title>Home</Title>
            <Meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        </Head>

        <div class="flex top-buttons">
            <UButton class="ml-auto" color="gray" icon="i-logos-spotify-icon" size="xs" to="/music"> Music </UButton>
            <UButton color="gray" icon="i-uil-github" class="ml-4" size="xs"> View on Github </UButton>
        </div>
        <div class="flex flex-col mt-8 name-row">
            <span class="font-light text-2xl tracking-wide text-slate-200">Zouga Gerald</span>
            <span class="text-neutral-400 flex mt-1">
                <UButton variant="link" icon="i-devicon-twitter" size="xs" to="https://twitter.com/iamzouga" color="gray"
                    :padded="false">Twitter</UButton>
                <UButton to="mailto:ozojiechikelu@gmail.com" icon="i-logos-google-gmail" size="xs" variant="link"
                    :padded="false" color="gray" class="ml-4">Gmail</UButton>
            </span>
        </div>

        <div class="mt-4 tracking-wide text-sm text-slate-200 description-row">
            Hello 👋🏾, I am a fullstack software developer. Whenever I can, I try to build something useful.
            I particularly enjoy i/O related projects.
            I love good UIs and efficient software. I love listening to music and playing Apex Legends.
        </div>

        <div class="mt-8 flex flex-col technologies-row">
            <span class="font-medium text-sm text-neutral-400 tracking-wide">Technologies</span>
            <div>
                <span v-for="tech in technologies" class="pl-1 first:pl-0 tracking-wide text-slate-200">
                    <UIcon :name="tech.icon" class="h-3 w-3 text-neutral-300 mr-[-2px]"></UIcon> {{ tech.tech }}
                </span>

            </div>
            <span class="text-xs text-neutral-400 line-through">Docker, Bash, C/C++</span>
        </div>

        <div class="mt-8 flex flex-col featured-row">
            <span class="text-gray-400 text-sm font-medium tracking-wide">Featured Projects</span>

            <div class="flex lg:space-x-4 mt-2 lg:flex-row flex-col ">
                <Card v-for="project in projects" class="" :description="project.description" :title="project.title"
                    :background="project.bg" :color="project.color" :key="project.title" :group="project.group"
                    :tech_icons="project.tech_icons">
                </Card>
            </div>
        </div>

        <div class="mt-8 other-projects-row">
            <span class="text-gray-400 text-sffm font-medium tracking-wide">Other Projects</span>
            <div class="flex flex-col mt-2">
                <div class="flex flex-col tracking-wide mt-4 first:mt-0" v-for="other in otherProjects">
                    <span class="font-medium text-neutral-100">{{ other.title }}</span>
                    <span class="mt-1 text-sm text-neutral-300">{{ other.description }}</span>
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
                    ease: "power3.easeIn",
                    stagger: 0.1,
                    onComplete: done
                });
        },
        onLeave: (el, done) => {
            let target = [".index-container"];
            useNuxtApp().$gsap.timeline().to(target,
                {
                    duration: 0.2,
                    opacity: 0,
                    y: 40,
                    ease: "power3.easeOut",
                    // stagger: 0.1,
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

const projects = [
    {
        title: "ALC Manager",
        description: "A tool for managing controller settings on Apex Legends.",
        bg: 'alc_bg.png',
        group: 'gaming',
        color: '#1725544a',
        tech_icons: ['i-tabler-brand-vue', 'i-tabler-brand-firebase']
    },
    {
        title: "Remoteable",
        description: "A chrome extension that lets you get notifications while in your browser.",
        bg: 'remoteable_bg.png',
        group: 'jobs',
        color: '#3c076441',
        tech_icons: ['i-tabler-brand-vue', 'i-tabler-brand-chrome', 'i-tabler-brand-python']
    },
    {
        title: "DStrategyIQ",
        description: "A Binary option trading tool for deriv.com.",
        bg: 'alc_bg.png',
        group: 'finance',
        color: '#155f753e',
        tech_icons: ['i-devicon-vuejs', 'i-devicon-python', 'i-logos-mysql']
    }
]
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


