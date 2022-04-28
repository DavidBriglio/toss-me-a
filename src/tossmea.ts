const fakeNumber = (min: number = 0, max: number = 100) => {
  min = min || 0
  max = max || 100
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const fakeMap: { [key: string]: any } = {
  string: (length: number) =>
    (Math.random() + 1).toString(36).substring(2, (length || 10) + 2),
  number: fakeNumber,
  boolean: () => fakeNumber() % 2 === 0,
  date: () => new Date(Math.random() * 900000),
  array: (type: string, length: number): any[] => {
    const result: any[] = []
    for (let i = 0; i < length; i++) {
      result.push(fakeMap[type]?.())
    }
    return result
  }
}

function tossMeA(thing: any, count: number = 1): any | any[] {
  const result = []

  for (let i = 0; i < count; i++) {
    const item: { [key: string]: any } = {}

    Object.keys(thing).forEach((key) => {
      const value = thing[key]

      if (Array.isArray(value)) {
        item[key] = fakeMap.array(value[0], value[1])
      } else {
        switch (typeof value) {
          case 'object':
            // @ts-ignore
            item[key] = quickThing(value)
            break
          case 'string':
            const [type, ...mod] = value.split('-')
            item[key] = fakeMap[type](...mod)
            break
          case 'function':
            item[key] = value()
            break
          default:
            item[key] = value
        }
      }
    })

    result.push(item)
  }

  return result.length === 1 ? result[0] : result
}

export default tossMeA
