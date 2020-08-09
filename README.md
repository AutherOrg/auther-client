# Auther client

[![Lint](https://github.com/AutherOrg/auther-client/workflows/Lint/badge.svg)](https://github.com/AutherOrg/auther-client/actions?query=workflow%3A%22Lint%22)
[![Code style](https://img.shields.io/badge/Code_style-standard-brightgreen.svg)](https://github.com/standard/standard)

Client to create, issue, manage and share Blockcerts certificates.

Demo: https://auther.org/demo

## Introduction

**Auther client** is an opensource client to create, issue, manage and share online Blockcerts certificates on the Ethereum blockchain.

This project is intended to be used with the [Auther API](https://github.com/AutherOrg/auther-api) project.

This project was bootstrapped with [Create React App](https://create-react-app.dev/). Please read the documentation if you are new to React.

## Installation

You must first install the [Auther API](https://github.com/AutherOrg/auther-api) project.

Then clone this project, go in the directory and install dependencies:

````
yarn install
````

Configure:

````
cp .env.development .env.development.local
nano .env.development.local
````

Start the app (in development mode)

````
yarn start
````

Now, you need to install the [Metamask extension](https://metamask.io/).

## Configuration

Open the app (http://localhost:3000), login and click on *System* then *Edit issuer profile*.

There are 3 important things:

+ Your Ethereum public key: use the one you just generated or imported with Metamask.
+ Issuer profile URL
+ Revocation list URL

**Those must NEVER change once you have issued real certificates, otherwise they will not validate any more.**

For the Issuer profile URL and Revocation list URL you have 2 options:

+ In development or test, the most practical is to host 2 files in a classic HTTP cloud server. In the issuer profile, enter their future URLs, like https://mystorage/issuer.json and https://mystorage/revocations.json (I'm just [using Github for this](https://github.com/AutherOrg/static/tree/master/ethereum/mainnet/issuers/fictionaluniversity))
+ In production, the most practical is to let Auther API serve the issuer profile and revocation list. Just replace api.fictionaluniversity.auther.org by your Auther API instance base URL in https://api.fictionaluniversity.auther.org/blockcerts/issuer and https://api.fictionaluniversity.auther.org/blockcerts/revocations

The big advantage of letting Auther serve the profile and the revocations is that you don't have to download those 2 files from the App and then upload them on your storage.

There is a big disadvantage as well: if, for one reason or another, your Auther API is not available one day, then ALL the certificates you issued will not validate any more.

In *System* there is a dashboard that checks that everything is fine.

## Issuing certificates

### Ethereum network considerations

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

+ Click on *Certificates* and create a new certificates batch
+ Select your .csv file
+ Select a model
+ Click on *Create*
+ Click on *Sign*
+ A Metamask popup should open. Sign the transaction here.
+ Wait for the transaction to be mined.
+ Click on *Finalize*
+ Click on *Upload certificates* when it appears.

### Gas price = 0

Especially on Ropsten, from time to time when submitting a transaction to Metamask, the gas price is set to 0 which would lead to a rejection. When it's the case, please click on "Edit" in the Metamask popup and click on a transaction speed (medium for instance).

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

The app has a route to help template development by displaying a preview of a certificate. If you app runs on http://locahost:3000 then you can access this route at http://locahost:3000/dev/template
By default this route uses the *default* template. To use your custom template, edit `src/components/dev/DevTemplate` and replace `import template from '../../templates/default/default.template'` by `import template from '../../templates/custom/custom.template'`

## General discussion, installation and configuration help

+ [Auther.org forum](https://auther.org/forum)

## Technical support and development services

+ You can [contact Auther's original author](https://guillaumeduveau.com/en/contact)

## Development

Please read the [contribution guidelines](CONTRIBUTING.md).

## Credits

+ [GIZ](https://www.giz.de/en/html/index.html) (Deutsche Gesellschaft für Internationale Zusammenarbeit GmbH): this application has been originally developed with financial support by GIZ Lab.
+ [SEAMEO INNOTECH](https://www.seameo-innotech.org/) (Regional Center for Educational Innovation and Technology, Southeast Asian Ministers of Education Organization) : this application has been originally developed for SEAMEO-INNOTECH.
