export default {
  data() {
    return {
      pageX: 0,
      pageY: 0,
    };
  },
  mounted() {
    /*
          需求:当用户鼠标在页面上移动的时候,需要在页面上展示用户的鼠标坐标
          拆解:
            1.当用户鼠标在页面上移动的时候
              绑定事件监听
              事件源:document
              事件名:mousemove
    
            2.如何知道用户的鼠标坐标
              可以通过event获得
    
            3.如何将得到的数据显示在页面上
              将数据存入data状态中
              在页面上使用这些状态数据即可
        
        */
    // console.log('组件内置', this.$options.name)

    document.addEventListener("mousemove", this.handler);
  },
  beforeDestroy() {
    document.removeEventListener("mousemove", this.handler);
  },
  watch:{
    pageX(){
        console.log("pageX 变了")
    }
  },
  methods: {
    handler({ clientX, clientY }) {
      // console.log(event)
      this.pageX = clientX;
      this.pageY = clientY;
    },
  },
};
