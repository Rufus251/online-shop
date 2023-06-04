<template>
  <div class="nav">
    <v-card>
    <v-layout>
      <v-navigation-drawer
        class="bg-grey"
        theme="dark"
        permanent
      >
        <v-list color="transparent">
          <v-list-item title="Dashboard"></v-list-item>
          <v-list-item title="Account"></v-list-item>
          <v-list-item title="Admin"></v-list-item>
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <v-btn v-if="isAuth" block>
              Login
            </v-btn>
            <v-btn v-else block>
              Logout
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
    </v-layout>
  </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAuth: useState("isAuth"),
    };
  },
};
</script>

<style scoped lang="scss">
.nav {
  margin: 5px auto;
  width: 95%;
}
</style>
