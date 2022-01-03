<template>
    <a class="nav-link" :href="href">{{ text }}</a>
</template>

<script>
export default {
    props: ["text", "href"]
}
</script>

<style scoped>
.dark-theme .nav-link {
    color: #F8F8F8
}

.dark-theme .nav-link:hover {
    color: white
}
</style>