<script>
import {Result} from "element-ui";
import {last} from "eslint-plugin-vue/lib/utils/indent-utils";
import {warn} from "@vue/composition-api";
export default {
  data() {
    return {
      textView:'',
      cur:'',
      res:'',
      dan:'',
      object:'',
      curname:'',
      parentUl:'',
        foodres:0,
        liferes:0,
        walkres:0,
      tableData:[],

      clothes: [
        { id: 'Dilun', img: require('../img/衣/毛巾.png'), name: '涤纶织物',num: 25.7,dan:'kg'},
        { id: 'Tixu', img: require('../img/衣/T恤 .png'), name: '纯棉T恤',num: 7,dan:'kg'},
        { id: 'Xiyi', img: require('../img/衣/洗衣液.png'), name: '洗衣液',num:0.8,dan:'L'}
        // 其他衣物...
      ],


      foods: [
        { id: 'Baijiu', img: require('../img/食/酒瓶-白酒-茅台.png'), name: '白酒',num:1.76,dan:'kg'},
        { id: 'Pijiu', img: require('../img/食/酒瓶-啤酒-雪花.png'), name: '啤酒',num:0.22,dan:'瓶' },
        { id: 'Xiyan', img: require('../img/食/香烟.png'), name: '香烟',num:0.02,dan:'包'},
        { id: 'Yang', img: require('../img/食/11-羊肉卷.png'), name: '羊肉',num:39.2,dan:'kg'},
        { id: 'Niu', img: require('../img/食/牛肉.png'), name: '牛肉',num:27,dan:'kg'},
        { id: 'Zhu', img: require('../img/食/猪肉脯.png'), name: '猪肉' ,num:21.2,dan:'kg'},
        { id: 'Zhaji', img: require('../img/食/mbe风格_炸鸡.png'), name: '炸鸡',num:1.805,dan:'kg'},
        { id: 'Jidan', img: require('../img/食/鸡蛋.png'), name: '鸡蛋',num:4.8,dan:'kg'},
        { id: 'Tudou', img: require('../img/食/土豆.png'), name: '土豆',num:2.9,dan:'kg'},
        { id: 'Mifan', img: require('../img/食/20_米饭.png'), name: '米饭',num:2.7,dan:'kg'},
        { id: 'Hsheng', img: require('../img/食/花生.png'), name: '花生',num:2.5,dan:'kg'},
        { id: 'Suan', img: require('../img/食/酸奶-Yogurt.png'), name: '酸奶',num:2.2,dan:'kg'},
        { id: 'Xilan', img: require('../img/食/西兰花.png'), name: '西兰花',num:2,dan:'kg'},
        { id: 'Doufu', img: require('../img/食/豆腐.png'), name: '豆腐',num:2,dan:'kg'},
        { id: 'Niunai', img: require('../img/食/牛奶.png'), name: '牛奶',num:1.9,dan:'kg'},
        { id: 'Xihong', img: require('../img/食/西红柿-copy.png'), name: '西红柿',num:1.1,dan:'kg'},
        { id: 'Bian', img: require('../img/食/扁豆.png'), name: '扁豆',num:0.9,dan:'kg'}
      ],



      lives: [
        { id: 'Mei', img: require('../img/住/煤炭.png'), name: '煤炭',num:1970,dan:'顿'},
        { id: 'Dian', img: require('../img/住/电灯.png'), name: '用电',num:0.997,dan:'度'},
        { id: 'Shui', img: require('../img/住/水龙头.png'), name: '用水',num:0.91,dan:'立方米'},
        { id: 'Meiqi', img: require('../img/住/煤气.png'), name: '煤气',num:0.71,dan: '立方米'},
        { id: 'Ran', img: require('../img/住/燃气.png'), name: '天然气',num:2.189,dan:'立方米'},
        { id: 'Nuan', img: require('../img/住/供暖.png'), name: '集中供暖',num:0.13,dan:'平米*每天'},
        { id: 'Feng', img: require('../img/住/网,蜂窝,数据结构,发散,聚合.png'), name: '蜂窝煤',num:3.297,dan:'块'},
        { id: 'Yehua', img: require('../img/住/ic_煤气罐.png'), name: '液化气',num:5.483,dan:'立方米'}
      ],


      transportations: [
        { id: 'Fly', img: require('../img/行/飞机-02.png'), name: '飞机',num:0.275,dan:'公里'},
        { id: 'Huoche', img: require('../img/行/火车.png'), name: '火车',num:0.0086,dan:'公里'},
        { id: 'Lunchuan', img: require('../img/行/轮船.png'), name: '轮船',num:0.01,dan:'公里'},
        { id: 'Ditie', img: require('../img/行/乘车.png'), name: '地铁',num:0.1,dan: '站'},
        { id: 'Gao', img: require('../img/行/巴士.png'), name: '高油耗车',num:0.41,dan: '公里'},
        { id: 'Zhong', img: require('../img/行/货车.png'), name: '中油耗车',num:0.297,dan: '公里'},
        { id: 'Dihao', img: require('../img/行/小轿车.png'), name: '低油耗车',num:0.27 ,dan: '公里'}
      ],



      uses: [
        { id: 'Zhizhi', img: require('../img/用/纸杯.png'), name: '纸制品',num:3.5,dan:'kg'},
        { id: 'Suliao', img: require('../img/用/袋子.png'), name: '塑料袋',num:0.0001,dan: '个'},
        { id: 'Yici', img: require('../img/用/筷子.png'), name: '一次性筷',num:0.01,dan: '双'},
        { id: 'Xifa', img: require('../img/用/洗发水.png'), name: '洗发水',num:0.016,dan: '瓶'},
        { id: 'Meigui', img: require('../img/用/花 浇水 鲜花 玫瑰花.png'), name: '花',num:0.183,dan: '枝'},
        { id: 'Laji', img: require('../img/用/垃圾桶.png'), name: '生活垃圾',num:2.06,dan: 'kg'}
      ],
    };
  },
  created() {
    this.tableData = this.$store.state.tableData;
  },
  methods: {
    open4() {
      this.$message.error('计算对象不能为空！');
    },
    warn(){
      this.$message({
        message: '请选择碳排放对象',
        type: 'warning'
      });
    },
    golist(){
      const foodres = this.foodres;
      const liferes = this.liferes;
      const walkres = this.walkres;
      const serializedData = encodeURIComponent(JSON.stringify(this.tableData));
      if(this.tableData.length!==0){
        this.$router.push({ name: 'list', params: { data: serializedData } });
      }
      else {
        this.open4();
      }

      // this.$router.push({ name: 'jiesuan', params: { foodres, liferes, walkres } });
      },
    goindex(){
        this.$router.replace('/Home');
      this.$store.commit('clearTableData');
      this.$store.commit('clearResData');
    },
    handleClick(event,item) {
      // 获取点击的图片元素对应的父<li>元素
      // alert(item.name)
      this.curname = item.name;
      const parentLi = event.target.parentNode;
      this.parentUl = parentLi.parentNode;

      // alert(this.parentUl.id)
      this.cur = item.num
      this.dan = item.dan
      this.object = item.name
      this.textView = '';
      this.res = '';
    },
    showTab(tabId) {
      // 隐藏所有的<ul>元素
      const tabs = document.querySelectorAll('.thing ul');
      tabs.forEach(tab => tab.style.display = 'none');

      // 隐藏所有的<span>元素
      const tabwords = document.querySelectorAll('.cal-head span');
      tabwords.forEach(word => word.style.display = 'none');

      // 显示对应的<ul>元素
      document.getElementById(tabId).style.display = 'block';

      // 显示对应的<span>元素
      if (tabId === 'cloth') {
        document.querySelector('.clothword').style.display = 'block';
      } else if (tabId === 'food') {
        document.querySelector('.foodword').style.display = 'block';
      } else if (tabId === 'live') {
        document.querySelector('.liveword').style.display = 'block';
      } else if (tabId === 'walk') {
        document.querySelector('.walkword').style.display = 'block';
      } else if (tabId === 'use') {
        document.querySelector('.useword').style.display = 'block';
      }
    },


    //计算机
    insert(num) {
      // 插入
      this.textView = this.textView + num;
    },
    equal() {
      if (this.parentUl === ''){
        // alert("请选择碳排放对象")
        this.warn();
        this.res = ''
      }
      else {
        this.res = (this.textView * this.cur).toFixed(2);
        this.res = parseFloat(this.res);
        if (this.parentUl.id ==='food'){
          this.foodres += this.res
        }
        else if (this.parentUl.id === 'cloth'||
            this.parentUl.id === 'live'||
            this.parentUl.id === 'use'){
          this.liferes += this.res
        }
        else if (this.parentUl.id === 'walk'){
          this.walkres += this.res
        }
        if (this.curname!==null&&this.textView!==0&&this.res!==0){
          this.tableData.push({
            ul:this.parentUl.id,
            name: this.curname,
            num: this.textView,
            out: this.res,
            id:this.parentUl.id
          });
        }
        // 清理输入框的文字
        this.textView = '';
      }
    },

    Mclean() {
      // 清理输入框的文字
      this.textView = '';
      this.res = '';
    },
    back() {
      // 删除文本框的一个字符
      if (this.textView) {
        this.textView = this.textView.substring(0, this.textView.length - 1);
      }
    }
  }
}
</script>

<template>
<div>
  <div class="cont">
    <div class="head">
      <ul>
        <li>
          <button class="cloth" @click="showTab('cloth')">
            <i class="fa fa-thumbs-up"></i>衣
          </button>
        </li>
        <li>
          <button class="food" @click="showTab('food')">
            <i class="fa fa-trash"></i>食
          </button>
        </li>
        <li>
          <button class="live" @click="showTab('live')">
            <i class="fa fa-cart-plus"></i>住
          </button>
        </li>
        <li>
          <button class="walk" @click="showTab('walk')">
            <i class="fa fa-trash"></i>行
          </button>
        </li>
        <li>
          <button class="use" @click="showTab('use')">
            <i class="fa fa-trash"></i>用
          </button>
        </li>
      </ul>
    </div>
    <div class="thing" id="thing">
      <!-- 衣 -->
      <ul id="cloth" class="yi" style="display: block;">
        <li v-for="item in clothes" :key="item.id">
          <img :src="item.img" alt="" :id="item.id" @click="handleClick($event,item)">
          <span>{{ item.name }}</span>
        </li>
      </ul>

<!--      食-->
      <ul id="food" class="shi">
        <li v-for="item in foods" :key="item.id">
          <img :src="item.img" alt="" :id="item.id" @click="handleClick($event,item)">
          <span>{{ item.name }}</span>
        </li>
      </ul>

      <!-- 住 -->
      <ul id="live" class="zhu">
        <li v-for="item in lives" :key="item.id">
          <img :src="item.img" alt="" :id="item.id" @click="handleClick($event,item)">
          <span>{{ item.name }}</span>
        </li>
      </ul>


      <!-- 行 -->
      <ul id="walk" class="xing">
        <li v-for="item in transportations" :key="item.id">
          <img :src="item.img" alt="" :id="item.id" @click="handleClick($event,item)">
          <span>{{ item.name }}</span>
        </li>
      </ul>


      <!-- 用 -->
      <ul id="use" class="yong">
        <li v-for="item in uses" :key="item.id">
          <img :src="item.img" alt="" :id="item.id" @click="handleClick($event,item)">
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </div>

    <div class="cal-head">
      <span class="clothword">穿上草鞋，飞一般的感觉！</span>
      <span class="foodword" style="display: none;">今天又吃了什么好吃的？</span>
      <span class="liveword" style="display: none;">又是低碳生活的一天！</span>
      <span class="walkword" style="display: none;">天气很好，出门走走吧！</span>
      <span class="useword" style="display: none;">杜绝浪费，从你我做起！</span>
    </div>


<!--    计算器-->
    <div class="cal">
      <form name="form">
        <input class="textView" name="textView" v-model="textView">
      </form>
      <div class="miaoshu">
        <span class="danwei">{{this.dan}}</span>
        <span class="object">{{this.object}}</span>
      </div>
      <div class="cal-res">
        <span>{{this.res}}</span>
      </div>
      <table>
        <tr>
          <!-- <td><input type="button" class="button" value="<" @click="back()"></td>
          <td><input type="button" class="button" value="/" @click="insert('/')"></td>
          <td><input type="button" class="button" value="x" @click="insert('*')"></td> -->
        </tr>
        <tr>
          <td><input type="button" class="button" value="1" @click="insert(1)"></td>
          <td><input type="button" class="button" value="2" @click="insert(2)"></td>
          <td><input type="button" class="button" value="3" @click="insert(3)"></td>
          <td><input type="button" class="button" value="<" @click="back()" style="width: 88px"></td>
          <!-- <td><input type="button" class="button" value="-" @click="insert('-')"></td> -->
        </tr>
        <tr>
          <td><input type="button" class="button" value="4" @click="insert(4)"></td>
          <td><input type="button" class="button" value="5" @click="insert(5)"></td>
          <td><input type="button" class="button" value="6" @click="insert(6)"></td>
          <td><input type="button" class="button" value="CE" @click="Mclean()" style="width: 88px;"></td>
          <!-- <td><input type="button" class="button" value="+" @click="insert('+')"></td> -->

        </tr>
        <tr>
          <td><input type="button" class="button" value="7" @click="insert(7)"></td>
          <td><input type="button" class="button" value="8" @click="insert(8)"></td>
          <td><input type="button" class="button" value="9" @click="insert(9)"></td>
          <td rowspan="2"><input style="height: 150px;width: 88px;"
                                 type="button" class="button" value="计算" @click="equal()"></td>

        </tr>
        <tr>
          <td colspan="2"><input style="width: 107px" type="button" class="button" value="0" @click="insert(0)"></td>
          <td><input  type="button" class="button" value="." @click="insert('.')"></td>

        </tr>

      </table>
    </div>

<!--    返回主页-->
    <button class="c-smileyButton" @click = "goindex()">
      <span class="c-smileyButton__face"></span>
      <span style="color: white">返回首页</span>
    </button>

<!--    查看详情-->
    <button class="golist" @click = "golist"></button>
  </div>
</div>
</template>
<style scoped>
@import url("../css/button.css");
@import url("../css/count.css");
@import url("../css/goindex.scss");
</style>