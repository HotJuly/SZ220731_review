import axios from 'axios';
import store from '@/store';

const request = axios.create({
    baseURL:"/api",
    timeout:20000
})

const CancelToken = axios.CancelToken;

request.interceptors.request.use((config)=>{
    // console.log(config)
    // 通过config.url属性,可以知道当前哪个请求出去了
    const url = config.url;

    // CancelToken的回调函数,会被同步执行
    config.cancelToken = new CancelToken((cb)=>{
        // 如果这个cb函数被调用了,那么被标记的本次请求就会被取消
        store.commit('ADD_FN',{url:url,cb:cb});
    });

    return config
})

request.interceptors.response.use((response)=>{

    const url = response.config.url;
    // console.log(response)
    store.commit('REMOVE_FN',url);
    return response.data;
})

export default request