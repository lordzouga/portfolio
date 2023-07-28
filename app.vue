<template>
    <UContainer class="flex flex-col font-inter">
        <div class="flex flex-col">
            <span class="font-semibold text-lg tracking-wide text-slate-200">Zouga Gerald</span>
            <span class="text-neutral-400">33yrs https://twitter.com/iamzouga ozojiechikelu@gmail.com</span>
        </div>

        <div class="mt-4 tracking-wide text-slate-200">
            A very passionate developer that has been building apps for years
        </div>
        <div class="mt-4 flex flex-col">
            <span class="font-semibold text-neutral-400 tracking-wide">Technologies</span>
            <div>
                <span v-for="tech in technologies" class="pl-1 first:pl-0 tracking-wide text-slate-200">
                     <UIcon :name="tech.icon" class="h-3 w-3 text-neutral-300 mr-[-2px]"></UIcon> {{ tech.tech }}
                </span>
            </div>
        </div>

        <div class="mt-4">
            <span class="text-gray-400 font-semibold tracking-wide">Featured Projects</span>

            <div class="flex lg:space-x-4 mt-2 lg:flex-row flex-col">
                <UCard v-for="project in projects" class="flex lg:flex-[0.3] flex-col lg:mt-0 mt-4 first:mt-0
                 shadow-[0_0_1px_1px_rgba(0,0,0,0.14)]">
                    <template #header class="bg-neutral-600">
                        Foo
                    </template>
                    <span> {{ project.title }} </span> <span>{{ project.description }}</span>
                </UCard>
            </div>
        </div>
        
    </UContainer>
</template>

<script setup>

const technologies = ref([{"tech": "Python,", "icon": "i-teenyicons-python-outline"}, 
{tech: "Vue,", icon: "i-ri-vuejs-line"},
{tech: "Android/Java,", icon: "i-basil-android-outline" },
{tech: "Flutter", icon: "i-tabler-brand-flutter"} ])

const projects = [
    {
        title: "ALC Manager",
        description: "A tool for managing controller settings on Apex Legends."
    },
    {
        title: "Remoteable",
        description: "A chrome extension that lets you get notifications while in your browser."
    },
    {
        title:"DStrategyIQ",
        description: "A Binary option trading tool for deriv.com."
    }
]

</script>
<style>
body {
    background-color: #333333;
}
</style>
