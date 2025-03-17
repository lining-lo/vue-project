import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '../views/Main'
import Home from '../views/Home'
import User from '../views/User'

Vue.use(VueRouter)

export default new VueRouter({
    routes:[
        {
            path:'/',
            component:Main,
            children:[
                {
                    path:'Home',
                    component:Home
                },
                {
                    path:'User',
                    component:User
                }
            ]
        }
    ]
})