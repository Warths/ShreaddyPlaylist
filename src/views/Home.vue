<template>
<!-- ALL MUSIC CARDS -->
    <div v-if="options.moderator.devTools && userLevel" class="d-flex justify-content-around">
        <div>
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
            <card class="playlist-item" v-for="(content) in list" 
            :song="content" :key="content.id" 
            :showPanel="options.moderator.adminTools" 
            :userLevel="userLevel"/>
        </transition-group>
    </div>
    
</template>

<script>
import card from "../components/RequestCard/RequestCard.vue"

export default {
    data() {
        return {
            list: [],
            playlistLocation: "https://api.warths.fr/shreaddy/playlist/",
            identity: null
        }
    },
    methods: {
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
        // Setting App to update regularly
        history.replaceState(null, null, ' ');
        this.update()
        setInterval(this.update.bind(this), 1000)    

    },
    components: {card},
    props: ["options", "userLevel"]
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

