import {
  VuexModule,
  Module,
  MutationAction,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";
import { login, logout, getUserInfo } from "@/api/module/user";
import { getToken, setToken, removeToken } from "@/utils/cookies";
import store from "@/store";
import router from "@/router";
import $http from "@/api";
const CryptoJS = require("crypto-js");

export interface IUserState {
  userId: string;
  token: string;
  username: string;
  avatar: string;
  roles: string[];
  accountState: string;
}

@Module({ dynamic: true, store, name: "user" })
class User extends VuexModule implements IUserState {
  public userId = "";
  public token = getToken() || "";
  public username = "";
  public avatar = "";
  public roles: string[] = [];
  public accountState = "";

  @Mutation
  private SET_USER_ID(userId: string) {
    this.userId = userId;
  }

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token;
  }

  @Mutation
  private SET_USERNAME(username: string) {
    this.username = username;
  }

  @Mutation
  private SET_AVATAR(avatar: string) {
    this.avatar = avatar;
  }

  @Mutation
  private SET_ROLES(roles: string[]) {
    this.roles = roles;
  }

  @Mutation
  private SET_ACCOUNT_STATE(accountState: string) {
    this.accountState = accountState;
  }

  @Action
  public async Login(userInfo: { username: string; password: string }) {
    let { username, password } = userInfo;
    username = username.trim();
    password = CryptoJS.MD5(password)
      .toString()
      .toUpperCase();
    const [err, res] = await login({ username, password });
    console.log([err,res]);
    if(!err) {
      setToken(res.token);
      this.SET_TOKEN(res.token);
    }else{
      throw Error(err);
    }
  }

  @Action
  public ResetToken() {
    removeToken();
    this.SET_TOKEN("");
    this.SET_ROLES([]);
  }

  @Action
  public async GetUserInfo() {
    if (this.token === "") {
      throw Error("用户信息获取失败，未找到token");
    }
    const { data } = await getUserInfo({
      /* Your params here */
    });
    if (!data) {
      throw Error("身份验证失败，请重新登录。");
    }
    const { id, roles, username, avatar, status } = data.user;
    // roles must be a non-empty array
    if (!roles || roles.length <= 0) {
      throw Error("GetUserInfo: roles must be a non-null array!");
    }
    this.SET_USER_ID(id);
    this.SET_ROLES(roles);
    this.SET_USERNAME(username);
    this.SET_AVATAR(avatar);
    this.SET_ACCOUNT_STATE(status); // 	账户状态 状态 0：禁用 1：正常
  }

  @Action
  public async LogOut() {
    if (this.token === "") {
      throw Error("未找到token");
    }
    await logout();
    removeToken();
    this.SET_TOKEN("");
    this.SET_ROLES([]);
  }
}

export const UserModule = getModule(User);
