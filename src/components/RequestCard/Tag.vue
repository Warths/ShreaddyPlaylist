<template>
<span class="tag me-1 px-2" :style="style">
    <span class="d-flex align-items-center">
        <img v-if="this.tag.icon" class="me-1" :src="toAbsolute(tag.icon, 'https://playlist.warths.fr/')">
        <img v-else/>
        <span class="shadowed">{{tag.type == "timer" ? text : tag.text}}
    </span></span>
</span>
</template>

<script>
export default {
    data () {
        return {
            text: this.tag.text
        }
    },
    computed: {
        style() {
            return {"background-color": "#" + this.tag.color}
        }
    },
    mounted() {
        if (this.tag.type == "timer") {
            let updateFunc = () => {
                this.text = this.tag.text.replace("%TIME%", this.durationFromEllapsedText(this.tag.time))
            }
            updateFunc()
            setInterval(updateFunc, 2000)
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
    height:1.125em;
}


.fs-animated {
    transition: line-height 1s;
}

.tag {
    display:inline-block;
    padding: 0.15em 0.65em;
    font-size: .75em;
    font-weight: 700;
    color: #fff;
    border-radius: 0.25rem;
}

.streamer-theme .tag {
    font-size: 1.1em;
}

.shadowed {
text-shadow: 0px 0px 0.3em rgba(0, 0, 0, 0.7);}
</style>