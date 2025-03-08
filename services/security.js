const CryptoJS = require("crypto-js");
async function passwordEncryption(password) {
    console.log("password",password)
    console.log(">>",process.env.MONGOLAB_URI)


    console.log("SECRET_KEY:", process.env.SECRET_KEY);

    try {
        const encryptedData = await CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString();
        console.log("encryptedData",encryptedData)
        return  encryptedData ;
    } catch (error) {
        throw new Error("Encryption failed");
    }
}

function passwordDecryption(encryptedData) {
    console.log("encryptedData", encryptedData);

    if (!encryptedData || typeof encryptedData !== 'string') {
        throw new Error("No encrypted data provided or data is not a string");
    }

    try {
        console.log("SECRET_KEY:", process.env.SECRET_KEY);
        const bytes = CryptoJS.AES.decrypt(encryptedData, process.env.SECRET_KEY);
        console.log("Bytes:", bytes);
        const data = bytes.toString(CryptoJS.enc.Utf8);
        console.log("Decrypted data:", data);
        
        if (!data) throw new Error("Decryption failed: Invalid ciphertext");

        return data;
    } catch (error) {
        console.error("Decryption error:", error.message);
        throw new Error("Decryption failed");
    }
}

module.exports = {
    passwordEncryption,
    passwordDecryption
};
