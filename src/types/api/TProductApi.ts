import { TPagination } from "../TPagination"
import { TProduct } from "../TProduct"

export type TProductApi = {
  data: TProduct[],
  meta: {
    pagination: TPagination
  }
}