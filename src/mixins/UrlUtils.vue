<script>
export default {
    methods: {
         getHashValue(key) {
            let urlParams = new URLSearchParams(window.location.hash.replace("#","?"));
            return urlParams.get(key);
        }
    }
}
</script>