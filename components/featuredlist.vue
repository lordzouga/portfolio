<template>
    <div class="flex space-x-4 mt-2 min-w-[900px] lg:min-w-0 pl-[2px] pb-[2px] lg:pl-0 lg:pb-0">
        <Card v-for="project in projects" class="" :project="project" />
    </div>
</template>

<script setup>
const projects = [
    {
        title: "ALC Manager",
        description: "A tool for managing controller settings on Apex Legends.",
        bg: 'alc_bg.png',
        group: 'gaming',
        path: "/alcmanager",
        color: 'bg-blue-900/70 dark:bg-blue-900/40',
        tech_icons: ['i-tabler-brand-vue', 'i-tabler-brand-firebase']
    },

    {
        title: "Remoteable",
        description: "A chrome extension that lets you get notifications while in your browser.",
        bg: 'remoteable_bg.png',
        group: 'jobs',
        path: "/remoteable",
        color: 'bg-purple-500/70 dark:bg-purple-500/40',
        tech_icons: ['i-tabler-brand-vue', 'i-tabler-brand-chrome', 'i-tabler-brand-python']
    },
    {
        title: "DStrategyIQ",
        description: "A Binary option trading tool for deriv.com.",
        bg: 'alc_bg.png',
        group: 'finance',
        color: ' bg-cyan-700/70 dark:bg-cyan-700/40',
        path: "/dstrategyiq",
        tech_icons: ['i-devicon-vuejs', 'i-devicon-python', 'i-logos-mysql']
    }
]
</script>