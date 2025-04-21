export type THeaderItem = {
  id: number,
  text: string,
  active: boolean,
  href: ("/products" | "/categories" | "/about")
}

export const headerItems: THeaderItem[] = [
  {
    id: 1,
    text: "Products",
    active: false,
    href: '/products'
  },
  {
    id: 2,
    text: "Categories",
    active: false,
    href: "/categories",
  },
  {
    id: 3,
    text: "About us",
    active: false,
    href: "/about",
  }
]