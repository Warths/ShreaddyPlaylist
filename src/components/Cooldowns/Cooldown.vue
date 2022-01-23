<template>
<div class="me-2">
    <tippy :content="toolTipText" placement="bottom" :offset="[0,18]">
        <svg :height="32" :width="32" class="wrapper" :class="availableClass" >
            <circle class="print" :cx="32/2" :cy="32/2" :r="32/2 - (strokeWidth/2)" :style="stroke"/>
            <circle :cx="32/2" :cy="32/2" :r="32/2 - (strokeWidth/2)" :style="{...dash, ...stroke}"/>
            <image class="main-icon" :href="icon" :height="32" :width="32" :class="loadingClass"/>
            <transition name="fade">
                <svg v-if="this.unknown" :height="32" :width="32" >
                    <circle class="corner-circle corner" :cx="32/2" :cy="32/2" :r="32/2 - (strokeWidth/2)"/>
                    <image class="corner" href="../../assets/questionmark.png" :height="32" :width="32"/>
                </svg>
            </transition>
        </svg>
    </tippy>
</div>
</template>

<script>

import {mapActions} from "vuex"

export default {
    data() {
        return {
            offset: 0,
            lastEventDate: 0,
            state: undefined,
            available: true,
        }
    },
    methods: {
        ...mapActions(["subscribe", "addHandler"]),
        update() {
            if (this.state == undefined) {
                return
            }

            if (this.state.emitted != this.lastEventDate) {
                this.state.emitted += Date.now() - this.state.server_time
                this.lastEventDate = this.state.emitted
            } 
            let progress = Math.max(0, Math.min(this.state.cooldown, Date.now() - this.state.emitted))
            this.offset = this.strokeDashArray - (progress / this.state.cooldown * this.strokeDashArray)
        }
    },
    computed: {
        age() {
            return Date.now() - this.mountDate
        },
        loadingClass() {
            return this.offset != 0 ? "loading" : ""
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
            return this.state == undefined && this.age > 5000
        }
    },
    mounted() {
        let cooldown = `${this.name}_cooldown`
        let available = `${this.name}_availability`
        this.addHandler([available, e => this.available = e.message.available])
        this.addHandler([cooldown, e => this.state = e.message])
        this.subscribe([available])
        this.subscribe([cooldown])
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
        name: {
            type: String,
            required: true
        },
        toolTipText: {
            type: String,
            default: "Test"
        },
        mountDate: {
            type: Number,
            default: Date.now()
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
  stroke: rgb(129, 129, 129);
  transform-origin: center;
  transform: rotate(-90deg);
  transition: stroke 1s
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
    transform: scale(0.57);
    filter: grayscale(100%) contrast(0%);
    transition: all 0.5s;
}

.main-icon.loading {
    transform: scale(0.45);
    opacity: 0.2
}
.corner-circle {
    fill:white;
}
.corner {
    position:absolute;
    transform-origin: bottom right;
    transform: scale(0.44);
    transition: all 1s
}

.dark-theme .corner {
    filter:invert() contrast(.8);
}
.unavailable {
    opacity: 0.3;
}


</style>

