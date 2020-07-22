import Cookies from "js-cookie";

const TokenKey = "access-token";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token: string) {
  Cookies.set(TokenKey, token, { expires: 1, path: "/" });
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
