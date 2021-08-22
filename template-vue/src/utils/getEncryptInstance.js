import CryptoJS from 'crypto-js';

/* 加密解密工具类
 * @return {object}{}  {encrypt, decrypt, hmacSHA256}
 */
// 密钥 16 位
const key = 'fb00c54f95b32239';
const sha256_key = 'fb00c54f95b32239';
// 初始向量 initial vector 16 位
const iv = 'ABC123EFS987QW==';

const getAesString = (str, key, iv) => {
  //加密
  key = CryptoJS.enc.Utf8.parse(key);
  iv = CryptoJS.enc.Utf8.parse(iv);
  let encrypted = CryptoJS.AES.encrypt(str, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString(); //返回的是base64格式的密文
};

const getDAesString = (encrypted, key, iv) => {
  //解密
  key = CryptoJS.enc.Utf8.parse(key);
  iv = CryptoJS.enc.Utf8.parse(iv);
  let decrypted = CryptoJS.AES.decrypt(encrypted, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return CryptoJS.enc.Utf8.stringify(decrypted); //
};

export const encrypt = str => {
  //加密
  let encrypted = getAesString(str, key, iv); //密文
  return encrypted;
};

export const decrypt = data => {
  //解密
  let decryptedStr = getDAesString(data, key, iv);
  return decryptedStr;
};

export const hmacSHA256 = str => {
  return CryptoJS.HmacSHA256(str, sha256_key).toString();
};
