import { createStore } from "vuex";
export default defineNuxtPlugin((nuxtApp) => {
  const store = createStore({
    state: {
      authMessage: "",
      isAuth: false,
      user: {
        email: null,
        password: null,
        role: [],
        basket: "",
        token: process.server ? "" : localStorage.token || null,
      },

      brands: [],
      types: [],
      devices: []
    },
    mutations: {
      // Регистрация, логин и т.п.
      setAuthMessage(state, message) {
        state.authMessage = message;
      },
      setAuth(state, bool) {
        state.isAuth = bool;
      },
      setUser(state, payload) {
        state.user.email = payload.email;
        state.user.password = payload.password;
        state.user.role = payload.role;
        state.user.token = payload.token;
        state.user.basket = payload.basket;
      },
      setType(state, payload){
        state.types = payload;
      },
      setBrands(state, payload){
        state.brands = payload;
      },
      setDevices(state, payload){
        state.devices = payload;
      }
    },
    actions: {

      // Регистрация, логин и т.п
      async tokenAuth(state) {
        try {
          const checkToken = "Bearer " + localStorage.getItem("token");
          let { data } = await useFetch("http://localhost:5000/api/user/auth", {
            method: "GET",
            headers: {
              Authorization: checkToken,
            },
          });
          const { token, id, email, password, role } = data._rawValue.user
          state.commit('setUser',{
            email: email,
            password: password,
            role: role,
            token: token,
            basket: data._rawValue.basket,
          })
          state.commit("setAuth", true);
          localStorage.setItem("token", token);
        } catch (e) {
          console.log(e);
        }
      },
      async register(state, newUser) {
        try {
          let res = await useFetch(
            "http://localhost:5000/api/user/registration",
            {
              method: "POST",
              body: newUser,
            }
          );
          res = res.data._rawValue;
          if (res) {
            state.commit("setAuthMessage", "Регистрация успешна");
            state.commit("setAuth", true);
            state.dispatch("login", newUser);
          }
          state.commit("setAuthMessage", "Ошибка регистрации");
        } catch (e) {
          state.commit(
            "setAuthMessage",
            "Пользователь с таким логином уже существует"
          );
          console.log(e);
        }
      },
      async login(state, user) {
        try {
          let res = await useFetch("http://localhost:5000/api/user/login", {
            method: "POST",
            body: user,
          });
          res = res.data._rawValue;
          state.commit("setUser", {
            email: user.email,
            password: user.password,
            role: res.role,
            token: res.token,
            basket: res.basket,
          });
          state.commit("setAuth", true);
          state.commit("setAuthMessage", "Вход выполнен");

          localStorage.setItem("token", res.token);
        } catch (e) {
          state.commit("setAuthMessage", "Неверный логин или пароль");
          console.log(e);
        }
      },
      async logout(state) {
        localStorage.setItem("token", "");
        state.commit("setAuthMessage", "");
        state.commit("setAuth", false);
        state.commit("setUser", {
          email: "",
          password: "",
          role: "",
          token: "",
          basket: "",
        });
      },

      // Товар

      async typeBrandDeviceLoad(state){
        try {
          let brand = await useFetch("http://localhost:5000/api/brand");
          let type = await useFetch("http://localhost:5000/api/type");
          let device = await useFetch("http://localhost:5000/api/device");
          
          brand = brand.data._rawValue
          type = type.data._rawValue
          device = device.data._rawValue
          console.log(brand)
          console.log(type)
          console.log(device)
          state.commit('setBrands', brand)
          state.commit('setType', type)
          state.commit('setDevices', device.rows)
        } catch (e) {
          console.log(e)
        }
      }
    },
  });

  nuxtApp.vueApp.use(store);
});
