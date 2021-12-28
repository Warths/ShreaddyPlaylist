<template>
<span class="me-2">
    <tippy :content="toolTipText" placement="bottom" :offset="[0,18]">
        <svg :height="size" :width="size" class="wrapper" :class="availableClass" >
            <circle class="print" :cx="size/2" :cy="size/2" :r="size/2 - (strokeWidth/2)" :style="stroke"/>
            <circle :cx="size/2" :cy="size/2" :r="size/2 - (strokeWidth/2)" :style="{...dash, ...stroke}"/>
            <image class="main-icon" :href="icon" :height="size" :width="size" :class="loadingClass"/>
            <transition name="fade">
                <svg v-if="this.unknown" :height="size" :width="size" >
                    <circle class="corner-circle corner" :cx="size/2" :cy="size/2" :r="size/2 - (strokeWidth/2)"/>
                    <image class="corner" href="../../assets/questionmark.png" :height="size" :width="size"/>
                </svg>
            </transition>
        </svg>
    </tippy>
</span>
</template>

<script>

export default {
    data() {
        return {
            offset: 0,
            justMounted: true,
            lastEventDate: 0,
            processedState: undefined,
            remaining: 0
            
        }
    },
    methods: {
        remainingTimeStr() {
            return `${(this.remaining / 1000).toFixed(1)}s`
        },
        pushEvent() {
            this.temp = {
                emited: Date.now(),
                cooldown: 2000,
            }
        },
        update() {
            if (this.state == undefined) {
                return
            }

            if (this.state.emitted != this.lastEventDate) {
                this.lastEventDate = this.state.emitted
                let serverTimeOffset = Date.now() - this.state.server_time
                this.processedState = {
                    emitted: this.lastEventDate + serverTimeOffset,
                    cooldown: this.state.cooldown
                }
            } 

            let currentTime = Date.now()
            let progress = currentTime - this.processedState.emitted;

            if (progress < 0) {
                progress = 0;
            } else if (progress > this.processedState.cooldown) {
                progress = this.processedState.cooldown
            }
            this.remaining = this.processedState.cooldown - progress
            this.offset = this.strokeDashArray - (progress / this.processedState.cooldown * this.strokeDashArray)

            if (this.offset != 0) {
                this.justMounted = false
            }
        }
    },
    computed: {
        readyClass() {
            return  this.offset == 0 && this.justMounted == false ? "ready" : ""
        },
        loadingClass() {
            return this.offset != 0 && this.justMounted == false ? "loading" : ""
        },
        availableClass() {
            return this.available ? "" : "unavailable"
        },
        dash() {
            return {
                "stroke-dashoffset": this.offset,
                "stroke-dasharray": this.strokeDashArray
                }
        },
        stroke() {
            return {"stroke-width": this.strokeWidth}
        },
        unknown() {
            return this.state == undefined
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
            default: 88
        },
        icon: {
            type: String,
            default: ""
        },
        state: {
            default:undefined
        },
        available: {
            type: Boolean,
            default: true
        },
        toolTipText: {
            type: String,
            default: ""
        }
    }
}
</script>

<style scoped>

.wrapper {
    position:relative;
    transition: all 0.3s ease-out;
}

circle {
  position:absolute;
  fill: transparent;
  stroke: rgb(146, 146, 146);
  transform-origin: center;
  transform: rotate(-90deg)

}

.ready {
    animation-duration: .3s;
    animation-iteration-count: 3;
    animation-name: flash;
}

@keyframes flash {
    50% {stroke: white}
}

.print {
  opacity: 0.2;
}

.main-icon {
    transform-origin: center;
    transform: scale(0.64);
    opacity: 0.7;
    filter: grayscale(100%);
    transition: all 0.5s;
}

.main-icon.loading {
    transform: scale(0.5);
    opacity: 0.2
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

