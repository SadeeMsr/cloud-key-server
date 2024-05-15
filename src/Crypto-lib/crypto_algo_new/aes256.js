const crypto = require('crypto');
const { performance } = require('perf_hooks');

const algorithm = 'aes-256-cbc';
const key = 'mypasswith32chars>>AES_256_bytes'; //crypto.randomBytes(32);
const iv = crypto.randomBytes(16); // initialization vector

function encrypt(text) {
  let startTime = performance.now();

  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  let endTime = performance.now();
  let elapsedTime = endTime - startTime;
  return {
    iv: iv.toString('hex'),
    encryptedData: encrypted.toString('hex'),
    elapsedTime,
  };
}

function decrypt(text) {
  let startTime = performance.now();

  let iv = Buffer.from(text.iv, 'hex');
  let encryptedText = Buffer.from(text.encryptedData, 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  let endTime = performance.now();
  let elapsedTime = endTime - startTime;
  return { decryptedData: decrypted, elapsedTime };
}

const textToEncrypt =
  'Enhancing patient data security in cloud storage through hybrid encryption';
const textToEncryptAsByteArray = Buffer.from(textToEncrypt);

// Encrypt
var encryptionResult = encrypt(textToEncryptAsByteArray);
console.log('Encrypt result', encryptionResult);
console.log('Encryption Time:', encryptionResult.elapsedTime, 'milliseconds');

// Decrypt
let decryptionResult = decrypt(encryptionResult);
let decryptedContentAsText = decryptionResult.decryptedData.toString();
console.log('Decrypt result', decryptedContentAsText);
console.log('Decryption Time:', decryptionResult.elapsedTime, 'milliseconds');
