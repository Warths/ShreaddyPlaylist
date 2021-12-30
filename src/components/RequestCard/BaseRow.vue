<template>
    <div class="card-text">{{ text }}</div>
</template>

<script>
export default {
    props: ["text"]
}
</script>

<style scoped>
.card-text {
    transition: color 1s;
}
.dark-theme .card-text {
    color: white;
}
</style>