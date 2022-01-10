<template>
    <div class="pt-1">
        <button type="button" @click="fire()" class="btn btn-primary bg-purple border-0 p-1 px-2" :class="dangerClass">{{ text }}</button>
    </div>
</template>

<script>
export default {
    methods: {
        fire() {
            console.log("prout")
        },  
    },
    computed: {
        dangerClass() {
            return this.danger ? "btn-danger" : ""
        }
    },
    props: ["songId", "text", "command", "danger"]
}
</script>
