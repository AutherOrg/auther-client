import { format } from 'date-fns'

import screenshot from './defaultTemplate.png'

const name = 'Default'

const buildSignatures = signatures => {
  return signatures.map(signature => {
    return `
      <div style="display: flex; flex-direction: column; align-items: center; margin: 10px;">
        <img src="${signature.image}" alt="${signature.name}" style="width: auto; height: 50px;" />
        <p style="font-family: Roboto, Helvetica, Arial, sans-serif; font-style: italic; margin: 0;">
          ${signature.name}, ${signature.jobTitle}
        </p>
      </div>
    `
  })
}

const build = certificate => {
  return `
    <div style="display: flex; flex-direction: column; align-items: center; text-align: center; ">
      <div>
        <img src="${certificate.badge.image}" alt="${certificate.badge.name}" style="width: 100%; height: auto; margin-bottom: 20px" />
      </div>
      <div style="display: flex; flex-direction: column; align-items: center;">
        <h1 style="font-family: Roboto, Helvetica, Arial, sans-serif; font-size:3em; font-weight: bold; text-shadow: 2px 2px #c8c8c8, 3px 3px #e0e0e0; margin: 0; margin-bottom: 20px;">
          ${certificate.badge.name}
        </h1>
        <h2 style="font-family: Roboto, Helvetica, Arial, sans-serif; font-size:3em; font-weight: bold; text-shadow: 2px 2px #c8c8c8, 3px 3px #e0e0e0; margin:0; margin-bottom: 20px;">
          ${certificate.recipientProfile.name}
        </h2>
        <p style="font-family: Roboto, Helvetica, Arial, sans-serif; font-style: italic; text-align: justify; margin: 0; margin-bottom: 50px;">
          ${certificate.badge.description}
        </p>
        <p style="font-family: Roboto, Helvetica, Arial, sans-serif; margin: 0; margin-bottom: 20px;">
          Issued on ${format(new Date(certificate.issuedOn), 'yyyy/MM/dd')} by
        </p>
        <div style="display: flex; flex-direction: column; align-items: center;">
          <img src="${certificate.badge.issuer.image}" alt="${certificate.badge.issuer.name}" style="max-width: 300px; height: auto; margin: 0; margin-bottom: 20px;" />
        </div>
        <div style="display: flex; flex-direction: row; justify-content: center;">
          ${buildSignatures(certificate.badge.signatureLines)}
        </div>
      </div>
    </div>
  `
}

export default {
  name,
  build,
  screenshot
}
