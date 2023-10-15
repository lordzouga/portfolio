<template>
    <UPopover class="flex-1 flex lg:flex-[0.4] lg:ml-auto mt-4 lg:mt-0 search-root" :ui="{
        wrapper: 'relative flex',
        container: `z-20 flex w-[--popover-width-var]`,
        base: 'overflow-hidden focus:outline-none flex flex-1'
    }" :style="`--popover-width-var: ${popoverWidth};`" ref="popover" :open="showDropdown">
        <UInput icon="i-tabler-bulb" label="suggestions" ref="input" :ui="{
            wrapper: 'relative flex-1'
        }" color="gray" size="lg" placeholder="Recommend me a song" v-model="searchVal"
            @click.prevent="handleInputClick()" @focusout="showDropdown = false"
            @keydown.space.prevent="overrideSpacebarPress()" />

        <template #panel>
            <div class="flex-1 flex flex-col">
                <div v-for="track in searchedTracks" class="flex-col bg-gray-700 text-xs group cursor-pointer">
                    <div class="flex p-4 rounded-md group-hover:bg-neutral-800/40 m-1">
                        <img class="h-8 w-8 rounded-md mr-4" :src="track.album.images[2].url" />
                        <div class="flex flex-col">
                            <span class="text-neutral-200 font-medium">{{ track.name }}</span>
                            <span class="text-neutral-400 mt-1">{{ track.artists[0].name }}</span>
                        </div>
                    </div>
                    <hr class="border-neutral-400/10" />
                </div>
            </div>

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

const handleInputClick = () => {
    input.value.input.focus();

    if (searchVal.value.length >= 3) {
        showDropdown.value = true;
    }
}

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