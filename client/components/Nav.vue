<template>
  <div class="nav">
    <v-card>
      <v-layout>
        <v-app-bar color="primary" prominent>
          <v-app-bar-nav-icon
            variant="text"
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>

          <v-toolbar-title>BuyDevice</v-toolbar-title>

          <v-spacer></v-spacer>
        </v-app-bar>

        <v-navigation-drawer
          style="height: auto"
          v-model="drawer"
          location="top"
        >
          <v-list>
            <v-list-item class="list-item" v-for="item in nonAdminItems" :key="item" 
            >
              <NuxtLink  :to="item.routeTo" @click="drawer=false">
                {{ item.title }}
              </NuxtLink>
            </v-list-item>
            <v-list-item class="list-item" v-if="isAdmin">
              <NuxtLink to="/admin"  @click="drawer=false">
                Админ панель
              </NuxtLink>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      nonAdminItems: [
        {
          title: 'Магазин',
          routeTo: '/',
          adminRequire: false
        },
        {
          title: 'Корзина',
          routeTo: '/basket',
          adminRequire: false
        },
      ],
      drawer: false,
    };
  },
  computed: {
    ...mapState({
      isAuth: state => state.isAuth,
      isAdmin: state => state.isAdmin,
    })
  }
};
</script>

<style scoped lang="scss">
.list-item{

  a{
    color: #000000;
    text-decoration: none;

    display: block;

    width: 100%;
    height: 100%;
  }

  &:hover{
    background-color: #eeeeee;
    cursor: pointer;
  }
}
</style>
