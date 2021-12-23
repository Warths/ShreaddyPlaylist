<template>
    <img class="me-1" :src="toAbsolute(badge.icon, 'https://playlist.warths.fr')" :aria-label="badge.alttext" :alt="badge.alttext" height="28">
</template>

<script>
export default {
    props: ["badge"]
}
</script>
