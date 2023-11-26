<template>
    <div class="flex flex-1 lg:flex-[0.4] lg:ml-auto mt-4 lg:mt-0 " ref="recContainer">
        <div class="flex flex-1 recommend" v-if="saveState == SaveState.DONE" :style="`--div-width-var: ${divWidth};`">
            <UPopover class="flex flex-1" :ui="{
                wrapper: 'relative',
                container: `z-20 w-[--div-width-var] drop-container`,
                base: 'overflow-hidden focus:outline-none flex flex-1',
                leaveActiveClass: '',
                leaveFromClass: '',
                leaveToClass: '',
            }" :style="`--div-width-var: ${divWidth};`" ref="popover" :open="visibleDropdown">
                <UInput label="suggestions" ref="input" color="gray" :disabled="false" :ui="{
                    wrapper: 'relative flex-1',
                    icon: {
                        base: 'flex-shrink-0 text-orange-400 dark:text-orange-400'
                    },
                    color: {
                        gray: {
                            outline: 'shadow-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-neutral-300 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400'
                        }
                    }
                }" size="lg" placeholder="Recommend me a song" v-model="searchVal" @click.prevent="handleInputClick()"
                    @focusout="onLoseInputFocus" @keydown.space.prevent="overrideSpacebarPress()" class="search-input">

                    <template #leading>
                        <UIcon :name="inputIconName" class="text-orange-400 h-5 w-5 search-input-icon"></UIcon>
                    </template>
                </UInput>

                <template #panel>
                    <TransitionGroup tag="div" class="flex-1 flex flex-col dark:bg-gray-700 bg-neutral-100" :css="false"
                        @enter="onListItemEnter">
                        <div v-for="(track, index) in searchedTracks" :key="track.id" :data-index="index"
                            @click="onRecommendedTrackClicked(track)"
                            class="flex-col dark:bg-gray-700 bg-neutral-100 text-xs cursor-pointer " :class="groups[index]">
                            <div class="flex p-2 rounded-md  m-1" :key="track.id" :class="groupHover[index]">
                                <img class="h-8 w-8 rounded-md mr-4 self-center" :src="track.album.images[2].url" />
                                <div class="flex flex-col">
                                    <span class="dark:text-neutral-200 text-neutral-700 font-medium">{{ track.name }}</span>
                                    <span class="dark:text-neutral-400 text-neutral-500">{{ track.artists[0].name }}</span>
                                </div>
                            </div>
                            <hr class="border-neutral-500/10" />
                        </div>
                    </TransitionGroup>
                </template>
            </UPopover>
        </div>
        <div v-else-if="saveState == SaveState.SAVING"
            class="hidden rounded-lg flex-1 dark:bg-neutral-900 bg-neutral-200 
            px-4 py-2.5 text-sm align-middle outline outline-1 dark:outline-neutral-600 outline-neutral-300 saving-text overflow-hidden"
            :style="`--div-width-var: ${divWidth};`">

            <Transition name="slide-up" mode="out-in">
                <div v-if="recommendState == SubRecommendState.RECOMMENDING" class="flex">
                    <UIcon name="i-tabler-rotate-rectangle" class="text-orange-300/40 mr-2 h-5 w-5 self-center" />
                    <div class="self-center text-neutral-500 italic tracking-wider">
                        Saving your <span class="font-semibold text-orange-300/40"> recommendation</span>...
                    </div>
                </div>
                <div v-else-if="recommendState == SubRecommendState.RECOMMENDED" class="flex">
                    <UIcon name="i-tabler-check" class="text-green-500 font-semibold mr-2 h-5 w-5 " />
                    <div class="self-center text-green-400 tracking-wide font-medium"> Saved your recommendation! </div>
                </div>
                <div v-else-if="recommendState == SubRecommendState.FAILED" class="flex">
                    <UIcon name="i-tabler-alert-triangle" class="text-red-300/40 mr-2 h-5 w-5" />
                    <div class="self-center text-neutral-500 italic tracking-wider">Couldn't save recommendation</div>
                </div>
            </Transition>
        </div>
    </div>
</template>

<script setup>

/* Input component reference */
const input = ref(null);
const popover = ref(null);
const recContainer = ref(null);

const SaveState = {
    SAVING: 1,
    DONE: 2,
}

const SubRecommendState = {
    RECOMMENDING: 1,
    RECOMMENDED: 2,
    FAILED: 3
}

const recommendState = ref(SubRecommendState.RECOMMENDING);

const saveState = ref(SaveState.DONE);
const tempSaveState = ref(SaveState.DONE);
const searching = ref(false);

// holds user search input
const searchVal = ref('');

const groups = ['group/echo', 'group/lima', 'group/charley']
const groupHover = ['group-hover/echo:dark:bg-neutral-800/40 group-hover/echo:bg-neutral-200',
    'group-hover/lima:dark:bg-neutral-800/40 group-hover/lima:bg-neutral-200',
    'group-hover/charley:dark:bg-neutral-800/40 group-hover/charley:bg-neutral-200']

// controls whether dropdown is visible
const showDropdown = ref(false);
const { searchTracks, saveTrack, getRandomLikedTrack } = useSpotify();

/** @type {{ searchedTracks: SpotifyApi.TrackObjectFull[] }} */
const { searchedTracks } = storeToRefs(useSpotify());

// override spacebar press to prevent default behaviour
const overrideSpacebarPress = () => {
    searchVal.value = searchVal.value + " ";
}

const toast = useToast();

/* Ochestrate the recommend animation with gsap because using Vue Transitions with UPopover has a funny
outcome */
watch(tempSaveState, (newVal) => {
    nextTick(() => {
        if (newVal == SaveState.SAVING) {
            useNuxtApp().$gsap.timeline()
                .delay(0.22)
                .to(".recommend", {
                    opacity: 0, y: 10, ease: "power3.in",
                    onComplete: () => {
                        saveState.value = newVal;
                    },
                })
                .call(() => {
                    nextTick(() => {
                        useNuxtApp().$gsap.timeline()
                            // .set(".saving-text", { display: "flex" })
                            .from(".saving-text", { opacity: 0, y: -10, ease: "power3.out", duration: 0.25, display: "flex" })
                            .set(".saving-text", { display: "flex" })
                    });
                })
        } else if (newVal == SaveState.DONE) {
            useNuxtApp().$gsap.timeline()
                .delay(1)
                .to(".saving-text", {
                    opacity: 0, y: 10, ease: "power3.in", duration: 0.25,
                    onComplete: () => {
                        saveState.value = newVal;

                        // reset the search value here to make it more elegant
                        searchVal.value = "";
                    },
                })
                .call(() => {
                    nextTick(() => {
                        useNuxtApp().$gsap.timeline()
                            .set(".recommend", { display: "none" })
                            .from(".recommend", {
                                opacity: 0, y: -10, ease: "power3.out", duration: 0.25, display: "flex",
                                clearProps: "zIndex,y"
                            })
                            .set(".recommend", { display: "flex", opacity: 1, position: "relative" })
                    });
                })
        }
    })
})

let itemClicked = false;

/** @param { FocusEvent } e */
function onLoseInputFocus(e) {

    nextTick(() => {
        if (!itemClicked) {
            useNuxtApp().$gsap.timeline().to(".drop-container",
                {
                    opacity: 0,
                    y: 130,
                    duration: 0.25,
                    ease: "power4.in",
                    onComplete: () => showDropdown.value = false
                }, 0);
        }
    });
}

/**
* Handle click on search result track item.
* @param {SpotifyApi.TrackObjectFull} track 
*/
function onRecommendedTrackClicked(track) {
    tempSaveState.value = SaveState.SAVING;
    recommendState.value = SubRecommendState.RECOMMENDING;

    // console.log(track.id);

    saveTrack(track).then((snap_id) => {
        if (snap_id !== "error") {
            recommendState.value = SubRecommendState.RECOMMENDED;


            setTimeout(() => showThankYouToast(), 1000);
        } else {
            recommendState.value = SubRecommendState.FAILED;
        }

        tempSaveState.value = SaveState.DONE;
    });
}

function showThankYouToast() {
    getRandomLikedTrack().then((track) => {

        if (track.length) {
            toast.add({
                title: JSON.stringify({
                    name: track[0].track.name,
                    artist: track[0].track.artists.map(({ name }) => name).join(", "),
                    art: track[0].track.album.images[0].url,
                    url: track[0].track.external_urls.spotify
                }),
                icon: 'i-tabler-check',
                type: 'info',
                timeout: 5000,
                description: 'A pretty song for a pretty person!',
            });
        }
    });
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
const divWidth = ref("");

/* const divWidth = computed(() => {
    if (recContainer.value != null) {
        return `${recContainer.value.clientWidth}px`;
    } else return "30%";
})*/


watch(recContainer, (newval) => {
    divWidth.value = `${recContainer.value.clientWidth}px`
})

/* on page transition complete. Should rename this */
useOnPageLoad(() => {
    if (recContainer.value != null) {
        divWidth.value = `${recContainer.value.clientWidth}px`
    }
})

const inputIconName = computed(() => !searching.value ? 'i-tabler-bulb' : 'i-heroicons-arrow-path-20-solid')

/** @type { gsap.core.Timeline } */
var inputIconAnimator = null;

watch(searching, (newVal) => {
    if (newVal) {
        inputIconAnimator = useNuxtApp().$gsap.timeline().to(".search-input-icon", {
            rotation: 360,
            duration: 1.0,
            repeat: -1,
            ease: 'linear'
        })
    } else {
        if (inputIconAnimator != null) inputIconAnimator.revert();
    }
})

watch(searchVal, (newVal) => {
    showDropdown.value = newVal.length >= 3;

    if (showDropdown.value) {
        searching.value = true;

        searchTracks(newVal).then((res) => searching.value = false);
    }
})

</script>

<style>
.slide-up-enter-active,
.slide-up-leave-active {
    transition-delay: 0.20s;
    transition: all 0.25s ease-out;
}

.slide-up-enter-from {
    opacity: 0;
    transform: translateY(30px);
}

.slide-up-leave-to {
    opacity: 0;
    transform: translateY(-30px);
}
</style>