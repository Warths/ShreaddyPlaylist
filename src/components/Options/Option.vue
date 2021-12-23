<template>
    <div class="form-check form-switch mb-2">
        <input class="form-check-input" type="checkbox" :id="id" v-model="inputValue">
        <label class="form-check-label" :for="id">{{ name }}</label>
    </div>
</template>

<script>
export default {
    mounted() {
        let cookie = this.getCookie(this.id)
        console.log(cookie)
        if (cookie == null) {
            return
        }

        this.inputValue = this.getCookie(this.id) == "true"
    },
    computed: {
        inputValue: {
            get() {
                return this.modelValue
            },
            set(value) {
                this.setCookie(this.id, value)
                this.$emit("update:modelValue", value)
            }
        }
    },
    props: ["id", "name", "modelValue"]
}
</script>