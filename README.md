# Pokemon Tokens
## EECS 6883: Final Project, Spring 2022

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)]()

This is the repository of source code for our final project of EECS E6883: Blockchain.

This repository contains codes for:


1. Small contract for Pokemon tokens
2. React Dapp to interact with small contract
3. Deployment  on Huygens network

## Table of Contents

- [Pokemon Tokens](#pokemon-tokens)
  - [EECS 6883: Final Project, Spring 2022](#eecs-6883-final-project-spring-2022)
  - [Table of Contents](#table-of-contents)
  - [Background](#background)
  - [Install](#install)
  - [Small Contract](#small-contract)
  - [Dapp](#dapp)
  - [Huygens](#huygens)
  - [Authors](#authors)

## Background

**In this project, we try to develop non-fungiable token of Pokemon with following functions**
>1. Draw Pokemons
>2. Transfer Pokemon Coin
>3. Transfer Pokemons
>4. Pokemons combat

**The whole project can be divided into three parts:**
>1. Small Contract
>2. React Visualization
>3. Deploy on Huygens


## Install

The first things you need to do are cloning this repository and installing its
dependencies:

```sh
git clone https://github.com/kkkevinkkkkk/PokemonToken.git
cd PokemonToken
npm install
```

## Small Contract
Once installed, fristly we could run Hardhat's testing network:

```sh
npm run local-testnet
```

Open a new terminal, go to root directory of this project to deploy our contract and test it:

```sh
npm run deploy:local
npm run test
```

To create wallet to interact with deployed contract
```sh
npm run interact:local
```

## Dapp
To visualize interaction with small contract, we can run the frontend with:
```sh
cd frontend
npm install
npm start
```

> Note: There's [an issue in `ganache-core`](https://github.com/trufflesuite/ganache-core/issues/650) that can make the `npm install` step fail. 
>
> If you see `npm ERR! code ENOLOCAL`, try running `npm ci` instead of `npm install`.

Open [http://localhost:3000/](http://localhost:3000/) to see your Dapp. You will
need to have [Metamask](https://metamask.io) installed and listening to
`localhost 8545`.

## Huygens
To deploy our Pokemon contract on Huygens-dev network
```sh
npm run deploy-huygens
```
To use scripts to interact with contracts deployed on Huygens-dev network
```sh
npm run interact-huygens
```



## Authors



