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

      // Аутентификация
      async tokenAuth(state) {
        try {
          const checkToken = "Bearer " + localStorage.getItem("token");

          // idk, this dont work without it
          const foo = await useFetch("http://localhost:5000/api/user/auth")

          const res = await useFetch("http://localhost:5000/api/user/auth", {
            headers: {
              Authorization: checkToken,
            },
          });
          const { token, email, password, role } = res.data.value.user
          
          state.commit('setUser',{
            email: email,
            password: password,
            role: role,
            token: token,
            basket: res.data.value.basket,
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
          res = res.data.value;
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
          res = res.data.value;
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

          // idk, this dont work without it
          let type = await useFetch("http://localhost:5000/api/type");

          type = await useFetch("http://localhost:5000/api/type");
          let device = await useFetch("http://localhost:5000/api/device");
          let brand = await useFetch("http://localhost:5000/api/brand");
          
          brand = brand.data.value
          type = type.data.value
          device = device.data.value
      
          state.commit('setBrands', brand)
          state.commit('setType', type)
          state.commit('setDevices', device.rows)
        } catch (e) {
          console.log(e)
        }
      },

      // Админ
      async addNewType(state, name){
        console.log("Функция", name)
        const token = "Bearer " + localStorage.getItem("token");
        console.log(token)
        try {
          const res = await useFetch("http://localhost:5000/api/type", {
            method: "POST",
            headers: {
              Authorization: token,
            },
            body: {name}
          });
        } catch (e) {
          console.log(e)
        }
      },
      async addNewBrand(state, name){
        console.log("Функция", name)
        const token = "Bearer " + localStorage.getItem("token");
        try {
          const res = await useFetch("http://localhost:5000/api/brand", {
            method: "POST",
            headers: {
              Authorization: token,
            },
            body: {name}
          });
        } catch (e) {
          console.log(e)
        }
      },
      async addNewDevice(state, newDevice){
        console.log("Функция", newDevice)
        const brand = state.state.brands.filter(brand => brand.name === newDevice.newDeviceBrand)
        const type = state.state.types.filter(type => type.name === newDevice.newDeviceType)
        console.log(brand[0].name, type[0].name)
        const token = "Bearer " + localStorage.getItem("token");
        try {
          let formData = new FormData();
          formData.append('name', newDevice.newDeviceName)
          formData.append('price', newDevice.newDevicePrice)
          formData.append('brandId', brand[0].id)
          formData.append('typeId', type[0].id)
          formData.append('img', newDevice.newDeviceImage[0])
          const res = await useFetch("http://localhost:5000/api/device/create", {
            method: "POST",
            headers: {
              Authorization: token,
            },
            body: formData
          });
        } catch (e) {
          console.log(e)
        }
      },
    },
  });

  nuxtApp.vueApp.use(store);
});
