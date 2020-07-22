import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";

interface IUserInfo {
  username: string;
  avatar: string;
}

@Module({
  stateFactory: true
})
export default class User extends VuexModule {
  private userInfo: IUserInfo | null = null; // initialise empty for now
  // @Mutation
  // fetchUserInfo(userInfo) {
  //     this.userInfo = userInfo;
  // }
  // @Action({commit: 'fetchUserInfo'})
  // async function getUserInfo() {
  //   return xxxx;
  // }
}
