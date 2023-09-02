<template>
    <UContainer class="flex flex-col font-inter">
        <div class="flex ml-auto">
            <UButton color="gray" icon="i-logos-spotify-icon" size="xs" to="/music"> Music </UButton>
            <UButton color="gray" icon="i-uil-github" class="ml-4" size="xs"> View on Github </UButton>
        </div>
        <NuxtPage />
    </UContainer>
</template>


<style>
body {
    background-color: #333333;
}
</style>
