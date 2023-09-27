<template>
    <div class="flex">
        <div v-for="indicator in indicators" class=" ml-1 first:ml-0">
            <div class="h-4 w-2 bg-orange-500 rounded-sm" v-if="indicator == 1">
            </div>
            <div class="h-4 w-2 bg-neutral-500 rounded-sm" v-if="indicator == 0"></div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(["popularity"]);
const popValue = (props.popularity - (props.popularity % 10)) / 10;

const indicators = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((val, i) => {
    if (i <= (popValue - 1)) return 1;
    else return val;
});

</script>