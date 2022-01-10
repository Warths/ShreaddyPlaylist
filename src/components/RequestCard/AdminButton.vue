<template>
    <div class="pt-1">
        <button type="button" @click="$emit('sendCommand', formatCommand())" class="btn btn-primary bg-purple border-0 p-1 px-2" :class="dangerClass">{{ text }}</button>
    </div>
</template>

<script>
export default {
    methods: {
        formatCommand() {
            let cmd = this.command
            for (let key in this.song) {
                if (typeof(this.song[key] == "object")) {
                    for (let subkey in this.song[key]) {
                        cmd = cmd.replace(`%${key}.${subkey}%`, this.song[key][subkey])
                    }
                } else {
                    cmd = cmd.replace(`%${key}%`, this.song[key])
                }
            }
            return cmd
        }
    },
    computed: {
        dangerClass() {
            return this.danger ? "btn-danger" : ""
        }
    },
    emits: ["sendCommand"],
    props: ["song", "text", "command", "danger"]
}
</script>
