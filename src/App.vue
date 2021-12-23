<template>
  <!-- OPTIONS -->
  <transition name="fade"> 
    <div @click="showOptions = False" v-if="showOptions" class="options-veil"></div>
  </transition>
  <transition name="slide">
    <div v-if="showOptions" class="options-menu text-light">
      <div class="d-flex align-items-center m-3">
        <button @click="showOptions = False" type="button" class="btn-close btn-close-white" aria-label="Close"></button>
        <h4 class="m-0 ms-2">Options</h4>
      </div>
      <div class="m-3">
        <hr>
        <option-item id="options-request-form" name="Formulaire de Request" v-model="options.regular.requestForm"/>
        <option-item id="options-lightmix-cooldown" name="Temps de recharge LightMix" v-model="options.regular.lightmixCooldown"/>
        <hr>
        <option-item id="options-search" name="Recherche" v-model="options.moderator.search"/>
        <option-item id="options-admintools" name="Outils de modération" v-model="options.moderator.adminTools"/>
        <hr>
        <div class="d-flex justify-content-center">
            <button type="button" class="btn btn-danger">Déconnexion</button>
        </div>
      </div>
   </div>
  </transition>
  <!-- OPTIONS END -->
  <Navigation @toggleOptions="showOptions = !showOptions" :identity="identity" :userLevel="userLevel" :userData="userData" />
  <router-view :options="options"/>
</template>

<script>
import Navigation from "./components/NavigationElements/Navigation.vue"
import OptionItem from './components/Options/Option.vue'
import UrlUtils from './mixins/UrlUtils.vue'

export default {
  data() {
    return {
        identity: null,
        userData: null,
        devTools: false,
        showOptions: true,
        options: {
            regular: {
                requestForm: true,
                lightmixCooldown: false,
            },
            moderator: {
                search: false,
                devTools: false,
                adminTools: true
            }
        }
    }
  },
  components: {Navigation, OptionItem},
  mixins: [UrlUtils],
  computed: {
      userLevel() {
        if (this.identity == null) {
            return 0
        }
        if (this.moderators.includes(this.identity.login)) {
            return 2
        }
        return 1
      }
  },
  methods: {
    showError(errorText) {
      return "NOT IMPLEMENTED"
    },
    setIdentity(token) {
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
        if (data.client_id != this.clientId) {
          throw new Error("Session invalide, car delivrée par une application tierce.")
        }
        this.identity = data
        this.setCookie("access_token", token)
        return data
      })
      // Getting User Infos
      .then((user) => {
          headers["Client-Id"] = this.clientId
          fetch(`https://api.twitch.tv/helix/users?id=${user.user_id}`, {headers})
          .then(request => request.json())
          .then(data => {
              this.userData = data["data"][0]
          })
        }
      )
      .catch(error => {
          // Error Management TODO
          this.showError(error.message)
      })
    }
  },
  beforeMount() {
    let token = this.getHashValue("access_token")

    if (token == null) {
        token = this.getCookie("access_token")
    }
    // Managing session
    if (token != null) {
      // Validating Session
      console.log("Setting ID")
      this.setIdentity(token)
    }
  }
}
</script>

<style>
/**
body::before {
  content: "xs";
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999999;
  background-color: #000;
  color: #fff;
}
@media (min-width : 768px) { body::before { content: "sm"; }}
@media (min-width : 992px) { body::before { content: "md"; }}
@media (min-width : 1200px) { body::before { content: "lg"; }}
*/ 


.options-veil {
    position:fixed;
    z-index: 2;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.5);

}

.options-menu {
    position:absolute;
    z-index: 2;
    left: calc(100% - 300px);
    min-height: 100vh;
    width: 300px;
    background: rgba(0,0,0,0.75);
}

/* VEIL APPARITION ANIMATION */

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
.fade-enter-to, .fade-leave-from {
    opacity: 1;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s ease
}

/* OPTION MENU ANIMATION */

.slide-enter-from, .slide-leave-to {
    left: 100%;
}

.slide-enter-to, .slide-leave-from {
    left: calc(100% - 300px);
}

.slide-enter-active, .slide-leave-active {
    transition: left 0.5s ease;
}

</style>