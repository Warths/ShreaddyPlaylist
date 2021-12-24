<template>
    <div>
        <hr>
        <option-item v-for="(optionValues, optionName, i) in options" :key="i" :option="optionValues"/>
    </div>
</template>

<script>
import OptionItem from "./OptionItem.vue"

export default {
    props: ["groupName", "options"],
    components: {OptionItem}
}
</script>