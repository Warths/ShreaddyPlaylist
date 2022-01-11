<template>
<div class="d-flex align-items-center flex-grow-1">
    <div class="w-100">
        <div class="input-group">
            <div class="input-group-prepend">
                <button @click="this.visible = !this.visible" class="btn btn-outline-secondary dropdown-toggle" type="button">{{ current }}</button>
                <div v-if="this.visible" @click="this.visible = false" class="veil"></div>
                <transition name="pop"> 
                <div v-if="this.visible" class="dropdown-menu d-block">
                    <span 
                    v-for="(option, i) in options" 
                    @click="setCurrent(option)" 
                    class="dropdown-item" :key="i">{{option}}</span>
                </div>
                </transition>
            </div>
            <input type="text" class="form-control" aria-label="Text input with dropdown button">
        </div>
    </div>
</div>
</template>

<script>

export default {
    data() {
        return {
            current: "!sr",
            visible: false,
            options: [
                "!sr", 
                "!edit", 
                "!vip", "!vedit"
            ]
        }
    },
    methods: {
        setCurrent(option) {
            this.current = option
            this.visible = false
        }
    }
}
</script>


<style scoped>
.veil {
    z-index: 1;
    height: 1000vh;
    width: 1000vw;
    position: absolute;
    top:0;
    left:0;
    transform: translate(-50%, -50%)
}


.dropdown-menu {
    transform-origin: top left;
}

.dropdown-toggle {
    border-radius: 0.25rem 0 0 0.25rem;
    box-shadow:none !important;
}

.form-control {
    box-shadow:none;
}

.form-control:focus {
    z-index:1;
    border: 1px solid #6c757d;
}


.pop-enter-active,
.pop-leave-active {
    transition: opacity 0.1s ease-out, transform 0.1s ease-out;
}

.pop-enter-from,
.pop-leave-to {
    transform-origin: top left;
    transform: scale(80%);
    opacity:0;
}
</style>