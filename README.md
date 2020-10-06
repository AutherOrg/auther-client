# Auther client

[![Lint](https://github.com/AutherOrg/auther-client/workflows/Lint/badge.svg)](https://github.com/AutherOrg/auther-client/actions?query=workflow%3A%22Lint%22)
[![Code style](https://img.shields.io/badge/Code_style-standard-brightgreen.svg)](https://github.com/standard/standard)

Client to create, issue, manage and share Blockcerts certificates.

Demo: https://auther.org/demo

## Introduction

**Auther client** is an opensource client to create, issue, manage and share online Blockcerts certificates on the Ethereum blockchain. This project is intended to be used with the [Auther API](https://github.com/AutherOrg/auther-api) project.

*This project was bootstrapped with [Create React App](https://create-react-app.dev/). Please read the documentation if you are new to *React.

## Requirements

+ Node.JS 13 (below might be possible)
+ Yarn (you can also use NPM but only in second choice)
+ Installation of [Auther API](https://github.com/AutherOrg/auther-api).
+ [Metamask extension for Chrome & Firefox](https://metamask.io/).

## Local / development install

Install dependencies: ````yarn install````

Then, eventually customize:

````
cp .env.development .env.development.local
nano .env.development.local
````

Finally, start the app: ````yarn start````

### Configuration

Open the app (http://localhost:3000), login with the admin account created in Auther API and click on *System* then *Edit issuer profile*.

Edit your Ethereum public key: **it must be the one in Metamask**.

By default, Issuer profile URL and Revocation list URL are:
+ http://localhost:4000/blockcerts/issuer
+ http://localhost:4000/blockcerts/revocations

If you are not using localhost:4000 for Auther API, edit those fields as needed.

Customize all the other fields as you like.

Finally, verify in *System* that the config is valid.

## Issuing certificates

### Ethereum network considerations

#### Ropsten (Ethereum test network)

By default the app uses the Ropsten network, which is an Ethereum testnet on which you can get Ether for free. The app will ask you to switch to Ropsten if you are on another network. You need to get free Ropsten Ether (click on *Deposit* then *Ropsten Faucet*).

#### MainNet (Ethereum real network)

To issue certificates on MainNet you need to buy Ether.

Also, you must edit your environment file (.env.development.local or .env.production.local, depending on if you are using React's development mode or a built artifact) and change `REACT_APP_ETHEREUM_NETWORK=Ropsten` to `REACT_APP_ETHEREUM_NETWORK=MainNet`.

The app will ask you to switch to MainNet if you are on another network.

### Issuing process

+ Certificates are built from Models (course name, description etc.) and Templates.
+ Models need at least 1 signature (the course responsible).

There is 1 signature by default, 1 model by default and 1 template by default.

You can easily:
+ Add, edit, remove signatures
+ Same for models

For templates, see the adhoc doc section.

Finally, to issue a certificate batch, you need a .csv file listing your recipients, like this:

recipients.csv:
````
Name,Email
Jane Doe,jane.doe@example.com
John Doe,john.doe@example.com
````

To issue a certificates batch:

+ Click on *Certificates* and create a new certificates batch
+ Select your .csv file
+ Select a model
+ Click on *Create*
+ Click on *Sign*
+ A Metamask popup should open. Sign the transaction here.
+ Wait for the transaction to be mined.
+ Click on *Finalize*
+ Click on *Finalize jobs* when it appears.

### Workarounds

#### Gas price = 0

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

## Production install

Like any *Create React* app:

````
cp .environment.prod .environment.prod.local
nano .environment.prod.local (don't forget to use the URL of your production Auther API and the MainNet Ethereum network)
yarn build
````

And upload the build folder somewhere online, for instance on https://myissuer.org. Let's also say that you installed the production Auther API on https://myissuer-api.org

In *System > Edit issuer profile* update:
+ The Issuer profile URL to https://myissuer-api.org/blockcerts/issuer
+ The Revocation list URL to https://myissuer-api.org/blockcerts/revocations

**IMPORTANT: In production, your Ethereum public key, your Issuer profile URL and your Revocation list URL must NEVER change once you have issued real certificates, otherwise they will not validate any more.**

### Advanced

For the Issuer profile URL and Revocation list URL, you can also export them from Auther to files and host them on a basic HTTP server. For instance, if you host those files on your main website that should last as long as your organization exists, then all the certificates that you issue will still validate, even if one day your Auther instance goes down for a reason or another. Beware tough, the links in the emails sent by Auther won't answer any more if your Auther is down...

To do this, in *System*, each time you modify the Issuer profile and revoke/unrevoke a certificate, export the JSON file from Auther and upload the new version on your static server.

Not very practical honestly. The best is to let Auther manage all of this for you and just ensure that your server hosting Auther never goes down.

## General discussion, installation and configuration help

+ [Auther.org forum](https://auther.org/forum)

## Technical support and development services

+ You can [contact Auther's original author](https://guillaumeduveau.com/en/contact)

## Development

Please read the [contribution guidelines](CONTRIBUTING.md).

## Credits

+ [GIZ](https://www.giz.de/en/html/index.html) (Deutsche Gesellschaft für Internationale Zusammenarbeit GmbH): this application has been originally developed with financial support by GIZ Lab.
+ [SEAMEO INNOTECH](https://www.seameo-innotech.org/) (Regional Center for Educational Innovation and Technology, Southeast Asian Ministers of Education Organization) : this application has been originally developed for SEAMEO-INNOTECH.
