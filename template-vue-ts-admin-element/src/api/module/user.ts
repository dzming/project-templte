import { POST } from '@/utils/request';

//token获取登录用户信息
export function getUserInfo(params: object) {
  return POST('/v1/platform/user/get',params);
}

// 登录
export function login({ username, password }: { username: string, password: string }) {
  return POST('/v1/sys/auth/login', {
    username,
    password
  });
}

//退出登录
export function logout() {
  return POST('/v1/sys/auth/logout');
}