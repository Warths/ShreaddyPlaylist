<script>
export default {
    methods: {
        luminance(r, g, b) {
            var a = [r, g, b].map(function (v) {
                v /= 255;
                return v <= 0.03928
                    ? v / 12.92
                    : Math.pow( (v + 0.055) / 1.055, 2.4 );
            });
            return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
        },
        contrast(rgb1, rgb2) {
            var lum1 = this.luminance(rgb1[0], rgb1[1], rgb1[2]);
            var lum2 = this.luminance(rgb2[0], rgb2[1], rgb2[2]);
            var brightest = Math.max(lum1, lum2);
            var darkest = Math.min(lum1, lum2);
            return (brightest + 0.05) / (darkest + 0.05);
        },
        RGBfromHex(hex) {
            if (hex.startsWith("#")) {
                hex = hex.replace("#", "")
            }
            let r = parseInt(hex.slice(0,2), 16)
            let g = parseInt(hex.slice(2,4), 16)
            let b = parseInt(hex.slice(4,6), 16)
            console.log([r,g,b])
            return [r,g,b]
        },
        contrastHex(hex1, hex2) {
            return this.contrast(this.RGBfromHex(hex1), this.RGBfromHex(hex2))
        }
    }
} 
</script>