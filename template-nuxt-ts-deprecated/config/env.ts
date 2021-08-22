const env = (function() {
  const { VUE_APP_STAGE } = process.env;
  let VUE_APP_BASE_URL = "https://manage.bcbchain.io/api";
  // 测试线
  if (VUE_APP_STAGE === "release") {
    VUE_APP_BASE_URL = "http://snsinfo.test.api.com/v1";
  }
  // 预生产环境
  if (VUE_APP_STAGE === "pre") {
    VUE_APP_BASE_URL = "http://snsinfo.pre.api.com/v1";
  }
  // 正式线
  if (VUE_APP_STAGE === "prod") {
    VUE_APP_BASE_URL = "http://snsinfo.api.com/v1";
  }
  return {
    VUE_APP_BASE_URL
  };
})();

export default env;
