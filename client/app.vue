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
</style>
