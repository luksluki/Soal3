import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
  state: {
    articles: [] 
  },
  actions: {
    loadArticle({commit}) {
      return new Promise(( res, rej ) => {
        axios.get('http://localhost:3000/articles')
          .then(result => {
            commit("SET_ARTICLES", result.data);
            res();
          })
          .catch(() => rej());
      });
    },
    add({commit, dispatch}, form){
      axios.post('http://localhost:3000/articles', form).then( ()=> {
        dispatch('loadArticle');
        alert('Article Saved')
        commit('ADD_ARTICLE', form)
      })
    },
    deleteAr ({commit, dispatch}, id) {
      axios.delete('http://localhost:3000/articles/' + id.id)
        .then(() => {              
          dispatch('loadArticle');
          alert('Data Successfully Deleted')
          commit('DELETE_ARTICLE', id.id)
        })
    },
    updateAr({commit, dispatch},edit){ 
      axios.put('http://localhost:3000/articles/' + edit.id , {userId: edit.userId, title: edit.title, body:edit.body}).then(() => {
        dispatch('loadArticle');
        alert('Changes Saved')
        commit('UPDATE_ARTICLE', edit)
     }).catch((err) => {
       console.log(err); 
     })
   }
  },
  mutations: {
    SET_ARTICLES (state, articles) {
      state.articles = articles
    },
    ADD_ARTICLE (state, article) {
      state.articles.push(article)
    },
    DELETE_ARTICLE (state, id) {
      let index = state.articles.findIndex(article => article.id == id)
      state.articles.splice(index, 1)
    },
    UPDATE_ARTICLE (state, article) {
      state.articles = article
    },
  }
})