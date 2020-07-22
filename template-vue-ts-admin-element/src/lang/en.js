// 英文语言包
const baseUrl = process.env.BASE_URL;
export const lang = {
  homeOverview: '英文语言包',
  url: baseUrl,
  title: "BCB game platform",
  backToList: 'Back to list', // 返回列表
  tableOperating: 'Operating',
  commonTips: {
    reLogin: "Re login",
    prompt: "Prompt",
    tokenLose: "Login status is invalid, please log in again",
    noAccess: 'No access',
    verificationFailed: 'Identity authorization verification failed',
    timeout: 'Network connection timeout',
    serverError: 'Server error',
    unknownError: 'An unknown error has occurred',
    networkError: 'Network request error',
    cors: 'Network request occurs across domains',
    errorCode: 'Error code',
    url: 'URL',
    undefined: 'None',
    unknown: 'unknown'
  },
  // 公用组件
  component: {
    authCode: {
      success: 'Sent successfully',
      fail: 'Failed to send'
    }
  },
  common: {
    tableOperating: 'Operating',
    to: 'To',
    startMonth: 'Start month',
    endMonth: 'End month',
    startTime: 'Start time',
    endTime: 'End time',
    msg: {
      confirmDelete: 'Confirm deletion?',
      deleted: 'Deleted!',
      confirmed: 'Confirmed!',
      submited: 'Submited!',
      copied: 'Copied!',
      fieldRequired: 'The field is required.',
      invaildImgRequest: "Please upload icon",
      confirmSubmit: 'Confirmation of submission?'
    },
    btn: {
      cancel: 'Cancel',
      confirm: 'Confirm',
      delete: 'Delete',
      submit: 'Submit',
      copy: 'Copy',
      detail: 'Detail',
      finish: 'Fininsh',
      next: 'Next',
      backToList: 'Back to list' // 返回列表
    }
  },
  config: {
    gameStatus: [{
        value: 0,
        label: 'Pending submission'
      },
      {
        value: 1,
        label: 'Pending review'
      },
      {
        value: 2,
        label: 'Passed'
      },
      {
        value: 3,
        label: 'Rejected'
      }
    ]
  },
  out: {
    copy: 'Copy'
  },
  navbar: {
    myApp: "我的应用",
    userInfo: "账户信息",
    changePassWord: "Change Password",
    exit: "Logout"
  },
  fromRule: {
    ruleCode: "Please enter the correct mobile area code",
    rulePhone: "Please enter a valid phone number",
    rulePhone: "Please enter a valid phone number",
    rulePassword: "Password cannot be less than 6 digits",
    ruleREPassword: "Inconsistent password input twice",
    ruleAuthCode: "Please enter a four-digit verification code"
  },
  // 页-首页
  indexPage: {
    
  },
  // 页-登录
  loginPage: {
    routerTitle: "Login",
    login: "Login",
    success: "login successful",
    error: "Login failed",
    nohasAccount: "No account yet，",
    nowRegister: "sign up now",
    forgetPassword: "Forget password"
  },
  // 页-找回密码
  forgetPasswordPage: {
    success: 'Retrieve password successfully',
    routerTitle: "Forget password",
    forgetPassword: "Forget password",
    newWord: "Please enter a new password",
    rePassWord: "Please enter your password again.",
    finish: "finish"
  },
  // 页-注册
  registerPage: {
    routerTitle: "register",
    register: "register",
    success: "Registration success",
    error: "Registration failed",
    hasAccount: "Existing account，",
    nowLogin: "log in immediately",
    registerNewUser: "register new user",
    selectPlaceholder: 'Select Country',
    inputPhoneNumber: "Please enter your cell phone number",
    inputAuthCode: "Please enter the captured verification code",
    getVerificationCode: "Getting Digital Verification Code",
    passWord: "Please enter your password (8 digits and letters)",
    rePassWord: "Please enter your password again",
    downCodeText: "retry in seconds",
    sendCodeText: "send a sms"
  },
  // 页-修改密码
  cahngePassWordPage: {
    routerTitle: "Retrieve password",
    oldPwd: 'Old password',
    newPwd: 'Set a new password',
    confirmNewPwd: 'Enter your password again',
    comfirmBtn: 'Confirm the changes',
    success: "Password reset complete"
  },
  // 组件-table状态
  tableStatus: {
    title: {
      noData: 'No Data'
    },
    btn: {
      
    }
  }
}
