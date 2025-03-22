import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import userApi from './mockServeData/user'

//请求首页数据
Mock.mock('/api/home/getData',homeApi.getStatisticalData)

//用户组件相关接口
//新增用户
Mock.mock('/api/user/addUser','post',userApi.createUser)
//删除用户
Mock.mock('/api/user/deleteUser','post',userApi.deleteUser)
//修改用户
Mock.mock('/api/user/editUser','post',userApi.updateUser)
//获取用户列表
Mock.mock(/api\/user\/getUserData/,userApi.getUserList)