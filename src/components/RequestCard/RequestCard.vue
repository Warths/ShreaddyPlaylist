<template>
<div class="w-100 p-2">
    <div class="card shadow shadow-stronger-hover rounded-frame-1">
        <div class="card-body d-flex flex-column pt-1 pb-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <!-- QUICK BUTTONS -->
            <transition name="fade">
                <div v-if="showPanel" class="d-flex justify-content-between flex-wrap">
                    <div class="card-text me-1">
                        <button type="button" class="btn btn-primary bg-purple border-0 mt-1 me-1 modal-cancel" data-bs-toggle="modal" data-bs-target="#exampleModal">Play</button>
                        <button type="button" class="btn btn-primary bg-purple border-0 mt-1 me-1  modal-cancel" data-bs-toggle="modal" data-bs-target="#exampleModal">Freeze</button>
                        <!-- Custom Dropdown button-->
                        <div class="btn-group modal-cancel" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <button type="button" class="btn btn-primary dropdown-toggle bg-purple border-0 mt-1 me-1 modal-cancel" data-bs-toggle="dropdown" aria-expanded="false">Boost</button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">+50%</a></li>
                                <li><a class="dropdown-item" href="#">+100%</a></li>
                                <li><a class="dropdown-item" href="#">+250%</a></li>
                            </ul>
                        </div>

                        <button type="button" class="btn btn-primary bg-purple border-0 mt-1 me-1  modal-cancel" data-bs-toggle="modal" data-bs-target="#exampleModal">Preview</button>
                    </div>
                    <div class="card-text">
                        <button type="button" class="btn btn-danger border-0 mt-1 me-1 modal-cancel" data-bs-toggle="modal" data-bs-target="#exampleModal">Delete</button>
                        <button type="button" class="btn btn-danger border-0 mt-1 modal-cancel" data-bs-toggle="modal" data-bs-target="#exampleModal">Banlist</button>
                    </div>
                </div>
            </transition>
            <!-- TAGS -->
            <div :class="tagWrapperClass">
                <request-tag v-for="tag in song.tags" :tag="tag" :key="tag.id"/>
            </div>
            <base-row class="fs-4" :text="song.title"/>
            <base-row class="fs-5" :text="song.artist"/>
            <requester-row :requester="song.requester"/>
        </div>
    </div>
</div>
</template>

<script>
import RequestTag from "./Tag.vue"
import RequesterRow from "./RequesterRow.vue"
import BaseRow from "./BaseRow.vue"

export default {
    computed: {
        tagWrapperClass() {
            return this.showPanel ? "tags d-flex py-1" : "tags d-flex py-2"
        }
    },
    props: ["song", "showPanel"],
    components: {RequestTag, RequesterRow, BaseRow}
}
</script>

<style scoped>



.tags {
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

