import { formats_2_and_4, format_3, format_5 } from '@dataformats'
import {
  ParsedFormatV2,
  ParsedFormatV3,
  ParsedFormatV4,
  ParsedFormatV5,
} from '@types'

const stripUrl = (url: string) => {
  const match = url.match(/#(.+)$/)
  return match ? match[1] : new Error('Invalid url')
}

const getReadings = (data: string): ParsedFormatV2 | ParsedFormatV4 | Error => {
  // if encoded data is truncated (data format 4), add some random padding
  const addPaddingIfNecessary = (str: string) =>
    str.length === 9 ? str + 'a==' : str

  const buffer = Buffer.from(addPaddingIfNecessary(data), 'base64')

  // validate
  if (buffer.length < 6 || buffer.length > 7) {
    return new Error('Invalid data')
  }
  const dataFormat = buffer[0]

  return dataFormat === 2 || dataFormat === 4
    ? Object.assign({ dataFormat }, formats_2_and_4.parse(buffer))
    : new Error('Unsupported data format: ' + dataFormat)
}

const parseUrl = (url: string): ParsedFormatV2 | ParsedFormatV4 | Error => {
  if (!url.match(/ruu\.vi/)) {
    return new Error('Not a ruuviTag url')
  }

  const encodedData = stripUrl(url)

  return encodedData instanceof Error ? encodedData : getReadings(encodedData)
}

const hexToBytes = (hex: string): number[] => {
  const bytes = []
  for (let c = 0; c < hex.length; c += 2) {
    bytes.push(parseInt(hex.substr(c, 2), 16))
  }
  return bytes
}

const parseData = (data: string | Buffer): ParsedFormatV3 | ParsedFormatV5 => {
  const companyIndex = data.indexOf('FF9904')
  const rData =
    typeof data === 'string'
      ? Buffer.from(hexToBytes(data.substring(companyIndex + 2, data.length)))
      : data

  const dataFormat = rData[2]

  switch (dataFormat) {
    case 3:
      return format_3.parse(rData)
    case 5:
      return format_5.parse(rData)
    default:
      throw new Error('Data format not supported')
  }
}

export { parseUrl, parseData, formats_2_and_4, format_3, format_5 }
