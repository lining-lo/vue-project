<template>
  <el-row>
    <el-col :span="8">
      <el-card class="box-card">
        <div class="user">
          <img src="../../assets/images/user.png" alt="">
          <div class="userInfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="loginInfo">
          <p>上次登录的时间：<span>2021-7-19</span></p>
          <p>上次登录的地点：<span>武汉</span></p>
        </div>
      </el-card>
    </el-col>
    <el-col :span="16">
      <div class="grid-content bg-purple-light"></div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style lang="less" scoped>
.user{
  display:flex;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  img{
    width: 150px;
    height: 150px;
    border-radius:50%;
    margin-right: 40px;
  }
  .userInfo{
    .name{
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access{
      color: #999;
    }
  }
}
.loginInfo{
  p{
    line-height: 28px;
    font-size: 14px;
    color: #999;
    span{
      color:#666;
      margin-left: 60px;
    }
  }
}
</style>