const fakeNumber = (min: number = 0, max: number = 100) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const fakeMap: { [key: string]: any } = {
  number: fakeNumber,
  boolean: () => fakeNumber() % 2 === 0,
  string: (length: number = 10, formatted: string = '') => {
    let result = ''
    const isFormatted = formatted.toLowerCase() === 'f'
    while (result.length < length) {
      result +=
        Math.random()
          .toString(36)
          .substring(2)
          .substring(isFormatted ? fakeNumber(1, 8) : 0) +
        (isFormatted ? ' ' : '')
    }
    return result
  },
  date: (start: string, end: string) => {
    const startDate = start ? parseInt(start) : 0
    const endDate = end ? parseInt(end) : Date.now()
    return new Date(startDate + Math.random() * (endDate - startDate))
  }
}

function tossMeA(thing: any, ammount: number = 1): any | any[] {
  const result = []
  const counter = ammount > 0 ? ammount : 1

  for (let i = 0; i < counter; i++) {
    let item: any = null

    if (!Array.isArray(thing) && typeof thing === 'object') {
      item = {}

      Object.keys(thing).forEach((key) => {
        item[key] = tossMeA(thing[key])
      })
    } else if (Array.isArray(thing)) {
      item = tossMeA(thing[0], thing[1])
    } else {
      switch (typeof thing) {
        case 'string':
          const [type, ...mod] = thing.split('-')
          item = fakeMap[type](...mod)
          break
        case 'function':
          item = thing()
          break
        default:
          item = thing
          break
      }
    }

    result.push(item)
  }

  return result.length === 1 ? result[0] : result
}

export default tossMeA
