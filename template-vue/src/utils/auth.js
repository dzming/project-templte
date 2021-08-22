import Vue from 'vue';
import VueCookies from 'vue-cookies';
const TokenKey = 'Admin-Token';

export function getToken() {
  return VueCookies.get(TokenKey);
}

export function setToken(token) {
  return VueCookies.set(TokenKey, token);
}

export function removeToken() {
  return VueCookies.remove(TokenKey);
}
