import { address, crypto } from 'bitcoinjs-lib';
import Buffer from 'vite-plugin-node-polyfills/shims/buffer/index.js';

export const getBalance = async (_doiAddress, _electrumClient, _network) => {
    let script = address.toOutputScript(_doiAddress, _network);
    let hash = crypto.sha256(script);
    let reversedHash = Buffer.from(hash.reverse()).toString("hex");

    const balance = await _electrumClient.request('blockchain.scripthash.get_balance', [reversedHash]);
    return balance;
};