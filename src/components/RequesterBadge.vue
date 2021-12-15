<template>
    <img class="me-1" :src="badge.icon" :aria-label="badge.alttext" :alt="badge.alttext" width="28" height="28">
</template>

<script>
export default {
    props: ["badge"]
}
</script>