import { ref , onMounted ,onBeforeUnmount} from 'vue';

export default function(){
    const pageX= ref(0);
    const pageY= ref(0);
    
    const handler = ({clientX,clientY})=>{
      // console.log('handler')
      pageX.value = clientX;
      pageY.value = clientY; 
    }
    
    onMounted(()=>{
      document.addEventListener('mousemove',handler)
    })
    
    onBeforeUnmount(()=>{
      document.removeEventListener('mousemove',handler)
    })

    return {
        pageX,
        pageY
    }
}