
<template>
    <div>
        <UContainer class="flex flex-col font-inter">
            <NuxtPage />
        </UContainer>
        <UNotifications>
            <template #title="{ title }">
                <div class="flex items-center">
                    <img :src="JSON.parse(title).art" class="rounded-lg h-8 w-8" />
                    <div class="flex flex-col ml-4">
                        <span>{{ JSON.parse(title).name }}</span>
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
body {
    background-color: #333333;
}
</style>
