<template>
  <a class="link-back" @click="$router.push('/')">
    <div />
  </a>
</template>

<style scoped>
.link-back {
  cursor: pointer;
  position: absolute;
  left: 1%;
  top: 2%;
}

.link-back div {
  height: 20px;
  width: 20px;
  mask-image: url('../icons/arrow_back.svg');
  background: #fff;
}
</style>