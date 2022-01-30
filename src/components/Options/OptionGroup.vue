<template>
    <div>
        <hr>
        <option-item 
        v-for="(optionValues, optionName, i) in options.fields" 
        :key="i" 
        :option="optionValues" 
        :name="optionName"/>
    </div>
</template>

<script>
import OptionItem from "./OptionItem.vue"

export default {
    props: ["groupName", "options"],
    components: {OptionItem},
}
</script>