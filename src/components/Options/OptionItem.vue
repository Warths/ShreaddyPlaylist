<template>
    <div class="form-check form-switch mb-2">
        <input class="form-check-input" type="checkbox" :id="id" v-model="inputValue">
        <label class="form-check-label" :for="id">{{ option.text }}</label>
    </div>
</template>

<script>
export default {
    computed: {
        inputValue: {
            get() {
                return this.option.value
            },
            set(value) {
                this.setCookie(this.option.name, value)
                this.$emit("updateOption", {value, name:this.name})
            }
        }
    },
    props: ["id", "name", "option"]
}
</script>