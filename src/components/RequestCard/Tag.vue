<template>
<div class="badge me-1" :style="style">
    <div class="d-flex align-items-center"><img v-if="this.tag.icon" class="me-1" :src="toAbsolute(tag.icon, 'https://playlist.warths.fr/')"><span>{{tag.text}}</span></div>
</div>
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
.fs-animated {
    transition: font-size 1s, line-height 1s;
}
.streamer-theme .badge{
    font-size: 1.1em;
    line-height: 1.1em;
}
</style>