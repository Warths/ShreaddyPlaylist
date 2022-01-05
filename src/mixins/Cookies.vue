<script>
export default {
    methods: {
        setCookie(key, value, daysBeforeExpire=1000) {
            const date = new Date();
            date.setTime(date.getTime() + (daysBeforeExpire*24*60*60*1000));
            let expires = "expires="+ date.toUTCString();
            document.cookie = key + "=" + value + ";" + expires + ";path=/";
        },
        getCookie(cname) {
            let name = cname + "=";
            let decodedCookie = decodeURIComponent(document.cookie);
            let ca = decodedCookie.split(';');
            for(let i = 0; i <ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    let cookie = c.substring(name.length, c.length);
                    if (cookie == "null") {
                        return null
                    }
                return cookie
                }
            }
            return null;
        }, 
        getCookieOrDefault(cname, defaultValue, forceBoolean=false) {
            let cookie = this.getCookie(cname)
            if (cookie == null) {
                return defaultValue
            }
            if (forceBoolean) {
                return cookie == "true"
            }
            return cookie
        }
    }
} 
</script>