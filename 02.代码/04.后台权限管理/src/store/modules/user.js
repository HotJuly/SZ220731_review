import { login, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter,constantRoutes,anyRoutes, asyncRoutes } from "@/router";
import router from "@/router";
import {cloneDeep} from 'lodash';

function filterAsyncRoutes(asyncRoutes, routeNames) {
  /*
    filterAsyncRoutes(asyncRoutes,state.routeNames);

    该函数
      接收参数个数:2个
        asyncRoutes->存储当前项目所有的异步路由组成的数组
          数据类型:routeObj[]

        routeNames->存储着当前账号能访问的异步路由别名组成的数组
          数据类型:string[]

      目的:获取到当前账号可以访问的异步路由对象组成的数组
      返回值数据类型:routeObj[]
  
  
  */

  return asyncRoutes.filter((routeObj) => {
    let name = routeObj.name;

    // a.b&&a.b();  =>  a.b?.()

    // if(routeObj.children&&routeObj.children.length){
    if (routeObj.children?.length) {
      routeObj.children = filterAsyncRoutes(routeObj.children, routeNames);
    }
    return routeNames.includes(name);
  });
}

const getDefaultState = () => {
  return {
    token: getToken(),
    name: "",
    avatar: "",

    // 这个数组用于,存储当前账号能访问的路由别名
    routeNames: [],

    // 这个数组用来存储当前账号能使用的按钮权限
    buttons: [],

    // 这个数组,不是用来实现路由权限管理的,他是为了解决左侧动态列表的显示BUG的
    menuList:[]
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_PERMISSION: (state, { routes, buttons }) => {
    state.routeNames = routes;
    state.buttons = buttons;

    // 过滤权限
    const newAsyncRoutes = filterAsyncRoutes(cloneDeep(asyncRoutes), state.routeNames);
    // console.log("newAsyncRoutes", newAsyncRoutes);

    // addRoutes需要一个异步路由组成的数组
    // 注意:要注册是只有当前账号能够访问的异步路由组成数组
    router.addRoutes([...newAsyncRoutes,...anyRoutes]);

    state.menuList = [...constantRoutes,...newAsyncRoutes,...anyRoutes];
  },
};

const actions = {
  // user login
  // login({ commit }, userInfo) {
  //   const { username, password } = userInfo
  //   return new Promise((resolve, reject) => {
  //     login({ username: username.trim(), password: password })
  //     .then(response => {
  //       const { data } = response
  //       commit('SET_TOKEN', data.token)
  //       setToken(data.token)
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  async login({ commit }, userInfo) {
    const { username, password } = userInfo;
    try {
      const response = await login({
        username: username.trim(),
        password: password,
      });
      const { data } = response;
      // 将请求回来的token存入Vuex的state中(相当于存储于内存中)
      commit("SET_TOKEN", data.token);
      // 将请求回来的token存入cookie中(相当于存储于硬盘中)
      // cookie相对localStorage的好处:每次发送请求会自动携带该token
      setToken(data.token);
    } catch (error) {
      console.log("error");
    }
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then((response) => {
          const { data } = response;

          if (!data) {
            return reject("Verification failed, please Login again.");
          }

          const { name, avatar } = data;

          commit("SET_NAME", name);
          commit("SET_AVATAR", avatar);
          commit("SET_PERMISSION", data);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          removeToken(); // must remove  token  first
          resetRouter();
          commit("RESET_STATE");
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  },
};

export default {
  // 开启命名空间,相当于是对所有的state,action,mutation进行模块化管理(类似作用域)
  //  dispatch('user/login')
  namespaced: true,
  state,
  mutations,
  actions,
};
