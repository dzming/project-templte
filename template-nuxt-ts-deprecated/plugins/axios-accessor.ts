import { Plugin } from '@nuxt/types'
import { initializeAxios } from '~/utils/request';

const accessor: Plugin = ({ $axios }) => {
  initializeAxios($axios);
}

export default accessor;