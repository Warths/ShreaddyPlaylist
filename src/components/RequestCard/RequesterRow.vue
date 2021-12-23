<template>
    <div class="card-text align-self-end fs-4 d-flex align-items-center">
        <requester-badge v-for="badge in requester.badges" :badge="badge" :key="badge.alttext"/>
        <p class="m-0 fw-bold" :class="contrastedOutLine" :style="displayNameColor">{{ requester.displayName }}</p>
    </div>
</template>

<script>
import RequesterBadge from "./RequesterBadge.vue"

export default {
    props: ["requester"],
    computed:{
         displayNameColor() {
             return {color: "#" + this.requester.color}
         },
        contrastedOutLine() {
            let r = parseInt(this.requester.color.slice(0,2), 16)
            let g = parseInt(this.requester.color.slice(2,4), 16)
            let b = parseInt(this.requester.color.slice(4,6), 16)
            return (r+g+b)/3 < 125 ? "outlined-light" : "outlined-dark"
        }

    },
    components: {RequesterBadge}
}
</script>

<style scoped>
.outlined-light {
    text-shadow: 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff;
}

.outlined-dark {
    text-shadow: 1px 1px #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000;
}
</style>