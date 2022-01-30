import { createStore } from "vuex"
import PubSubClient from '../vendors/PubSubClient.js'
import cookies from '../mixins/Cookies.vue'
export default createStore({
    state() {
        return {
            showOptions: false,
            clientId: "kh3yohkrwpbo6m71sryrw8hm0gls90",
            moderators: ["mepha", "warths"],
            playlistState: undefined,
            userData: null,
            identity: null,
            pubsub: new PubSubClient("wss://pubsub.warths.fr/"),
            forcedOptions: {},
            options: {
                playlist: {
                  fields: {
                    regularOpen: {
                      name: "regular-open",
                      value: cookies.methods.getCookieOrDefault("regular-open", true, true),
                      text: "Requêtes Standards",
                      onUpdate: (value, origin, state) => {
                        if (origin != "pubsub") {
                          state.pubsub.publish("irc", {"message": "!toggle"}, "twitch", cookies.methods.getCookie("access_token"))
                        }
                      }
                    },
                    vipOpen: {
                      name: "vip-open",
                      value: cookies.methods.getCookieOrDefault("vip-open", true, true),
                      text: "Requêtes VIP",
                      onUpdate: (value, origin, state) => {
                        if (origin != "pubsub") {
                          state.pubsub.publish("irc", {"message": "!viptoggle"}, "twitch", cookies.methods.getCookie("access_token"))
                        }
                      }
                    }
                  },
                  userLevel: 2
                },
                regular: {
                    fields: {
                      requestForm: {
                        name: "options-request-form",
                        value: cookies.methods.getCookieOrDefault("options-request-form", true, true),
                        text: "Formulaire de request"
                      },
                      lightmixCooldown: {
                        name: "options-lightmix-cooldown",
                        value: cookies.methods.getCookieOrDefault("options-lightmix-cooldown", true, true),
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
                        value: cookies.methods.getCookieOrDefault("options-dark-theme", true, true),
                        text: "Mode sombre",
                        onUpdate: (value) => {
                          document.body.classList.toggle("dark-theme", value)

                        }
                      }
                    },
                    userLevel: 1
                },
                moderator: {
                  fields: {
                    adminTools: {
                      name: "options-admintools",
                      value: cookies.methods.getCookieOrDefault("options-admintools", true, true),
                      text: "Raccourcis de modération"
                    },
                    streamerTheme: {
                      name: "options-streamer-theme",
                      value: cookies.methods.getCookieOrDefault("options-streamer-theme", false, true),
                      text: "Mode Streamer",
                      onUpdate: (value) => {
                        document.body.classList.toggle("streamer-theme", value)
                      }
                    },
                    moreInfo: {
                      name: "options-more-info",
                      value: cookies.methods.getCookieOrDefault("options-more-info", false, true),
                      text: "Plus d'infos",
                    },
                    moreTags: {
                      name: "options-more-tags",
                      value: cookies.methods.getCookieOrDefault("options-more-tags", true, true),
                      text: "Plus de tags",
                    }
                  },
                  userLevel: 2
                }
            }
        }
    },
    mutations: {
        updateForcedOptions(state, data) {
          state.forcedOptions = data
        },
        updateOption(state, {value, name, origin}) {
            for (let category in state.options) {
                if (state.options[category].fields.hasOwnProperty(name)){
                    state.options[category].fields[name].value = value
                    if (state.options[category].fields[name].hasOwnProperty("onUpdate")){
                        state.options[category].fields[name].onUpdate(value, origin, state)
                    }
                }
            }
        },
        updateUserData(state, data) {
          state.userData = data
        },
        updateIdentity(state, data) {
          state.identity = data
        },
        updatePlaylistState(state, data) {
          state.playlistState = data
          
        },
        toggleShowOptions(state, forceState) {
          if (forceState == undefined) {
            state.showOptions = !state.showOptions
            return
          }
          state.showOptions = forceState
        }
    },
    actions: {
        init(context) {
          context.dispatch("addHandler", ["playlist_state", (e) => { 
            context.commit("updatePlaylistState", e.message);
            context.dispatch("handlePlaylistStateUpdate", e.message)
          }])
          context.dispatch("subscribe", ["playlist_state"])
        },
        handlePlaylistStateUpdate(context, data) {
          console.log(data)
          if (data.Standard != this.getters.option("regularOpen")) {
              context.commit("updateOption", {name: "regularOpen", value:data.Standard, origin:"pubsub"})
          }
          if (data.VIP != this.getters.option("vipOpen")) {
            context.commit("updateOption", {name: "vipOpen", value:data.VIP, origin:"pubsub"})
          }
        },
        setIdentity(context, token) {
          // Checking if token is valid
          let headers = {"Authorization": `Bearer ${token}`};
          fetch("https://id.twitch.tv/oauth2/validate", {headers})
          .then(response => response.json())
          .then(data => {
            // Check if there's a client ID in response
            if (!data.hasOwnProperty("client_id")) {
                throw new Error("Session invalide. Loggez-vous à nouveau. Si le problème persiste, contactez un administrateur")
            }
            // Check If client ID corresponds to the app
            if (data.client_id != context.state.clientId) {
              throw new Error("Session invalide, car delivrée par une application tierce.")
            }
            context.commit("updateIdentity", data)
            cookies.methods.setCookie("access_token", token)
            return data
          })
          // Getting User Infos
          .then((user) => {
              headers["Client-Id"] = context.state.clientId
              fetch(`https://api.twitch.tv/helix/users?id=${user.user_id}`, {headers})
              .then(request => request.json())
              .then(data => {
                  context.commit("updateUserData", data["data"][0])
              })
            }
          )
        },
        setStartupTheme(context) {
            document.body.classList.toggle("dark-theme", context.getters.option('darkTheme'))
            document.body.classList.toggle("streamer-theme", context.getters.option('streamerTheme'))
            setTimeout(() => document.body.classList.add("animate-bg"), 100)
        },
        subscribe(context, payload) {
            this.state.pubsub.subscribe(payload)
        },
        publish(context, payload) {
            this.state.pubsub.publish(...payload)
        },
        addHandler(context, payload) {
            this.state.pubsub.addHandler(...payload)
        },
        disconnect(context) {
          // TODO showOption to state this.showOptions = false
          cookies.methods.setCookie("access_token", null)
          context.commit("updateIdentity", null)
          context.commit("updateUserData", null)
          context.commit("toggleShowOptions", null)
        },
        sendCommand(context, cmd) {
            context.dispatch("publish", ["irc", {"message": cmd}, "twitch", cookies.methods.getCookie("access_token")])
        }
    },
    getters: {
      option: (state) => (fieldName) => {
          for (let option in state.forcedOptions) {

            if (fieldName == option) {
              return state.forcedOptions[option]
            }
          }
          for (let category in state.options) {
              if (state.options[category].fields.hasOwnProperty(fieldName)){
                  return state.options[category].fields[fieldName].value
              }
          }
      },
      userLevel: (state) => {
        if (state.identity == null) {
            return 0
        }
        if (state.moderators.includes(state.identity.login)) {
            return 2
        }
        return 1
      }
    }
})