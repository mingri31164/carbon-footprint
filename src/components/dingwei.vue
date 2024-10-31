<template>
  <div class="main">
    <div id="container"></div>
    <div class="info" @click="handleClick">打卡</div>
  </div>
</template>

<script>
import AMap from "core-js/internals/map-helpers";


export default {
  name: "DingWei",
  data() {
    return {
      signzone: [118.795257, 32.06046],
      distance: 0,
      point: [],
      distanceArr: [],
      arr: [
        {
          lat: 32.06046,
          lng: 118.795257,
          r: 300,
        },
        {
          lat: 32.061792,
          lng: 118.783514,
          r: 200,
        },
        {
          lat: 32.06361,
          lng: 118.791325,
          r: 150,
        },
      ],
    };
  },
  created() {},
  computed: {},
  mounted() {
    this.qwe(this.arr);

    const script = document.createElement('script');
    script.src = "https://webapi.amap.com/maps?v=1.4.15&key=6494d6baf3f3e92c715511f5d500092c";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  },
  methods: {
    // 定位
    qwe(arr) {
      let that = this;
      var map = new AMap.Map("container", {
        resizeEnable: true,
      });
      AMap.plugin("AMap.Geolocation", function () {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, // 是否使用高精度定位，默认:true
          timeout: 10000, // 超过10秒后停止定位，默认：无穷大
          maximumAge: 60 * 24 * 60 * 60 * 1000, // 定位结果缓存0毫秒，默认：0
          convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true, // 显示定位按钮，默认：true
          buttonPosition: "LB", // 定位按钮停靠位置，默认：'LB'，左下角
          buttonOffset: new AMap.Pixel(20, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true, // 定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true, // 定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true, // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition(function (status, result) {
          if (status == "complete") {
            that.onComplete(result);
          } else {
            that.onError(result);
          }
        });
        arr.forEach((item) => {
          let circle = new AMap.Circle({
            center: [item.lng, item.lat],
            radius: item.r, //签到范围半径
            borderWeight: 1,
            // strokeOpacity: 1,
            strokeOpacity: 0.2,
            fillOpacity: 0.4,
          });
          circle.setMap(map);
          map.setFitView([circle]);
        });

        map.plugin(["AMap.CircleEditor"], function () {
          let circleEditor;
          circleEditor = new AMap.CircleEditor(map, circle);
          circleEditor.open();
        });
      });
    },
    //解析定位结果
    onComplete(data) {
      console.log(data, "定位");
      this.point = [];
      var str = [];
      this.point.push(data.position.lng);
      this.point.push(data.position.lat);
      console.log(data.position);
      str.push("定位结果：" + data.position);
      str.push("定位类别：" + data.location_type);
      if (data.accuracy) {
        str.push("精度：" + data.accuracy + " 米");
      } //如为IP精确定位结果则没有精度信息
      str.push("是否经过偏移：" + (data.isConverted ? "是" : "否"));
      console.log(str);
      //   alert("定位成功" + str);
    },
    //解析定位错误信息
    onError(data) {
      console.log("定位失败");
      console.log(data.message);
      //   alert("定位失败" + data.message);
    },
    handleClick() {
      this.distanceArr = [];
      this.arr.forEach((item, i) => {
        let distance = AMap.GeometryUtil.distance(this.point, [
          item.lng,
          item.lat,
        ]).toFixed(2);
        this.distanceArr.push(distance);
      });
      let flge = this.arr.some((item, index) => {
        return this.distanceArr[index] <= item.r;
      });

      if (flge) {
        this.$message({
          message: "打卡成功！",
          type: "success",
        });
      } else {
        this.$message({
          message: "不在考勤范围内！",
          type: "warning",
        });
      }
      console.log(this.distanceArr, "this.distanceArr");
    },
  },
};
</script>
<style lang="less" scoped>
.main {
  position: relative;
  .info {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 100px;
    background-color: rgb(226, 50, 6, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: aliceblue;
    z-index: 999;
  }
}

#container {
  width: 100vw;
  height: 100vh;
  z-index: 9;
}
</style>

