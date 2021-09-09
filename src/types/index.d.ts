export interface parser {
  parseUrl: (url: string) => ParsedFormatV2 | ParsedFormatV4 | Error
  parseManufacturerData: (
    dataBuffer: Buffer,
  ) => ParsedFormatV3 | ParsedFormatV5 | Error
}

export function parseEddystoneBeacon(serviceDataBuffer: Buffer): string | void

export interface ParsedFormatV2 {
  eddystoneId?: number
  humidity?: number
  pressure?: number
  temperature?: number
}

export interface ParsedFormatV4 extends ParsedFormatV2 {}

export interface ParsedFormatV3 {
  accelerationX?: number
  accelerationY?: number
  accelerationZ?: number
  battery?: number
  humidity?: number
  pressure?: number
  temperature?: number
}

export interface ParsedFormatV5 {
  accelerationX?: number
  accelerationY?: number
  accelerationZ?: number
  battery?: number
  humidity?: number
  pressure?: number
  temperature?: number
  txPower?: number
  movementCounter?: number
  measurementSequenceNumber?: number
  mac?: string
}
