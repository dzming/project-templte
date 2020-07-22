<template>
  <div :class="style.footer_wrap"></div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component
export default class Ifooter extends Vue {
  private index = 0;

  private created() {}

  private mounted() {}
}
</script>

<style module>
.footer_wrap {
  z-index: inherit;
  position: static;
  width: inherit;
  height: inherit;
  font-size: inherit;
  color: inherit;
}
</style>
