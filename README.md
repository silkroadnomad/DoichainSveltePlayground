[![Vercel](https://vercelbadge.vercel.app/api/silkroadnomad/DoichainPlaygroundSvelte)](https://doichain-playground-svelte.vercel.app/)

# Doichain Playground Svelte

This repository serves as a reference and example for developing Doichain-connected web applications using Svelte. Doichain, a fork of Namecoin (which is itself a Bitcoin fork) created in 2018, supports merge mining with the Bitcoin blockchain.

Originally, Doichain aimed to mitigate email spam by recording email permissions (double opt-ins) without middle men via a 2nd-layer peer-to-peer protocol. Despite the project's cessation due to funding issues, the blockchain remains active.

We believe that a merge-mined blockchain, which utilizes the computational excess from Bitcoin mining to produce blocks, holds big value for storing transactions in a cost-effective and straightforward manner.

Doichain simplifies the process of storing, transferring, finding, displaying name-value pair transactions. Everytime it is doing so, it creates a non-fungible coin (NFC - just like NFTs) For example, the shell command:
```
doichain-cli name_doi ${name} ${value} [optional ${holder-address}]
```
clearly demonstrates this capability.

Consequently, Doichain makes it straightforward to store and transfer Doichain-NFTs (non-fungible-coins, somewhat similar to Bitcoin innscriptions) and various proofs of existence, positioning it as an ideal blockchain for emerging local-first, peer-to-peer applications that leverage technologies like libp2p, IPFS, and CRDTs such as OrbitDB.

This project aims to facilitate web application development for Doichain blockchain developers.

With the Doichain Playground you can:
- create seed phrases and Doichain wallets with javascript in browser (and NodeJS)
- make and send coin and name (Doichain-NFT & PoE) transactions via Electrumx
- create multisig addresses and multisig transactions
- store a non-fungible-coin (NFC) (Doichain-NFT)
- store other PoE (Proof-Of-Existence)
- query Doichain blockchain for balances and transactions (non-fungible-coins, Doichain-NFTs) and PoEs  

# Usage:
1. Clone this repo. 
2. Optionally for local development, start local Doichaind & Electrumx using ```docker-compose up -d.```
3. Connect to the regtest container and:
   - Run ```doichain-cli help``` to see command help.
   - Run ```doichain-cli getblockchaininfo``` to view initial blocks.
   - Run ```doichain-cli getnewaddress``` to generate a new address.
   - Run ```doichain-cli getbalance``` to check balance.
   - Run ```doichain-cli generatetoaddress 1 [address]``` to generate a new block.
   - Run ```doichain-cli getblock <block hash>``` to see transactions.
   - Run ```doichain-cli gettransaction <transaction hash>``` to view transaction details and note the DOI amount (immature, requiring another 100 blocks to mature).
   - Run ```doichain-cli generatetoaddress 100 [address]``` to mature the first block and receive 50 DOI.
   - Run ```doichain-cli getbalance``` to see updated balance. 
4. Run ```npm install```
5. Run npm run dev to start the Doichain Developer Playground. 
6. Go to the "Transactions" menu to query your Doichain address
7. Mark an unspent output (UTXO) and send it to another address  
8. Create a new block to observe the transaction.

## References:
- Learning Bitcooin https://github.com/BlockchainCommons/Learning-Bitcoin-from-the-Command-Line/tree/master
- Cryptography-Toolkit https://guggero.github.io/cryptography-toolkit/#!/
  - Hierarchical Deterministic Wallet (BIP32/38/39/44/49/84) https://guggero.github.io/cryptography-toolkit/#!/hd-wallet
- Bitcoin-Improvement Proposals (bips) https://github.com/bitcoin/bips
- BitcoinJS-Lib https://github.com/bitcoinjs/bitcoinjs-lib
- Electrum Protocol https://electrumx.readthedocs.io/en/latest/protocol.html

## Todos:
- [x] add Dockerfile and docker-compose.yml with Doichain Node and ElectrumX
    - [x] generating Electrumx self signed server certificates on startup (for secure websocket in local development)
    - [x] adding a network dropdown (Doichain Mainnet / Doichain RegTest) to +layout.svelte
    - [x] connecting to RegTest Electrumx (Remark: doesn't work with Chrome - using self signed certificate! Use Firefox or add exception)
    - [ ] add nginx, letsencrypt and enable wss for Electrumx for production use
- [x] generate mnemonic
- [x] create xpriv and xpub from mnemonic 
- [x] generate new (legacy) p2pkh addressP2pkh from a derivation path 
- [x] generate a segwit addressP2pkh p2wpkh
  - https://github.com/bitcoinjs/bitcoinjs-lib/blob/master/test/integration/addresses.spec.ts#L57
- [x] generate a segwit addressP2pkh p2sh from p2wpkh  
  - https://github.com/bitcoinjs/bitcoinjs-lib/blob/master/test/integration/addresses.spec.ts#L66
- [ ] generate a P2WSH (SegWit), pay-to-multisig (3-of-4) addressP2pkh 
  - https://github.com/bitcoinjs/bitcoinjs-lib/blob/master/test/integration/addresses.spec.ts#L77
- [x] connect to Electrumx (which connects to Doichaind) via local Docker or remote url
  - [x] electrumx (DOI) support secure websockets
  - [x] connection via wss
  - [x] connect to local Electrumx (Docker compose) for developers
- [x] list txs of a wallet in a datatable component
  - [x] cache txs in IndexedDB 
  - [x] default sort txs by blocktime descending
  - [x] filter & paginator 
  - [x] display amount received (+) and sent (-)
    - [x] display outputs (utxos) as received
    - [x] display inputs as sent 
      - [x] find address in previous tx
    - [ ] double check addresses (received & sent)
    - [x] two txids appear twice (change txs) in txs, keep only one but accumulate values
  - [ ] display nameId, nameValue, address
- [x] display wallet balance 
  - [x] of a single address
  - [ ] of a xpub and it's derivations bip32, bip44, bip49,.. 
- [ ] create a simple coin (DOI) transaction 
  - [x] choose utxos from datatable 
  - [x] add an amount, address texfield
  - [x] storing, deleting, displaying mnemonics via IndexDB
  - [x] encryption and decryption of mnemonic via password 
  - [x] sign transaction by entering optional private key (wif)
  - [x] sign non-witness transactions (legacy)
  - [x] sign witness transactions (segwit)
  - [ ] change address
    - [ ] send change back to same address
    - [ ] generate change address from derivation path 
  - [ ] calculate fee (and substract from utxos amount to be sent)
  - [ ] sign in Electrum (psbt)
  - [ ] sign by hardware wallet 
    - [ ] Ledger
    - [ ] BitBox
    - [ ] Trezor
- [ ] create name_doi, name_first, name_update transaction and store
  - a proof-of-existence
  - a Doichain-NFT (NFC non-fungible-coin)
- [ ] find and show NFCs via Electrumx
- [ ] spend from a multisig address
- [ ] automate spending from a multisig address
- [ ] research and test DoiWallet and ElectrumDoi seed phrases and keys

## Nice 2 have:
- [ ] progress bar or similar when loading many txs
- [ ] indexDB cache for transaction history and its txs 
- [ ] add xpub support for transaction list (full wallet balance and txs) 
- [x] choose current ElectrumX from random list
- [ ] deploy to IPFS
- [ ] choose from different derivation path standards (bip32, bip44, bip49, ...)
- [ ] test DoiWallet and ElectrumDoi seed phrases and keys
- [ ] use alternatively 24-words for seed phrases
- [ ] add a network dropdown (e.g. Bitcoin-Mainnet, Bitcoin-Testnet, Bitcoin-RegTest, Doichain,...)
- [ ] use a better entropy / random generator


