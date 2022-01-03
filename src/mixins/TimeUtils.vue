<script>
export default {
    methods: {
        ellapsedTimeFrom(basis) {
            return Date.now() - basis
        },
        durationToText(duration, omitSeconds=True) {
            // converting duration from milliseconds to seconds
            let seconds = Math.floor(duration / 1000)
            let minutes = Math.floor(seconds / 60) % 60
            let hours = Math.floor(seconds / 60 / 60)
            let text = ""
            text += `${hours}h ${minutes}min`
            if (!omitSeconds) {
                text += ` ${seconds % 60}s`
            }
            return text
        },
        durationFromEllapsedText(basis, omitSeconds=true) {
            return this.durationToText(this.ellapsedTimeFrom(basis), omitSeconds)
        }
    }
}
</script>
