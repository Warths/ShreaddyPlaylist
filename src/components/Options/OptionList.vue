<template>
    <div class="m-3">
        <option-group v-on:updateOption="(e) => update(e)" v-for="(options, groupName, i) in optionsFiltered" :key="i" :groupName="groupName" :options="options" />
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
    computed: {
        optionsFiltered() {
            let options = {}
            for (let element in this.options) {
                if (this.options[element].userLevel <= this.userLevel) {
                    options[element] = this.options[element]
                }
            }
            return options
        }
    },
    mounted() {
        console.log(this.optionsFiltered)
    },
    props: ["options", "userLevel"],
    components: {OptionGroup}
}
</script>