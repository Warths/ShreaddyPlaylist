<template>
    <a class="nav-link" :href="href">{{ text }}</a>
</template>

<script>
export default {
    props: ["text", "href"]
}
</script>

<style scoped>
.streamer-theme .nav-link,
.dark-theme .nav-link {
    color: #F8F8F8
}

.streamer-theme .nav-link:active,
.streamer-theme .nav-link:hover,
.streamer-theme .nav-link:focus,
.dark-theme .nav-link:active,
.dark-theme .nav-link:hover,
.dark-theme .nav-link:focus {
    color: white
}

</style>