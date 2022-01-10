<template>
    <div class="btn-group pt-1">
        <button type="button" class="btn btn-primary dropdown-toggle bg-purple border-0 p-1 px-2" data-bs-toggle="dropdown" aria-expanded="false">{{ text }}</button>
        <ul class="dropdown-menu">
            <li v-for="(choice, i) in choices" :key="i"><a @click="$emit('sendCommand', formatCommand(choice[0]))" class="dropdown-item" href="#">{{ choice[1] }}</a></li>
        </ul>
    </div>
</template>

<script>
export default {
    methods: {
        formatCommand(choice) {
            let cmd = this.command
            cmd = cmd.replace("%choice%", choice)
            for (let key in this.song) {
                if (typeof(this.song[key] == "object")) {
                    for (let subkey in this.song[key]) {
                        cmd = cmd.replace(`%${key}.${subkey}%`, this.song[key][subkey])
                    }
                } else {
                    cmd = cmd.replace(`%${key}%`, this.song[key])
                }
            }
            console.log(cmd)
            return cmd
        }
    },
    computed: {
        dangerClass() {
            return this.danger ? "btn-danger" : ""
        }
    },
    emits: ["sendCommand"],
    props: ["song", "text", "command", "danger", "choices"]
}
</script>
