<template>
    <UPopover class="flex-1 flex lg:flex-[0.4] lg:ml-auto mt-4 lg:mt-0 search-root" :ui="{
        wrapper: 'relative flex',
        container: `z-20 flex w-[--popover-width-var]`,
        base: 'overflow-hidden focus:outline-none flex flex-1'
    }" :style="`--popover-width-var: ${popoverWidth};`" ref="popover" :open="visibleDropdown">
        <UInput icon="i-tabler-bulb" label="suggestions" ref="input" :ui="{
            wrapper: 'relative flex-1'
        }" color="gray" size="lg" placeholder="Recommend me a song" v-model="searchVal"
            @click.prevent="handleInputClick()" @focusout="showDropdown = false"
            @keydown.space.prevent="overrideSpacebarPress()" />

        <template #panel>
            <TransitionGroup tag="div" class="flex-1 flex flex-col bg-gray-700" :css="false" @enter="onListItemEnter">
                <div v-for="(track, index) in searchedTracks" :key="track.id" :data-index="index"
                    class="flex-col bg-gray-700 text-xs group cursor-pointer">
                    <div class="flex p-2 rounded-md group-hover:bg-neutral-800/40 m-1">
                        <img class="h-8 w-8 rounded-md mr-4 self-center" :src="track.album.images[2].url" />
                        <div class="flex flex-col">
                            <span class="text-neutral-200 font-medium">{{ track.name }}</span>
                            <span class="text-neutral-400">{{ track.artists[0].name }}</span>
                        </div>
                    </div>
                    <hr class="border-neutral-500/10" />
                </div>
            </TransitionGroup>
        </template>

    </UPopover>
</template>

<script setup>
/* Input component reference */
const input = ref(null);
const popover = ref(null);

// holds user search input
const searchVal = ref('');
const showDropdown = ref(false);
const { searchTracks } = useSpotify();

/** @type {{ searchedTracks: SpotifyApi.TrackObjectFull[] }} */
const { searchedTracks } = storeToRefs(useSpotify());

// override spacebar press to prevent default behavior
const overrideSpacebarPress = () => {
    searchVal.value = searchVal.value + " ";
}

const onListItemEnter = (el, done) => {

    useNuxtApp().$gsap.from(el, {
        duration: 0.2,
        y: "10%",
        opacity: 0,
        ease: "out",
        delay: el.dataset.index * 0.15,
        onComplete: done
    });
}

const handleInputClick = () => {
    input.value.input.focus();

    if (searchVal.value.length >= 3) {
        showDropdown.value = true;
    }
}

const visibleDropdown = computed(() => showDropdown.value && searchedTracks.value.length > 0);

const popoverWidth = computed(() => {
    if (input.value == null) {
        return "30%";
    } else {
        return `${input.value.input.clientWidth}px`;
    }
});

watch(searchVal, (newVal) => {
    showDropdown.value = newVal.length >= 3;

    if (showDropdown.value) {
        searchTracks(newVal);
    }
})


</script>