<template>
    <div class="card-text align-self-end fs-4 d-flex align-items-center">
        <requester-badge v-for="badge in requester.badges" :badge="badge" :key="badge.alttext"/>
        <p class="m-0 fw-bold" :class="contrastedOutLine" :style="displayNameColor">{{ requester.displayName }} {{ contrastResult.toFixed(2)}}</p>
    </div>
</template>

<script>
import RequesterBadge from "./RequesterBadge.vue"

export default {
    props: ["requester"],
    computed:{
        displayNameColor() {
            return {color: "#" + this.color}
        },
        color() {
            return this.requester.color
        },
        contrastedOutLine() {
            return ''
        },
        contrastResult() {
            let r = parseInt(this.color.slice(0,2), 16)
            let g = parseInt(this.color.slice(2,4), 16)
            let b = parseInt(this.color.slice(4,6), 16)
            return this.contrast([255,255,255],[r,g,b])
        }
    },
    mounted() {
        console.log(this.requester)
    },
    components: {RequesterBadge}
}
</script>

<style scoped>
.outlined-light {
    text-shadow: 1px 1px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff;
}

.outlined-dark {
    text-shadow: 1px 1px 0 rgb(0, 0, 0), -1px -1px 0 rgb(0, 0, 0), 1px -1px 0 rgb(0, 0, 0), -1px 1px 0 rgb(0, 0, 0);
}
</style>