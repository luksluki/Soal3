<template>
  <div id="app">
    <Home />
  </div>
</template>

<script>
import Home from './components/Home.vue'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
  
export default {
  name: 'app',
  components: {
    Home
  }
}
</script>