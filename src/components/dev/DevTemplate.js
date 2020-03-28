import React from 'react'

import template from '../../templates/default/default.template'

const url = 'https://raw.githubusercontent.com/guix77/blockcerts-certificates/master/ethereum/ropsten/certificates/fictionaluniversity/Jane-Doe-Blockchain-for-developers-1.json'

export default function DevTemplate () {
  const [certificate, setCertificate] = React.useState(null)

  React.useEffect(() => {
    const getCertificate = async () => {
      const stringifiedJson = await window.fetch(url)
      const certificate = await stringifiedJson.json()
      setCertificate(certificate)
    }
    getCertificate()
  }, [])

  if (!certificate) {
    return null
  }

  const html = template.build(certificate)

  return (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  )
}
