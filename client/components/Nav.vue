<template>
  <div class="nav">
    <v-card>
      <v-layout>
        <v-app-bar color="grey-lighten-2" prominent>

          <v-toolbar-title><NuxtLink to="/">BuyDevice</NuxtLink></v-toolbar-title>

          <v-spacer></v-spacer>
          <div class="nav__btns">
            <NuxtLink to="/basket" v-if="isAuth"><v-icon icon="mdi-cart-variant" size="x-large"></v-icon></NuxtLink>
            <NuxtLink to="/admin" v-if="isAdmin==='ADMIN' && isAuth"><v-btn variant="outlined" > Админ-панель  </v-btn></NuxtLink>
            <NuxtLink to="/auth" v-if="!isAuth"><v-btn variant="outlined" > Войти  </v-btn></NuxtLink>
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
  position: absolute;
  z-index: 999;
  a{
    color: #000000;
    text-decoration: none;
  }
  &__btns{
    display: flex;

    align-items: center;

    margin-right: 10px;
    gap: 20px;
  }
}
</style>

