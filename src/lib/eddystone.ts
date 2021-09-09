const prefixes = ['http://www.', 'https://www.', 'http://', 'https://']

const suffixes = [
  '.com/',
  '.org/',
  '.edu/',
  '.net/',
  '.info/',
  '.biz/',
  '.gov/',
  '.com',
  '.org',
  '.edu',
  '.net',
  '.info',
  '.biz',
  '.gov',
]

export const parseEddystone = (data: Buffer): string | void => {
  // Parse url from an Eddystone beacon
  //
  // Returns undefined if it's not an Eddystone URL packet
  // Otherwise returns url as a string

  const frameType = data.readUInt8(0)

  // Check  that this is a URL frame type
  if (frameType !== 0x10) {
    return
  }

  const prefix = data.readUInt8(2)
  if (prefix > prefixes.length) {
    return
  }

  let url = prefixes[prefix]

  for (let i = 3; i < data.length; i++) {
    if (data[i] < suffixes.length) {
      url += suffixes[data[i]]
    } else {
      url += String.fromCharCode(data[i])
    }
  }

  return url
}
