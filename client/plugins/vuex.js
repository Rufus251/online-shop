import { createStore } from "vuex";
export default defineNuxtPlugin((nuxtApp) => {
  const store = createStore({
    state: {
      authMessage: "",
      isAuth: false,
      role: "ADMIN",
      token: process.server ? "" : localStorage.token || null,

      user: {
        email: null,
        password: null,
        role: [],
        basket: '' ,
        token: null,
      },
    },
    mutations: {
      setAuthMessage(state, message) {
        state.authMessage = message;
      },
      setAuth(state, bool) {
        state.isAuth = bool;
      },
      setRole(state, role) {
        state.role = role;
      },
      setUser(state, payload) {
        state.user.email = payload.email;
        state.user.password = payload.password;
        state.user.role = payload.role;
        state.user.token = payload.token;
        state.user.basket = payload.basket
      },
      setToken(state, payload) {
        state.user.token = payload.token;
        state.token = payload.token;
      },
    },
    actions: {
      async register(state, newUser) {
        console.log(user);
        try {
          state.commit("setAuthMessage", "Вы зарегистрировались");
        } catch (e) {
          state.commit(
            "setAuthMessage",
            "Пользователь с таким логином уже существует"
          );
          console.log(e);
        }
      },
      //let res = await useFetch("http://localhost:5000/api/device")
      //console.log(res.data.value.rows[0].brandId)

      async loginUser(state, user) {
        try {
          let res = await useFetch("http://localhost:5000/api/user/login", {
            method: "POST",
            body: user,
          });
          res = res.data._rawValue
          console.log(res);
          state.commit('setUser', {
            email: user.email,
            password: user.password,
            role: res.role,
            token: res.token,
            basket: res.basket
          })
          state.commit("setRole", res.role)
          state.commit("setAuth", true)
          state.commit("setAuthMessage", "Вы залогинились");
        } catch (e) {
          state.commit("setAuthMessage", "Неверный логин или пароль");
          console.log(e);
        }
      },
      async logoutUser(state){
        state.commit('setUser', {
          email: '',
          password: '',
          role: '',
          token: '',
          basket: ''
        })
      }
    },
  });

  nuxtApp.vueApp.use(store);
});
