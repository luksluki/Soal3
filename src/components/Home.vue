<template>
  <div class="container" style="padding:10px;">
    <div class="row justify-content-between" style="margin-bottom:10px;">
      <div class="col-6">
        <h2>Article Jsonplaceholder</h2>
      </div>          
      <div class="col-6 d-flex justify-content-end">
        <button type="button" class="btn btn-outline-dark right" data-toggle="modal" data-target="#exampleModal" style="padding: 13px;"><span class='fas fa-plus'></span> Article</button>
      </div>
    </div>
    <div class="row justify-content-between">
      <div class="col-12">
            <table class="table table-dark table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>UserID</th>
                  <th>Title</th>
                  <th>Body</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="article in articles" :key="article.id">
                  <td>{{ article.id }}</td>
                  <td>{{ article.userId }}</td>
                  <td>{{ article.title }}</td>
                  <td>{{ article.body }}</td>
                  <td>  
                    <button @click="edit(article)" class="btn btn-outline-secondary" data-toggle="modal" data-target="#ModalEdit"><span class='far fa-edit'></span></button>
                    <button @click="del(article)" class="btn btn-outline-secondary"><span class='far fa-window-close'></span></button>         
                  </td>
                </tr>
              </tbody>
            </table>
      </div>
    </div>
  
    <!-- Modal Add -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add Article</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">

          <form>
            <div class="form-group hidden">
              <input type="hidden" class="form-control hidden" id="exampleFormControlInput1"  v-model="form.id">
            </div>
            <div class="form-group">
              <label for="exampleFormControlInput1">UserID</label>
              <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="UserId" v-model="form.userId">
            </div>
            <div class="form-group">
              <label for="exampleFormControlInput1">Title</label>
              <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Article Title" v-model="form.title">
            </div>
            <div class="form-group">
              <label for="exampleFormControlTextarea1">Body</label>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" v-model="form.body"></textarea>
            </div>
          </form>
            ...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
            <button @click="add()" type="button" class="btn btn-outline-dark" data-dismiss="modal">Add Article</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Edit -->
    <div class="modal fade" id="ModalEdit" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit Article</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">

          <form>
            <div class="form-group hidden">
              <input type="hidden" class="form-control hidden" id="exampleControlInput1"  v-model="ed.id">
            </div>
            <div class="form-group">
              <label for="exampleFormControlInput1">UserID</label>
              <input type="text" class="form-control" id="exampleControlInput1" placeholder="UserId" v-model="ed.userId">
            </div>
            <div class="form-group">
              <label for="exampleFormControlInput1">Title</label>
              <input type="text" class="form-control" id="exampleControlInput1" placeholder="Article Title" v-model="ed.title">
            </div>
            <div class="form-group">
              <label for="exampleFormControlTextarea1">Body</label>
              <textarea class="form-control" id="exampleControlTextarea1" rows="5" v-model="ed.body"></textarea>
            </div>
          </form>
            ...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
            <button @click="update(ed)" type="button" class="btn btn-outline-dark" data-dismiss="modal">Save Changes</button>
          </div>
        </div>
      </div>
    </div>

  </div>

  

</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Home',
  mounted () {
    this.$store.dispatch('loadArticle')
  },  
  computed: mapState([
    'articles'
  ]),
  data: function() {
    return {
      form: {
        id:'',
        userId: '',
        title: '',
        body: ''
      },
      ed: {
        id:'',
        userId:'',
        title: '',
        body:''
      }
    }
  },

  methods: {
    add(){
      this.$store.dispatch('add', this.form)
    },
    del(e){
      this.$store.dispatch('deleteAr', e)
    },
    edit(e){
      this.ed.id = e.id
      this.ed.userId = e.userId
      this.ed.title = e.title
      this.ed.body = e.body
    },
    update(e){
      this.$store.dispatch('updateAr', e)
    }
  }
}

</script>