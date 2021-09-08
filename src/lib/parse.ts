import * as dataFormats from '@dataformats'
import { ParsedFormatV2, ParsedFormatV4 } from '@types'

const stripUrl = (url: string) => {
  const match = url.match(/#(.+)$/)
  return match ? match[1] : new Error('Invalid url')
}

const getReadings = (
  encodedData: string,
): ParsedFormatV2 | ParsedFormatV4 | Error => {
  // if encoded data is truncated (data format 4), add some random padding
  const addPaddingIfNecessary = (str: string) =>
    str.length === 9 ? str + 'a==' : str

  const buffer = Buffer.from(addPaddingIfNecessary(encodedData), 'base64')

  // validate
  if (buffer.length < 6 || buffer.length > 7) {
    return new Error('Invalid data')
  }
  const dataFormat = buffer[0]

  return dataFormat === 2 || dataFormat === 4
    ? Object.assign(
        { dataFormat: dataFormat },
        dataFormats.formats_2_and_4.parse(buffer),
      )
    : new Error('Unsupported data format: ' + dataFormat)
}

const parseUrl = (url: string): ParsedFormatV2 | ParsedFormatV4 | Error => {
  if (!url.match(/ruu\.vi/)) {
    return new Error('Not a ruuviTag url')
  }

  const encodedData = stripUrl(url)

  return encodedData instanceof Error ? encodedData : getReadings(encodedData)
}

const parseManufacturerData = (dataBuffer: Buffer) => {
  let dataFormat = dataBuffer[2]
  switch (dataFormat) {
    case 3:
      return dataFormats.format_3.parse(dataBuffer)
    case 5:
      return dataFormats.format_5.parse(dataBuffer)
    default:
      return new Error('Data format not supported')
  }
}

export default {
  parseUrl,
  parseManufacturerData,
}
