<template>
    <span class="badge" :style="style"><img class="me-1" :src="toAbsolute(tag.icon, 'https://playlist.warths.fr/')"><span>{{tag.text}}</span></span>
</template>

<script>
export default {
    computed: {
        style() {
            return {
                "background-color": "#" + this.tag.color
            }
        }
    },
    methods: {
        // Temporary URL reformat
        formatUrl(url) {
            return "https://playlist.warths.fr/" + url
        }
    },
    props: ["tag"]
}
</script>

<style scoped>
img {
    display:inline;
    vertical-align: middle;
    height:1.125em;

}
span {
    vertical-align: middle;
    line-height: 1;
}
</style>