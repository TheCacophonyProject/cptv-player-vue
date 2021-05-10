<template>
  <div id="app">
    <CptvPlayer stand-alone="true" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CptvPlayer from "@/CptvPlayer.vue";

export default Vue.extend({
  name: "App",
  components: {
    CptvPlayer,
  },
});
</script>

<style lang="scss">
#app,
body {
  //font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  font-feature-settings: "kern" 1;
  -moz-font-feature-settings: "kern";
  -moz-font-feature-settings: "kern=1";
  font-kerning: normal;
  color: #2c3e50;
  background: #111;
  display: flex;
  justify-content: center;
  width: 100%;
  > .cptv-player {
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 7px;
    margin: 10px;
    > .tracks-container {
      margin-bottom: 0;
    }
  }
}
</style>
