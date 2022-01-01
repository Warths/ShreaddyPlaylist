<template>
    <transition-group tag="div" name="tags" class="tags d-flex">
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
    transition: all 1s;
}

.tags-enter-from, 
.tags-leave-to {
    opacity: 0;
    transform: scale(0)
}

.tags-leave-active {
    position: absolute;
}
</style>