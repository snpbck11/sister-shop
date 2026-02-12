import { request } from "@/shared/api/http/request";
import {
  ICollectionWithCount,
  ICreateCollecionDTO,
  IUpdateCollectionData
} from "../model/types";

export function createCollection(payload: ICreateCollecionDTO) {
  return request<ICollectionWithCount>(`/api/collections`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function patchCollection(id: number, payload: Partial<IUpdateCollectionData>) {
  return request<ICollectionWithCount>(`/api/collections/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function deleteCollection(id: number) {
  return request(`/api/collections/${id}`, {
    method: "DELETE",
  });
}
