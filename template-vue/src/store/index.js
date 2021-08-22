/*
 * @Author: ZStop
 * @Date: 2019-02-15 18:50:46
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-04-25 14:40:28
 */
import Vue from 'vue';
import Vuex from 'vuex';
import basic from './modules/basic';
import users from './modules/users';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    basic,
    users,
  },
});
