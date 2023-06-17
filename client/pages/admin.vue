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
    
    <div class="admin__backbtn" v-if="selector !== ''" @click="selector = ''">Назад</div>
    <div class="admin__form" v-if="selector !== ''">
      <v-form @submit.prevent >
        <v-row class="admin__form__row" v-if="selector === 'type'">
          <div  class="admin__form__row__description">
            <p>Введите название нового типа</p>
          </div>

          <v-text-field> </v-text-field>
        </v-row>
        <v-row class="admin__form__row" v-if="selector === 'brand'">
          <div  class="admin__form__row__description">
            <p>Введите название нового бренда</p>
          </div>

          <v-text-field> </v-text-field>
        </v-row>
        <v-row class="admin__form__row" v-if="selector === 'device'">
          <div  class="admin__form__row__description">
            <p>Введите название нового девайса</p>
          </div>

          <v-text-field> </v-text-field>
        </v-row >
        <v-row class="admin__form__row" v-if="selector === 'device'">
          <div class="admin__form__row__description">
            <p>Введите цену нового девайса</p>
          </div>

          <v-text-field> </v-text-field>
        </v-row >
        <v-row class="admin__form__row" v-if="selector === 'device'">
          <div class="admin__form__row__description">
            <p>Выберите тип нового девайса</p>
          </div>

          <v-text-field> </v-text-field>
        </v-row>
        <v-row class="admin__form__row" v-if="selector === 'device'">
          <div  class="admin__form__row__description">
            <p>Выберите брэнд нового девайса</p>
          </div>

          <v-text-field> </v-text-field>
        </v-row>
        <v-btn color="grey-lighten-2" type="submit" block>Добавить</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selector: "",
    };
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
  &__form{
    width: 600px;

    border: 1px solid #cccccc;
    border-radius: 10px;
    padding: 50px;

    &__row {
        display: flex;
        flex-direction: column;
        gap: 10px;


        &__description{

        }
    }
  }
}
</style>
