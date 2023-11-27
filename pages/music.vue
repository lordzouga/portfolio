<template>
    <div class="flex flex-col music-container">

        <Head>
            <Title>{{ pageTitle }}</Title>
            <Meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        </Head>

        <div class="flex w-full flex-col lg:flex-row top-action-row">
            <div class="lg:flex-[0.1] flex">
                <UButton variant="link" to="/" icon="i-tabler-arrow-left" color="gray" :padded="false">
                </UButton>

                <div class="lg:hidden left-[calc(50%-78.78px)] relative font-semibold text-sm text-neutral-700 dark:text-neutral-400
                tracking-wide">My <span class="dark:text-orange-400 text-orange-500">Music</span> Profile </div>
            </div>

            <Recommend></Recommend>
        </div>

        <hr class="dark:border-neutral-600/30 border-neutral-200 mt-4 lg:mx-0 -mx-4 lg:hidden" />

        <Suspense>
            <template #default>
                <div>
                    <div class="flex flex-col lg:flex-row mt-4 lg:mt-8"><!--Artists and Albums-->
                        <div class="flex flex-col pb-4 lg:pb-0 lg:flex-[0.4] lg:border-b-0 border-b dark:border-neutral-600/30
                             border-neutral-200 artists-cont">
                            <!--Artists-->
                            <span class="flex">
                                <u-icon name="i-tabler-palette"
                                    class="h-4 w-4 dark:text-orange-400 text-orange-500 mr-2 self-center"></u-icon>
                                <span
                                    class="lg:font-medium font-semibold dark:text-neutral-400 text-neutral-500 text-sm tracking-wide">
                                    Favorite Artists</span>
                            </span>

                            <span v-if="favArtists.length" class="flex mt-4" key="artists"> <!--Artist List-->
                                <artist class="artist ml-8 first:ml-0" v-for="artist in favArtists" :artist="artist" />
                            </span>
                            <u-skeleton v-else class="mt-4 h-24 w-full" key="artist-skeleton"
                                :ui="{ rounded: 'rounded-md' }" />
                        </div>

                        <div class="flex flex-col lg:ml-auto mt-4 lg:mt-0 lg:pb-0 lg:border-b-0 pb-4
                         lg:flex-[0.4] albums-cont">
                            <!--Albums-->
                            <span class="flex">
                                <u-icon name="i-tabler-album" class="h-4 w-4 text-orange-400 mr-2 self-center"></u-icon>
                                <span
                                    class="lg:font-medium font-semibold text-sm dark:text-neutral-400 text-neutral-500 tracking-wide">
                                    Favorite Albums
                                </span>
                            </span>

                            <span v-if="favAlbums.length" class="flex mt-4" key="albums"> <!--Album list-->
                                <album class="album ml-8 first:ml-0" v-for="album in favAlbums" :album="album" />
                            </span>
                            <u-skeleton v-else class="mt-4 h-24 w-full" key="albums-skeleton"
                                :ui="{ rounded: 'rounded-md' }" />
                        </div>
                    </div>

                    <div
                        class="flex lg:mt-8 mt-4 flex-col lg:flex-row lg:max-h-[calc(61vh)] lg:overflow-clip lg:px-4 lg:-mx-4">
                        <!--Favorite Playlists-->
                        <UTabs class="lg:hidden playlist-tabs" :items="tabData" :ui="{
                            list: {
                                background: 'bg-gray-200 dark:bg-gray-800',
                                tab: {
                                    active: 'dark:text-neutral-200',
                                    //    inactive: 'dark:text-white'
                                }
                            }
                        }">
                            <template #default="{ item, selected }" class="-mx-4 ">
                                <div class="flex items-center gap-2 relative truncate">
                                    <UIcon :name="item.icon" class="dark:text-orange-400 text-orange-500 h-4 w-4"></UIcon>
                                    <span class="font-semibold tracking-wide"> {{ item.label }}</span>
                                    <!--
                                    <u-badge v-else-if="item.key === 'liked'" color="gray" variant="soft" size="xs"
                                        class="ml-auto">{{
                                            likedTracks.length }}</u-badge>-->

                                    <span v-if="selected"
                                        class="absolute -right-4 w-2 h-2 rounded-full bg-primary-500 dark:bg-primary-400" />
                                </div>
                            </template>

                            <template #item="{ item }">

                                <div v-if="item.key === 'workout'">
                                    <div class="flex mb-2 mt-3">
                                        <UButton class="focus:ring-0 focus-visible:ring-0" size="xs" color="green"
                                            :padded="false" icon="i-la-spotify" variant="link" :ui="{ font: 'font-normal' }"
                                            to="https://open.spotify.com/playlist/5i3fEXuXIrNg9uV1D9eo5w" target="_blank">
                                            Open in Spotify
                                        </UButton>

                                        <span class="flex items-center ml-4 text-neutral-400">
                                            <UIcon name="i-gridicons-time" class="h-4 w-4"></UIcon>
                                            <span class="text-xs font-normal ml-1">{{ workoutPlaylistDuration }} </span>
                                        </span>

                                        <u-badge :ui="{
                                            variant: {
                                                soft: 'bg-{color}-200 dark:bg-{color}-400 dark:bg-opacity-10 text-{color}-500 dark:text-{color}-400'
                                            }
                                        }" v-if="item.key === 'workout'" color="gray" variant="soft" size="xs"
                                            class="ml-auto">
                                            {{ workoutTracks.length }} Songs
                                        </u-badge>

                                    </div>

                                    <Songlist v-if="workoutTracks.length" :songs="workoutTracks" />
                                    <u-skeleton v-else v-for="i in ['', '', '', '']" class="h-12 w-full mt-8 first:mt-0" />

                                </div>
                                <div v-else-if="item.key === 'liked'">
                                    <div class="flex mb-2 mt-3">
                                        <UButton class="focus:ring-0 focus-visible:ring-0" size="xs" color="green"
                                            :padded="false" icon="i-la-spotify" variant="link"
                                            :ui="{ font: 'font-normal' }">
                                            Open in Spotify
                                        </UButton>

                                        <span class="flex items-center ml-4 text-neutral-400">
                                            <UIcon name="i-gridicons-time" class="h-4 w-4"></UIcon>
                                            <span class="text-xs font-normal ml-1">{{ likedPlaylistDuration }} </span>
                                        </span>

                                        <u-badge :ui="{
                                            variant: {
                                                soft: 'bg-{color}-200 dark:bg-{color}-400 dark:bg-opacity-10 text-{color}-500 dark:text-{color}-400'
                                            }
                                        }" color="gray" variant="soft" size="xs" class="ml-auto">
                                            {{ likedTracks.length }} Songs
                                        </u-badge>

                                    </div>

                                    <Songlist v-if="likedTracks.length" :songs="likedTracks" />
                                    <u-skeleton v-else v-for="i in ['', '', '', '']" class="h-12 w-full mt-8 first:mt-0" />
                                </div>
                            </template>
                        </UTabs>

                        <div class="lg:flex flex-col flex-[0.4] workout-cont hidden"><!--Workout Section-->
                            <span class="flex">
                                <u-icon name="i-tabler-stretching"
                                    class="h-4 w-4 text-orange-400 mr-2 self-center font-bold"></u-icon>
                                <span
                                    class="font-medium dark:text-neutral-400 text-neutral-500 text-sm tracking-wide self-center">
                                    Workout Playlist
                                </span>
                                <u-badge :ui="{
                                    variant: {
                                        soft: 'bg-{color}-200 dark:bg-{color}-400 dark:bg-opacity-10 text-{color}-500 dark:text-{color}-400'
                                    }
                                }" color="gray" variant="soft" size="xs" class="ml-auto">{{ workoutTracks.length }}
                                    Songs</u-badge>
                            </span>

                            <div class="flex mt-2">
                                <UButton class="focus:ring-0 focus-visible:ring-0" size="2xs" color="green" :padded="false"
                                    icon="i-la-spotify" variant="link"
                                    to="https://open.spotify.com/playlist/5i3fEXuXIrNg9uV1D9eo5w" target="_blank"
                                    :ui="{ font: 'font-normal' }">
                                    Open in Spotify
                                </UButton>

                                <span class="flex ml-4 items-center text-neutral-400">
                                    <UIcon name="i-gridicons-time" class="h-4 w-4 text-neutral-500"></UIcon>
                                    <span class="text-xs font-light ml-1">{{ workoutPlaylistDuration }} </span>
                                </span>
                            </div>

                            <div v-if="workoutTracks.length"
                                class="lg:overflow-y-scroll no-scrollbar scroll-smooth mt-4 flex flex-1 px-4 -mx-4 playlist">
                                <!--Workout Playlist-->
                                <Songlist :songs="workoutTracks"></Songlist>
                            </div>

                            <span v-else class="flex flex-col mt-8">
                                <u-skeleton v-for="i in ['', '', '', '']" class="h-12 w-full mt-8 first:mt-0" />
                            </span>
                        </div>

                        <div class="lg:flex hidden flex-col flex-[0.4] mt-8 lg:mt-0 lg:ml-auto liked-cont">
                            <!--Liked Section-->
                            <span class="flex">
                                <u-icon name="i-tabler-heart"
                                    class="h-4 w-4 text-orange-400 mr-2 self-center font-bold"></u-icon>
                                <span
                                    class="font-medium dark:text-neutral-400 text-neutral-500 text-sm tracking-wide self-center">
                                    Liked Songs
                                </span>
                                <u-badge :ui="{
                                    variant: {
                                        soft: 'bg-{color}-200 dark:bg-{color}-400 dark:bg-opacity-10 text-{color}-500 dark:text-{color}-400'
                                    }
                                }" color="gray" variant="soft" size="xs" class="ml-auto">
                                    {{ likedTracks.length }} Songs
                                </u-badge>
                            </span>

                            <div class="flex mt-2">
                                <UButton class="focus:ring-0 focus-visible:ring-0" size="2xs" color="green" :padded="false"
                                    icon="i-la-spotify" variant="link" :ui="{ font: 'font-normal' }">
                                    Open in Spotify
                                </UButton>

                                <span class="flex ml-4 items-center text-neutral-400">
                                    <UIcon name="i-gridicons-time" class="h-4 w-4"></UIcon>
                                    <span class="text-xs font-light ml-1">{{ likedPlaylistDuration }} </span>
                                </span>
                            </div>

                            <div v-if="likedTracks.length"
                                class="lg:overflow-y-scroll scroll-smooth pb-8 lg:h-full w-full no-scrollbar mt-4 px-4 -mx-4 flex playlist">
                                <!--Liked Playlist-->
                                <Songlist :songs="likedTracks"></Songlist>
                            </div>

                            <span v-else class="flex flex-col mt-8">
                                <u-skeleton v-for="i in ['', '', '', '']" class="h-12 w-full mt-8 first:mt-0" />
                            </span>
                        </div>
                    </div>
                </div>
            </template>

            <template #fallback>
                Loading...
            </template>
        </Suspense>
    </div>
</template>

<script setup>

const token = useState('token', () => '')
const { loadSpotifyData } = useSpotify();

/* generate access token server-side */
const { pending, data } = useLazyFetch('/api/access', {
    key: "access",
    server: true
});

if (!pending.value) {
    setupPage()
}

function setupPage() {
    token.value = data.value.token.access_token;
    loadSpotifyData();
}

watch(data, (val) => {
    setupPage()
})

definePageMeta({
    pageTransition: {
        name: 'roll-in',
        appear: true,
        mode: "out-in",
        onEnter: (el, done) => {
            let target = [".top-action-row", ".artists-cont", ".albums-cont", ".playlist-tabs", ".workout-cont", ".liked-cont"];
            useNuxtApp().$gsap.timeline().from(target,
                {
                    duration: 0.2,
                    opacity: 0,
                    y: 40,
                    ease: "power3.easeOut",
                    stagger: 0.1,
                    onComplete: done,
                    clearProps: "zIndex,y"
                }).set(".top-action-row", { display: "flex", opacity: 1 })
        },
        onLeave: (el, done) => {
            let target = [".music-container"];
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

const pageTitle = "My Music Profile";

const _onEnter = (target, done) => {

}

const onArtistEnter = () => {
    // _onEnter(".artist");
}

const onAlbumEnter = () => {
    // _onEnter(".album");
}

const showDataAnim = (done) => {
    _onEnter([".artists-cont", ".albums-cont", ".workout-cont", ".liked-cont"], done)
}


const { likedTracks, workoutTracks, favArtists, favAlbums,
    workoutPlaylistDuration, likedPlaylistDuration } = storeToRefs(useSpotify());

const tabData = [
    {
        key: 'workout',
        label: 'Workout Songs',
        icon: 'i-tabler-stretching'
    },
    {
        key: 'liked',
        label: 'Liked Songs',
        icon: 'i-tabler-heart'
    }
]


onMounted(async () => {
    // showDataAnim();
});


</script>

<style>
.no-scrollbar::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}

.playlist {
    width: calc(100% + 32px);
}
</style>