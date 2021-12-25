<template>
<svg :height="size" :width="size" class="me-2 wrapper">
  <circle :cx="size/2" :cy="size/2" :r="size/2 - (strokeWidth/2)" :style="{...dash, ...stroke}" :class="ready"/>
  <circle class="print" :cx="size/2" :cy="size/2" :r="size/2 - (strokeWidth/2)" :style="stroke"/>
  <image class="main-icon" :href="icon" :height="size" :width="size"/>
  <transition name="fade">
  <svg v-if="this.unknown" :height="size" :width="size">
    <circle class="corner-circle corner" :cx="size/2" :cy="size/2" :r="size/2 - (strokeWidth/2)"/>
    <image class="corner" href="../../assets/questionmark.png" :height="size" :width="size"/>
  </svg>
  </transition> 

</svg>
<!-- <button @click="pushEvent">Push me !</button> -->
</template>

<script>
export default {
    data() {
        return {
            offset: 0,
            temp: undefined
        }
    },
    methods: {
        pushEvent() {
            this.temp = {
                emited: Date.now(),
                cooldown: 5000,
            }
        },
        update() {
            if (this.temp == undefined) {
                return
            }
            
            let currentTime = Date.now()
            let progress = currentTime - this.temp.emited;
            
            if (progress < 0) {
                progress = 0;
            } else if (progress > this.temp.cooldown) {
                progress = this.temp.cooldown
            }

            this.offset = this.strokeDashArray - (progress / this.temp.cooldown * this.strokeDashArray)


        }
    },
    computed: {
        dash() {
            return {
                "stroke-dashoffset": this.offset,
                "stroke-dasharray": 88
                }
        },
        stroke() {
            return {"stroke-width": this.strokeWidth}
        },
        unknown() {
            return this.temp == undefined
        }
    },
    mounted() {
        setInterval(() => this.update(), 30)
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
            default: 84
        },
        icon: {
            type: String,
            default: ""
        },
        state: {
            default:undefined
        }
    }
}
</script>

<style scoped>
.wrapper {
    position:relative;
    transition: all 0.3s ease-out;
}
.wrapper:hover {
    transform: scale(1.2)
}

circle {
  position:absolute;
  fill: transparent;
  stroke: rgb(146, 146, 146);
  transform-origin: center;
  transform: rotate(-90deg)

}

.print {
  opacity: 0.2;
}

.main-icon {
    transform-origin: center;
    transform: scale(0.64);
    opacity: 0.7;
    filter: grayscale(100%);
}
.corner-circle {
    fill:white;
}
.corner {
    position:absolute;
    transform-origin: bottom right;
    transform: scale(0.44);
}

.unavailable {
    opacity: 0.3;
}


</style>

