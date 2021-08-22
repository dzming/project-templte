import Vue from 'vue';
import Ripple from 'vue-ripple-directive';

Ripple.color = 'rgba(255, 255, 255, 0.35)';
Ripple.zIndex = 10;

Vue.directive('ripple', Ripple);
