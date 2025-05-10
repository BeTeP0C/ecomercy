import { TCategory } from "@/common/categoriesList"

export type TOrder = {
  id: number,
  dataCreate: string,
  isPaid: boolean,
  products: TOrderProduct[],
  price: number,
}

export type TOrderProduct = {
  imgUrl: string,
  title: string,
  id: number,
  fullPrice: number,
  amount: number,
  priceOne: number,
  type: TCategory,
  isGuarantee: boolean,
  isPopular: boolean,
  documentId: string,
}