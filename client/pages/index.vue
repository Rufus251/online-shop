<template>
  <div class="index">
    <div class="index__sort">
      <div class="index__sort__type">
        <div class="index__sort__type__header">
          <h2>Бренды</h2>
        </div>
        <div v-for="brand in brands" class="index__sort__type__content">
          <label
            ><input
              type="checkbox"
              :value="`${brand.id}`"
              v-model="selectedBrands"
            />
            <p>
              {{ brand.name }}
            </p>
          </label>
        </div>
      </div>
      <div class="index__sort__type">
        <div class="index__sort__type__header">
          <h2>Тип</h2>
        </div>
        <div v-for="typ in types" class="index__sort__type__content">
          <label
            ><input
              type="checkbox"
              :value="`${typ.id}`"
              v-model="selectedTypes"
            />
            <p>
              {{ typ.name }}
            </p>
          </label>
        </div>
      </div>
    </div>
    <div class="index__devices">
      <div
        class="index__devices__device"
        v-for="device in sortDevice"
        :key="device.id"
        @click="$router.push('/device/' + device.id)"
      >
        <div class="index__devices__device__image">
          <img :src="`http://localhost:5000/${device.img}`" alt="" />
        </div>
        <div class="index__devices__device__header">
          <h2>
            {{ device.name }}
          </h2>
        </div>
        <div class="index__devices__device__price">
          Цена: {{ device.price }} руб.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      selectedTypes: [],
      selectedBrands: [],
      sortedDeviceArray: [],
    };
  },
  async mounted() {
    await this.typeBrandDeviceLoad();
    this.sortDevice;
  },
  computed: {
    sortDevice() {
      this.sortedDeviceArray = this.devices.filter((device) => {
        const brandCondition =
          this.selectedBrands.includes(device.brandId.toString()) ||
          this.selectedBrands.length === 0;

        const typeCondition =
          this.selectedTypes.includes(device.typeId.toString()) ||
          this.selectedTypes.length === 0;

        if (brandCondition && typeCondition) {
          return true;
        }
      });
      return this.sortedDeviceArray;
    },
    ...mapState({
      brands: (state) => state.brands,
      types: (state) => state.types,
      devices: (state) => state.devices,
    }),
  },
  methods: {
    ...mapActions({
      typeBrandDeviceLoad: "typeBrandDeviceLoad",
    }),
  },
};
</script>

<style scoped lang="scss">
.index {
  margin-top: 84px;
  margin-left: auto;
  margin-right: auto;

  width: 95vw;

  display: flex;

  &__sort {
    padding: 15px;

    border: 2px solid #cccccc;
    border-radius: 15px;

    height: fit-content;
    min-width: 200px;
    width: fit-content;

    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
      0px 2px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    &__type {
      &__content {
        padding: 5px;
        margin-left: 15px;

        label {
          display: flex;
          gap: 5px;
          align-items: center;
        }
      }
    }
  }

  &__devices {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;

    margin-left: 30px;
    &__device {
      width: 300px;

      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: center;
      &__image {
        width: 150px;
        height: 150px;
        img {
          width: 150px;
          height: 150px;
        }
      }
      &__header {
        text-align: center;
      }
      &__price {
      }

      &:hover {
        cursor: pointer;
        opacity: 0.8;
      }
    }
  }
}
</style>
