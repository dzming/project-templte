<template>
  <div :class="style.header_wrap"></div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component
export default class Iheader extends Vue {
  private index = 0;

  private created() {}

  private mounted() {}
}
</script>

<style module>
.header_wrap {
  z-index: inherit;
  position: static;
  width: inherit;
  height: inherit;
  font-size: inherit;
  color: inherit;
}
</style>
