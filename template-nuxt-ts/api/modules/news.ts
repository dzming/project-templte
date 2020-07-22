import { $axios } from "@/utils/request";

export function getNews() {
  return $axios.get("/article/news");
}
