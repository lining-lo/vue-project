import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '../views/Main'
import Home from '../views/Home'
import User from '../views/User'
import Mall from '../views/Mall'
import PageOne from '../views/PageOne'
import PageTwo from '../views/PageTwo'
import Login from '../views/Login'

Vue.use(VueRouter)

//重写push|replace方法解决连续跳转同一路由报错问题
//第一个参数：要跳转的路径
//第二个参数：成功的回调
//第三个参数：失败的回调
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function (lacation, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, lacation, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

export default new VueRouter({
    routes: [
        {
            path: '/',
            name:'Main',
            component: Main,
            redirect: '/home',
            children: [
                // {
                //     name: 'home',
                //     path: 'home',
                //     component: Home
                // },
                // {
                //     name: 'user',
                //     path: 'user',
                //     component: User
                // },
                // {
                //     name: 'mall',
                //     path: 'mall',
                //     component: Mall
                // },
                // {
                //     name: 'page1',
                //     path: 'page1',
                //     component: PageOne
                // },
                // {
                //     name: 'page2',
                //     path: 'page2',
                //     component: PageTwo
                // }
            ]
        },
        {
            path: '/login',
            name:'login',
            component: Login,
        }
    ]
})