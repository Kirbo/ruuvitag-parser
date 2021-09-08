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
