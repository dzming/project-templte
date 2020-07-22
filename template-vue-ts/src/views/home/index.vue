<template>
  <div :class="$style.page_wrap">
    Home Page
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "page",
  components: {},
})
export default class Ipage extends Vue {
  /* Data */
  private index = undefined;

  /* Computed */
  // get myIndex() {return ''}

  /* Hook */
  private created() {
    console.log("111", 111);
  }
  private mounted() {}

  /* Function */
  private myFun() {}
}
</script>

<style lang="scss" module>
.page_wrap {
}
</style>
