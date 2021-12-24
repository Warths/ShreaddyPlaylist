<template>
    <div>
        <hr>
        <option-item v-on:updateOption="(e) => update(e)" v-for="(optionValues, optionName, i) in options.fields" :key="i" :option="optionValues" :name="optionName"/>
    </div>
</template>

<script>
import OptionItem from "./OptionItem.vue"

export default {
    methods: {
        update(e) {
             this.$emit("updateOption", {group: this.groupName,...e})
        }
    },
    props: ["groupName", "options"],
    components: {OptionItem}
}
</script>