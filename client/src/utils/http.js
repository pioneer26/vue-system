import axios from 'axios';
import { Loading, Message } from 'element-ui';
import router from '../router/router'
let loaditem;
function startLoading() {
  loaditem = Loading.service({
    lock: true,
    text: '加载中',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
function finishLoading() {
  loaditem.close();
}
 //请求拦截
axios.interceptors.request.use(config => {
  startLoading();
  //判断eleToken是否存在，如果存在设置统一的请求头
  if(localStorage.eleToken) {
    config.headers.Authorization = localStorage.eleToken;
  }
  return config;
}, error =>{
  // 对请求错误做些什么
  return Promise.reject(error);
})

//响应拦截
axios.interceptors.response.use(respone => {
  finishLoading();
  return respone;
}, error => {
  finishLoading();
  Message.error(error.response.data)
  //获取状态码判断是否token过期，过期则清除
  const { status } = error.response;
  if (status == 401) {
    Message.error('token已过期，请重新登录');
    localStorage.removeItem('eleToken');
    router.push('/login');
  }
  return Promise.reject(error);
})
export default axios;