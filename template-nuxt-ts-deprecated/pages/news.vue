<template>
  <div class="container">
    <h1>{{data}}</h1>
  </div>
</template>

<script lang="ts">
import Logo from "~/components/Logo.vue";
import { Vue, Component, Prop } from "nuxt-property-decorator";
import { news } from "~/api/index";

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

  private asyncData() {
    return news.getNews().then((res: any) => {
      return { data: res };
    });
  }
  private created() {
  }
  private message: string = "This is a message";

  private get fullName(): string {
    return `${this.user.firstName} ${this.user.lastName}`;
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
}

</style>
