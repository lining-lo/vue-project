<template>
    <div class="header-container">
        <div class="l-content">
            <el-button @click="handleMenu" icon="el-icon-menu" size="mini"></el-button>
            <span class="text">首页</span>
        </div>
        <div class="r-content">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img class="user" src="../assets/images/user.png" alt="">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
export default {
    name: 'componentHeader',
    methods:{
        handleMenu(){
            this.$store.commit('collapseMenu')
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
        .text {
            color: #fff;
            font-size: 14px;
            margin-left: 10px;
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

        .user{
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }

}
</style>