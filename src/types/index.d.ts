import {
  ParsedFormatV2,
  ParsedFormatV3,
  ParsedFormatV4,
  ParsedFormatV5,
} from './dataformats'

export { ParsedFormatV2, ParsedFormatV3, ParsedFormatV4, ParsedFormatV5 }

declare module 'ruuvitag-parser' {
  function parseUrl(url: string): ParsedFormatV2 | ParsedFormatV4 | Error
  function parseData(data: Buffer): ParsedFormatV3 | ParsedFormatV5 | Error
  function parseEddystone(data: Buffer): string | void

  export namespace formats_2_and_4 {
    function parse(data: Buffer): ParsedFormatV2 | ParsedFormatV4
  }
  export namespace format_3 {
    function parse(data: Buffer): ParsedFormatV3
  }
  export namespace format_5 {
    function parse(data: Buffer): ParsedFormatV5
  }
}
