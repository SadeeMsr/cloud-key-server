// Import the crypto module for cryptographic operations
const crypto = require('crypto');

// Function to generate RSA key pair
function generateRSAKeyPair() {
  // Generate an RSA key pair with a modulus length of 2048 bits
  return crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
  });
}

// Function to encrypt data with RSA public key
function encryptWithRSAPublicKey(publicKey, data) {
  // Record the start time for encryption
  const start = performance.now();
  
  // Encrypt the data using the RSA public key and OAEP padding
  const encryptedData = crypto.publicEncrypt({
    key: publicKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING
  }, Buffer.from(data, 'utf-8'));
  
  // Record the end time for encryption
  const end = performance.now();

  // Log the encryption time
  console.log('Encryption Time:', end - start, 'ms');

  // Return the base64-encoded encrypted data
  return encryptedData.toString('base64');
}

// Function to decrypt data with RSA private key
function decryptWithRSAPrivateKey(privateKey, encryptedData) {
  // Record the start time for decryption
  const start = performance.now();

  // Decrypt the data using the RSA private key and OAEP padding
  const decryptedData = crypto.privateDecrypt({
    key: privateKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING
  }, Buffer.from(encryptedData, 'base64'));

  // Record the end time for decryption
  const end = performance.now();

  // Log the decryption time
  console.log('Decryption Time:', end - start, 'ms');

  // Return the decrypted data as a UTF-8 encoded string
  return decryptedData.toString('utf-8');
}

// Example usage
// Generate RSA key pair
const { publicKey, privateKey } = generateRSAKeyPair();

// Define the plaintext data to be encrypted
const plaintextData = 'Hello, this is RSA encryption!';

// Log the original data
console.log('Original Data:', plaintextData);

// Encrypt the data with the RSA public key
const encryptedData = encryptWithRSAPublicKey(publicKey, plaintextData);
// Log the encrypted data
console.log('Encrypted Data:', encryptedData);

// Decrypt the data with the RSA private key
const decryptedData = decryptWithRSAPrivateKey(privateKey, encryptedData);
// Log the decrypted data
console.log('Decrypted Data:', decryptedData);
