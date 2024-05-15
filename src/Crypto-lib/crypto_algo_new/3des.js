const crypto = require('crypto');

// Function to encrypt text using 3DES
function encryptText(text, key) {
  const iv = Buffer.alloc(8, 0); // IV size for 3DES is 8 bytes
  const cipher = crypto.createCipheriv('des-ede3-cbc', key, iv);
  let encrypted = '';

  console.time('encryptionTime');
  encrypted += cipher.update(text, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  console.timeEnd('encryptionTime');

  return encrypted;
}

// Function to decrypt text using 3DES
function decryptText(encryptedText, key) {
  const iv = Buffer.alloc(8, 0); // IV size for 3DES is 8 bytes
  const decipher = crypto.createDecipheriv('des-ede3-cbc', key, iv);
  let decrypted = '';

  console.time('decryptionTime');
  decrypted += decipher.update(encryptedText, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  console.timeEnd('decryptionTime');

  return decrypted;
}

// Example usage
const text = 'Hello, world!';
const key = Buffer.from('123456781234567812345678', 'utf8'); // 24 bytes key (192 bits)

// Encrypt
const encryptedText = encryptText(text, key);
console.log('Encrypted:', encryptedText);

// Decrypt
const decryptedText = decryptText(encryptedText, key);
console.log('Decrypted:', decryptedText);