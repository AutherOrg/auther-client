const name = 'Default'

const build = certificate => {
  return `
    <h1>${certificate.badge.name}</h1>
    <h2>${certificate.recipientProfile.name}</h2>
  `
}

const screenshot = ''

export default {
  name,
  build,
  screenshot
}
