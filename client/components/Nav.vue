<template>
  <div class="nav">
    <ul>
      <li><NuxtLink to="/"> Home </NuxtLink></li>
      <li><NuxtLink to="/about"> About </NuxtLink></li>
      <li><NuxtLink to="/info"> Info </NuxtLink></li>
      <li><NuxtLink to="/page/1"> page 1 </NuxtLink></li>
      <li><NuxtLink to="/page/2"> page 2 </NuxtLink></li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.nav {
  background-color: #cccccc;

  width: 100%;
  height: 50px;

  padding: 15px;

  ul {
    width: 100%;
    height: 100%;

    list-style: none;

    display: flex;
    flex-direction: row;
    gap: 30px;
    align-items: center;

    li {
      a {
        color: #000000;

        text-decoration: none;

        &:hover {
          opacity: 0.8;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
