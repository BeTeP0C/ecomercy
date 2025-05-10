const LOCAL_ENDPOINT = {
  MAIN: "/",
  PRODUCTS: '/products',
  AUTH: "/auth",
  REGIST: "/regist",
  CATEGORIES: "/categories",
  CATEGORY: "/categories/:category",
  PRODUCT: "/products/:id",
  PROFILE: "/profile",
  SETTINGS: "/settings",
  CART: "/cart",
  ABOUT: "/about",
  ERROR: "/404",
} as const

export default LOCAL_ENDPOINT