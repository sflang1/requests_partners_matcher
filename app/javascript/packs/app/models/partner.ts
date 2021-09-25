import { Experience } from "./experience";

export interface Partner {
  id: number
  name: string
  operating_radius?: number
  lat?: number
  lng?: number
  rating?: number
  price?: number
  distance?: number
  experiences?: Experience[]
}