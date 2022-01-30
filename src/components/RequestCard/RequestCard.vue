<template>
<div class="w-100 p-2">
    <div class="card shadow shadow-stronger-hover rounded-frame-1" :class="tagClasses">
        <div class="card-body d-flex flex-column pt-1 pb-2">
            <!-- QUICK BUTTONS -->
            <transition name="fade">
                <div v-if="adminPanelVisible" class="d-flex flex-wrap gap-1">
                        <admin-button 
                            v-for="(button, i) of spec" 
                            :text="button.text" 
                            :song="song" 
                            :action="button.action" 
                            :class="button.style"                        
                            :key="i"
                        />
                </div>
            </transition>
            <div class="d-flex gap-2">
                <div v-if="this.option('moreInfo')" class="d-flex flex-column w-50 py-1 overflow-hidden">
                    <tag-list class="ms-auto overflow-hidden " :tags="song.admin.tags"/>
                    <div class="w-100 justify-content-between d-flex flex-column">
                        <div class="d-flex flex-column mw-100 pe-1">
                            <base-row class="fs-animated opacity-0 fs-4" :text="song.admin.title"/>
                            <base-row class="text-end fs-animated fs-5" :text="song.admin.artist"/>
                        </div>
                        <div v-if="!option('foldPlaylist')" class="position-relative clip-to-right w-100 guitars">
                            <div class="d-flex">
                                <requester-row class="pe-1" :requester="song.admin.requester"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-flex flex-column py-1" :class="this.option('moreInfo') ? 'w-50' : 'w-100'">
                    <tag-list :tags="mergeTags ? merged : song.public.tags"/>
                    <div class="w-100 justify-content-between d-flex" :class="foldClass">
                        <div class="d-flex flex-column mw-100" style="min-width: 0">
                            <base-row class="fs-animated fs-4" :text="song.public.title"/>
                            <base-row class="fs-animated fs-5" :text="song.public.artist"/>
                        </div>
                        <div class="d-flex align-items-end">
                            <requester-row class="ms-auto" :requester="song.public.requester"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapGetters } from "vuex"
import TagList from "./TagList.vue"
import RequesterRow from "./RequesterRow.vue"
import BaseRow from "./BaseRow.vue"
import AdminButton from "./AdminButton.vue"

export default {
    data() {
        return {
            spec: [
                {
                    text: "Jouer",
                    action: "!playing %id%",
                },
                {
                    text: "Geler",
                    action: "!freeze %id%",
                },
                {
                    text: "Boost",
                    action: {
                        cmd: "!boost %id% %choice%",
                        choices: [
                            [50, '+50%'], 
                            [100, '+100%'], 
                            [200, '+200%']
                        ]
                    }
                },
                // {
                //     text: "Preview",
                //     action: () => "prout"
                // },
                {
                    text: "Supprimer",
                    action: "!delete %id%",
                    style: "ms-auto danger"
                },
                {
                    text: "Banlist",
                    action: {
                        cmd: "!banlist %artist% ; %title% ; %choice%",
                        choices: [
                            ["mauvaise qualité audio", "Audio"],
                            ["genre hors-règles", "Genre"],
                            ["difficulté trop élevée", "Difficulté"],
                            ["accordage ou diapason non couvert", "Accordage"],
                            ["Mauvaise partition", "Charte"],
                            ["raisons techniques", "Autre"]
                        ]
                    },
                    style: "danger reverse-dropdown"
                }
            ]
        }
    },
    computed: {
        ...mapGetters(["option", "userLevel"]),
        mergeTags() {
            return this.option("moreTags") && !this.option('moreInfo') && this.userLevel > 1
        },
        merged() {
            if (this.song.public.id == "titix3887030703456") {
                return this.song.admin.tags.concat(this.song.public.tags)
            }
            return this.song.public.tags.concat(this.song.admin.tags)

        },
        foldClass() {
            return this.option("foldPlaylist") ? "" : "flex-column"
        },
        tagClasses() {
          let classes = []
          for (let tag of this.song.public.tags) {
              if (tag.hasOwnProperty('class')) {
                  classes.push(tag.class)
              }
          }
          return classes.join(" ")
        },
        adminPanelVisible() {
            return this.option("adminTools") && this.userLevel == 2
        },
        tagWrapperClass() {
            return this.adminPanelVisible ? "py-1" : "py-2 pb-1"
        }
    },
    props: ["song"],
    components: {TagList, RequesterRow, BaseRow, AdminButton}
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
    font-size: 2.2em !important;
}
.streamer-theme .fs-5{
    font-size: 1.9em !important;
    margin-top: -0.2em;
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

.basis-50 {
    flex-basis: 50%;
}

.clip-to-right {
    position:relative;
    overflow-x:hidden;
}


.clip-to-right > * {
    position: absolute;
    right:0;
}

.guitars {
    transition: height 1s;
    height: 28px
}

.streamer-theme .guitars {
    height: 42px;
}
</style>

