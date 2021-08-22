import Vue from 'vue';
import { getBrowser, debounce } from '@/utils/utils';

let $_deviceType = {};

(function getClientTypes() {
  const { isAndroid, isIOS, isWx, isIpone } = getBrowser();
  const WIDTH = 1024,
    DOCUMENTWIDTH = window.innerWidth;
  $_deviceType.$isAndroid = isAndroid;
  $_deviceType.$isIOS = isIOS;
  $_deviceType.$isIpone = isIpone;
  $_deviceType.$isWx = isWx;
  $_deviceType.$isPC = DOCUMENTWIDTH > WIDTH;
  $_deviceType.$isMobile = DOCUMENTWIDTH <= WIDTH;

  window.onresize = debounce(() => {
    getClientTypes();
  }, 200);
})();

export default Vue.observable($_deviceType);
