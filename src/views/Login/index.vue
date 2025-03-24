<template>
    <div class="login-container">
        <el-form :rules="rules" ref="form" :model="loginForm" label-width="80px">
            <h3 class="login_title">系统登录</h3>
            <el-form-item prop="username" label="用户名">
                <el-input v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码">
                <el-input type="password" v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import Mock from 'mockjs';
import { getMenu } from '@/api';

export default {
    name: 'Login',
    data() {
        return {
            //登录表单数据
            loginForm: {
                username: '',
                password: ''
            },
            //登录表单的校验规则
            rules: {
                username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            }
        }
    },
    methods: {
        //登录的方法
        onSubmit() {
            //表单校验
            this.$refs.form.validate((valid) => {
                //校验通过
                if (valid) {
                    //发送请求获取token
                    getMenu(this.loginForm).then((data) => {
                        //判断响应的结果
                        if (data.code === 200) {
                            //将token存入cookie
                            Cookies.set('token', data.data.token)
                            //将动态的menu菜单数据存入仓库
                            this.$store.commit('setMenu',data.data.menuList)
                            //调用仓库中动态创建路由的方法
                            this.$store.commit('addMenu',this.$router)
                            //跳转到首页
                            this.$router.push('home')
                        } else {
                            this.$message.error('账号或密码错误！');
                        }
                    })
                }
            })

        }
    }
}
</script>

<style lang='less' scoped>
.login-container {
    width: 350px;
    margin: 150px auto;
    border-radius: 10px;
    padding: 35px 35px 15px 35px;
    background-color: #fff;
    box-shadow: 0 0 25px #cac6c6;
    box-sizing: border-box;

    .login_title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }

    .login_submit {
        margin: 10px auto 0px auto;
    }

    .el-input {
        width: 198px;
    }
}
</style>