<template>
  <div>
    <Nav></Nav>
    <NuxtPage class="main"></NuxtPage>
  </div>
</template>

<script> 
import { mapActions } from "vuex";
export default {
 async mounted(){ 
   await this.tokenAuth()
  },
  methods: {
    ...mapActions({
      tokenAuth: "tokenAuth"
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
