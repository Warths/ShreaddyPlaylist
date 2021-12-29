<template>
    <a class="nav-link" :href="href">Login</a>
</template>

<script>
export default {
    props: ["text", "href"]
}
</script>