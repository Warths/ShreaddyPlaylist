<template>
<div class="w-100 p-2">
    <div class="card shadow shadow-stronger-hover rounded-frame-1" :class="tagClasses">
        <div class="card-body d-flex flex-column pt-1 pb-2">
            <!-- QUICK BUTTONS -->
            <transition name="fade">
                <div v-if="adminPanelVisible" class="d-flex flex-wrap gap-1">
                        <div class="pt-1"><button type="button" class="btn btn-primary bg-purple border-0 p-1 p-sm-2">Play</button></div>
                        <div class="pt-1"><button type="button" class="btn btn-primary bg-purple border-0 p-1 p-sm-2">Freeze</button></div>
                        <!-- Custom Dropdown button-->
                        <div class="btn-group pt-1">
                            <button type="button" class="btn btn-primary dropdown-toggle bg-purple border-0 p-1 p-sm-2" data-bs-toggle="dropdown" aria-expanded="false">Boost</button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">+50%</a></li>
                                <li><a class="dropdown-item" href="#">+100%</a></li>
                                <li><a class="dropdown-item" href="#">+250%</a></li>
                            </ul>
                        </div>
                        <div class="pt-1"><button type="button" class="btn btn-primary bg-purple border-0 p-1 p-sm-2">Preview</button></div>

                        <div class="pt-1 ms-auto"><button type="button" class="btn btn-danger bg-purple border-0 p-1 p-sm-2">Delete</button></div>
                        <div class="pt-1"><button type="button" class="btn btn-danger bg-purple border-0 p-1 p-sm-2">Banlist</button></div>
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
    components: {TagList, RequesterRow, BaseRow}
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
    font-size: 2em !important
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

