import Cookies from "js-cookie";
import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";
import store from "@/store";

export enum DeviceType {
  Mobile,
  Desktop,
}

export interface IAppState {
  device: DeviceType;
}

@Module({ dynamic: true, store, namespaced: true, name: "app" })
class App extends VuexModule implements IAppState {
  public device = DeviceType.Desktop;

  @Action({ commit: "TOGGLE_DEVICE" })
  public ToggleDevice(device: DeviceType) {
    return device;
  }

  @Mutation
  private TOGGLE_DEVICE(device: DeviceType) {
    this.device = device;
  }
}

export const AppModule = getModule(App);
