import {
  ParsedFormatV2,
  ParsedFormatV3,
  ParsedFormatV4,
  ParsedFormatV5,
} from './dataformats'

export { ParsedFormatV2, ParsedFormatV3, ParsedFormatV4, ParsedFormatV5 }

export interface parser {
  parseUrl: (url: string) => ParsedFormatV2 | ParsedFormatV4 | Error
  parseManufacturerData: (
    dataBuffer: Buffer,
  ) => ParsedFormatV3 | ParsedFormatV5 | Error
}

export function parseEddystoneBeacon(serviceDataBuffer: Buffer): string | void

export interface formats_2_and_4 {
  parse: (buffer: Buffer) => ParsedFormatV2 | ParsedFormatV4
}

export interface format_3 {
  parse: (buffer: Buffer) => ParsedFormatV3
}

export interface format_5 {
  parse: (buffer: Buffer) => ParsedFormatV5
}
