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
      <el-card class="box-card" style="margin-top: 20px;height: 460px;">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column v-for="(v,k) in tableLabel" :prop="k" :label="v" />
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16">
      <div class="num">
        <el-card v-for="item in countData" :key="item.name" :body-style="{ display:'flex',padding:0 }">
        <i class="icon" :style="{ background:item.color }" :class="`el-icon-${item.icon}`"></i>
        <div class="detail">
          <p class="price">￥{{ item.value }}</p>
          <p class="desc">{{ item.name }}</p>
        </div>
      </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from '../../api';
export default {
  name: 'Home',
  data() {
    return {
      tableData: [
        {
          name: "Java",
          todayBuy: 100,
          monthBuy: 200,
          totalBuy: 300,
        },
        {
          name: "Python",
          todayBuy: 100,
          monthBuy: 200,
          totalBuy: 300,
        },
        {
          name: "Mysql",
          todayBuy: 100,
          monthBuy: 200,
          totalBuy: 300,
        },
        {
          name: "Html",
          todayBuy: 100,
          monthBuy: 200,
          totalBuy: 300,
        },
        {
          name: "Web",
          todayBuy: 100,
          monthBuy: 200,
          totalBuy: 300,
        },
        {
          name: "Php",
          todayBuy: 100,
          monthBuy: 200,
          totalBuy: 300,
        }
      ],
      tableLabel:{
        name:'课程',
        todayBuy:'今日购买',
        monthBuy:'本月购买',
        totalBuy:'总共购买'
      },
      countData:[
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    }
  },
  mounted(){
    getData().then((data)=>{
      console.log(data)
    })
  }
}
</script>

<style lang="less" scoped>
.user {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;

  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-right: 40px;
  }

  .userInfo {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }

    .access {
      color: #999;
    }
  }
}

.loginInfo {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999;

    span {
      color: #666;
      margin-left: 60px;
    }
  }
}

.num{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .el-card{
    width: 32%;
    margin-bottom: 20px;
  }
  .icon{
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color:#fff
  }
  .detail{
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .price{
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
    }
    .desc{
      font-size: 14px;
      color: #999;
      text-align: center;
    }
  }
}
</style>