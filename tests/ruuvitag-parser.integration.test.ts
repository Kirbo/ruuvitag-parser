const { parseData, parseEddystone } = require('@dist/index')

const dataFormat5 = [
  0x05, 0x12, 0xfc, 0x53, 0x94, 0xc3, 0x7c, 0x00, 0x04, 0xff, 0xfc, 0x04, 0x0c,
  0xac, 0x36, 0x42, 0x00, 0xcd, 0xcb, 0xb8, 0x33, 0x4c, 0x88, 0x01,
]

const manufacturerId = [0x99, 0x04]
const dataFormat = [0x03]
const valuesArray = [
  0x75, 21, 58, 0xc8, 0x64, 0x3a, 0x02, 0xdb, 0xed, 0x02, 0x44, 0x0b, 0x8e,
]

const v3data = Buffer.from(
  manufacturerId.concat(dataFormat).concat(valuesArray),
)

const dataBuffers = {
  ruuviTag: Buffer.from([
    0x10, 0xf9, 0x03, 0x72, 0x75, 0x75, 0x2e, 0x76, 0x69, 0x2f, 0x23, 0x42,
    0x45, 0x51, 0x5a, 0x41, 0x4d, 0x4c, 0x73, 0x4f,
  ]),
  telemetryFrame: Buffer.from([
    0x20, 0xf9, 0x03, 0x73, 0x75, 0x75, 0x2e, 0x76, 0x69, 0x2f, 0x23, 0x42,
    0x45, 0x51, 0x5a, 0x41, 0x4d, 0x4c, 0x73, 0x4f,
  ]),
}

const results = {
  dataFormat3: {
    accelerationX: 14850,
    accelerationY: -9235,
    accelerationZ: 580,
    battery: 2958,
    humidity: 58.5,
    pressure: 101300,
    temperature: 21.58,
  },
  dataFormat5: {
    accelerationX: 4,
    accelerationY: -4,
    accelerationZ: 1036,
    battery: 2977,
    humidity: 53.49,
    mac: 'CB:B8:33:4C:88:01',
    measurementSequenceNumber: 205,
    movementCounter: 66,
    pressure: 100044,
    temperature: 24.3,
    txPower: 4,
  },
  mqttMessage: {
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
  },
}

describe('compiled ruuvitag-parser', () => {
  describe('data format 3', () => {
    const parsed = parseData(v3data)
    const testResults = results.dataFormat3

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
    it('should parse pressure', () => {
      expect(parsed.pressure).toBe(testResults.pressure)
    })
    it('should parse temperature', () => {
      expect(parsed.temperature).toBe(testResults.temperature)
    })
  })

  describe('data format 5', () => {
    const parsed = parseData(Buffer.from([0x99, 0x04].concat(dataFormat5)))
    const testResults = results.dataFormat5

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

  describe('mqtt messages', () => {
    const parsed = parseData(
      '0201061BFF990405132240DBC3B9FCC0FDB8003CA9F656C0DAC95F8DCF521F',
    )
    const testResults = results.mqttMessage

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

  describe('eddystone', () => {
    it("should return undefined if it's not an Eddystone URL packet", () => {
      expect(parseEddystone(dataBuffers.telemetryFrame)).toBe(undefined)
    })

    it("should return url if it's an Eddystone URL packet", () => {
      const result = parseEddystone(dataBuffers.ruuviTag)
      expect(result).toMatch(/^https:\/\/ruu\.vi\//)
    })
  })
})
