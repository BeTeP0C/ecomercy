export type TProductImageFormat = {
  ext: string,
  url: string,
  hash: string,
  mime: string,
  name: string,
  path: null,
  size: number,
  width: number,
  height: number,
  sizeInBytes: number
}

export type TProductImage = {
  id: number,
  documentId: string,
  name: string,
  alternativeText: null,
  caption: null,
  width: number,
  height: number,
  formats: {
    large: TProductImageFormat,
    small: TProductImageFormat,
    medium: TProductImageFormat,
    thumbnail: TProductImageFormat
  },
  hash: string,
  ext: string,
  mime: string,
  size: number,
  url: string,
  number: null,
  provider: string,
  provider_metadata: null,
  createdAt: string,
  updatedAt: string,
  publishedAt: string,
}

export type TProduct = {
  id: 156,
  documentId: string,
  title: string,
  description: string,
  price: number,
  discountPercent: number,
  rating: number,
  isInStock: boolean,
  createdAt: string,
  updatedAt: string,
  publishedAt: string,
  images: TProductImage[],
  productCategory: {
    id: number,
    documentId: string,
    title: string,
    createdAt: string,
    updatedAt: string,
    publishedAt: string,
  }
}