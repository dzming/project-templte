import Vue from "vue";
import router from "./../router";
// import store from '@/store';
// const api = 'wss://testclt.cgs.cool/notice';//正式
// const api = 'wss://testclt.cgs.cool/notice';

const api = process.env.VUE_APP_LOCAL_SOCKET_URL;
// let addr = localStorage.getItem('userAddress');
// if(addr){
// const api = 'wss://testclt.cgs.cool/payResult/'+addr;
// }

Vue.prototype.$socket = new WebSocket(api);
const websocket = (method = "open") => {
  if (method === "close") {
    Vue.prototype.$socket.close();
  }
  Vue.prototype.$socket.onopen = () => {
    window.console.log("open");
    const userAddress = localStorage.getItem("thisAddr");
    if (userAddress) {
      let addr = JSON.parse(userAddress);
      Vue.prototype.$socket.send(addr.address);
    }
  };
  Vue.prototype.$socket.onmessage = res => {
    // const data = JSON.parse(res.data);
    // Vue.prototype.$Bus.$emit('socketData', data); // type
    window.console.log(res.data);
    const url = localStorage.getItem("type");
    // const url = 'tossCoin';
    if (url == "rollDice") {
      Vue.prototype.$Bus.$emit("socketData_" + url, res.data);
    } else if (url == "rollerCoaster") {
      Vue.prototype.$Bus.$emit("socketData_" + url, res.data);
    } else if (url == "tossCoin") {
      Vue.prototype.$Bus.$emit("socketData_" + url, res.data);
    } else if (url == "twoDice") {
      Vue.prototype.$Bus.$emit("socketData_" + url, res.data);
    }
    router.push({
      path: "/" + url,
    });
    // Vue.prototype.$Bus.$emit('socketData', res.data);
  };
  Vue.prototype.$socket.onclose = () => {
    if (method !== "close") {
      reconnnet();
    }
    window.console.log(method);
    window.console.log("closed");
  };

  Vue.prototype.$socket.onerror = () => {
    if (method !== "error") {
      reconnnet();
    }
    window.console.log(method);
    window.console.log("error");
  };
};
function reconnnet() {
  /*Vue.prototype.$socket = new WebSocket(api);
    const userAddress = localStorage.getItem('thisAddr');
    if (userAddress) {
      Vue.prototype.$socket.onopen = () => {
        websocket();
        Vue.prototype.$socket.send(userAddress);
      }
    }  */
  /*setTimeout(() => {
    Vue.prototype.$socket = new WebSocket(api);
    const userAddress = localStorage.getItem('thisAddr');
    if (userAddress) {
      Vue.prototype.$socket.onopen = () => {
        websocket();
        Vue.prototype.$socket.send(userAddress);
      }
    }
  }, 2000);*/
  setTimeout(() => {
    Vue.prototype.$socket = new WebSocket(api);
    websocket();
  }, 2000);
}

export default websocket;
