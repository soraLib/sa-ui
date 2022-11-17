<template>
  <s-grid disabled>
    <div v-for="num in 5" :key="num" class="grid">{{ num }}</div>
  </s-grid>
</template>

<style lang="scss" scoped>
.grid {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  outline: 1px solid green;
}
</style>
