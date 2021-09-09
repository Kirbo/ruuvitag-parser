// parser for data formats 2 and 4

import { ParsedFormatV2, ParsedFormatV4 } from '@types'

// takes signed byte value, returns integer
// see: https://github.com/ruuvi/ruuvi-sensor-protocols#protocol-specification-data-format-2-and-4
const unSign = (signed: number): number =>
  signed & 0x80 ? -1 * (signed & 0x7f) : signed

const parse = (data: Buffer): ParsedFormatV2 | ParsedFormatV4 => ({
  humidity: data[1] / 2,
  temperature: unSign(data[2]),
  pressure: (data[4] * 256 + data[5] + 50000) / 100,
  eddystoneId: data.length === 7 ? data[6] : undefined,
})

export default {
  parse,
}
