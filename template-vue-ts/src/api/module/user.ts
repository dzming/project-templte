import { GET, POST, PUT, DELETE } from "@/utils/request";

// 登录
export function login({ telephone }: { telephone: string }) {
  return POST("/user/login", {
    telephone,
  });
}
