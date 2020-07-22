// 中文语言包
const baseUrl = process.env.BASE_URL;
export const lang = {
  homeOverview: '中文语言包',
  url: baseUrl,
  title: "后台管理",
  backToList: '返回列表',
  tableOperating: '操作',
  commonTips: {
    reLogin: "重新登录",
    prompt: "提示",
    tokenLose: "登录状态验证失效, 请重新登录",
    noAccess: '没有访问权限',
    verificationFailed: '身份授权验证失败',
    timeout: '网络连接超时',
    serverError: '服务器发生错误',
    unknownError: '发生未知错误',
    networkError: '网络请求发生错误',
    cors: '网络请求发生跨域',
    errorCode: '错误代码',
    url: 'URL',
    undefined: '无',
    unknown: '未知'
  },
  // 公用组件
  component: {
    authCode: {
      success: '发送成功',
      fail: '发送失败'
    }
  },
  common: {
    tableOperating: '操作',
    to: '至',
    startMonth: '开始月份',
    endMonth: '结束月份',
    startTime: '开始时间',
    endTime: '结束时间',
    msg: {
      confirmDelete: '确认删除？',
      deleted: '删除成功！',
      confirmed: '确认成功！',
      submited: '提交成功！',
      copied: '复制成功！',
      fieldRequired: '此字段必填',
      invalidImgFormat: '只能上传JPG,PNG,GIF格式',
      invalidImgSize: '图片大小不能超过2M',
      invalidImg: '只能上传JPG,PNG,GIF格式，且不超过2M',
      invaildImgRequest: "请上传图标",
      confirmSubmit: '确认提交？'
    },
    btn: {
      cancel: '取消',
      confirm: '确定',
      delete: '删除',
      submit: '提交',
      detail: '详情',
      finish: '完成',
      next: '下一步',
      copy: '复制',
      backToList: '返回列表'
    }
  },
  config: {
    userStatus: [{
        value: 0,
        label: '待提交'
      },
      {
        value: 1,
        label: '待审核'
      },
      {
        value: 2,
        label: '已通过'
      },
      {
        value: 3,
        label: '已拒绝'
      }
    ]
  },
  out: {
    copy: '复制'
  },
  navbar: {
    myApp: "我的应用",
    userInfo: "账户信息",
    changePassWord: "修改密码",
    exit: "退出登录"
  },
  fromRule: {
    ruleCode: "请输入正确的手机区号",
    rulePhone: "请输入正确的手机号",
    rulePhone: "请输入正确的手机号",
    rulePassword: "密码不能小于6位",
    ruleREPassword: "两次密码输入不一致",
    ruleAuthCode: "请输入四位数的验证码"
  },
  // 页-首页
  indexPage: {
    
  },
  // 页-登录
  loginPage: {
    routerTitle: "登录",
    login: "登录",
    success: "登录成功",
    error: "登录失败",
    nohasAccount: "还没有账号，",
    nowRegister: "立即注册",
    forgetPassword: "忘记密码"
  },
  // 页-找回密码
  forgetPasswordPage: {
    success: '找回密码成功',
    routerTitle: "忘记密码",
    forgetPassword: "忘记密码",
    newWord: "请输入新的密码",
    rePassWord: "请再次输入密码",
    finish: "完成"
  },
  // 页-注册
  registerPage: {
    routerTitle: "注册",
    register: "注册",
    success: "注册成功",
    error: "注册失败",
    hasAccount: "已有账号，",
    nowLogin: "立即登录",
    registerNewUser: "注册新用户",
    selectPlaceholder: '选择国家',
    inputPhoneNumber: "请输入手机号码",
    inputAuthCode: "请输入验证码",
    getVerificationCode: "获取验证码",
    passWord: "请输入密码",
    rePassWord: "请再次输入密码",
    downCodeText: "秒后重试",
    sendCodeText: "发送验证码"
  },
  // 页-修改密码
  cahngePassWordPage: {
    routerTitle: "修改密码",
    oldPwd: '原密码',
    newPwd: '设置新密码',
    confirmNewPwd: '再次输入密码',
    comfirmBtn: '确认修改',
    success: "密码修改成功"
  },
  // 组件-table状态
  tableStatus: {
    title: {
      noData: '暂无数据'
    },
    btn: {
      
    }
  }
}
