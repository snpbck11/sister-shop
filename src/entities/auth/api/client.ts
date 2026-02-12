import { request } from "@/shared/api/http/request";
import { ILoginData } from "../model/types";

export function login(payload: ILoginData) {
  return request("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function logout() {
  return request("/api/auth/logout", {
    method: "POST",
  });
}
