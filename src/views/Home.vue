<template>
<!-- ALL MUSIC CARDS -->
    <div class="playlist m-auto px-1">
        <div class="text-end p-2 d-flex justify-content-end gap-3 flex-wrap flex-wrap-reverse">
            <transition name="apparition">
                <searchbar v-if="userLevel > 0 && option('requestForm')" class="flex-grow-2" :identity="identity"/>
            </transition>
            <div class="d-flex flex-column my-2 justify-content-center">
            <span class="fw-bold m-0 playlist-item" >Il y a {{list.length}} musique{{list.length > 1 ? "s" : ""}} dans la playlist</span>
            <transition name="apparition">
                <small v-if="option('displayPlaylistState') && this.playlistState" class="m-0 apparition-item">{{ playlistStateText }}</small>
            </transition>
            </div>
        </div>
        <transition-group name="playlist" tag="div" class="playlist position-relative">
            <card class="playlist-item" v-for="content in listProcessed" 
            v-on:sendCommand="e => publish(e)"
            :song="content" :key="content.id" 
            :showPanel="option('adminTools')" 
            :fold="option('foldPlaylist')"/>
        </transition-group>
    </div>
    
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import card from "../components/RequestCard/RequestCard.vue";
import Searchbar from '../components/Search/Searchbar.vue';

export default {
    data() {
        return {
            list: [],
            playlistState: undefined,
        }
    },
    methods: {
        ...mapActions(["publish", "subscribe", "addHandler"]),
        publish(cmd) {
            this.publish(["irc", {"message": cmd}, "twitch", this.getCookie("access_token")])
        }
    },
    computed: {
        ...mapGetters(["option", "userLevel"]),
        ...mapState(["identity"]),
        listProcessed() {
            let list = []
            console.log(this.list)
            for (let i in this.list.public) {
                list.push({public: this.list.public[i], admin: this.list.admin[i]})
            }
            console.log(list)
            return list
        },
        playlistStateText() {
            let states = {
                open: [],
                closed: []
            }
            for (let key in this.playlistState) {
                this.playlistState[key] ? states.open.push(key) : states.closed.push(key)
                
            }

            let texts = {
                open: "Les requests ",
                closed: `Les ${states.open.length > 0 ? '' : 'requests '}`
            }

            for (let state in texts) {
                for (let i in states[state]) {
                    switch (parseInt(i)) {
                        case 0:
                            texts[state] += states[state][i]
                            break
                        case states[state].length - 1:
                            texts[state] += " et " + states[state][i]
                            break
                        default: 
                            texts[state] += ", " + states[state][i]
                    }
                }
            }
            texts.open += " sont ouvertes."
            texts.closed += " sont fermées."
            
            for (let state in texts) {
                if (states[state].length == 0) {
                    texts[state] = ""
                }
            }

            return `${texts.open} ${texts.closed}`
        }
    },
    mounted() {
        // Setting App to update regularly
        history.replaceState(null, null, ' ');
        this.addHandler(["playlist", e => this.list = e.message.data])
        this.addHandler(["playlist_state", e => this.playlistState = e.message])
        this.subscribe(["playlist_state"])
        this.subscribe(["playlist"])


    },
    components: {card, Searchbar},
}

</script>

<style scoped>
span, small {
    transition: color 1s
}

.streamer-theme span,
.streamer-theme small,
.dark-theme span,
.dark-theme small {
    color: white;
}

.playlist {
    transition: max-width 1s;
    max-width: 800px;
}
.streamer-theme .playlist {
    max-width: 1200px
}
.playlist-item {
  transition: all .5s
}

.playlist-enter-from, .playlist-leave-to
{
  opacity: 0!important;
  transform: scale(0.96);
}

.playlist-leave-active {
    position:absolute;
}


.apparition-enter-from, .apparition-leave-to {
    opacity: 0;
    line-height: 0
}

.apparition-enter-active, .apparition-leave-active {
    transition: all .5s
}
</style>

