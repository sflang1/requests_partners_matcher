import { Material } from "./material";
import { Partner } from "./partner";

export enum RequestStatus {
  Created = 0,
  Assigned = 1
}

export interface Request {
  id: number
  material: Material
  area: number
  status: RequestStatus
  phone_number: string
  lat: number
  lng: number
  assigned_partner?: Partner
}