<template>
    <div class="form-check form-switch mb-2">
        <input class="form-check-input" type="checkbox" :id="id" v-model="inputValue" :disabled="isDisabled">
        <label class="form-check-label" :for="id">{{ option.text }}</label>
    </div>
</template>

<script>
import {mapMutations, mapGetters} from "vuex"

export default {
    methods: mapMutations(["updateOption"]),
    computed: {
        ...mapGetters({"getOption": "option"}),
        inputValue: {
            get() {
                return this.option.value
            },
            set(value) {
                this.setCookie(this.option.name, value)
                this.updateOption({value, name:this.name})
            }
        },
        isDisabled() {
            console.log(this.option)
            if (this.option.hasOwnProperty("disabledIf")) {
                if (this.getOption(this.option.disabledIf)) {
                    return true
                }
            }
            return false
        }
    },
    props: ["id", "name", "option"]
}
</script>


<style scoped>
label, input {
    transition: opacity 1s, background-position .15s ease-in-out !important;
}
</style>