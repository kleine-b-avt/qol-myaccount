<template>
  <v-app>
    <component :is="currentHeader"></component>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      currentHeader: 'main-header'
    }
  },
  components:{
    'main-header': require('./components/mainHeader/mainHeader').default,
  }
}
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap')
#app
  min-width: 20rem

</style>
