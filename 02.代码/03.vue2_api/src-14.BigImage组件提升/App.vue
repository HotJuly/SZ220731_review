<template>
  <div id="app">
    <BigImage v-bind="$data">
      <template #content="{listeners}">
        <h1 v-on="listeners">点我放大</h1>
      </template>
    </BigImage>

    <hr/>

    <BigImage :src="src" :preview-src-list="srcList">
      <template #content="{listeners}">
        <el-button type="danger" v-on="listeners">点我放大</el-button>
      </template>
    </BigImage>
  </div>
</template>

<script>
import BigImage from './components/BigImage.vue'

export default {
  name: 'App',
  data() {
    return {
      src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      "preview-src-list": [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ],
      srcList:[
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ]
    }
  },
  components: {
    BigImage
  }
}
</script>

<style>
</style>
