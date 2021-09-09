import { ParsedFormatV5 } from '@types'

const int2Hex = (str: number) =>
  ('0' + str.toString(16).toUpperCase()).slice(-2)

const parse = (data: Buffer): ParsedFormatV5 => {
  let temperature: number | undefined = (data[3] << 8) | (data[4] & 0xff)
  if (temperature === 32768) {
    // ruuvi spec := 'invalid/not available'
    temperature = undefined
  } else if (temperature > 32768) {
    // two's complement
    temperature = Number(((temperature - 65536) * 0.005).toFixed(2))
  } else {
    temperature = Number((temperature * 0.005).toFixed(2))
  }

  let humidity: number | undefined = ((data[5] & 0xff) << 8) | (data[6] & 0xff)
  humidity =
    humidity !== 65535 ? Number((humidity * 0.0025).toFixed(4)) : undefined

  let pressure: number | undefined = ((data[7] & 0xff) << 8) | (data[8] & 0xff)
  pressure = pressure !== 65535 ? pressure + 50000 : undefined

  let accelerationX: number | undefined = (data[9] << 8) | (data[10] & 0xff)
  if (accelerationX === 32768) {
    // ruuvi spec := 'invalid/not available'
    accelerationX = undefined
  } else if (accelerationX > 32768) {
    // two's complement
    accelerationX = accelerationX - 65536
  }

  let accelerationY: number | undefined = (data[11] << 8) | (data[12] & 0xff)
  if (accelerationY === 32768) {
    // ruuvi spec := 'invalid/not available'
    accelerationY = undefined
  } else if (accelerationY > 32768) {
    // two's complement
    accelerationY = accelerationY - 65536
  }

  let accelerationZ: number | undefined = (data[13] << 8) | (data[14] & 0xff)
  if (accelerationZ === 32768) {
    // ruuvi spec := 'invalid/not available'
    accelerationZ = undefined
  } else if (accelerationZ > 32768) {
    // two's complement
    accelerationZ = accelerationZ - 65536
  }

  const powerInfo = ((data[15] & 0xff) << 8) | (data[16] & 0xff)

  let battery: number | undefined = powerInfo >>> 5
  battery = battery !== 2047 ? battery + 1600 : undefined

  let txPower: number | undefined = powerInfo & 0b11111
  txPower = txPower !== 31 ? txPower * 2 - 40 : undefined

  let movementCounter: number | undefined = data[17] & 0xff
  movementCounter = movementCounter !== 255 ? movementCounter : undefined

  let measurementSequenceNumber: number | undefined =
    ((data[18] & 0xff) << 8) | (data[19] & 0xff)
  measurementSequenceNumber =
    measurementSequenceNumber !== 65535 ? measurementSequenceNumber : undefined

  const mac = [
    int2Hex(data[20]),
    int2Hex(data[21]),
    int2Hex(data[22]),
    int2Hex(data[23]),
    int2Hex(data[24]),
    int2Hex(data[25]),
  ].join(':')

  return {
    accelerationX,
    accelerationY,
    accelerationZ,
    battery,
    humidity,
    mac,
    measurementSequenceNumber,
    movementCounter,
    pressure,
    temperature,
    txPower,
  }
}

export default {
  parse,
}
