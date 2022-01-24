<template>
    <!-- CMD Button-->
    <div v-if="typeof(action) == 'string'" class="pt-1" :class="this.class">
        <button type="button" @click="sendCommand(formatCommand(this.action))" class="btn btn-primary bg-purple border-0 p-1 px-2">{{ text }}</button>
    </div>
    <!-- Action Button -->
    <div v-else-if="typeof(action) == 'function'" class="pt-1" :class="this.class">
        <button type="button" @click="action()" class="btn btn-primary bg-purple border-0 p-1 px-2">{{ text }}</button>
    </div>
    <!-- Group Button -->
    <div v-else-if="typeof(action) == 'object'" class="btn-group pt-1" :class="this.class">
        <button @click="show = !show" type="button" class="btn btn-primary dropdown-toggle bg-purple border-0 p-1 px-2">{{ text }}</button>
        <transition name="pop">
        <ul v-if="show" class="dropdown-menu d-block my-1 shadow-lg">
            <li v-for="(choice, i) in action.choices" :key="i"><a @click="sendCommand(formatCommand(this.action.cmd, choice[0]))" class="dropdown-item" href="#">{{ choice[1] }}</a></li>
        </ul>
        </transition>
        <div v-if="show" class="veil" @click="(e) => veilClick(e)"></div>
    </div>
</template>

<script>
import { mapActions} from "vuex"
export default {
    data() {
        return {
            show: false,
        }
    },
    methods: {
        ...mapActions(["sendCommand"]),
        veilClick(e) {
            this.show = false
            setTimeout(() => {
                    let element = document.elementFromPoint(e.clientX, e.clientY)
                    element.focus()
                    console.log(element)
                }, 20
            )

            
        },
        formatCommand(cmd, choice) {
            this.show = false;
            cmd = cmd.replace("%choice%", choice)
            for (let key in this.song) {
                if (typeof(this.song[key]) == "object") {
                    for (let subkey in this.song[key]) {
                        cmd = cmd.replace(`%${key}.${subkey}%`, this.song[key][subkey])
                    }
                } else {
                    cmd = cmd.replace(`%${key}%`, this.song[key])
                }
            }
            return cmd
        }
    },
    props: ["song", "text", "danger", "action", "class"]
}
</script>

<style scoped>
.veil {
    z-index: 10;
    height: 1000vh;
    width: 1000vw;
    position: absolute;
    top:0;
    left:0;
    transform: translate(-50%, -50%)
}

.danger > .btn {
    background-color: #dc3545 !important
}

.dropdown-menu {
    transform-origin: top left;
    top: 100%;
}

.reverse-dropdown .dropdown-menu {
    transform-origin: top right;
    transform: translateX(-100%);
    left: 100%
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
    box-shadow:none !important;
}

.dark-theme .dropdown-item {
    color:white
}

.dropdown-item:active {
    background-color: #e9ecef;
}

.dropdown-menu {
    transition: background-color 1s;
}
.dropdown-menu .a {
    transition: color 1s;
}
.pop-enter-active,
.pop-leave-active {
    transition: opacity .2s ease-out, transform .2s ease-out;
}

.pop-enter-from,
.pop-leave-to {
    transform: scale(80%);
    opacity:0;
}

.reverse-dropdown .pop-enter-from,
.reverse-dropdown .pop-leave-to {
    transform: translateX(-100%) scale(80%)
}
</style>