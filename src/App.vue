<template>
  <Navigation/>
  <router-view/>
</template>

<script>
import Navigation from "./components/Navigation.vue"
import UrlUtils from './mixins/UrlUtils.vue'

export default {
  components: {Navigation},
  mixins: [UrlUtils]
}
</script>

<style>
body::before {
  content: "xs";
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999999;
  background-color: #000;
  color: #fff;
}
@media (min-width : 768px) { body::before { content: "sm"; }}
@media (min-width : 992px) { body::before { content: "md"; }}
@media (min-width : 1200px) { body::before { content: "lg"; }}
</style>