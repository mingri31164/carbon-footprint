<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      STAR_COLOR: '#fff',
      STAR_SIZE: 3,
      STAR_MIN_SCALE: 0.2,
      OVERFLOW_THRESHOLD: 50,
      STAR_COUNT: (window.innerWidth + window.innerHeight) / 8,
      stars: [],
      pointerX: null,
      pointerY: null,
      velocity: { x: 0, y: 0, tx: 0, ty: 0, z: 0.0009 },
      touchInput: false,
      scale: 1,
      width: 0,
      height: 0,
    };
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.context = this.canvas.getContext('2d');
    this.generate();
    this.resize();
    this.step();
    window.addEventListener('resize', this.resize);
    this.canvas.addEventListener('mousemove', this.onMouseMove);
    this.canvas.addEventListener('touchmove', this.onTouchMove);
    document.addEventListener('mouseleave', this.onMouseLeave);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
    this.canvas.removeEventListener('mousemove', this.onMouseMove);
    this.canvas.removeEventListener('touchmove', this.onTouchMove);
    document.removeEventListener('mouseleave', this.onMouseLeave);
  },
  methods: {
    generate() {
      for (let i = 0; i < this.STAR_COUNT; i++) {
        this.stars.push({
          x: 0,
          y: 0,
          z: this.STAR_MIN_SCALE + Math.random() * (1 - this.STAR_MIN_SCALE),
        });
      }
    },
    placeStar(star) {
      star.x = Math.random() * this.width;
      star.y = Math.random() * this.height;
    },
    recycleStar(star) {
      // Similar logic as before, adapted to use this.width, this.height, etc.
    },
    resize() {
      this.scale = window.devicePixelRatio || 1;
      this.width = window.innerWidth * this.scale;
      this.height = window.innerHeight * this.scale;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.stars.forEach(this.placeStar);
    },
    step() {
      // 清空画布
      this.context.clearRect(0, 0, width, height);
      // 更新星星的位置和速度
      this.update();
      // 绘制星星
      this.render();
      // 请求下一帧动画
      requestAnimationFrame(step);
    },
    update() {
      // 缓动速度
      this.velocity.tx *= 0.96;
      this.velocity.ty *= 0.96;
      // 更新速度
      this.velocity.x += (this.velocity.tx - velocity.x) * 0.8;
      this.velocity.y += (this.velocity.ty - velocity.y) * 0.8;
      // 遍历所有星星
      this.stars.forEach((star) => {
        // 根据速度和缩放比例更新星星的位置
        star.x += this.velocity.x * star.z;
        star.y += this.velocity.y * star.z;
        // 根据速度和缩放比例更新星星的位置（使星星围绕屏幕中心旋转）
        star.x += (star.x - this.width / 2) * this.velocity.z * star.z;
        star.y += (star.y - this.height / 2) * this.velocity.z * star.z;
        // 更新星星的缩放比例
        star.z += this.velocity.z;
        // 如果星星超出屏幕范围，则重新放置到屏幕上
        if (
            star.x < -this.OVERFLOW_THRESHOLD ||
            star.x > this.width + this.OVERFLOW_THRESHOLD ||
            star.y < -this.OVERFLOW_THRESHOLD ||
            star.y > this.height + this.OVERFLOW_THRESHOLD
        ) {
          this.recycleStar(star);
        }
      });
    },
    render() {
      // 遍历所有星星
      this.stars.forEach((star) => {
        // 设置绘制星星的样式
        this.context.beginPath();
        this.context.lineCap = 'round';
        this.context.lineWidth = this.STAR_SIZE * star.z * this.scale;
        this.context.globalAlpha = 0.5 + 0.5 * Math.random();
        this.context.strokeStyle = this.STAR_COLOR;
        // 绘制星星的路径
        this.context.beginPath();
        this.context.moveTo(star.x, star.y);
        // 计算星星的尾巴坐标
        let tailX = this.velocity.x * 2;
        let tailY = this.velocity.y * 2;
        // 如果尾巴坐标的绝对值小于0.1，则设置为0.5
        if (Math.abs(tailX) < 0.1) tailX = 0.5;
        if (Math.abs(tailY) < 0.1) tailY = 0.5;
        // 绘制星星的尾巴
        this.context.lineTo(star.x + tailX, star.y + tailY);
        this.context.stroke();
      });
    },
    movePointer(x, y) {
      // 如果之前有记录鼠标指针的位置，则计算鼠标指针的移动距离，并更新速度
      if (typeof this.pointerX === 'number' && typeof this.pointerY === 'number') {
        let ox = x - this.pointerX;
        let oy = y - this.pointerY;
        this.velocity.tx = this.velocity.tx + (ox / 8) * this.scale * (this.touchInput ? 1 : -1);
        this.velocity.ty = this.velocity.ty + (oy / 8) * this.scale * (this.touchInput ? 1 : -1);
      }
      // 更新鼠标指针的位置
      this.pointerX = x;
      this.pointerY = y;
    },
    onMouseMove(event) {
      this.touchInput = false;
      this.movePointer(event.clientX, event.clientY);
    },
    onTouchMove(event) {
      this.touchInput = true;
      this.movePointer(event.touches[0].clientX, event.touches[0].clientY);
      event.preventDefault();
    },
    onMouseLeave() {
      this.pointerX = null;
      this.pointerY = null;
    },
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

body {
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(-225deg, #231557 0%, #43107a 29%, #FF1361 100%);
}

canvas {
  position: fixed;
  width: 100%;
  height: 100%;
}
</style>
