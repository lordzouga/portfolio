<template>
    <UContainer class="flex flex-col font-inter">
        <div class="flex flex-col">
            <span class="font-semibold text-lg tracking-wide text-slate-100">Zouga Gerald</span>
            <span class="text-slate-400">33yrs https://twitter.com/iamzouga ozojiechikelu@gmail.com</span>
        </div>

        <div class="mt-4 tracking-wide">
            A very passionate developer that has been building apps for years
        </div>
        <div class="mt-4 flex flex-col">
            <span class="font-semibold text-slate-400 tracking-wide">Technologies</span>
            <div>
                <span v-for="tech in technologies" class="pl-1 first:pl-0 tracking-wide">
                     <UIcon :name="tech.icon" class="h-3 w-3 text-slate-300 mr-[-2px]"></UIcon> {{ tech.tech }}
                </span>
            </div>
        </div>

        <div class="mt-4">
            <span class="text-slate-400">Featured Projects</span>

        </div>
        
    </UContainer>
</template>

<script setup>

const technologies = ref([{"tech": "Python,", "icon": "i-teenyicons-python-outline"}, 
{tech: "Vue,", icon: "i-ri-vuejs-line"},
{tech: "Android/Java,", icon: "i-basil-android-outline" },
{tech: "Flutter", icon: "i-tabler-brand-flutter"} ])

</script>
