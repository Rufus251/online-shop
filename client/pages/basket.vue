<template>
  <div class="basket" v-if="cart.length">
    <div class="basket__devices" >
      <div
        class="basket__devices__device"
        v-for="device in cart"
        :key="device.id"
      >
        <div
          class="basket__devices__device__img"
          @click="$router.push('/device/' + device.id)"
        >
          <img :src="`http://localhost:5000/${device.img}`" alt="" />
        </div>
        <div class="basket__devices__device__info">
          <div
            class="basket__devices__device__info__header"
            @click="$router.push('/device/' + device.id)"
          >
            <p>
              {{ device.name }}
            </p>
          </div>
          <div class="basket__devices__device__info__price">
            <p>Цена: {{ device.price }} руб.</p>
          </div>
          <div class="basket__devices__device__info__delbtn">
            <v-btn color="red" @click="deleteFromCart(device.id)"
              >Удалить</v-btn
            >
          </div>
        </div>
      </div>
      <div class="basket__devices__buybtn">
        <v-btn color="green" @click="buyCart()">Купить</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      cart: (state) => state.cart,
    }),
  },
  methods: {
    ...mapActions({
      getCart: "getCart",
      deleteFromCart: "deleteFromCart",
    }),
    async buyCart() {
      this.cart.forEach((device) => this.deleteFromCart(device.id));
    },
  },
};
</script>

<style lang="scss">
.basket {
  max-width: 800px;

  margin: 100px auto 20px auto;
  padding: 30px;

  border: 2px solid #cccccc;
  border-radius: 15px;

  &__devices {
    display: flex;
    flex-direction: column;
    gap: 50px;

    &__device {
      display: flex;
      gap: 20px;

      &__img img {
        width: 200px;
        height: 200px;

        &:hover {
          cursor: pointer;
          opacity: 0.8;
        }
      }

      &__info {
        display: flex;
        gap: 10px;
        flex-direction: column;

        &__header {
          font-size: 28px;
          word-wrap: break-word;

          &:hover {
            cursor: pointer;
            opacity: 0.8;
          }
        }
        &__price {
        }
      }
    }
  }
}
</style>
