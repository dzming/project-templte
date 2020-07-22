import Vue from "vue";
import VueI18n from "vue-i18n";
import { CHINESE } from "@/utils/regexp.ts";
import cookies from "@/plug/cookies.ts";

Vue.use(VueI18n);

const lang = window.navigator.language;
let locale = cookies.get("locale") || localStorage.getItem("locale") || "";

if (!locale) {
  CHINESE.test(lang) ? (locale = "zh-CN") : (locale = "en-US");
}

cookies.set("locale", locale);

const i18n: any = new VueI18n({
  locale, // 语言标识, 通过切换locale的值来实现语言切换,this.$i18n.locale
  messages: {
    "zh-CN": require("@/lang/zh"), // 中文语言包
    "en-US": require("@/lang/en"), // 英文语言包
  },
});

export default i18n;
