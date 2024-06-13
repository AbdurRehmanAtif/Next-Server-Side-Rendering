import * as crypto from 'crypto';

// Generate a new RSA key pair
const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048, // Key size in bits
  publicKeyEncoding: {
    type: 'spki', // SubjectPublicKeyInfo format
    format: 'pem' // PEM format
  },
  privateKeyEncoding: {
    type: 'pkcs8', // PrivateKeyInfo format
    format: 'pem' // PEM format
  }
});

// Print the private and public keys
console.log(privateKey);
console.log(publicKey);
