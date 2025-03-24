<template>
    <div class="header-container">
        <div class="l-content">
            <el-button style="margin-right: 10px;" @click="handleMenu" icon="el-icon-menu" size="mini"></el-button>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="item in tabList" :key="item.path" :to="{ path: item.path }">{{ item.label
                    }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user" src="../assets/images/user.png" alt="">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Cookies from 'js-cookie'
export default {
    name: 'componentHeader',
    methods: {
        //菜单展开与折叠的方法
        handleMenu() {
            this.$store.commit('collapseMenu')
        },
        //用户退出的方法
        handleCommand(command) {
            if (command === 'logout') {
                //清除cookie中的token
                Cookies.remove('token')
                //清除cookie中的menu
                Cookies.remove('menu')
                //跳转到登录页面
                this.$router.push('login')
            }
        }
    },
    computed: {
        // ...mapState(['tabList'])
        tabList() {
            return this.$store.state.tab.tabList
        }
    }
}
</script>

<style lang='less' scoped>
.header-container {
    height: 60px;
    padding: 0 20px;
    background-color: #333;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .l-content {
        display: flex;
        align-items: center;

        /deep/.el-breadcrumb {
            .el-breadcrumb__item {
                .el-breadcrumb__inner {
                    font-weight: normal;

                    &.is-link {
                        color: #666;
                    }
                }

                &:last-child {
                    .el-breadcrumb__inner {
                        color: #fff;
                    }
                }
            }
        }
    }

    .r-content {
        .el-dropdown-link {
            cursor: pointer;
            color: #409EFF;
        }

        .el-icon-arrow-down {
            font-size: 12px;
        }

        .user {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }

}
</style>