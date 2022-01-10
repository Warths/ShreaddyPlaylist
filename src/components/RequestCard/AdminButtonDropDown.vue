<template>
    <div class="btn-group pt-1">
        <button type="button" class="btn btn-primary dropdown-toggle bg-purple border-0 p-1 p-sm-2" data-bs-toggle="dropdown" aria-expanded="false">{{ text }}</button>
        <ul class="dropdown-menu">
            <li v-for="(choice, i) in choices" :key="i"><a @click="fire(choice)" class="dropdown-item" href="#">{{ choice }}</a></li>
        </ul>
    </div>
</template>

<script>
export default {
    methods: {
        fire(option) {
            console.log("prout", option)
        }
    },
    computed: {
        dangerClass() {
            return this.danger ? "btn-danger" : ""
        }
    },
    props: ["songId", "text", "command", "danger", "choices"]
}
</script>
