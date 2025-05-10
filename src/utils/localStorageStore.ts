class localStorageStore {
  static safeLocalStorageSet = (key: string, value: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key,value)
    }
  }
  
  static safeLocalStorageGet = (key: string) => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(key)
    }
  }

  static safeLocalStorageDelete = (key: string) => {
    if (typeof window !== "undefined") {
      return localStorage.removeItem(key)
    }
  }
}

export default localStorageStore