const CryptoJS = require('crypto-js'); // 引用AES源码js
const uuidv1 = require('uuid');

const key = CryptoJS.enc.Base64.parse(process.env.VUE_APP_AESKEY); // 十六位十六进制数作为密钥
const iv = CryptoJS.enc.Base64.parse(process.env.VUE_APP_AESIV); // 十六位十六进制数作为密钥偏移量

const signKey = process.env.VUE_APP_SIGNKEY;
const signVal = process.env.VUE_APP_SIGNVALUE;

const defaultData = {
  traceId: uuidv1().replace(/-/g, ''),
  signKey,
};

// 排序的函数
function objKeySort(obj) {
  const newkey = Object.keys(obj).sort();
  // 先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
  const newObj = {}; // 创建一个新的对象，用于存放排好序的键值对
  for (let i = 0; i < newkey.length; i++) {
    // 遍历newkey数组
    newObj[newkey[i]] = obj[newkey[i]]; // 向新创建的对象中按照排好的顺序依次增加键值对
  }
  return newObj; // 返回排好序的新对象
}

// 获取api接口加密getSignture
function getSignture(data) {
  data = Object.assign({}, data, defaultData, {
    timestamp: +new Date(),
  });
  // 排序
  data = objKeySort(data);
  // 键值对拼接请求参数
  let strs = '';
  for (const i in data) {
    let temp = data[i];
    if (typeof temp === 'object') {
      temp = JSON.stringify(temp);
    }
    if (typeof temp === 'string') {
      temp = temp.substr(0, 5000);
    }
    strs += i + temp;
  }
  // 加上signKey的value
  strs += signVal;
  // md5加密并截取第5位带第30位后转换大写
  const signature = CryptoJS.MD5(strs).toString().substr(4, 35).toUpperCase();
  // 返回签名后的结果
  return Object.assign({}, data, {
    signature,
  });
}

// 解密方法
function Decrypt(word) {
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
function Encrypt(word) {
  word = getSignture(word);
  // console.log("=======加密↓=======");
  // console.log("signture：", word);
  // console.log("=======加密↑=======");
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(word), key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  const srcs = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
  return srcs;
}

const md5 = str => {
  return CryptoJS.MD5(str).toString();
};

export { Decrypt, Encrypt, getSignture, md5 };
