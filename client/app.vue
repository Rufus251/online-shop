<template>
  <div>
    <Nav></Nav>
    <NuxtPage class="main"></NuxtPage>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      isAuth: state => state.isAuth,
      isAdmin: state => state.isAdmin,
    })
  }
};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.main{
  margin-top: 64px;
}

// For vuetify
.auth{
  .v-text-field--plain-underlined .v-input__details {
    padding: 3px;
  }
  .v-btn{
    padding: 15px;
    min-width: auto;
  }
}
</style>
