<template>
    <nav class="navbar navbar-expand navbar-light bg-light mb-2 shadow position-relative">
        <div class="container-fluid">
            <a class="navbar-brand h1 mb-0 d-flex align-items-center" href="/">
                <img src="../../assets/icon.png" class="sized-1 d-inline-block align-text-top me-2" alt="Logo de Warths"/>
                <span>Playlist</span>
            </a>
            <transition name="fade">
                <div class="loading-icons" v-if="options.regular.fields.lightmixCooldown.value && userLevel != 0">
                    <cooldown 
                        name="light"
                        :icon="require('../../assets/sun.png')" 
                        toolTipText="Cooldown des contrôles RGB"
                        :pubsub="pubsub"
                    />
                    <cooldown 
                        name="light_fx"
                        :icon="require('../../assets/fx.png')" 
                        toolTipText="Cooldown des contrôles<br>des effets visuels"
                        :pubsub="pubsub"
                    />                    
                </div>
            </transition>
            <div class="me-auto spacer"></div>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <nav-link v-if="userLevel == 0" :href="href" :text="text"/>
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
            text: 'Login'
        }
    },
    computed: {
        href() {
            return `https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${this.clientId}&redirect_uri=${window.location.protocol}//${window.location.host}/`
        }
    },
    components: { NavLink, NavProfile, Cooldown }, 
    props: ["userLevel", "identity", "userData", "options", "pubsub"]
}
</script>

<style scoped>
nav {
    transition: background 1s;
}

.dark-theme nav {
    background:rgb(43, 43, 43) !important
}

.streamer-theme nav{
    background: rgba(0,0,0,0) !important;
    box-shadow: none !important;
}

.options-toggler {
    padding: 0.25rem 0.75rem;
    font-size: 1.25rem;
    line-height: 1;
    background-color: transparent;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    transition: box-shadow .15s ease-in-out;
    color: rgba(0, 0, 0, 0.55);
    border-color: rgba(0,0,0,.1);
    display: block;
}

.options-toggler {
    transition: filter 1s;
}

.dark-theme .options-toggler {
    filter: invert()
}

span {
    transition: color 1s;
}
.dark-theme span {
    color: rgb(248, 248, 248)
}

.streamer-theme .loading-icons {
    filter: brightness(150%)
}
</style>