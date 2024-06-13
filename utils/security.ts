
import crypto from 'crypto';
// import fs from 'fs';

class Security {



    constructor() {


        this.generateKeys()

    }

    generateKeys(): void {
        
        window.crypto.subtle.generateKey(
            {
                name: 'AES-GCM',
                length: 256, // Key length in bits (e.g., 128, 192, or 256)
            },
            true, // Specify whether the key is extractable (true or false)
            ['encrypt', 'decrypt'] // Specify key usage (encrypt and decrypt for AES)
        ).then((key) => {
            // Key generation successful, key contains the generated AES key
            console.log('Generated AES key:', key);
        }).catch((error) => {
            // Handle any errors that occur during key generation
            console.error('Key generation error:', error);
        });


    }

    loadPublicKey(path: string | URL): void {

        // Generate a random AES key
        window.crypto.subtle.generateKey(
            {
                name: 'AES-GCM',
                length: 256,
            },
            true,
            ['encrypt', 'decrypt']
        ).then((key) => {
            // Use the generated key for encryption and decryption
            console.log('Generated AES key:', key);
        });
    }

}

// loadKey(path: string | null, callback: (string: null) => void): void {

//     fs.readFile(path, 'utf8', (err: any, data: any) => {
//         if (err) {
//             return callback(null)
//         }
//         return callback(data)
//     });
//     return callback(null)
// }


export default new Security();