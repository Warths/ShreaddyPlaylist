<template>
<div class="w-100 p-2">
    <div class="card shadow shadow-stronger-hover rounded-frame-1">
        <div class="card-body d-flex flex-column pt-1 pb-2">
            <!-- QUICK BUTTONS -->
            <transition name="fade">
                <div v-if="showPanel" class="d-flex flex-wrap gap-1">
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
            <base-row class="fs-4" :text="song.title"/>
            <base-row class="fs-5" :text="song.artist"/>
            <requester-row :requester="song.requester"/>
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
        tagWrapperClass() {
            return this.showPanel ? "py-1" : "py-2 pb-1"
        }
    },
    props: ["song", "showPanel"],
    components: {TagList, RequesterRow, BaseRow}
}
</script>

<style scoped>



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

