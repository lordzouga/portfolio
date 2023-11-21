<template>
    <div class="flex space-x-4 mt-2 lg:flex-row min-w-[900px] lg:min-w-0 pl-[2px] pb-[2px] lg:pl-0 lg:pb-0">
        <Card v-for="project in projects" class="" :description="project.description" :title="project.title"
            :background="project.bg" :color="project.color" :key="project.title" :group="project.group"
            :tech_icons="project.tech_icons">
        </Card>
    </div>
</template>

<script setup>
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
</script>