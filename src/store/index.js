import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import api from '../config/api.js'

export default new Vuex.Store({
  state: {
    movieList: [],
    movieListTotalCount: 0
  },
  actions: {
    async fetchMovieList (_, { search, page }) {
      const { data } = await Vue.axios.get(api.main, {
        params: {
          s: search,
          page
        }
      })
      return data
    },
    async fetchMovieById (_, id) {
      const { data } = await Vue.axios.get(api.main, {
        params: {
          i: id
        }
      })
      return data
    }
  },
  mutations: {
  },
  modules: {
  }
})
