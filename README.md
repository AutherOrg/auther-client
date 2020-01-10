# Blockcerts Ethereum client

Client to create, issue, manage and share [Blockcerts](https://www.blockcerts.org) certificates on Ethereum.

## Introduction

**blockcerts-ethereum-client** is an opensource client to create, issue, manage and share online Blockcerts certificates on the Ethereum blockchain. Issuing a batch of up to thousands of certificates does not even cost $0.01.

This project is purely a client-side frontend application and can be used alone. However, it's intended to be best used with the [Blockcerts API](https://github.com/guix77/blockcerts-api) project.

*This application has been originally developed with financial support by GIZ Lab as a component of a project with [GIZ](https://www.giz.de/en/html/index.html) (Deutsche Gesellschaft für Internationale Zusammenarbeit GmbH) and [SEAMEO INNOTECH](https://www.seameo-innotech.org/) (Regional Center for Educational Innovation and Technology, Southeast Asian Ministers of Education Organization).*

## Installation (basic)

This project was bootstrapped with [Create React App](https://create-react-app.dev/). Please read the documentation if you are new to React, otherwise you know what to do.

Install and launch application:

````
yarn install
yarn start
````

To sign certificates, you will need to have Ethereum connectivity in your browser. You can for instance install the [Metamask](https://metamask.io/) extension (Firefox + Chrome). Also, you will need to have a little bit of Ether. On the Ethereum testnet Ropsten, you can have some for free. On Ethereum Mainnet, on which you should issue real certificates, it won't even cost $0.01 to issue a batch of up to thousands certificates.

## Installation (along with blockcerts-api)

To share online certificates, you will need to install the [Blockcerts API](https://github.com/guix77/blockcerts-api) project as well. Without it, you can still create, issue and manage certificates, but to enable people to view them they will have to upload the JSON certificates. Also, *Blockcerts API* has email notifications, whereas this pure client-side application doesn't.

First install, configure and launch *Blockcerts-API* and then come back here.

````
cp .env.development .env.development.local
cp .env.production .env.development.production
````

Edit .env.development.local and / or .env.production.local accordingly to your setup.

## Issuing certificates

TODO

### Certificates sources

TODO

### Certificates templates

TODO

## Production considerations

Along with classic considerations for production release (among other things, see [React documentation](https://create-react-app.dev/docs/production-build/) if needed), you have to make a major decision that will impact ALL the certificates you issue: the management of the issuer profile and the revocation list.

As you probably know, they are both JSON files. The issuer profile JSON's URL is in each certificate issued by an issuer. The URL where it is hosted must never change, otherwise all previously issued certificates will not be valid any more.

This application allows you to generate both those JSON files. In a development / test instance and together with a dev / test *Blockcerts-API* instance, for your convenience it's possible to host those JSONs in the API.

**In production we advise NOT to use this feature, but to host those 2 files traditionnally on a simple classic HTTP server. Even better, you could additionnaly use the [w3id.org](https://w3id.org/), the Permanent Identifiers for the Web project.**

## Issues

Please report issues [here](https://github.com/guix77/blockcerts-ethereum-client/issues).

## General discussion

Please post on the [Blockcerts.org forum topic](https://community.blockcerts.org/t/TODO).

## Development

Please read the [contribution guidelines](CONTRIBUTING.md).

## Credits

### Developers

+ Guillaume Duveau, freelance blockchain & web developer, original author of this [Blockcerts](https://guillaumeduveau.com/en/blockcerts) Ethereum application

### Partners

+ [GIZ](https://www.giz.de/en/html/index.html) (Deutsche Gesellschaft für Internationale Zusammenarbeit GmbH)
+ [SEAMEO INNOTECH](https://www.seameo-innotech.org/) (Regional Center for Educational Innovation and Technology, Southeast Asian Ministers of Education Organization)
