import {
  ParsedFormatV2,
  ParsedFormatV3,
  ParsedFormatV4,
  ParsedFormatV5,
} from '@types'
import parser from '@index'

const createManufacturerData = () => {
  const valuesv3: ParsedFormatV3 = {
    humidity: 58.5,
    temperature: 21.58,
    pressure: 101300,
    accelerationX: 14850,
    accelerationY: -9235,
    accelerationZ: 580,
    battery: 2958,
  }

  const valuesv5: ParsedFormatV5 = {
    temperature: 24.3,
    pressure: 100044,
    humidity: 53.49,
    accelerationX: 4,
    accelerationY: -4,
    accelerationZ: 1036,
    txPower: 4,
    battery: 2977,
    movementCounter: 66,
    measurementSequenceNumber: 205,
    mac: 'CB:B8:33:4C:88:01',
  }

  const manufacturerId = [0x99, 0x04]
  const dataFormat = [0x03]
  const valuesArray = [
    0x75, 21, 58, 0xc8, 0x64, 0x3a, 0x02, 0xdb, 0xed, 0x02, 0x44, 0x0b, 0x8e,
  ]

  return {
    valuesv3,
    valuesv5,
    buffer: Buffer.from(manufacturerId.concat(dataFormat).concat(valuesArray)),
  }
}

const mqttValues = {
  accelerationX: -832,
  accelerationY: -584,
  accelerationZ: 60,
  battery: 2959,
  humidity: 41.5075,
  mac: 'C9:5F:8D:CF:52:1F',
  measurementSequenceNumber: 49370,
  movementCounter: 86,
  pressure: 100105,
  temperature: 24.49,
  txPower: 4,
}

describe('parser.js', () => {
  const data = [0x98, 0x15, 0x00, 0xc0, 0x30]
  const dataBufferFormat2 = Buffer.from([0x02].concat(data))
  const dataBufferFormat4 = Buffer.from([0x04].concat(data).concat([0x3e]))
  const testUrlDataFormat2 = 'ruu.vi/#' + dataBufferFormat2.toString('base64')
  const testUrlDataFormat4 = (
    'ruu.vi/#' + dataBufferFormat4.toString('base64')
  ).slice(0, 17)
  const dataFormat5 = [
    0x05, 0x12, 0xfc, 0x53, 0x94, 0xc3, 0x7c, 0x00, 0x04, 0xff, 0xfc, 0x04,
    0x0c, 0xac, 0x36, 0x42, 0x00, 0xcd, 0xcb, 0xb8, 0x33, 0x4c, 0x88, 0x01,
  ]

  it('should return error if not a ruuviTag url', done => {
    const result = parser.parseUrl('https://bad.url.com/#foo')
    if (!(result instanceof Error)) {
      return done.fail('Should have got an error')
    }
    expect(result.message).toMatch(/not a ruuvitag url/i)
    done()
  })

  it("should return error if url doesn't contain data", done => {
    const result = parser.parseUrl('https://ruu.vi/foo')
    if (!(result instanceof Error)) {
      return done.fail('Should have got an error')
    }
    expect(result.message).toMatch(/invalid url/i)
    done()
  })

  it('should return error if url contains invalid data', done => {
    const result = parser.parseUrl('https://ruu.vi/#foo')
    if (!(result instanceof Error)) {
      return done.fail('Should have got an error')
    }
    expect(result.message).toMatch(/invalid data/i)
    done()
  })

  it('should return error if data format is unsupported', done => {
    const result = parser.parseUrl(
      'https://ruu.vi/#' + Buffer.from([5, 6, 7, 8, 9, 10]).toString('base64'),
    )
    if (!(result instanceof Error)) {
      return done.fail('Should have got an error')
    }
    expect(result.message).toMatch(/unsupported data format: 5/i)
    done()
  })

  describe('parsing data format 2', () => {
    const result = parser.parseUrl(testUrlDataFormat2) as ParsedFormatV2
    it('should parse humidity value', () => {
      expect(result.humidity).toBe(76)
    })
    it('should parse temperature value', () => {
      expect(result.temperature).toBe(21)
    })
    it('should parse pressure value', () => {
      expect(result.pressure).toBe(992)
    })
  })

  describe('parsing data format 3', () => {
    const data = createManufacturerData()
    const testValues = data.valuesv3
    const result = parser.parseData(data.buffer) as ParsedFormatV3

    it("shouldn't return error", () => {
      expect(result instanceof Error).toBeFalsy()
    })

    it('should parse temperature value', () => {
      expect(result.temperature).toBe(testValues.temperature)
    })

    it('should parse pressure value', () => {
      expect(result.pressure).toBe(testValues.pressure)
    })

    it('should parse humidity value', () => {
      expect(result.humidity).toBe(testValues.humidity)
    })

    it('should parse accelerationX', () => {
      expect(result.accelerationX).toBe(testValues.accelerationX)
    })

    it('should parse accelerationY', () => {
      expect(result.accelerationY).toBe(testValues.accelerationY)
    })

    it('should parse accelerationZ', () => {
      expect(result.accelerationZ).toBe(testValues.accelerationZ)
    })

    it('should parse battery', () => {
      expect(result.battery).toBe(testValues.battery)
    })
  })

  describe('parsing data format 4', () => {
    const result = parser.parseUrl(testUrlDataFormat4) as ParsedFormatV4

    it("shouldn't return error", () => {
      expect(result instanceof Error).toBeFalsy()
    })

    it('should parse humidity value', () => {
      expect(result.humidity).toBe(76)
    })
    it('should parse temperature value', () => {
      expect(result.temperature).toBe(21)
    })
    it('should parse pressure value', () => {
      expect(result.pressure).toBe(992)
    })
    it('should parse eddystoneId', () => {
      expect(result.eddystoneId).toBeTruthy()
    })
  })

  describe('parsing data format 5', () => {
    const data = createManufacturerData()
    const parsed = parser.parseData(
      Buffer.from([0x99, 0x04].concat(dataFormat5)),
    ) as ParsedFormatV5
    const testResults = data.valuesv5

    it("shouldn't return error", () => {
      expect(testResults instanceof Error).toBeFalsy()
    })

    it('should parse accelerationX', () => {
      expect(parsed.accelerationX).toBe(testResults.accelerationX)
    })
    it('should parse accelerationY', () => {
      expect(parsed.accelerationY).toBe(testResults.accelerationY)
    })
    it('should parse accelerationZ', () => {
      expect(parsed.accelerationZ).toBe(testResults.accelerationZ)
    })
    it('should parse battery', () => {
      expect(parsed.battery).toBe(testResults.battery)
    })
    it('should parse humidity', () => {
      expect(parsed.humidity).toBe(testResults.humidity)
    })
    it('should parse mac', () => {
      expect(parsed.mac).toBe(testResults.mac)
    })
    it('should parse measurementSequenceNumber', () => {
      expect(parsed.measurementSequenceNumber).toBe(
        testResults.measurementSequenceNumber,
      )
    })
    it('should parse movementCounter', () => {
      expect(parsed.movementCounter).toBe(testResults.movementCounter)
    })
    it('should parse pressure', () => {
      expect(parsed.pressure).toBe(testResults.pressure)
    })
    it('should parse temperature', () => {
      expect(parsed.temperature).toBe(testResults.temperature)
    })
    it('should parse txPower', () => {
      expect(parsed.txPower).toBe(testResults.txPower)
    })
  })

  describe('should parse mqtt message', () => {
    const parsed = parser.parseData(
      '0201061BFF990405132240DBC3B9FCC0FDB8003CA9F656C0DAC95F8DCF521F',
    ) as ParsedFormatV5
    const testResults = mqttValues

    it('should parse accelerationX', () => {
      expect(parsed.accelerationX).toBe(testResults.accelerationX)
    })
    it('should parse accelerationY', () => {
      expect(parsed.accelerationY).toBe(testResults.accelerationY)
    })
    it('should parse accelerationZ', () => {
      expect(parsed.accelerationZ).toBe(testResults.accelerationZ)
    })
    it('should parse battery', () => {
      expect(parsed.battery).toBe(testResults.battery)
    })
    it('should parse humidity', () => {
      expect(parsed.humidity).toBe(testResults.humidity)
    })
    it('should parse mac', () => {
      expect(parsed.mac).toBe(testResults.mac)
    })
    it('should parse measurementSequenceNumber', () => {
      expect(parsed.measurementSequenceNumber).toBe(
        testResults.measurementSequenceNumber,
      )
    })
    it('should parse movementCounter', () => {
      expect(parsed.movementCounter).toBe(testResults.movementCounter)
    })
    it('should parse pressure', () => {
      expect(parsed.pressure).toBe(testResults.pressure)
    })
    it('should parse temperature', () => {
      expect(parsed.temperature).toBe(testResults.temperature)
    })
    it('should parse txPower', () => {
      expect(parsed.txPower).toBe(testResults.txPower)
    })
  })
})
