
<template>
    <div>
        <UContainer class="flex flex-col font-inter ">
            <NuxtPage />
        </UContainer>
        <UNotifications>
            <template #title="{ title }">
                <div class="flex items-center group cursor-pointer" @click="navigateTo(JSON.parse(title).url)">
                    <img :src="JSON.parse(title).art" class="rounded-lg h-8 w-8" />
                    <div class="flex flex-col ml-4">
                        <span class="group-hover:text-orange-500">{{ JSON.parse(title).name }}</span>
                        <span class="font-normal text-sm text-neutral-400">{{ JSON.parse(title).artist }}</span>
                    </div>
                </div>
            </template>

            <template #description="{ description }">
                <span class="flex mt-4 italic text-neutral-600">{{ description }}</span>
            </template>
        </UNotifications>
    </div>
</template>

<style>
@media (prefers-color-scheme: dark) {
    body {
        background:
            repeating-linear-gradient(to right, transparent,
                transparent 64px,
                #ff660018 64px,
                #ff660020 65px),
            repeating-linear-gradient(to bottom, transparent,
                transparent 64px,
                #ff660018 64px,
                #ff660020 65px);
        background-color: #333333;
    }
}

@media (prefers-color-scheme: light) {
    body {
        background:
            repeating-linear-gradient(to right, transparent,
                transparent 64px,
                #f9731618 64px,
                #f9731618 65px),
            repeating-linear-gradient(to bottom, transparent,
                transparent 64px,
                #f9731618 64px,
                #f9731618 65px);
        background-color: #f5f5f5;
    }
}


.page-enter-active,
.page-leave-active {
    transition: all 0.2s;
}

.page-enter-from,
.page-leave-to {
    opacity: 0;
    /* filter: blur(1rem); */
}
</style>
