<template>
  <div>
    <Nav></Nav>
    <NuxtPage class="main"></NuxtPage>
  </div>
</template>

<script> 
import { mapState, mapActions } from "vuex";
export default {
 async created(){  
      this.tokenAuth(),
      this.typeBrandDeviceLoad()
      console.log('async data')
  },
  computed: {
    ...mapState({  
      isAuth: state => state.isAuth,
      isAdmin: state => state.isAdmin,  
    })
  },
  
  methods: {
    ...mapActions({
      tokenAuth: "tokenAuth",
      typeBrandDeviceLoad: "typeBrandDeviceLoad"
    }) 
  }
};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  min-width: auto;
  max-width: auto;
  width: auto;

  font-family: "Comic Sans MS"
}
.main{
  margin-top: 64px;
}

// For vuetify
.auth{
  position: relative;
  .v-text-field--plain-underlined .v-input__details {
    padding: 3px;
  }
  .v-btn{
    padding: 15px;
    
  }
}
</style>
