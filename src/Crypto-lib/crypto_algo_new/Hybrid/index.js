// Import the crypto module for cryptographic operations
const crypto = require('crypto');

// Function to generate a random symmetric key
function generateSymmetricKey() {
  return crypto.randomBytes(32); // 256 bits for AES-256
}

// Function to encrypt data with the symmetric key
function encryptWithSymmetricKey(symmetricKey, data) {
  // Generate a random Initialization Vector (IV) for AES
  const iv = crypto.randomBytes(16);
  
  // Record the start time for encryption
  const startTime = performance.now();
  
  // Create a cipher using AES-256 in CBC mode with the symmetric key and IV
  const cipher = crypto.createCipheriv('aes-256-cbc', symmetricKey, iv);
  
  // Update the cipher with the data, specifying input and output encoding
  let encryptedData = cipher.update(data, 'utf-8', 'base64');
  
  // Finalize the cipher to get the remaining encrypted data
  encryptedData += cipher.final('base64');
  
  // Record the end time for encryption
  const endTime = performance.now();
  
  // Calculate the elapsed time in milliseconds
  const elapsedTime = endTime - startTime;
  
  // Return the IV, encrypted data, and encryption time
  return { iv, encryptedData, elapsedTime };
}

// Function to decrypt data with the symmetric key
function decryptWithSymmetricKey(symmetricKey, iv, encryptedData) {
  // Record the start time for decryption
  const startTime = performance.now();
  
  // Create a decipher using AES-256 in CBC mode with the symmetric key and IV
  const decipher = crypto.createDecipheriv('aes-256-cbc', symmetricKey, iv);
  
  // Update the decipher with the encrypted data, specifying input and output encoding
  let decryptedData = decipher.update(encryptedData, 'base64', 'utf-8');
  
  // Finalize the decipher to get the remaining decrypted data
  decryptedData += decipher.final('utf-8');
  
  // Record the end time for decryption
  const endTime = performance.now();
  
  // Calculate the elapsed time in milliseconds
  const elapsedTime = endTime - startTime;
  
  // Return the decrypted data and decryption time
  return { decryptedData, elapsedTime };
}

// Function to generate an asymmetric key pair
function generateAsymmetricKeyPair() {
  // Generate an RSA key pair with a modulus length of 2048 bits
  return crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
  });
}

// Function to encrypt the symmetric key with the public key
function encryptSymmetricKeyWithPublicKey(publicKey, symmetricKey) {
  // Encrypt the symmetric key with RSA public key using OAEP padding
  return crypto.publicEncrypt({
    key: publicKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING
  }, symmetricKey);
}

// Function to decrypt the symmetric key with the private key
function decryptSymmetricKeyWithPrivateKey(privateKey, encryptedSymmetricKey) {
  // Decrypt the symmetric key with RSA private key using OAEP padding
  return crypto.privateDecrypt({
    key: privateKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING
  }, encryptedSymmetricKey);
}

// Function for hybrid encryption
function hybridEncrypt(data) {
  // Step 1: Generate a random symmetric key
  const symmetricKey = generateSymmetricKey();

  // Step 2: Encrypt data with the symmetric key
  const { iv, encryptedData, elapsedTime: encryptionTime } = encryptWithSymmetricKey(symmetricKey, data);

  // Step 3: Generate an asymmetric key pair
  const { publicKey, privateKey } = generateAsymmetricKeyPair();

  // Step 4: Encrypt the symmetric key with the public key
  const encryptedSymmetricKey = encryptSymmetricKeyWithPublicKey(publicKey, symmetricKey);

  // Return the encrypted data, IV, encrypted symmetric key, private key, and encryption time
  return {
    encryptedData,
    iv: iv.toString('base64'),
    encryptedSymmetricKey: encryptedSymmetricKey.toString('base64'),
    privateKey,
    encryptionTime
  };
}

// Function for hybrid decryption
function hybridDecrypt(encryptedData, iv, encryptedSymmetricKey, privateKey) {
  // Step 1: Decrypt the symmetric key with the private key
  const symmetricKey = decryptSymmetricKeyWithPrivateKey(privateKey, Buffer.from(encryptedSymmetricKey, 'base64'));

  // Step 2: Decrypt the data with the symmetric key
  const { decryptedData, elapsedTime: decryptionTime } = decryptWithSymmetricKey(symmetricKey, Buffer.from(iv, 'base64'), encryptedData);

  // Return the decrypted data and decryption time
  return { decryptedData, decryptionTime };
}

// Example usage
// Define the plaintext data to be encrypted
const plaintextData = 'Hello, this is a hybrid encryption example!';

// Encrypt the data and measure encryption time
const encryptedResult = hybridEncrypt(plaintextData);
console.log('Encrypted Data:', encryptedResult.encryptedData);
console.log('Encryption Time:', encryptedResult.encryptionTime.toFixed(2), 'ms');

// Decrypt the data and measure decryption time
const { decryptedData, decryptionTime } = hybridDecrypt(
  encryptedResult.encryptedData,
  encryptedResult.iv,
  encryptedResult.encryptedSymmetricKey,
  encryptedResult.privateKey
);
console.log('Decrypted Data:', decryptedData);
console.log('Decryption Time:', decryptionTime.toFixed(2), 'ms');
