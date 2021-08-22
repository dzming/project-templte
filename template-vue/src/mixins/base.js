import { getBrowser } from '@/utils/utils';
export default {
  data() {
    return {
      isMobile: false,
      isPc: false,
      isWx: false,
      isIOS: false,
      isIpone: false,
      isAndroid: false,
    };
  },
  methods: {
    getClientTypes() {
      const { isAndroid, isIOS, isPc, isWx, isIpone } = getBrowser();
      this.isAndroid = isAndroid;
      this.isIOS = isIOS;
      this.isIpone = isIpone;
      this.isWx = isWx;
      this.isPc = isPc;
      this.isMobile = !isPc;
    },
  },
  created() {
    this.getClientTypes();
  },
  mounted() {},
};
