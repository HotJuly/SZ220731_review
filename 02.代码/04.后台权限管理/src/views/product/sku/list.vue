<template>
  <div id="sku">
    <h1>喜欢我的请亮灯:</h1>
    <h2>刘亦菲</h2>
    <Child />
  </div>
</template>

<script>
import Child from './test/Child.vue';
export default {
  name: "SKU",
  components: {
    Child
  }
}

</script>

<style lang="scss" scoped>
#sku {
  ::v-deep h2 {
    color: red;
    font-size: 30px;
  }
  // ::deep(h2) {
  //   color: red;
  //   font-size: 30px;
  // }
}

</style>

// <style lang="scss">
// #sku {
//   h2 {
//     color: blue;
//     font-size: 30px;
//   }
// }

// </style>