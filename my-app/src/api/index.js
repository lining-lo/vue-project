import requests from './request'

//请求首页数据
export const getData = () => {
    return requests.get('/home/getData')
}

//用户组件相关接口
//新增用户
export const addUser=(user)=>{
    return requests.post('/user/addUser',user)
}
//删除用户
export const deleteUser = (id) => {
    return requests.post('/user/deleteUser',id)
}
//修改用户
export const editUser=(user)=>{
    return requests.post('/user/editUser',user)
}
//获取用户列表
export const getUserList = (params) => {
    return requests.get('/user/getUserData',params)
}

//权限相关接口
//用户登录接口
export const getMenu = (data)=>{
    return requests.post('/permission/getMenu/',data)
}