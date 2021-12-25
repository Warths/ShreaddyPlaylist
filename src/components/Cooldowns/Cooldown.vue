<template>
<svg :height="size" :width="size">
  <circle :cx="size/2" :cy="size/2" :r="size/2 - (strokeWidth/2 + 1)" :style="{...dashOffset, ...stroke}"/>
  <circle class="print" :cx="size/2" :cy="size/2" :r="size/2 - (strokeWidth/2 + 1)" :style="stroke"/>
  <!--<image href="mdn_logo_only_color.png" :height="size" :width="size"/>-->
</svg>
</template>

<script>
export default {
    data() {
        return {
            offset: 82
        }
    },
    computed: {
        dashOffset() {
            return {"stroke-dashoffset": this.offset}
        },
        stroke() {
            return {"stroke-width": this.strokeWidth}
        }
    },
    mounted() {
        setInterval(() => this.offset -= 1, 30)
    },
    props: {
        size: {
            type: Number,
            default: 32
        },
        strokeWidth: {
            type: Number,
            default: 4
        },
        strokeDashArray: {
            type: Number,
            default: 82
        }
    }
}
</script>

<style scoped>
svg {
    position:relative;
}

circle {
  position:absolute;
  fill: transparent;
  stroke-dasharray: 82; /* Magic value, STFU and don't ask */
  stroke: rgb(80, 80, 80);
  transform: translateY(100%) rotate(-90deg)

}

.print {
  opacity: 0.2;
}
</style>

