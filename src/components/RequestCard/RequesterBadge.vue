<template>
    <img class="me-1" :src="toAbsolute(badge.icon, 'https://playlist.warths.fr')" :aria-label="badge.alttext" :alt="badge.alttext">
</template>

<script>
export default {
    props: ["badge"]
}
</script>

<style scoped>
img {
    transition: height 1s;
    height:28px
}
.streamer-theme img {
    height: 42px;
}
</style>