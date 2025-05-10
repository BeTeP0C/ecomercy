import { TCategory } from "@/common/categoriesList"

export type TProductCart = {
  idDocument: string,
  id: number,
  amount: number,
  title: string,
  price: number,
  discount: number,
  type: TCategory
  images: {
    large: string,
    small: string,
    medium: string,
    thumbnail: string
  }
}