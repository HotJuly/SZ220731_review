<template>
    <div class="image">
      <img style="width:200px" :src="$attrs.src" alt="" srcset="">
      <!-- <el-image v-show="false" ref="image666" style="width: 100px; height: 100px" :src="src" :preview-src-list="preview-src-list">
      </el-image> -->

      <el-image v-show="false" ref="image666" style="width: 100px; height: 100px" v-bind="$attrs">
      </el-image>
      
      <!-- <el-button type="primary" @click="click">放大</el-button> -->

      <slot name="content" :listeners="{
        click:click
      }" ></slot>
    </div>

</template>
  
<script>
export default {
    name: 'BigImage',
    // props:["src","preview-src-list"],
    methods:{
        click(){
            // console.log(this.$refs.image666)
            this.$refs.image666.clickHandler();
        }
    }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
  