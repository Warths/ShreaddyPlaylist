<template>
    <transition-group tag="div" name="tags" class="tags">
        <tag class="tags-item" v-for="tag in tags" :tag="tag" :key="tag.id"/>
    </transition-group>
</template>


<script>
import Tag from "./Tag.vue"

export default {
    props: ["tags"],
    components: {Tag}
}
</script>

<style scoped>
.tags {
    white-space: nowrap;
    overflow:hidden;
}
.tags-item {
    transition: top 1s, left 1s, opacity 1s, transform 1s;
}

.tags-enter-from, 
.tags-leave-to {
    opacity: 0;
}

.tags-leave-active {
    position: absolute;
}

.playlist-move .tags-item {
    transition:none;
}
</style>