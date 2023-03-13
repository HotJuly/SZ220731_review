<template>
    <el-popover placement="top-start" title="注意" width="200" trigger="hover" :content="content">
        <!-- <el-button :size="size" :type="type" slot="reference">添加</el-button> -->
        <!-- <el-button v-bind="{
            size:size,
            type
        }" slot="reference">添加</el-button> -->
        <!-- <el-button v-bind="$attrs" slot="reference" @click="handler">添加</el-button> -->
        <!-- <el-button v-bind="$attrs" slot="reference" v-on="{
            click:handler
        }">添加</el-button> -->
        <el-button slot="reference" v-bind="$attrs" v-on="$listeners">添加</el-button>
    </el-popover>
</template>
  
<script>
export default {
    name: 'HintButton',
    props:["content"],
    mounted(){
        // console.log(this.$listeners)
    },
    methods:{
        handler(){
            this.$emit('click')
        }
    }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
  