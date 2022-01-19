import { createStore, mapState } from "vuex"
import PubSubClient from '../vendors/PubSubClient.js'

export default createStore({
    state() {
        return {
            pubsub: new PubSubClient("wss://pubsub.warths.fr/", 240, false)
        }
    },
    mutations: {},
    actions: {
        subscribe(context, payload) {
            console.log("Store Subscribe")
            this.state.pubsub.subscribe(payload)
        },
        publish(context, payload) {
            console.log("Store Publish")
            this.state.pubsub.publish(payload)
        },
        addHandler(context, payload) {
            console.log("Store addHandler")
            this.state.pubsub.addHandler(...payload)
        },
    }
})