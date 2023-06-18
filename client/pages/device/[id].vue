<template>
  <div class="deviceId">
    <div class="deviceId__headerBlock">
      <div class="deviceId__headerBlock__image">
        <img :src="`http://localhost:5000/${device.img}`" alt="" />
      </div>
      <div class="deviceId__headerBlock__header">
        <h2>
          {{ device.name }}
        </h2>
        <p>Стоимость: {{ device.price }} рублей</p>
        <v-btn rounded="lg" @click="addToCart(device.id)">В корзину</v-btn>
      </div>
    </div>

    <div class="deviceId__info">
      <h2>Характеристики</h2>
      <p>Оперативная память: 5гб</p>
      <p>Камера: 1мп</p>
      <p>Оперативная память: 5гб</p>
      <p>Камера: 1мп</p>
      <p>Оперативная память: 5гб</p>
      <p>Камера: 1мп</p>
      <p>Оперативная память: 5гб</p>
      <p>Камера: 1мп</p>
      <p>Оперативная память: 5гб</p>
      <p>Камера: 1мп</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      device: "",
    };
  },
  mounted() {
    this.getDevice();
  },
  methods: {
    async getDevice() {
      const ref = "http://localhost:5000/api/device/" + this.$route.params.id;
      // idk, dont work without it
      let foo = await useFetch(ref);

      let res = await useFetch(ref);
      this.device = res.data.value;
    },
    ...mapActions({
      addToCart: "addToCart"
    })
  },
};
</script>

<style scoped lang="scss">
.deviceId {
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
  padding: 30px;

  width: 700px;

  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;

  border: 2px solid #cccccc;
  border-radius: 15px;
  background-color: #f1f1f1;

  &__headerBlock {
    display: flex;

    gap: 30px;

    background-color: #fcfcfc;
    padding: 15px;
    border-radius: 15px;

    &__image {
      margin: auto;
      img {
        height: 400px;
        width: 300px;
      }
    }
    &__header {
      text-align: center;

      margin-left: auto;
      margin-right: auto;

      display: flex;
      gap: 7px;
      flex-direction: column;
    }
  }
  &__info {
    p {
      padding: 3px;
      margin-left: 5px;
    }
  }
}
</style>
