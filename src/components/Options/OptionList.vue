<template>
    <div class="m-3">
        <option-group v-on:updateOption="(e) => update(e)" v-for="(options, groupName, i) in options" :key="i" :groupName="groupName" :options="options" />
    </div>
</template>

<script>
import OptionGroup from './OptionGroup.vue'

export default {
    methods: {
        update(e) {
            this.$emit("updateOption", e)
        }
    },
    props: ["options"],
    components: {OptionGroup}
}
</script>