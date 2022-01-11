<template>
<div class="d-flex align-items-center flex-grow-1">
    <div class="w-100">
        <div class="input-group">
            <div class="input-group-prepend">
                <button @click="this.visible = !this.visible" class="btn btn-outline-secondary dropdown-toggle" type="button">{{ current }}</button>
                <div v-if="this.visible" @click="this.visible = false" class="veil"></div>
                <transition name="pop"> 
                <div v-if="this.visible" class="dropdown-menu d-block shadow-lg">
                    <span 
                    v-for="(option, i) in options" 
                    @click="setCurrent(option.cmd)" 
                    class="dropdown-item" :key="i">{{option.text}}</span>
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
                {
                    cmd:"!sr", 
                    text:"Ajouter une request"
                },
                {
                    cmd:"!edit", 
                    text:"Modifier une request"
                },
                {
                    cmd:"!vip", 
                    text:"Ajouter une request VIP"
                },
                {
                    cmd:"!vedit", 
                    text:"Modifier une request VIP"
                },
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

.dark-theme .dropdown-menu {
    background-color:rgb(43, 43, 43);
}

.dark-theme .dropdown-item:hover,
.dark-theme .dropdown-item:active {
    background-color:rgb(75, 75, 75);
    color:white;
}

.dropdown-toggle {
    border-radius: 0.25rem 0 0 0.25rem;
    box-shadow:none !important;
}

.dark-theme .dropdown-item {
    color:white
}

.dropdown-item:active {
    background-color: #e9ecef;
}

.form-control {
    box-shadow:none;
    background: none;
}

.dark-theme .form-control {
    border-color: #6c757d;
    color:white;
}

.form-control:focus {
    z-index:1;
    border: 1px solid #62686e;
}

.btn-outline-secondary:active,
.btn-outline-secondary:hover {
    background-color: #ced4da;
    border: 1px solid #ced4da;

}

.dark-theme .btn-outline-secondary:active,
.dark-theme .btn-outline-secondary:hover {
    background-color: rgb(43, 43, 43)
}

.streamer-theme .btn-outline-secondary,
.streamer-theme .btn-outline-secondary:active,
.streamer-theme .btn-outline-secondary:hover {
    background-color: #ced4da;
    border: 1px solid #ced4da;
    color: #6c757d;
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