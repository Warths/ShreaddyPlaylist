<template>
<svg :height="size" :width="size" class="me-2">
  <circle :cx="size/2" :cy="size/2" :r="size/2 - (strokeWidth/2 + 1)" :style="{...dashOffset, ...stroke}"/>
  <circle class="print" :cx="size/2" :cy="size/2" :r="size/2 - (strokeWidth/2 + 1)" :style="stroke"/>
  <image :href="icon" :height="size" :width="size"/>
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
        },
        icon: {
            type: String,
            default: ""
        }
    }
}
</script>

<style scoped>
svg {
    position:relative;
    transition: all 0.3s ease-out;
}

circle {
  position:absolute;
  fill: transparent;
  stroke-dasharray: 82; /* Magic value, STFU and don't ask */
  stroke: rgb(146, 146, 146);
  transform: translateY(100%) rotate(-90deg)

}

.print {
  opacity: 0.2;
}

image {
    transform-origin: center;
    transform: scale(0.6);
    opacity: 0.7;
    filter: grayscale(100%);
}

.unavailable {
    opacity: 0.3;
}

svg:hover {
    transform-origin: center;
    transform: scale(1.2);
}
</style>

