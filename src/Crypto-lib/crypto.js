import crypto from 'crypto'
import dotenv from 'dotenv';

dotenv.config();


const algorithm = 'aes-256-cbc';
const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
const iv = crypto.randomBytes(16);


// Encrypt function
export const encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex')+"="+encrypted ;
};


// Decrypt function
export const decrypt = (hash) => {
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), Buffer.from(hash.iv, 'hex'));
  let decrypted = decipher.update(hash.encryptedText, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
};