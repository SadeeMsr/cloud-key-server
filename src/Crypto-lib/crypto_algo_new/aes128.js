const crypto = require('crypto');

function encryptAES(data, key, iv) {
  const start = performance.now();
  const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
  let encrypted = cipher.update(data, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  const end = performance.now();
  console.log('Encryption Time:', end - start, 'millisecond');
  return encrypted;
}

function decryptAES(encryptedData, key, iv) {
  const start = performance.now();
  const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
  let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  const end = performance.now();
  console.log('Decryption Time:', end - start, 'millisecond');
  return decrypted;
}

// Example usage
const plaintext = 'Hello, we are all in!';
const key = Buffer.from(
  '00112233445566778899AABBCCDDEEFF', // 16 bytes for AES-128
  'hex'
);
const iv = Buffer.alloc(16, 0);

const encryptedText = encryptAES(plaintext, key, iv);
console.log('Encrypted:', encryptedText);

const decryptedText = decryptAES(encryptedText, key, iv);
console.log('Decrypted:', decryptedText);