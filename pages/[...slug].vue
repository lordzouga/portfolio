<template>
    <div class="usecase-container">
        <div class="flex w-full flex-col lg:flex-row top-action-row">
            <div class="lg:flex-[0.1] flex">
                <UButton variant="link" to="/" icon="i-tabler-arrow-left" color="gray" :padded="false">
                </UButton>

                <div class="lg:hidden left-[calc(50%-67.63px)] relative font-semibold text-sm text-neutral-700 dark:text-neutral-400
                    tracking-wide"><span class="dark:text-orange-400 text-orange-500">Use</span> Case </div>
            </div>

        </div>
        <main class="mt-8 root">
            <!-- ContentDoc returns content for `$route.path` by default or you can pass a `path` prop -->
            <ContentDoc />
        </main>
    </div>
</template>

<script setup>

definePageMeta({
    pageTransition: {
        name: 'roll-in',
        appear: true,
        mode: "out-in",
        onEnter: (el, done) => {
            let target = ".section";
            useNuxtApp().$gsap.timeline().from(target,
                {
                    duration: 0.2,
                    opacity: 0,
                    y: 40,
                    ease: "power3.easeOut",
                    stagger: 0.1,
                    onComplete: done,
                    clearProps: "zIndex,y"
                })//.set(".top-action-row", { display: "flex", opacity: 1 })
        },
        onLeave: (el, done) => {
            let target = [".usecase-container"];
            useNuxtApp().$gsap.timeline().to(target,
                {
                    duration: 0.1,
                    opacity: 0,
                    y: 40,
                    ease: "power3.easeIn",
                    stagger: 0.05,
                    onComplete: done
                });
        }
    }
})
</script>

  