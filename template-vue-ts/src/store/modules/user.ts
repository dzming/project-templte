import {
  VuexModule,
  Module,
  MutationAction,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";
import { getToken, setToken, removeToken } from "@/utils/auth";
import store from "@/store";

export interface IUserState {
  userToken: string | undefined;
}
interface ISetUserInfo {
  userToken: string | undefined;
}

@Module({ dynamic: true, store, namespaced: true, name: "user" })
class User extends VuexModule implements IUserState {
  public userToken = getToken() || "";

  @MutationAction({
    mutate: ["userToken"],
  })
  public async SetUserInfo({ userToken }: ISetUserInfo) {
    const state: any = this.state;
    userToken = userToken ? userToken : state.userToken;
    return {
      userToken,
    };
  }

  @MutationAction({
    mutate: ["userToken"],
  })
  public async LogOut() {
    removeToken();
    localStorage.removeItem("detail");
    return {
      userToken: "",
    };
  }

  @Action({ commit: "SET_TOKEN" })
  public ASET_TOKEN(token: string) {
    setToken(token);
    return token;
  }

  @Mutation
  public SET_TOKEN(userToken: string) {
    this.userToken = userToken;
  }
}

export const UserModule = getModule(User);
