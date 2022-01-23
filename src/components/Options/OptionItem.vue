<template>
    <div class="form-check form-switch mb-2">
        <input class="form-check-input" type="checkbox" :id="id" v-model="inputValue">
        <label class="form-check-label" :for="id">{{ option.text }}</label>
    </div>
</template>

<script>
import {mapMutations} from "vuex"

export default {
    methods: mapMutations(["updateOption"]),
    computed: {
        inputValue: {
            get() {
                return this.option.value
            },
            set(value) {
                this.setCookie(this.option.name, value)
                this.updateOption({value, name:this.name})
            }
        }
    },
    props: ["id", "name", "option"],
    mounted() {
        console.log(this.name)
    }
}
</script>