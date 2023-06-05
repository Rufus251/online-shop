<template>
  <div v-if="!isAuth" class="auth mx-auto d-flex justify-center align-center">
    <v-form v-model="valid" @submit.prevent>
      <v-container>
        <v-col>
          <v-text-field
            v-model="login"
            :rules="loginRules"
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
        <div class="auth__btn">
          <p v-if="!isRegister">
            Нет аккаунта?
            <span @click="isRegister = !isRegister">Регистрация</span>
          </p>
          <p v-else>
            Есть аккаунт? <span @click="isRegister = !isRegister">Войти</span>
          </p>
          <v-btn
            v-if="!isRegister"
            type="submit"
            variant="outlined"
            block
            @click="loginUser()"
          >
            Войти
          </v-btn>
          <v-btn
            v-else
            type="submit"
            variant="outlined"
            block
            @click="registerUser()"
          >
            Зарегистрироваться
          </v-btn>
        </div>
      </v-container>
    </v-form>
  </div>
  <h1 v-else>Вы уже залогинены</h1>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      isRegister: false,
      login: "",
      loginRules: [
        (value) => !!value || "Введите логин",
        (value) => value.length > 6 || "Логин должен быть больше 6 символов",
      ],
      password: "",
      passwordRules: [
        (value) => !!value || "Введите пароль",
        (value) => value.length > 6 || "Пароль должен быть больше 6 символов",
      ],
    };
  },
  computed: {
    ...mapState({
      isAuth: (state) => state.isAuth,
    }),
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
  &__btn {
    margin: auto;

    display: flex;
    flex-direction: row;
    gap: 30px;

    justify-content: center;
    align-items: center;
  }
}
</style>
