<template>
    <div class="m-3">
        <option-group v-on:updateOption="(e) => update(e)" v-for="(options, groupName, i) in optionsFiltered" :key="i" :groupName="groupName" :options="options" />
    </div>
</template>

<script>
import {mapState, mapGetters} from "vuex"
import OptionGroup from './OptionGroup.vue'

export default {
    computed: {
        ...mapGetters(["userLevel"]),
        ...mapState(["options"]),
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
    components: {OptionGroup}
}
</script>