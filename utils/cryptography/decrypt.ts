import crypto from 'crypto';
const fs = require('fs');

let privateKey = "";
let publicKey = "";

fs.readFile('../../../private-key.pem', 'utf8', (err: any, data: any) => {
    if (err) {
        return;
    }
    privateKey = data;
});

fs.readFile('../../../public-key.pem', 'utf8', (err: any, data: any) => {
    if (err) {
        return;
    }
    publicKey = data;
});

function decryptWithPrivateKey(encryptedData: Buffer) {
    // Decrypt Data with Private Key
    return crypto.privateDecrypt({
        key: privateKey,
        padding: constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256', // Use the appropriate hash algorithm
    }, encryptedData);
}

function decryptWithPublicKey(encryptedData: Buffer) {
    // "Decrypt" the data with the public key (not secure in practice)
    const decrypted = crypto.publicDecrypt({
        key: publicKey,
    }, encryptedData);
    return decrypted.toString('utf-8');
}

module.exports = {
    decryptWithPrivateKey,
    decryptWithPublicKey
};