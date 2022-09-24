# toss-me-a [![npm version](https://badge.fury.io/js/toss-me-a.svg)](https://badge.fury.io/js/toss-me-a)

### Created by David Briglio

This is a quick and simple data mocking package. Provide the method with the structure of the object / item you would like mocked and the ammount to mock, and recive it back.

## Install

npm:

```terminal
npm i toss-me-a
```

yarn:

```terminal
yarn add toss-me-a
```

## Usage

This package exports a default method `tossMeA`. Provide this method an object to mock, and a count of how many to return (default 1 if omitted).

### Argument structure

| Type     | Options                            | Example                              | Description                                                                                          |
| -------- | ---------------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| string   | `'string-[length]-[formatted]'`    | `'string-15-f'`                      | Get a string of specified length with optional spacing formatting `f` (default 10, non-formatted)    |
| number   | `'number-[min]-[max]'`             | `'number-0-50'`                      | Get a string between min/max values (default 0-100)                                                  |
| boolean  | N/A                                | `'boolean'`                          | Get a boolean value                                                                                  |
| date     | `'date-[start epoch]-[end epoch]'` | `'date-1604102400000-1635638400000'` | Get a random date between a start and end date (epoch) (default is between epoch 0 and current date) |
| array    | `['[type]', [amount]]`             | `['string', 5]`                      | Get an array containing the amount of type provided                                                  |
| function | N/A                                | `() => generateId()`                 | Provide a funciton as the value to perform the function and return the value to the resulting object |
| object   | N/A                                | `{aString: 'string'}`                | Provide an object of the same mock structure to recursively create mock data                         |

### Sample

```javascript
import tossMeA from 'toss-me-a'

tossMeA(
  {
    // Provide a function to be executed and the value returned into the mock data
    id: () => generateAnId(),
    // Anything provided that is not a string|function|object will be included as is
    aConst: 15,
    // Use a function to provide a constant value to the mock data
    anotherConst: () => 'always-this-string',
    aString: 'string',
    aStringLength15: 'string-15',
    // String 100 characters long with spacing
    aStringFormatted: 'string-100-f',
    // Get a date between epoch 0 and current date
    aDate: 'date',
    // Get a date between Oct-31-2020 and Oct-31-2021
    aSpecificDate: 'date-1604102400000-1635638400000',
    // Array of type
    arrayOfStrings: ['string', 4],
    aNumber: 'number-0-5',
    aBoolean: 'boolean',
    category: {
      // Nested object recursively generates data
      anotherString: 'string',
      anotherObject: {
        anotherArray: ['number-0-10', 3]
      }
    }
  },
  10 // How many of these objects to return
)
```

## License

MIT (See license file)
