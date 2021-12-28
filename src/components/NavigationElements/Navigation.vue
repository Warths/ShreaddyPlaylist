<template>
    <nav class="navbar navbar-expand navbar-light bg-light mb-2 shadow position-relative">
        <div class="container-fluid">
            <a class="navbar-brand h1 mb-0 d-flex align-items-center" href="/">
                <img src="../../assets/icon.png" class="sized-1 d-inline-block align-text-top me-2" alt="Logo de Warths"/>
                <span>Playlist</span>
            </a>
            <transition name="fade">
                <div v-if="options.regular.fields.lightmixCooldown.value && userLevel != 0">
                    <cooldown 
                        :icon="require('../../assets/sun.png')" 
                        :state="lightState" 
                        :available="lightAvailable"
                        toolTipText="Cooldown des contrôles RGB"
                    />
                    <cooldown 
                        :icon="require('../../assets/fx.png')" 
                        :state="fxState" 
                        :available="fxAvailable"
                        toolTipText="Cooldown des contrôles<br>des effets visuels"
                    />
                </div>
            </transition>
            <div class="me-auto spacer"></div>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <nav-link v-if="userLevel == 0" href="/login" text="Login"/>
                    <nav-profile v-else :identity="identity" :userLevel="userLevel" :userData="userData"/>
                </li>
            </ul>
            <div>
                <button v-if="userLevel != 0" @click="$emit('toggleOptions')" class="options-toggler ms-2 p-0 px-1 sized-1">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>
        </div>
    </nav> 
</template>

<script>
import Cooldown from "../Cooldowns/Cooldown.vue"
import NavLink from "./NavLink.vue"
import NavProfile from "./NavProfile.vue"

export default {
    data() {
        return {
            lightState:undefined,
            lightAvailable: true,
            fxState: undefined,
            fxAvailable: true,

            
        }
    },
    methods: {
        updateState(target) {
            this[target] = {
                emited: Date.now(),
                serverTime: Date.now(),
                cooldown: (target == "fx") ? 20000 : 5000,
            }
        }
    },
    mounted() {
        this.pubsub.addHandler("light_fx_availability", e => this.fxAvailable = e.message.available)
        this.pubsub.addHandler("light_availability", e => this.lightAvailable = e.message.available)
        this.pubsub.addHandler("light_cooldown", e => this.lightState = e.message)
        this.pubsub.addHandler("light_fx_cooldown", e => this.fxState = e.message)
        //setInterval(() => {if (Math.random() > 0.6) {this.updateState("light")}}, 5000)
        //setInterval(() => {if (Math.random() > 0.1) {this.updateState("fx")}}, 21000)
    },
    components: { NavLink, NavProfile, Cooldown }, 
    props: ["userLevel", "identity", "userData", "options", "pubsub"]
}
</script>

<style scoped>
.options-toggler {
    padding: 0.25rem 0.75rem;
    font-size: 1.25rem;
    line-height: 1;
    background-color: transparent;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    transition: box-shadow .15s ease-in-out;
    color: rgba(0,0,0,.55);
    border-color: rgba(0,0,0,.1);
    display: block;
}
</style>