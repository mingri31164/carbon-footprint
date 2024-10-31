<script>
import axios from "axios";
export default {
  data() {
    return {
      // gpt参数
      textcontent:'',
      displayText: "",
    }
  },
  methods: {
    // gpt方法
    async callMoonShot() {
      //定义api地址
      const url = "https://api.moonshot.cn/v1/chat/completions";
      //参数
      const params = {
          model: "moonshot-v1-32k",
        messages: [
          {
            role: "user",
            content: this.textcontent,
            max_tokens:8192,
          },
        ],
      };
      try {
        const response = await axios.post(url, params, {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${
            //   this.$ai_apikey
            // }`,
          },
        });
        const content = response.data.choices[0].message.content;
        return content;
      } catch (error) {
        console.error("调用api报错:", error);
        return null; // 或者处理错误，例如显示错误信息
      }
    },
    // 其他方法
    handleClick() {
      this.callMoonShot("提示信息").then((result) => {
        if (result) {
          // 使用结果，例如显示在页面上
          this.displayText = result;
        }
      });
    },
  }
}
</script>

<template>
  <div>
    <div class="second">
      <input type="text" v-model="textcontent" placeholder="输入你的问题"/>
      <button @click="handleClick">芜湖~开搜！</button>
    </div>
    <div class="answear">
      <h5>{{displayText}}</h5>
    </div>
  </div>
</template>

<style scoped>

/* gpt样式 */
.second{
  display: flex;
}
.second input{
  margin-top: 10rpx;
  margin-left: 20rpx;
  text-indent: 1em;
  width: 70%;
  height: 70rpx;
  border: 1px solid #4bc8b6;
  border-radius: 30rpx;
}
.second button{
  background-color: #c89f66;
  font-size: 12px;
  font-weight: 700;
  line-height: 70rpx;
  margin-top: 10rpx;
  height: 70rpx;
  width: 25%;
}

.answear{
  border: 1px solid #ecd314;
  margin: 20rpx;
  padding: 20rpx;
  border-radius: 40rpx;
}

</style>