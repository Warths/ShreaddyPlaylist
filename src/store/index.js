import { createStore, mapState } from "vuex"
import PubSubClient from '../vendors/PubSubClient.js'
import cookies from '../mixins/Cookies.vue'
export default createStore({
    state() {
        return {
            pubsub: new PubSubClient("wss://pubsub.warths.fr/"),
            options: {
                regular: {
                    fields: {
                      requestForm: {
                        name: "options-request-form",
                        value: cookies.methods.getCookieOrDefault("options-request-form", true, true),
                        text: "Formulaire de request"
                      },
                      lightmixCooldown: {
                        name: "options-lightmix-cooldown",
                        value: cookies.methods.getCookieOrDefault("options-lightmix-cooldown", false, true),
                        text: "Temps de recharge LightMix"
                      },
                      displayPlaylistState: {
                        name: "options-display-playlist-state",
                        value: cookies.methods.getCookieOrDefault("options-display-playlist-state", true, true),
                        text: "Affiche le statut de la playlist"
                      },
                      foldPlaylist: {
                        name: "options-fold-playlist",
                        value: cookies.methods.getCookieOrDefault("options-fold-playlist", false, true),
                        text: "Replier la playlist"
                      },
                      darkTheme: {
                        name: "options-dark-theme",
                        value: cookies.methods.getCookieOrDefault("options-dark-theme", false, true),
                        text: "Mode sombre",
                      }
                    },
                    userLevel: 1
                },
                moderator: {
                  fields: {
                    adminTools: {
                      name: "options-admintools",
                      value: cookies.methods.getCookieOrDefault("options-admintools", false, true),
                      text: "Raccourcis de modération"
                    },
                    streamerTheme: {
                      name: "options-streamer-theme",
                      value: cookies.methods.getCookieOrDefault("options-streamer-theme", false, true),
                      text: "Mode Streamer",
                    }
                  },
                  userLevel: 2
                }
            }
        }
    },
    mutations: {
        updateOption(state, option) {
            if (state.options.regular.fields.hasOwnProperty(option.name)){
                state.options.regular.fields[option.name].value = option.value
            }
            if (state.options.moderator.fields.hasOwnProperty(option.name)){
                state.options.moderator.fields[option.name].value = option.value
            }
        } 
    },
    actions: {
        subscribe(context, payload) {
            this.state.pubsub.subscribe(payload)
        },
        publish(context, payload) {
            this.state.pubsub.publish(payload)
        },
        addHandler(context, payload) {
            this.state.pubsub.addHandler(...payload)
        },
    },
    getters: {
        option: (state) => (fieldName) => {
            if (state.options.regular.fields.hasOwnProperty(fieldName)){
                return state.options.regular.fields[fieldName].value
            }
            if (state.options.moderator.fields.hasOwnProperty(fieldName)){
                return state.options.moderator.fields[fieldName].value
            }
        }
    }
})