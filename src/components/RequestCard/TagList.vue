<template>
    <div class="tags d-flex gap-1">
        <tag v-for="tag in tags" :tag="tag" :key="tag.id"/>
    </div>
</template>


<script>
import Tag from "./Tag.vue"

export default {
    props: ["tags"],
    components: {Tag}
}
</script>
