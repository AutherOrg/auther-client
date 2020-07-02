import dompurify from 'dompurify'
import { format } from 'date-fns'

import laurel from './laurel'

const name = 'Partner'

const buildSignatures = signatures => {
  return signatures.map(signature => {
    return `
      <div style="margin:10px;">
        <img src="${signature.image}" alt="${signature.name}" style="max-height:50px; height:auto;" />
        <p style="font-style:italic; margin:0;">
          ${signature.name}, ${signature.jobTitle}
        </p>
      </div>
    `
  }).join('')
}

const build = certificate => {
  const html = `
    <div style="font-family:'Roboto','Helvetica','Arial',sans-serif; text-align:center; background:url(${laurel}) center center no-repeat; background-size:contain;">
      <h1 style="font-size:400%; font-weight:bold; text-shadow:3px 3px #e0e0e0; margin:0; padding-top:3em;">
        ${certificate.badge.name}
      </h1>
      <h2 style="font-size:300%; text-transform:uppercase; margin:0;">
        ${certificate.recipientProfile.name}
      </h2>
      <p style="font-size:125%; margin:0; margin-top:20px;">
        ${certificate.badge.description}
      </p>
      <p style="font-size:100%; font-style:italic; margin:0; margin-top:20px;">
        Issued on ${format(new Date(certificate.issuedOn), 'yyyy/MM/dd')}
      </p>
      <div style="text-align:center;">
        <img src="${certificate.badge.image}" alt="${certificate.badge.name}" style="max-height:100px; width:auto; margin:0; margin-top:10px;" />
      </div>
      <div style="display:flex; display:-webkit-flex; flex-direction:row; justify-content:center; -webkit-justify-content:center;">
        ${buildSignatures(certificate.badge.signatureLines)}
      </div>
    </div>
  `
  return dompurify.sanitize(html).replace(/(\r\n|\n|\r)/gm, '').replace(/\s+/g, ' ')
}

export default {
  name,
  build
}
