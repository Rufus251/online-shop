<template>
  <div v-if="!isAuth" class="auth mx-auto d-flex justify-center align-center">
    <v-form v-model="valid" @submit.prevent>
      <v-container>
        <v-col>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            variant="underlined"
            label="Login"
            required
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            hide-details="auto"
            type="password"
            variant="underlined"
            label="Password"
            required
          ></v-text-field>
        </v-col>
        <v-col v-if="authMessage">
          <p class="auth__message">
            {{ authMessage }}
          </p>
        </v-col>
        <v-col>
          <div class="auth__btns">
            <p v-if="!isRegister">
              Нет аккаунта?
              <span @click="isRegister = !isRegister">Регистрация</span>
            </p>
            <p v-else>
              Есть аккаунт? <span @click="isRegister = !isRegister">Войти</span>
            </p>
            <v-btn
              class="auth__btns__btn"
              v-if="!isRegister"
              type="submit"
              variant="outlined"
              @click="loginUser(email, password)"
              label="Войти"
            >
              Войти
            </v-btn>
            <v-btn
              class="auth__btns__btn"
              v-else
              type="submit"
              variant="outlined"
              @click="registerUser(email, password)"
            >
              Зарегистрироваться
            </v-btn>
          </div>
        </v-col>
      </v-container>
    </v-form>
  </div>
  <h1 v-else>Вы уже залогинены</h1>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      isRegister: false,
      email: "",
      emailRules: [
        (value) => !!value || "Введите email",
        (value) => value.indexOf("@") !== 0 || "Некоректный email адрес",
        (value) => value.includes("@") || "Некоректный email адрес",
        (value) =>
          value.indexOf(".") - value.indexOf("@") > 1 ||
          "Некоректный email адрес",
        (value) =>
          value.indexOf(".") <= value.length - 3 || "Некоректный email адрес",
      ],
      password: "",
      passwordRules: [
        (value) => !!value || "Введите пароль",
        (value) =>
          value.length > 5 || "Пароль должен быть 6 или больше символов",
      ],
    };
  },
  computed: {
    ...mapState({
      isAuth: (state) => state.isAuth,
      authMessage: (state) => state.authMessage,
    }),
  },
  methods: {
    ...mapActions({
      login: "login",
      register: "register",
    }),
    async loginUser(email, password) {
      await this.login({ email, password });
      if (this.isAuth) {
        this.$router.push("/");
      }
    },
    async registerUser(email, password) {
      await this.register({ email, password });
      if (this.isAuth) {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style scoped lang="scss">
.auth {
  height: calc(100vh - 64px);
  width: 600px;

  padding: 30px;

  .v-form {
    width: 100%;
  }
  &__message {
    color: rgb(223, 0, 0);
  }
  &__btns {
    margin: auto;

    display: flex;
    flex-direction: row;
    gap: 30px;

    justify-content: center;
    align-items: center;

    span {
      color: #0077ff;

      &:hover {
        cursor: pointer;
      }
    }

    &__btn {
      display: flex;
      flex-direction: row;
      gap: 30px;

      justify-content: center;
      align-items: center;
    }
  }
}
</style>
