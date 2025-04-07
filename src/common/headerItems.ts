export type THeaderItem = {
  id: number,
  text: string,
  active: boolean,
  href: string
}

export const headerItems: THeaderItem[] = [
  {
    id: 1,
    text: "Products",
    active: true,
    href: "/products"
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