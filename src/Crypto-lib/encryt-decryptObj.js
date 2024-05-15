import { decrypt, encrypt } from "./crypto.js";


export const encryptObjectFields = (inputObject) => {
    const encryptedObject = {};
  
    for (const [key, value] of Object.entries(inputObject)) {
      if (typeof value === 'string' && key !== 'date') {
        const val = JSON.stringify(value)
        const encryptedValue = encrypt(val);
        encryptedObject[key] = encryptedValue;
      } else {
        encryptedObject[key] = value;
      }
    }
    return encryptedObject;
  };


  export const decryptObjectFields = (encryptedArray) => {
    return encryptedArray.map((encryptedObject) => {
      const decryptedObject = {};
  
      for (const [key, value] of Object.entries(encryptedObject)) {
        if (typeof value === 'string' && value.includes('=')) {
          const [iv, encryptedText] = value.split('=');
          decryptedObject[key] = decrypt({ iv, encryptedText });
        } else {
          decryptedObject[key] = value;
        }
      }
  
      return decryptedObject;
    });
  };

