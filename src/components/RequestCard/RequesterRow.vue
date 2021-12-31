<template>
    <div class="card-text align-self-end fs-4 d-flex align-items-center">
        <requester-badge v-for="badge in requester.badges" :badge="badge" :key="badge.alttext"/>
        <p class="m-0 fw-bold" :class="contrastedOutLine" :style="displayNameColor">{{ requester.displayName }}</p>
    </div>
</template>

<script>
import RequesterBadge from "./RequesterBadge.vue"

export default {
    props: ["requester", "darkTheme"],
    computed:{
        backgroundColor() {
            return this.darkTheme ? [0,0,0] : [255, 255, 255] 
        },
        displayNameColor() {
            return {color: "#" + this.color}
        },
        color() {
            return this.requester.color
        },
        contrastedOutLine() {
            return this.needsContrast ? this.darkTheme ? 'outlined-light' : "outlined-dark" : ''
        },
        contrastResult() {
            let r = parseInt(this.color.slice(0,2), 16)
            let g = parseInt(this.color.slice(2,4), 16)
            let b = parseInt(this.color.slice(4,6), 16)
            return this.contrast(this.backgroundColor,[r,g,b])
        },
        needsContrast() {
            return this.contrastResult < 4
        }
    },

    components: {RequesterBadge}
}
</script>

<style scoped>
p {
    transition: text-shadow 1s;
}
.outlined-dark {
    text-shadow: 0px 0px 1.5px rgb(0, 0, 0),
                 0px 0px 1.5px rgb(0, 0, 0),
                 0px 0px 1.5px rgb(0, 0, 0),
                 0px 0px 1.5px rgb(0, 0, 0),
                 0px 0px 1.5px rgb(0, 0, 0),
                 0px 0px 1.5px rgb(0, 0, 0),
                 0px 0px 1.5px rgb(0, 0, 0)
}
.outlined-light {
    text-shadow: 0px 0px 1.5px white,
                 0px 0px 1.5px white,
                 0px 0px 1.5px white,
                 0px 0px 1.5px white,
                 0px 0px 1.5px white,
                 0px 0px 1.5px white,
                 0px 0px 1.5px white
}
</style>