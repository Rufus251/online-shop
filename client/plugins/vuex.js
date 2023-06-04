import { createStore } from "vuex";
export default defineNuxtPlugin(nuxtApp => {
    const store = createStore({
        state: {
            isAuth: true,
            isAdmin: true
        
        },
        mutations: {
            setAuth(state, bool){
                state.isAuth = bool
            },
            setAdmin(state, bool){
                state.isAdmin = bool
            },
        },
        actions: {

        }
    })

    nuxtApp.vueApp.use(store)
});