<template>
  <div class="nav">
    <v-card>
      <v-layout>
        <v-app-bar color="grey-lighten-2" prominent>

          <v-toolbar-title><NuxtLink to="/">BuyDevice</NuxtLink></v-toolbar-title>

          <v-spacer></v-spacer>
          <div class="nav__btns">
            <v-btn variant="outlined" v-if="isAdmin && isAuth"> Админ-панель </v-btn>
            <v-btn variant="outlined" v-if="!isAuth" @click="$router.push('/auth')"> Войти </v-btn>
            <v-btn variant="outlined" v-else @click="logout()"> Выйти из аккаунта </v-btn>
          </div>
        </v-app-bar>
      </v-layout>
    </v-card>
    
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      isAuth: (state) => state.isAuth,
      isAdmin: (state) => state.user.role,
    }),
  },
  methods: {
    ...mapActions({
        logout: 'logout'
    })
  }
};
</script>

<style scoped lang="scss">
.nav{

  a{
    color: #000000;
    text-decoration: none;
  }
  &__btns{
    display: flex;

    margin-right: 10px;
    gap: 10px;
  }
}
</style>

