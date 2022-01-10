<template>
<div class="w-100 p-2">
    <div class="card shadow shadow-stronger-hover rounded-frame-1" :class="tagClasses">
        <div class="card-body d-flex flex-column pt-1 pb-2">
            <!-- QUICK BUTTONS -->
            <transition name="fade">
                <div v-if="adminPanelVisible" class="d-flex flex-wrap gap-1">
                        <admin-button v-on:sendCommand="(e) => $emit('sendCommand', e)" text="Play" :song="song" command="!play %id%"/>
                        <admin-button v-on:sendCommand="(e) => $emit('sendCommand', e)" text="Freeze" :song="song" command="!freeze %id%"/>
                        <!-- Custom Dropdown button-->
                        <admin-button-drop-down v-on:sendCommand="(e) => $emit('sendCommand', e)" text="Boost" :song="song" command="!boost %requester.displayName% %choice%" :choices="[[50, '+50%'], [100, '+100%'], [200, '+200%']]"/>

                        <admin-button v-on:sendCommand="(e) => $emit('sendCommand', e)" text="Preview" :song="song" command="!function %id%"/>

                        <admin-button v-on:sendCommand="(e) => $emit('sendCommand', e)" class="ms-auto" text="Delete" :song="song" command="!delete %id%" :danger="true"/>
                        <admin-button v-on:sendCommand="(e) => $emit('sendCommand', e)" text="Banlist" :song="song" command="!banlist %artist% ; %song% ; %reason%" :danger="true"/>
                </div>
            </transition>
            <tag-list :class="tagWrapperClass" :tags="song.tags"/>
            <div class="w-100 justify-content-between d-flex flex-wrap" :class="foldClass">
                <div class="d-flex flex-column mw-100">
                    <base-row class="fs-animated fs-4" style="min-width: 0" :text="song.title"/>
                    <base-row class="fs-animated fs-5" :text="song.artist"/>
                </div>
                <requester-row class="ms-auto" :requester="song.requester" :darkTheme="darkTheme"/>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import TagList from "./TagList.vue"
import RequesterRow from "./RequesterRow.vue"
import BaseRow from "./BaseRow.vue"
import AdminButton from "./AdminButton.vue"
import AdminButtonDropDown from './AdminButtonDropDown.vue'

export default {
    computed: {
        foldClass() {
            return this.fold ? "" : "flex-column"
        },
        tagClasses() {
          let classes = []
          for (let tag of this.song.tags) {
              if (tag.hasOwnProperty('class')) {
                  classes.push(tag.class)
              }
          }
          return classes.join(" ")
        },
        adminPanelVisible() {
            return this.showPanel && this.userLevel == 2
        },
        tagWrapperClass() {
            return this.adminPanelVisible ? "py-1" : "py-2 pb-1"
        }
    },
    props: ["song", "showPanel", "userLevel", "darkTheme", "fold"],
    emits: ["sendCommand"],
    components: {TagList, RequesterRow, BaseRow, AdminButton, AdminButtonDropDown}
}
</script>

<style scoped>

.card {
    transition:background 1s;
    border-radius: 0.4em;
}
@keyframes vip {
    0% {
        background-position-x: 0em;
    }
    100% {
        background-position-x: 10em;
    }
}


.dark-theme .card {
    background:rgb(43, 43, 43)
}
.streamer-theme .card {
    background-color: #00000080
}
.VIP,
.dark-theme .VIP,
.streamer-theme .VIP {
    background-color: #f8eba7;
    background-image: url("https://playlist.warths.fr/images/background_VIP_Alpha.png");
    background-size: 10em;
    background-blend-mode: multiply;
    animation: vip linear infinite 5s;
}

.dark-theme .VIP {
    background-color: rgb(58, 58, 58);

}

.streamer-theme .VIP {
    background-color: #b9884752
}


.dark-theme.VIP
.fs-animated {
    transition: font-size 1s;
}

.streamer-theme .fs-4{
    font-size: 2.2em !important
}
.streamer-theme .fs-5{
    font-size: 1.7em !important
}
.tags, .btn {
    transition: padding 1s ease;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 1s ease;
  overflow:hidden;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  max-height:0;
  transform: scale(1, 0)
}

.fade-enter-to,
.fade-leave-from {
    max-height:50px
}
</style>

