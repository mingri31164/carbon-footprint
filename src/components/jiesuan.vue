<script>
import * as echarts from 'echarts';
import {computed} from "@vue/composition-api";

export default {
  name: 'jiesuan',
  data(){
    return {
      live:0,
      livecount:0,
      user:{},
      yearout:0,
      tree: 0,
      clothres: parseFloat((this.$store.state.clothres).toFixed(2)),
      clothcount:0,
      useres: parseFloat((this.$store.state.useres).toFixed(2)),
      usecount:0,
      foodres: parseFloat((this.$store.state.foodres).toFixed(2)),
      foodcount: 0,
      liferes: parseFloat((this.$store.state.liferes).toFixed(2)),
      lifecount: 0,
      walkres: parseFloat((this.$store.state.walkres).toFixed(2)),
      walkcount: 0,
      sumres: 0,
    }
  },
  //圆饼图
  mounted() {
    this.lifecount = ((this.foodres+this.liferes+this.useres)/this.sumres).toFixed(2)
    this.live = this.foodres+this.liferes+this.useres
    this.sumres = (this.foodres+this.walkres+this.liferes+this.clothres+this.useres).toFixed(2)
    this.foodcount = ((this.foodres/this.sumres)*100).toFixed(2)
    this.lifecount = ((this.liferes/this.sumres)*100).toFixed(2)
    this.walkcount = ((this.walkres/this.sumres)*100).toFixed(2)
    this.clothcount = ((this.clothres/this.sumres)*100).toFixed(2)
    this.usecount = ((this.useres/this.sumres)*100).toFixed(2)

    this.yearout = (this.sumres*365).toFixed(2);
    this.tree = Math.round(this.yearout / 100);
    this.initChart();
    window.addEventListener('resize', this.resizeChart);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeChart);
  },
  methods: {
    goindex(){
      // this.doSave()
      this.$router.push("Home")
      this.$store.commit('clearResData');
      this.$store.commit('clearTableData');
    },
    initChart() {
      const dom = this.$refs.pieChart;
      const myChart = echarts.init(dom, null, {
        renderer: 'canvas',
        useDirtyRect: false
      });

      const option = {
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '100%',
            data: [
              { value: this.clothcount, name: '衣' },
              { value: this.foodcount, name: '食' },
              { value: this.lifecount, name: '住' },
              { value: this.walkcount, name: '行' },
              { value: this.usecount, name: '用' },
            ],
            itemStyle: {
              color: function(params) {
                var colorList = ['tomato', 'royalblue', 'khaki','yellow','green'];
                return colorList[params.dataIndex];
              }
            },
            labelLine: {
              show: false
            },
            label: {
              show: false
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };

      if (option && typeof option === 'object') {
        myChart.setOption(option);
      }
    },
    resizeChart() {
      const myChart = echarts.getInstanceByDom(this.$refs.pieChart);
      if (myChart) {
        myChart.resize();
      }
    }
  },
};
</script>

<template>
  <div class="jiesuan" style="position: relative">
    <!--重新计算-->
    <button class="goindex" @click = "goindex()"><-- 重新计算</button>
    <div class="contai">
      <div class="top">
        <ul>
          <li class="food">
            <span class="result">{{this.foodres}}</span>
            <span class="count">{{this.foodcount}}</span>
          </li>
          <li class="life">
            <span class="result">{{this.live}}</span>
            <span class="count">{{this.lifecount}}</span>
          </li>
          <li class="walk">
            <span class="result">{{this.walkres}}</span>
            <span class="count">{{this.walkcount}}</span>
          </li>
          <li class="sum">
            <span class="result">{{this.sumres}}</span>
            <span class="count">100</span>
          </li>
        </ul>
      </div>

      <!-- 圆饼图 -->
      <div ref="pieChart" id="pie" style="height: 100px;width: 100px;"></div>

      <div class="center">
        <span class="out">{{this.yearout}}</span>
        <span class="tree">{{this.tree}}</span>
      </div>
      <div class="foot">
        <img src="../assets/脚印.jpg" alt="">
        <span class="outcome">{{this.yearout}}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("../css/jiesuan.css");
@import url("../css/button.css");
</style>