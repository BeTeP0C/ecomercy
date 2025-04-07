export type TProductCart = {
  id: string,
  title: string,
  price: number,
  discount: number,
  images: {
    large: string,
    small: string,
    medium: string,
    thumbnail: string
  }
}