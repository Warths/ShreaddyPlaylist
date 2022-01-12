<template>
<!-- ALL MUSIC CARDS -->
    <div v-if="options.moderator.fields.devTools.value && userLevel == 2" class="d-flex justify-content-around">
        <div>
            <button @click="clicked">Reverse</button>
            <button @click="addItem">Add</button>
            <button @click="removeFirstItem">Remove First</button>
            <button @click="removeLastItem">Remove Last</button>
            <button @click="shuffleItems">Shuffle</button>
        </div>
    </div>
    <div class="playlist m-auto px-1">
        <div class="text-end p-2 d-flex justify-content-end gap-3 flex-wrap flex-wrap-reverse">
            <transition name="apparition">
                <searchbar v-if="userLevel > 0 && options.regular.fields.requestForm.value" class="flex-grow-2" :pubsub="pubsub" :identity="identity"/>
            </transition>
            <div class="d-flex flex-column justify-content-center">
            <span class="fw-bold m-0 playlist-item" >Il y a {{list.length}} musique{{list.length > 1 ? "s" : ""}} dans la playlist</span>
            <transition name="apparition">
                <small v-if="options.regular.fields.displayPlaylistState.value && this.playlistState" class="m-0 apparition-item">{{ playlistStateText }}</small>
            </transition>
            </div>
        </div>
        <transition-group name="playlist" tag="div" class="playlist position-relative">
            <card class="playlist-item" v-for="(content) in list" 
            v-on:sendCommand="e => publish(e)"
            :song="content" :key="content.id" 
            :showPanel="options.moderator.fields.adminTools.value" 
            :userLevel="userLevel"
            :darkTheme="options.regular.fields.darkTheme.value"
            :fold="options.regular.fields.foldPlaylist.value"/>
        </transition-group>
    </div>
    
</template>

<script>
import card from "../components/RequestCard/RequestCard.vue"
import Searchbar from '../components/Search/Searchbar.vue';

export default {
    data() {
        return {
            list: [],
            playlistState: undefined,
        }
    },
    methods: {
        clicked() {
            this.list = this.list.reverse();
        },
        addItem() {
            this.list.push(this.list.length + 1);
        },
        removeFirstItem() {
            this.list.shift() ;
        },
        removeLastItem() {
            this.list.pop()
        },
        shuffleItems() {
            this.list = this.list.sort((a, b) => 0.5 - Math.random())
        },
        publish(cmd) {
            console.log("publishing")
            this.pubsub.publish("irc", {"message": cmd}, "twitch", this.getCookie("access_token"))
        }
    },
    computed: {
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
        this.pubsub.addHandler("playlist", e => {this.list = e.message.data.public})
        this.pubsub.addHandler("playlist_state", e => {this.playlistState = e.message})
        this.pubsub.subscribe(["playlist_state"])
        this.pubsub.subscribe(["playlist"])


    },
    components: {card, Searchbar},
    props: ["options", "userLevel", "identity", "pubsub"]
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

