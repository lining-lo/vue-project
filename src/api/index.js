import requests from './request'

//请求首页数据
export const getData = ()=>{
    return requests.get('/home/getData')
}