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
            <form class="flex-grow-1 position-relative" @submit.prevent="sendCommand()">
                <input v-model="inputValue" type="text" class="form-control" aria-label="Text input with dropdown button" :disabled="disabled">
                <transition name="pop">
                    <div v-if="displayResponse" class="alert position-absolute top-100 start-50 translate-middle-x my-1" :class="responseType">{{ responseText }}</div>
                </transition> 
            </form>
        </div>
    </div>
</div>
</template>

<script>

export default {
    data() {
        return {
            responseText: "",
            displayResponse: false,
            responseType: "",
            disabled: false,
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
                "artist_added": "Requête ajoutée !",
                "artist_added": "Requête ajoutée !",
                "artist_added": "Requête ajoutée !",
            }
        }
    },
    methods: {
        setCurrent(option) {
            this.current = option
            this.visible = false
        },
        sendCommand() {
            this.disabled = true
            this.pubsub.publish(
                "irc", 
                {"message": `${this.current} ${this.inputValue}`}, 
                "twitch", 
                this.getCookie("access_token")
            )
            setTimeout(this.handleResponseTimeOut, 5000)
        },
        handleResponseTimeOut() {
            if (this.disabled) {
                this.response("Timeout", "error")
            }
        },
        response(text, type="success") {
            console.log("displaying response")
            this.responseText = text
            this.responseType = type == "success" ? "alert-dark" : "alert-danger"
            this.displayResponse = true
            setTimeout(this.hideResponse, 4000) 
        },
        hideResponse() {
            this.displayResponse = false
            this.disabled = false
        },
        handleResponse(response) {
            if (this.identity.user_id == response.message.requester) {

            }
            this.response(response.message.response)
        }
    },
    props: ["pubsub", "identity"],
    mounted() {
        this.pubsub.subscribe(["request_response"])
        this.pubsub.addHandler("request_response", e => {this.handleResponse(e)})

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
    border-radius: 0 0.25rem 0.25rem 0;
    transition: opacity .5s ease, background-color .5s ease, border-color .5s ease;
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