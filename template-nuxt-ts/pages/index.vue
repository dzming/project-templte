<template>
  <div :class="$style.container">
    <div>
      <logo />
      <div>
        <nuxt-link :to="switchLocalePath('en')">English</nuxt-link>
        <nuxt-link :to="switchLocalePath('zh')">中文</nuxt-link>
      </div>
    </div>
    <h1>{{ $t('title') }}</h1>
    <!-- <span>{{ $t('homePage1')}}</span> -->
    <span>{{ $t('homePage.components.name.a')}}</span>
  </div>
</template>

<script lang="ts">
import Logo from "~/components/Logo.vue";
import { Vue, Component, Prop } from "nuxt-property-decorator";

interface User {
  firstName: string;
  lastName: number;
}

@Component({
  components: {
    Logo
  }
})
export default class Index extends Vue {
  @Prop({ type: Object, required: false }) readonly user!: User;

  private message: string = "This is a message";

  private get fullName(): string {
    return `${this.user.firstName} ${this.user.lastName}`;
  }
  private get title(): string {
    return this.$t.title;
  }
  private onClick() {
    console.log('Clicked');
  }
}
</script>

<style lang="scss" module>
.container {
  color: $--color-primary;
  margin: 0 auto;
  min-height: 100vh;
  width: 0;
  font-size: 20px;
  height: 100px;
}

</style>
