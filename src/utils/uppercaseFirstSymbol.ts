const uppercaseFirstSymbol = (str: string) => {
  const [firstSymbol, ...rest] = str

  return firstSymbol.toUpperCase() + rest.join("")
}

export default uppercaseFirstSymbol