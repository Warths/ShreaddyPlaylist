<template>
<!-- ALL MUSIC CARDS -->
    <div class="d-flex justify-content-around">
        <div>
            <button @click="togglePanel">{{ showPanel ? "Show Panel": "Hide Panel"}}</button>
            <button @click="clicked">Reverse</button>
            <button @click="addItem">Add</button>
            <button @click="removeFirstItem">Remove First</button>
            <button @click="removeLastItem">Remove Last</button>
            <button @click="shuffleItems">Shuffle</button>
        </div>
    </div>
    <div class="playlist m-auto">
        <p class="fw-bold text-end m-0 p-2" key="heading">Il y a {{list.length}} musiques dans la playlist</p>
        <transition-group name="playlist" tag="div" class="playlist position-relative">
            <card class="playlist-item" v-for="(content) in list" :song="content" :key="content.id" :showPanel="showPanel"/>
        </transition-group>
    </div>
</template>

<script>
import card from "../components/RequestCard.vue"

export default {
    data() {
        return {
            list: [],
            showPanel: false,
            playlistLocation: "https://api.warths.fr/shreaddy/playlist/"
        }
    },
    methods: {
        togglePanel() {
            this.showPanel = !this.showPanel
        },
        clicked() {
            this.list = this.list.reverse();
        },
        addItem() {
            this.list.push(this.list.length + 1);
        },
        removeFirstItem() {
            this.list.shift() ;
        },
        removeLastItem() {
            this.list.pop()
        },
        shuffleItems() {
            this.list = this.list.sort((a, b) => 0.5 - Math.random())
        },
        update() {
            fetch(this.playlistLocation).then(
                request => request.json()
            ).then(data => this.list = data)
        }
    },
    mounted() {
        setInterval(this.update.bind(this), 1000)
        if (this.getHashValue("access_token") == null) {}
    },
    components: {card}
}

</script>

<style scoped>
.playlist {
    max-width: 800px;
}

.playlist-item {
  transition: all 0.5s
}

.playlist-enter-from, .playlist-leave-to
{
  opacity: 0;
  transform: scale(0.96);
}

.playlist-leave-active {
    position:absolute;
}

</style>

