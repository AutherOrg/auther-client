import dompurify from 'dompurify'
import { format } from 'date-fns'

import laurel from './laurel'

const name = 'Default'

const buildSignatures = signatures => {
  return signatures.map(signature => {
    return `
      <div style="display: flex; flex-direction: column; align-items: center; margin: 10px;">
        <img src="${signature.image}" alt="${signature.name}" style="width: auto; height: 50px;" />
        <p style="font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif; font-style: italic; font-size: 1rem; margin: 0;">
          ${signature.name}, ${signature.jobTitle}
        </p>
      </div>
    `
  }).join('')
}

const build = certificate => {
  const html = `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
      <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; background: url(${laurel}) center center no-repeat; background-size: contain;">
        <h1 style="font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif; font-size:4rem; padding-top: 4rem; font-weight: bold; text-shadow: 3px 3px #e0e0e0; margin: 0;">
          ${certificate.badge.name}
        </h1>
        <h2 style="font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif; font-size:3rem; text-transform: uppercase; margin:0;">
          ${certificate.recipientProfile.name}
        </h2>
        <p style="font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif; font-size: 1.25rem; text-align: justify; margin: 0; margin-top: 20px;">
          ${certificate.badge.description}
        </p>
        <p style="font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif; font-size: 1rem; font-style: italic; margin: 0; margin-top: 20px;">
          Issued on ${format(new Date(certificate.issuedOn), 'yyyy/MM/dd')}
        </p>
        <div style="display: flex; flex-direction: column; align-items: center;">
          <img src="${certificate.badge.issuer.image}" alt="${certificate.badge.issuer.name}" style="max-width: 300px; height: auto; margin: 0; margin-top: 10px;" />
        </div>
        <div style="display: flex; flex-direction: row; justify-content: center;">
          ${buildSignatures(certificate.badge.signatureLines)}
        </div>
      </div>
    </div>
  `
  return dompurify.sanitize(html).replace(/(\r\n|\n|\r)/gm, '').replace(/\s+/g, ' ')
}

export default {
  name,
  build
}
