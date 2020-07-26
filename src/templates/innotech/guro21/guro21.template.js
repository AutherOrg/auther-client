import dompurify from 'dompurify'
import { format } from 'date-fns'
import bgInnotech from './bgInnotech'

const name = '[Innotech] Guro21'

const buildSignatures = signatures => {
  return signatures.map(signature => {
    return `
      <div style="text-align:center;">
        <img src="${signature.image}" alt="${signature.name}" style="width:auto; height:50px;" />
        <p style="margin:0;">
          <span style="font-weight: bold; text-transform: uppercase;">${signature.name}</span><br/>${signature.jobTitle}
        </p>
      </div>
    `
  }).join('')
}

const build = certificate => {
  const html = `
  <div style="font-family:'Roboto','Helvetica','Arial',sans-serif; word-break:break-word; text-align:center;">
    <div style="width:100%; display:flex;display:-webkit-flex; flex-wrap:wrap; justify-content:space-around; -webkit-justify-content:space-around; align-items:center;-webkit-align-items:center;">
      <div>
        <img src="${certificate.badge.issuer.image}" alt="${certificate.badge.issuer.name}" style="width:100px; height:auto; margin:0;" />
      </div>
      <div style="text-align: left; text-transform: uppercase;">
        <p style="font-size:1.22em; transform:scale(1, 0.8); -webkit-transform:scale(1, 0.8); line-height: 0.6em; margin:0;">
          Southeast Asian Ministers of Education Organization
        </p>
        <p style="font-size:2em; transform:scale(1, 0.8); -webkit-transform:scale(1, 0.8); line-height: 1em; margin:0;">
          Regional Center For Educational<br />Innovation And Technology
        </p>
      </div>
      <div style="width:100px;"></div>
    </div>
    <div style="background:url(${bgInnotech}) center center no-repeat; background-size:contain;" text-align:center;">
      <p style="margin:0; margin-top: 5px; font-weight: bold;">
        awards this
      </p>
      <h1 style="font-size:2.6em; color: #004292; transform:scale(1, 0.8); -webkit-transform:scale(1, 0.8); text-transform:uppercase; font-weight:bold; margin:0;">
        Certificate of Competence
      </h1>
      <p style="margin:0;">to</p>
      <h2 style="font-family:'Comic Sans MS', cursive, sans-serif; font-size:2.6em; margin: 0.5em 0;">
        ${certificate.recipientProfile.name}
      </h2>
      <p style="margin:0; margin-top: 5px;">
        for having completed the program requirements of <span style="font-weight: bold; font-size: 120%;">${certificate.badge.name}</span>
      </p>
      <p style="margin:0; margin-top:8px">
      ${certificate.badge.description}
      </p>
      <p style="margin:10px 0;">
        Issued on ${format(new Date(certificate.issuedOn), 'MMMM dd, yyyy')}.
      </p>
      <div style="display:flex;display:-webkit-flex; flex-direction:row; justify-content:space-around; -webkit-justify-content:space-around;">
        ${buildSignatures(certificate.badge.signatureLines)}
      </div>
      <p style="margin: 0 10px; text-align: right;">ISO 9001 & 29990 certified</p>
    </div>
  </div>
`
  return dompurify.sanitize(html).replace(/(\r\n|\n|\r)/gm, '').replace(/\s+/g, ' ')
}

export default {
  name,
  build
}
