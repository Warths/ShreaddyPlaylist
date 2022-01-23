<template>
    <!-- CMD Button-->
    <div v-if="typeof(action) == 'string'" class="pt-1" :class="this.class">
        <button type="button" @click="sendCommand(formatCommand(this.action))" class="btn btn-primary bg-purple border-0 p-1 px-2">{{ text }}</button>
    </div>
    <!-- Action Button -->
    <div v-else-if="typeof(action) == 'function'" class="pt-1" :class="this.class">
        <button type="button" @click="action()" class="btn btn-primary bg-purple border-0 p-1 px-2">{{ text }}</button>
    </div>
    <!-- Group Button -->
    <div v-else-if="typeof(action) == 'object'" class="btn-group pt-1" :class="this.class">
        <button type="button" class="btn btn-primary dropdown-toggle bg-purple border-0 p-1 px-2" data-bs-toggle="dropdown" aria-expanded="false">{{ text }}</button>
        <ul class="dropdown-menu">
            <li v-for="(choice, i) in action.choices" :key="i"><a @click="sendCommand(formatCommand(this.action.cmd, choice[0]))" class="dropdown-item" href="#">{{ choice[1] }}</a></li>
        </ul>
    </div>
</template>

<script>
import { mapActions} from "vuex"
export default {
    methods: {
        ...mapActions(["sendCommand"]),
        formatCommand(cmd, choice) {
            cmd = cmd.replace("%choice%", choice)
            for (let key in this.song) {
                if (typeof(this.song[key]) == "object") {
                    for (let subkey in this.song[key]) {
                        console.log(key, subkey)
                        cmd = cmd.replace(`%${key}.${subkey}%`, this.song[key][subkey])
                    }
                } else {
                    cmd = cmd.replace(`%${key}%`, this.song[key])
                }
            }
            return cmd
        }
    },
    props: ["song", "text", "danger", "action", "class"]
}
</script>

<style scoped>
.danger > .btn {
    background-color: #dc3545 !important
}
</style>