<template>
  <main class="main">
    <slot></slot>
  </main>
</template>

<style scoped>
.main {
  padding: 50px 20px 20px 70px;
  flex-basis: 75%;
}

@media screen and (max-width: 992px) {
  .main {
    flex-basis: 100%;
  }
}

@media screen and (max-width: 992px) {
  .main {
    padding-left: 20px;
  }
}

@media screen and (max-width: 576px) {
  .main {
    padding-top: 20px;
  }
}
</style>
