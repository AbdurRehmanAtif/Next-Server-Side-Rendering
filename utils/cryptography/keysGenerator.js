"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
// Generate a new RSA key pair
var _a = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048, // Key size in bits
    publicKeyEncoding: {
        type: 'spki', // SubjectPublicKeyInfo format
        format: 'pem' // PEM format
    },
    privateKeyEncoding: {
        type: 'pkcs8', // PrivateKeyInfo format
        format: 'pem' // PEM format
    }
}), privateKey = _a.privateKey, publicKey = _a.publicKey;
// Print the private and public keys
console.log(privateKey);
console.log(publicKey);
