<template>
  <el-row>
    <el-col :span="8" style="padding-right: 10px;">
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
          <el-table-column v-for="(v, k) in tableLabel" :prop="k" :label="v" />
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="padding-left: 10px;">
      <div class="num">
        <el-card v-for="item in countData" :key="item.name" :body-style="{ display: 'flex', padding: 0 }">
          <i class="icon" :style="{ background: item.color }" :class="`el-icon-${item.icon}`"></i>
          <div class="detail">
            <p class="price">￥{{ item.value }}</p>
            <p class="desc">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px;">
        <!-- 折线图 -->
        <div ref="echarts1" style="height: 280px;"></div>
      </el-card>
      <div class="graph">
        <el-card style="height: 260px;">
          <!-- 柱状图 -->
          <div ref="echarts2" style="height:260px"></div>
        </el-card>
        <el-card style="height: 260px;">
          <!-- 饼状图 -->
          <div ref="echarts3" style="height:240px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from '../../api';
import * as echarts from 'echarts'
export default {
  name: 'Home',
  data() {
    return {
      tableData: [],
      tableLabel: {
        name: '课程',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总共购买'
      },
      countData: [
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
  mounted() {
    getData().then(({ data }) => {
      const { tableData, orderData, userData, videoData } = data
      this.tableData = tableData

      // 使用Echart图表--折线图
      // 基于准备好的dom，初始化echarts实例
      var echarts1 = echarts.init(this.$refs.echarts1);
      // 指定图表的配置项和数据
      var echarts1Option = {
        legend: {
          data: []
        },
        xAxis: {
          data: []
        },
        yAxis: {},
        series: []
      }
      // 准备数据
      const xAxis = Object.keys(orderData.data[0])
      echarts1Option.legend.data = xAxis
      echarts1Option.xAxis.data = orderData.date
      xAxis.forEach(key => {
        echarts1Option.series.push({
          name: key,
          type: 'line',
          data: orderData.data.map((item) => item[key])
        })
      })
      // 使用刚指定的配置项和数据显示图表。
      echarts1.setOption(echarts1Option);

      // 使用Echart图表--柱状图
      // 基于准备好的dom，初始化echarts实例
      var echarts2 = echarts.init(this.$refs.echarts2);
      // 指定图表的配置项和数据
      var echarts2Option = {
        // 图例文字颜色
        textStyle: {
          color: "#333",
        },
        legend: {},
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: userData.map(item => item.date),
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
        series: [
          {
            name: '新增用户',
            type: 'bar',
            data: userData.map(item => item.new)
          },
          {
            name: '活跃用户',
            type: 'bar',
            data: userData.map(item => item.active)
          }
        ],
      }
      // 使用刚指定的配置项和数据显示图表。
      echarts2.setOption(echarts2Option);

      // 使用Echart图表--饼状图
      // 基于准备好的dom，初始化echarts实例
      var echarts3 = echarts.init(this.$refs.echarts3);
      // 指定图表的配置项和数据
      var echarts3Option = {
        tooltip: {
          trigger: "item",
        },
        legend: {},
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series: [{
          data:videoData,
          type:'pie'
        }]
      }
      // 使用刚指定的配置项和数据显示图表。
      echarts3.setOption(echarts3Option);
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

.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }

  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #fff
  }

  .detail {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .price {
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
    }

    .desc {
      font-size: 14px;
      color: #999;
      text-align: center;
    }
  }
}

.graph {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;

  .el-card {
    width: 48%;
  }
}
</style>