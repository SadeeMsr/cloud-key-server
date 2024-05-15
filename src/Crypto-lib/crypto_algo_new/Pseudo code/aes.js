const Nb = 4; // Number of columns in the state
const Nk = 4; // Number of 32-bit words in the key
const Nr = 10; // Number of rounds

function aesEncrypt(plaintext, key) //  take plaintext (an array of bytes) and key (the encryption key) as input

{
    let state = createMatrix(plaintext);
    let roundKeys = keyExpansion(key);

    addRoundKey(state, roundKeys, 0);

    for (let round = 1; round < Nr; round++) {
        subBytes(state);
        shiftRows(state);
        mixColumns(state);
        addRoundKey(state, roundKeys, round);
    }

    subBytes(state);
    shiftRows(state);
    addRoundKey(state, roundKeys, Nr);

    return flattenMatrix(state);
}

function createMatrix(data) {
    let matrix = [];
    for (let col = 0; col < Nb; col++) {
        matrix.push([]);
        for (let row = 0; row < 4; row++) {
            matrix[col].push(data[col * 4 + row]);
        }
    }
    return matrix;
}

function flattenMatrix(matrix) {
    let flatArray = [];
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < Nb; col++) {
            flatArray.push(matrix[col][row]);
        }
    }
    return flatArray;
}

function keyExpansion(key) {
    let roundKeys = [];
    for (let i = 0; i < Nk; i++) {
        roundKeys.push(key.slice(i * 4, i * 4 + 4));
    }

    for (let col = Nk; col < Nb * (Nr + 1); col++) {
        let temp = roundKeys[col - 1].slice();

        if (col % Nk === 0) {
            temp = subWord(rotWord(temp));
            temp[0] ^= Rcon[col / Nk];
        } else if (Nk > 6 && col % Nk === 4) {
            temp = subWord(temp);
        }

        roundKeys.push(xorWords(roundKeys[col - Nk], temp));
    }

    return roundKeys;
}

// Other functions (subBytes, shiftRows, mixColumns, addRoundKey, rotWord, subWord, xorWords) would go here

// Constants
const Rcon = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1B, 0x36];

