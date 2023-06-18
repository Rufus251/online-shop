<template>
  <div class="admin">
    <div
      class="admin__addbtn"
      v-if="selector === ''"
      @click="selector = 'type'"
    >
      <p>Добавить тип</p>
    </div>
    <div
      class="admin__addbtn"
      v-if="selector === ''"
      @click="selector = 'brand'"
    >
      <p>Добавить брэнд</p>
    </div>
    <div
      class="admin__addbtn"
      v-if="selector === ''"
      @click="selector = 'device'"
    >
      <p>Добавить девайс</p>
    </div>

    <div class="admin__backbtn" v-if="selector !== ''" @click="selector = ''">
      <p>Назад</p>
    </div>
    <div class="admin__form" v-if="selector !== ''">
      <v-form v-model="newTypeForm" @submit.prevent v-if="selector === 'type'">
        <div class="admin__form__input">
          <v-row class="admin__form__input__row">
            <div class="admin__form__input__row__description">
              <p>Введите название нового типа</p>
            </div>

            <v-text-field v-model="newTypeName" :rules="newTypeNameRules">
            </v-text-field>
          </v-row>
        </div>
        <v-btn
          @click="addNewType(newTypeName)"
          :disabled="!newTypeForm"
          color="grey-lighten-2"
          type="submit"
          class="admin__form__submit"
          >Добавить</v-btn
        >
      </v-form>

      <v-form
        v-model="newBrandForm"
        @submit.prevent
        v-if="selector === 'brand'"
      >
        <div class="admin__form__input">
          <v-row class="admin__form__input__row">
            <div class="admin__form__input__row__description">
              <p>Введите название нового бренда</p>
            </div>

            <v-text-field v-model="newBrandName" :rules="newBrandNameRules">
            </v-text-field>
          </v-row>
        </div>
        <v-btn
          @click="addNewBrand(newBrandName)"
          :disabled="!newBrandForm"
          color="grey-lighten-2"
          type="submit"
          class="admin__form__submit"
          >Добавить</v-btn
        >
      </v-form>

      <v-form
        v-model="newDeviceForm"
        @submit.prevent
        v-if="selector === 'device'"
      >
        <div class="admin__form__input">
          <v-row class="admin__form__input__row">
            <div class="admin__form__input__row__description">
              <p>Введите название нового устройства</p>
            </div>

            <v-text-field v-model="newDeviceName" :rules="newDeviceNameRules">
            </v-text-field>
          </v-row>
        </div>
        <div class="admin__form__input">
          <v-row class="admin__form__input__row" v-if="selector === 'device'">
            <div class="admin__form__input__row__description">
              <p>Введите цену нового устройства</p>
            </div>

            <v-text-field v-model="newDevicePrice" :rules="newDevicePriceRules">
            </v-text-field>
          </v-row>
        </div>
        <div class="admin__form__input">
          <v-row class="admin__form__input__row" v-if="selector === 'device'">
            <div class="admin__form__input__row__description">
              <p>Выберите тип нового устройства</p>
            </div>

            <v-select
              v-model="newDeviceType"
              :rules="newDeviceTypeRules"
              label="Тип устройства"
              :items="types.map((type) => type.name)"
            ></v-select>
          </v-row>
        </div>
        <div class="admin__form__input">
          <v-row class="admin__form__input__row" v-if="selector === 'device'">
            <div class="admin__form__input__row__description">
              <p>Выберите брэнд нового устройства</p>
            </div>
            <v-select
              v-model="newDeviceBrand"
              :rules="newDeviceBrandRules"
              label="Брэнд устройства"
              :items="brands.map((brand) => brand.name)"
            ></v-select>
          </v-row>
        </div>
        <div class="admin__form__input">
          <v-row class="admin__form__input__row" v-if="selector === 'device'">
            <div class="admin__form__input__row__description">
              <p>Выберите картинку нового устройства (png, jpeg, bmp)</p>
            </div>

            <v-file-input
              required
              v-model="newDeviceImage"
              :rules="newDeviceImageRules"
              label="Изображение"
              accept="image/png, image/jpeg, image/bmp"
            ></v-file-input>
          </v-row>
        </div>

        <v-btn
          @click="
            addNewDevice({
              newDeviceName,
              newDevicePrice,
              newDeviceType,
              newDeviceBrand,
              newDeviceImage,
            })
          "
          :disabled="!newDeviceForm"
          color="grey-lighten-2"
          type="submit"
          class="admin__form__submit"
          >Добавить</v-btn
        >
      </v-form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      selector: "",
      newTypeForm: false,
      newTypeName: "",
      newTypeNameRules: [(item) => !!item || "Введите тип!"],

      newBrandForm: false,
      newBrandName: "",
      newBrandNameRules: [(item) => !!item || "Введите брэнд!"],

      newDeviceForm: false,
      newDeviceName: "",
      newDeviceNameRules: [(item) => !!item || "Введите название!"],
      newDevicePrice: "",
      newDevicePriceRules: [(item) => !!item || "Введите цену!"],
      newDeviceType: "",
      newDeviceTypeRules: [(item) => !!item || "Выберите тип!"],
      newDeviceBrand: "",
      newDeviceBrandRules: [(item) => !!item || "Введите брэнд!"],
      newDeviceImage: "",
      newDeviceImageRules: [(item) => !!item || "Загрузите картинку!"],
    };
  },
  async mounted() {
    if (this.$store.state.devices) {
      await this.typeBrandDeviceLoad();
    }
  },
  computed: {
    ...mapState({
      types: (state) => state.types,
      brands: (state) => state.brands,
    }),
  },
  methods: {
    ...mapActions({
      typeBrandDeviceLoad: "typeBrandDeviceLoad",
      addNewType: "addNewType",
      addNewBrand: "addNewBrand",
      addNewDevice: "addNewDevice",
    }),
  },
};
</script>

<style lang="scss">
.admin {
  margin-top: 10vh;

  display: flex;
  flex-direction: column;
  gap: 24px;

  align-items: center;
  justify-content: center;
  &__addbtn {
    width: 300px;

    padding: 15px;

    background-color: #cccccc;

    font-size: 24px;
    text-align: center;

    &:hover {
      opacity: 0.9;
      cursor: pointer;
    }
  }
  &__backbtn {
    font-size: 24px;
    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }
  &__form {
    width: 600px;

    border: 1px solid #cccccc;
    border-radius: 10px;
    padding: 50px;

    &__input {
      margin-top: 15px;

      &__row {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
    }
    &__submit {
      margin-top: 25px;
    }
  }
}
</style>
