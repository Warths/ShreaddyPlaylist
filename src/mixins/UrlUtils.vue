<script>
export default {
    methods: {
        getHashValue(key) {
            let urlParams = new URLSearchParams(window.location.hash.replace("#","?"));
            return urlParams.get(key);
        },
        toAbsolute(url, domain=window.location.href) {
            if (url.startsWith("https://") || url.startsWith("http://")) {
                return url
            } else {
                return `${domain}/${url}`
            }
        }
    }
} 
</script>