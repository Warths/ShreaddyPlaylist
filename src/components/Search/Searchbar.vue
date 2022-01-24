<template>
<div class="d-flex align-items-center flex-grow-1">
    <div class="w-100">
        <div class="input-group">
            <div class="input-group-prepend">
                <button @click="visible = !visible" class="btn btn-outline-secondary dropdown-toggle" type="button">{{ current }}</button>
                <div v-if="visible" @click="(e) => {veilClick(e)}" class="veil"></div>
                <transition name="pop"> 
                <div v-if="visible" class="dropdown-menu d-block shadow-lg">
                    <span 
                    v-for="(option, i) in options" 
                    @click="setCurrent(option.cmd)" 
                    class="dropdown-item" :key="i">{{option.text}}</span>
                </div>
                </transition>
            </div>
            <form class="flex-grow-1 position-relative" @submit.prevent="sendCommand()">
                <input v-model="inputValue" id="searchbar" autocomplete="off" type="text" class="form-control"  :disabled="waitingForResponse">
                <transition name="pop">
                    <div @click="hideResponse(true)" v-if="displayResponse" class="alert position-absolute text-center w-75 top-100 start-50 translate-middle-x my-1" :class="responseType">{{ responseText }}</div>
                </transition> 
            </form>
        </div>
    </div>
</div>
</template>

<script>
import {mapActions, mapState} from "vuex"

export default {
    data() {
        return {
            responseText: "",
            displayResponse: false,
            responseType: "",
            waitingForResponse: false,
            inputValue: "",
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
            ],
            text: {
                "request_limit_reached": "Limite de request atteinte",
                "no_argument": "Requête vide",
                "no_argument_edit": "Requête vide",
                "no_argument_vip": "Requête vide",
                "no_argument_edit_vip": "Requête vide",
                "artist_added": "Requête ajoutée !",
                "artist_added_edit": "Requête modifiée !",
                "artist_added_vip": "Requête VIP ajoutée !",
                "artist_added_edit_vip": "Requête VIP modifiée !",
                "song_added": "Requête ajoutée !",
                "song_added_edit": "Requête modifiée !",
                "song_added_vip": "Requête VIP ajoutée !",
                "song_added_edit_vip": "Requête VIP modifiée !",
                "no_match": "Aucun résultat",
                "no_match_edit": "Aucun résultat",
                "no_match_vip": "Aucun résultat",
                "no_match_edit_vip": "Aucun résultat",
                "banlisted_song": "Musique banlistée",
                "banlisted_song_edit": "Musique banlistée",
                "banlisted_song_vip": "Musique banlistée",
                "banlisted_song_edit_vip": "Musique banlistée",
                "banlisted_artist": "Artiste banlistée",
                "banlisted_artist_edit": "Artiste banlistée",
                "banlisted_artist_vip": "Artiste banlistée",
                "banlisted_artist_edit_vip": "Artiste banlistée",
                "not_enough_characters": "Pas assez de caractères dans la requête",
                "not_enough_characters_edit": "Pas assez de caractères dans la requête",
                "not_enough_characters_vip": "Pas assez de caractères dans la requête",
                "not_enough_characters_edit_vip": "Pas assez de caractères dans la requête",
                "no_request_queued_edit": "Aucune requête à éditer",
                "no_request_queued_edit_vip": "Aucune requête VIP à éditer",
                "no_point": "pas assez de points VIP !",
                "vip_closed_queue": "Playlist fermée au requêtes VIPs",
                "closed_queue": "Playlist fermée au requêtes standards"
            }
        }
    },
    computed: mapState(["identity"]),
    methods: {
        ...mapActions(["subscribe", "addHandler", "publish"]),
        setCurrent(option) {
            this.current = option
            this.visible = false
        },
        veilClick(e) {
            this.visible = false
            setTimeout(() => {
                    let element = document.elementFromPoint(e.clientX, e.clientY)
                    element.focus()
                }, 20
            )

            
        },
        sendCommand() {
            this.waitingForResponse = true
            this.publish(["irc", {"message": `${this.current} ${this.inputValue}`}, "twitch", this.getCookie("access_token")])
            setTimeout(this.handleResponseTimeOut, 5000)
        },
        handleResponseTimeOut() {
            if (this.waitingForResponse && this.responseText == "") {
                this.response("La requête n'a pas été receptionnée. Shreaddy est peut être hors ligne ?", "error")
            }
        },
        response(text, type="success") {
            this.responseText = text
            this.responseType = type == "success" ? "alert-dark" : "alert-danger"
            this.displayResponse = true
            setTimeout(this.hideResponse, 5000) 
        },
        hideResponse(placeCursor=false) {
            this.displayResponse = false
            this.waitingForResponse = false
            this.responseText = ""
            if (placeCursor) {
                setTimeout(() => {
                let searchbar = document.getElementById("searchbar");
                searchbar.focus()
                }, 550)
            }
        },
        handleResponse(response) {
            if (this.identity.user_id == response.message.requester && this.waitingForResponse) {
                let key = response.message.response
                if (this.text.hasOwnProperty(key)) {
                    this.response(this.text[key])
                } else {
                    this.response(key)
                }
            }        
        }
    },
    mounted() {
        this.subscribe(["request_response"])
        this.addHandler(["request_response", (e) => {this.handleResponse(e)}])
    }
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
    border-radius: 0 0.25rem 0.25rem 0;
    transition: opacity .5s ease, background-color .5s ease, border-color .5s ease;
}

.dark-theme .form-control,
.streamer-theme .form-control {
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
    transition: opacity .2s ease-out, transform .2s ease-out;
}

.pop-enter-from,
.pop-leave-to {
    transform-origin: top left;
    transform: scale(80%);
    opacity:0;
}

.form-control[disabled] {
    background-color: rgba(0,0,0,0.1);
    opacity: 0.5;
}

.dark-theme .form-control[disabled] {
    background-color: rgba(255, 255, 255, 0.1);
}

.alert {
    z-index: 3
}

</style>