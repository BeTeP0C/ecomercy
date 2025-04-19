class localStorageStore {
  safeLocalStorageSet = (key: string, value: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key,value)
    }
  }
  
  safeLocalStorageGet = (key: string) => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(key)
    }
  }
}