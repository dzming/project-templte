const env = (function () {
  const { VUE_APP_STAGE } = process.env;
  let VUE_APP_BASE_URL = "https://manage.bcbchain.io/api";
  let VUE_APP_AESKEY = "bowe3SoUembPHoiaSEsdfn==";
  let VUE_APP_AESIV = "MunsdVRkf8SXMeibueYyO0==";
  let VUE_APP_SIGNKEY = "wezmbie23Webcmzmboe57m8238b92h";
  let VUE_APP_SIGNVALUE = "B39BmzYEWibNFhfoew3206SBlLJhie";
  let VUE_APP_UPLOAD_SIGNKEY = "5324D31114B52B484430DB3C722322";
  let VUE_APP_UPLOAD_SIGNVALUE = "799D9E39784043A2714DABEEA91412";
  // 测试线
  if (VUE_APP_STAGE === "release") {
    VUE_APP_BASE_URL = "http://snsinfo.test.api.com/v1";
    VUE_APP_AESKEY = "bowe3SoUembPHoiaSEsdfn==";
    VUE_APP_AESIV = "MunsdVRkf8SXMeibueYyO0==";
    VUE_APP_SIGNKEY = "wezmbie23Webcmzmboe57m8238b92h";
    VUE_APP_SIGNVALUE = "B39BmzYEWibNFhfoew3206SBlLJhie";
    VUE_APP_UPLOAD_SIGNKEY = "5324D31114B52B484430DB3C722322";
    VUE_APP_UPLOAD_SIGNVALUE = "799D9E39784043A2714DABEEA91412";
  }
  // 预生产环境
  if (VUE_APP_STAGE === "pre") {
    VUE_APP_BASE_URL = "http://snsinfo.pre.api.com/v1";
    VUE_APP_AESKEY = "bowe3SoUembPHoiaSEsdfn==";
    VUE_APP_AESIV = "MunsdVRkf8SXMeibueYyO0==";
    VUE_APP_SIGNKEY = "wezmbie23Webcmzmboe57m8238b92h";
    VUE_APP_SIGNVALUE = "B39BmzYEWibNFhfoew3206SBlLJhie";
    VUE_APP_UPLOAD_SIGNKEY = "5324D31114B52B484430DB3C722322";
    VUE_APP_UPLOAD_SIGNVALUE = "799D9E39784043A2714DABEEA91412";
  }
  // 正式线
  if (VUE_APP_STAGE === "prod") {
    VUE_APP_BASE_URL = "http://snsinfo.api.com/v1";
    VUE_APP_AESKEY = "RTKixjgV1bBv4VMGfcNMBA==";
    VUE_APP_AESIV = "H3WXl4uct0UtgCboMWX/4w==";
    VUE_APP_SIGNKEY = "wezmbie23Webcmzmboe57m8238b92h";
    VUE_APP_SIGNVALUE = "B39BmzYEWibNFhfoew3206SBlLJhie";
    VUE_APP_UPLOAD_SIGNKEY = "5324D31114B52B483330DB3C722322";
    VUE_APP_UPLOAD_SIGNVALUE = "799D9E39784043A2554DABEEA91412";
  }
  return {
    VUE_APP_BASE_URL,
    VUE_APP_AESKEY,
    VUE_APP_AESIV,
    VUE_APP_SIGNKEY,
    VUE_APP_SIGNVALUE,
    VUE_APP_UPLOAD_SIGNKEY,
    VUE_APP_UPLOAD_SIGNVALUE,
  };
})();

export default env;
