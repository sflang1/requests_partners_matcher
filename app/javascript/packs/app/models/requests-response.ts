import { Request } from "./request";

export interface RequestsResponse {
  total_items_count: number
  items: Request[]
}