<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      Hello {{ username || 'World' }} !
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'

@Component({
  name: 'Home'
})
export default class extends Vue {
  get username() {
    return UserModule.username
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
