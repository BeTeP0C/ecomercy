export type TCategoriesItem = {
  id: number,
  category: TCategory,
  img: string,
}

export const CATEGORIES = ["electronics", "furniture", "shoes", "miscellaneous"] as const;
export type TCategory = typeof CATEGORIES[number];

export const isTCategory = (value: any): value is TCategory => {
  return CATEGORIES.includes(value as TCategory);
};

export const categoriesList: TCategoriesItem [] = [
  {
    id: 1,
    category: "electronics",
    img: "https://front-school.minio.ktsdev.ru/medium_ke_VCV_Ia_1299783ea3.jpeg"
  },
  {
    id: 2,
    category: "furniture",
    img: "https://front-school.minio.ktsdev.ru/medium_DMQHGA_0_072293b9e4.jpeg"
  },
  {
    id: 3,
    category: "shoes",
    img: "https://front-school.minio.ktsdev.ru/medium_Az_AY_4_Ed_b9aeaa8839.jpeg"
  },
  {
    id: 4,
    category: "miscellaneous",
    img: "https://front-school.minio.ktsdev.ru/medium_BG_8_J0_Fj_438223909f.jpg"
  },
]