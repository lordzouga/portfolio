<template>
    <div class="flex">
        <div class="flex flex-col"><!--Artists-->
            <span>Favorite Artists</span>

            <span><span v-for="artist in artists">{{ artist.name }}</span></span>
        </div>
        <div class="flex flex-col ml-auto"><!--Albums-->
            <span>Favorite Albums</span>

            <span>
                <span v-for="album in albums">
                    {{ album.title }}
                </span>
            </span>
        </div>
    </div>
</template>
<script setup>
const artists = [
    {
        name: "Deca"
    },
    {
        name: "Black Thought"
    },
    {
        name: "Coldplay"
    }
]

const albums = [
    {
        title: "The Way Through"
    },
    {
        title: "A Rush of Blood To the Head"
    },
    {
        title: "Streams of Thought"
    }
]
</script>