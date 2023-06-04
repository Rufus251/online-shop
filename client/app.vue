<template>
  <div>
    <NuxtPage></NuxtPage>

  </div>
</template>

<script>
export default{
  data(){
    return{
      isAuth: useState('isAuth', () => true)
    }
  }
}
</script>

<style lang="scss">
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>