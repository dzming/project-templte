const CryptoJS = require("crypto-js"); // 引用AES源码js
const uuidv1 = require("uuid");

const key = CryptoJS.enc.Base64.parse("bowe3SoUembPHoiaSEsdfn=="); // 十六位十六进制数作为密钥
const iv = CryptoJS.enc.Base64.parse("MunsdVRkf8SXMeibueYyO0=="); // 十六位十六进制数作为密钥偏移量

const defaultData = {
  traceId: uuidv1().replace(/-/g, ""),
  signKey: "wezmbie23Webcmzmboe57m8238b92h",
};

// 排序的函数
function objKeySort(obj: any) {
  const newkey = Object.keys(obj).sort();
  // 先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
  const newObj: any = {}; // 创建一个新的对象，用于存放排好序的键值对
  for (let i = 0; i < newkey.length; i++) {
    // 遍历newkey数组
    newObj[newkey[i]] = obj[newkey[i]]; // 向新创建的对象中按照排好的顺序依次增加键值对
  }
  return newObj; // 返回排好序的新对象
}

// 获取api接口加密getSignture
function getSignture(data: any) {
  data = Object.assign({}, data, defaultData, {
    timestamp: +new Date(),
  });
  // 排序
  data = objKeySort(data);
  // 键值对拼接请求参数
  let strs = "";
  for (const i in data) {
    let temp = data[i];
    if (typeof temp === "string") {
      temp = temp.substr(0, 5000);
    }
    strs += i + temp;
  }
  // 加上signKey的value
  strs += "B39BmzYEWibNFhfoew3206SBlLJhie";
  // md5加密并截取第5位带第30位后转换大写
  const signature = CryptoJS.MD5(strs)
    .toString()
    .substr(4, 35)
    .toUpperCase();
  // 返回签名后的结果
  return Object.assign({}, data, {
    signature,
  });
}

// 解密方法
function Decrypt(word: string) {
  // let encryptedHexStr = CryptoJS.enc.Hex.parse(word);

  const srcs = CryptoJS.enc.Base64.parse(word);
  const ciphertext = CryptoJS.enc.Base64.stringify(srcs);
  const decrypt = CryptoJS.AES.decrypt(ciphertext, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

// 加密方法
function Encrypt(word: string) {
  word = getSignture(word);
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(word), key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  const srcs = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
  return srcs;
}

const md5 = (str: string) => {
  return CryptoJS.MD5(str).toString();
};

export { Decrypt, Encrypt, getSignture, md5 };

// const CryptoJS = require("crypto-js");

// // 密钥 16 位
// const key = "fb00c54f95b32239";
// const sha256_key = 'fb00c54f95b32239';
// // 初始向量 initial vector 16 位
// const iv = "ABC123EFS987QW==";

// function getAesString(str: string, key: string, iv: string) {
//   //加密
//   key = CryptoJS.enc.Utf8.parse(key);
//   iv = CryptoJS.enc.Utf8.parse(iv);
//   let encrypted = CryptoJS.AES.encrypt(str, key, {
//     iv: iv,
//     mode: CryptoJS.mode.CBC,
//     padding: CryptoJS.pad.Pkcs7
//   });
//   return encrypted.toString(); //返回的是base64格式的密文
// };

// function getDAesString(encrypted: string, key: string, iv: string) {
//   //解密
//   console.log(encrypted, key, iv);
//   key = CryptoJS.enc.Utf8.parse(key);
//   iv = CryptoJS.enc.Utf8.parse(iv);
//   let decrypted = CryptoJS.AES.decrypt(encrypted, key, {
//     iv: iv,
//     mode: CryptoJS.mode.CBC,
//     padding: CryptoJS.pad.Pkcs7
//   });
//   return CryptoJS.enc.Utf8.stringify(decrypted); //
// };

// export const encrypt = (str: string) => {
//   //加密
//   let encrypted = getAesString(str, key, iv); //密文
//   // let encrypted1 = CryptoJS.enc.Utf8.parse(encrypted);
//   return encrypted;
// };

// export const decrypt = (data: string) => {
//   //解密
//   let decryptedStr = getDAesString(data, key, iv);
//   return decryptedStr;
// };

// export const hmacSHA256 = (str: string) => {
//   // 非对称加密
//   return CryptoJS.HmacSHA256(str, sha256_key);
// };

// export const md5: any = (str: any) => {
//   return CryptoJS.MD5(str).toString();
// };

// key = CryptoJS.enc.Utf8.parse(key);
// iv  = CryptoJS.enc.Utf8.parse(iv);

// let encrypted = CryptoJS.AES.encrypt(JSON.stringify(str), key, {
//   iv     : iv,
//   mode   : CryptoJS.mode.CBC,
//   padding: CryptoJS.pad.Pkcs7
// });
// // 转换为字符串
// encrypted = encrypted.toString();

// let decrypted = CryptoJS.AES.decrypt(encrypted, key, {
//   iv     : iv,
//   mode   : CryptoJS.mode.CBC,
//   padding: CryptoJS.pad.Pkcs7
// });
// decrypted = CryptoJS.enc.Utf8.stringify(decrypted);
// console.log(decrypted);
