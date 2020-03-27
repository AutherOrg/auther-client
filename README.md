# OpenBlockcerts client

Client to create, issue, manage and share Blockcerts certificates.

## Introduction

**OpenBlockcerts client** is an opensource client to create, issue, manage and share online Blockcerts certificates on the Ethereum blockchain. Issuing a batch of up to thousands of certificates does not even cost $0.01.

This project is purely a client-side frontend application and can be used alone. However, it's intended to be best used with the [OpenBlockcerts API](https://github.com/openblockcerts/openblockcerts-api) project.

It does not work with Bitcoin for now.

## Installation

### Standalone

This project was bootstrapped with [Create React App](https://create-react-app.dev/). Please read the documentation if you are new to React, otherwise you know what to do.

Install dependencies:

````
yarn install
````

Start the app (in development mode)

````
yarn start
````

To sign certificates, you will need to have Ethereum connectivity in your browser. You can for instance install the [Metamask](https://metamask.io/) extension (Firefox + Chrome). Also, you will need to have a little bit of Ether. On the Ethereum testnet Ropsten, you can have some for free. On Ethereum Mainnet, on which you should issue real certificates, it won't even cost $0.01 to issue a batch of up to thousands certificates.

### Along with OpenBlockcerts API

To share online certificates, you will need to install the [OpenBlockcerts API](https://github.com/openblockcerts/openblockcerts-api) project as well. Without it, you can still create, issue and manage certificates, but to enable people to view them they will have to upload the JSON certificates. Also, *OpenBlockcerts API* has email notifications, whereas this pure client-side application doesn't.

First install, configure and launch *OpenBlockcerts API* and then come back here.

Then:

````
cp .env.development .env.development.local
````

Edit .env.development.local and change `REACT_APP_API=none` to `REACT_APP_API=http://localhost:4000` or any other URL you're running the API on.

Finally start again the app.

## Configuration

+ Install the [Metamask extension](https://metamask.io/)
+ Open the app and click on *Issuer* to complete your issuer profile. Use your Ethereum public key. For the issuer profile URL and the revocation list URL, you need to enter URLs on which you will upload 2 JSON files that the app will generate for you. For instance: `https://fictionaluniversity.example.com/issuer.json` and `https://fictionaluniversity.example.com/revocation.json`
+ Click on *Tools* and then download the Issuer profile JSON and revocation list JSON. Upload them on your server at the URLs previously declared. For instance: `https://fictionaluniversity.example.com/issuer.json` and `https://fictionaluniversity.example.com/revocation.json`

## Issuing certificates

### Ethereum network consideraitons

#### Ropsten (Ethereum test network)

By default the app uses the Ropsten network, which is an Ethereum testnet on which you can get Ether for free. The app will ask you to switch to Ropsten if you are on another network. You need to get free Ropsten Ether (click on *Deposit* then *Ropsten Faucet*).

#### MainNet (Ethereum real network)

To issue certificates on MainNet you need to buy Ether.

Also, you must edit your environment file (.env.development.local or .env.production.local, depending on if you are using React's development mode or a built artifact) and change `REACT_APP_ETHEREUM_NETWORK=Ropsten` to `REACT_APP_ETHEREUM_NETWORK=MainNet`.

The app will ask you to switch to MainNet if you are on another network.

### Issuing process

At the moment, there's only 1 process which uses a .csv file for the list of recipients, signatures and models.

1. You must at least create 1 signature
2. You must at least create 1 model
3. You must have a .csv file listing your recipients (example below)

recipients.csv:
````
First name,Last name,Email
Jane,Doe,jane.doe@example.com
John,Doe,john.doe@example.com
````

+ Go to /batches and create a new batch
+ Select your .csv file
+ Select a model
+ Click on *Create*
+ Click on *Sign*
+ A Metamask popup should open. Sign the transaction here.
+ Wait for the transaction to be mined.
+ Click on *Finalize*
+ If you are also using *openblockcerts-api*, click on *Upload certificates* when it appears

### Gas price = 0

Especially on Ropsten, from time to time when submitting a transaction to Metamask, the gas price is set to 0 which would lead to a rejection. When it's the case, please click on "Edit" in the Metamask popup and click on a transaction speed (medium for instance).

## Export / Import

In *Tools* you can backup all your issued certificates.

You can also export your whole local database with your issuer profile, your signatures and models to a file. Then, on another machine / browser you can import this file to set up everything quickly. Of course you should use the same Ethereum address in Metamask.


### Certificates templates

In addition to the *Default* template, you can add more templates.

Copy the `src/templates/default` directory into `src/templates/custom` for instance and rename all *default* to *custom*.

Then add your new template to the templates index:

src/templates/index.templates.js:
````
import defaultTemplate from './default/default.template'
import customTemplate from './custom/custom.template'

export default [
  defaultTemplate,
  customTemplate
]
````

Then you can modify the *build* method in `src/templates/custom/custom.template.js` to use your own HTML.

The app has a route to help template development by displaying a preview of a certificate.
If you app runs on http://locahost:3000 then you can access this route at http://locahost:3000/dev/template
By default this route uses the *default* template. To use your custom template, edit `src/components/dev/DevTemplate` and replace `import template from '../../templates/default/default.template'` by `import template from '../../templates/custom/custom.template'`

## Production considerations

Along with classic considerations for production release (among other things, see [React documentation](https://create-react-app.dev/docs/production-build/) if needed), you have to make a major decision that will impact ALL the certificates you issue: the management of the issuer profile and the revocation list.

As you probably know, they are both JSON files. The issuer profile JSON's URL is in each certificate issued by an issuer. The URL where it is hosted must never change, otherwise all previously issued certificates will not be valid any more.

This application allows you to generate both those JSON files. In a development / test instance and together with a dev / test *Blockcerts-API* instance, for your convenience it's possible to host those JSONs in the API.

**In production we advise NOT to use this feature, but to host those 2 files traditionnally on a simple classic HTTP server. Even better, you could additionnaly use the [w3id.org](https://w3id.org/), the Permanent Identifiers for the Web project.**

## General discussion, installation and configuration help

+ [OpenBlockcerts.com forum](https://www.openblockcerts.com/forum)

## Paid technical support, development and commercial services

+ [OpenBlockcerts.com services](https://www.openblockcerts.com/services).

## Development

Please read the [contribution guidelines](CONTRIBUTING.md).

## Credits

+ [GIZ](https://www.giz.de/en/html/index.html) (Deutsche Gesellschaft für Internationale Zusammenarbeit GmbH): this application has been originally developed with financial support by GIZ Lab.
+ [SEAMEO INNOTECH](https://www.seameo-innotech.org/) (Regional Center for Educational Innovation and Technology, Southeast Asian Ministers of Education Organization) : this application has been originally developed for SEAMEO-INNOTECH.
